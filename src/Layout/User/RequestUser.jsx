import React, { forwardRef, useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import ReCAPTCHA from "react-google-recaptcha";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { toastError, toastSuccess } from "../../helpers/helpers";
import Firebase from "../../classes/Firebase";
import { solicitudesContext } from "../../storage/AdminContext";
import { MainButton } from "../../components/UI/MainButton";
import { Loader } from "../../components/UI/Loader";

const isPlatformOK = (platform) => {
  if (platform == "Selecciona una plataforma") {
    toastError("Selecciona una plataforma antes de enviar.");
    return false;
  }
  return true;
};

const buildRequestObject = (data) => {
  return {
    _email: data.email,
    _phone: data.phone,
    _platform: data.platform,
    _fullname: data.fullname,
    _date: moment().format("L"),
    _time: moment().format("LTS"),
    _state: false,
  };
};

export const RequestUser = () => {
  const { platforms } = useContext(solicitudesContext);
  const { register, handleSubmit } = useForm();
  const [validCaptcha, setValidCaptcha] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const captcha = useRef(null);
  const navigate = useNavigate();

  const onSubmit = (data) => {
    if (!isPlatformOK(data.platform)) return;
    setIsSending(true);
    let request = buildRequestObject(data);
    if (!validCaptcha) {
      toastError("Resuelva la Captcha");
    } else {
      Firebase.postRequest(request)
        .then(() => {
          toastSuccess("Solicitud realizada correctamente");
          window.scrollTo(0, 0);
          navigate("/");
          setIsSending(false);
        })
        .catch((error) => {
          setIsSending(false);
          toastError(error.message);
        });
    }
  };

  const onChange = () => {
    if (captcha.current.getValue()) {
      setValidCaptcha(true);
    } else {
      setValidCaptcha(false);
    }
  };

  return (
    <Wrapper className="col-12 d-flex justify-content-center align-items-center">
      <FormContainer className="d-flex flex-column col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 p-2 p-sm-4 pb-5 px-lg-5 py-lg-4">
        <h3 className="m-0 p-0 mt-2 mt-sm-0 mb-2 mb-sm-4 text-center">
          Solicitud de usuario
        </h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex gap-2 flex-wrap flex-column"
        >
          <StyledInputContainer className="col-12">
            <label htmlFor="email">Correo electrónico</label>
            <StyledInput
              required
              type="email"
              name="email"
              placeholder="ejemplo@ejemplo.com"
              {...register("email")}
            />
          </StyledInputContainer>
          <StyledInputContainer className="col-12">
            <label htmlFor="phone">Número de teléfono</label>
            <StyledInput
              size={2}
              required
              type="text"
              name="phone"
              placeholder="1150508877"
              {...register("phone")}
            />
            {/* <p className="m-0 p-0">
              Ejemplo: <strong className="p-0 m-0">11 </strong>4400-8833
            </p> */}
          </StyledInputContainer>
          <StyledInputContainer className="col-12">
            <label htmlFor="platform">Plataforma</label>
            <MainSelect name="platform" {...register("platform")}>
              <option disabled selected style={{ color: "#00000080" }}>
                Selecciona una plataforma
              </option>
              {platforms.map(({ _isVisible, _id, _name }) => (
                <>{_isVisible && <option key={_id}>{_name}</option>}</>
              ))}
            </MainSelect>
          </StyledInputContainer>
          <StyledInputContainer className="col-12">
            <label htmlFor="fullname">Nombre completo</label>
            <MainInput
              size={2}
              required
              type="text"
              name="fullname"
              placeholder="John Doe"
              {...register("fullname")}
            />
          </StyledInputContainer>

          <CaptchaContainer className="py-1">
            <ReCAPTCHA
              ref={captcha}
              sitekey="6Ld8qqQpAAAAAHNa8HfLDfL2_QhX4kOn16-tvLl5"
              onChange={onChange}
              theme={"dark"}
              size={"normal"}
              style={{
                margin: `${window.screen.width < 992 ? "unset" : "auto"}`,
              }}
            />
          </CaptchaContainer>
          <MainButton
            type={"submit"}
            primary={true}
            style={{
              width: "100%",
              height: "50px",
              cursor: `${isSending ? "not-allowed" : "pointer"}`,
            }}
          >
            {isSending ? <Loader /> : "Enviar"}
          </MainButton>
          <div
            className="d-flex flex-column flex-lg-row gap-2 justify-content-center
            align-items-center py-2"
          >
            <p className="m-0 p-0">¿Necesitas ayuda? Contactános</p>
            <StyledHelpIconContainer className="gap-3">
              <a
                href="https://wa.me/5492804337217"
                target="_BLANK"
                rel="noreferrer"
              >
                <img src="./assets/images/wsp-logo.png" alt="WhatsApp Logo" />
              </a>

              <a href="https://t.me/Solana43s" target="_BLANK" rel="noreferrer">
                <img
                  src="./assets/images/telegram-logo.png"
                  alt="Telegram Logo"
                />
              </a>
            </StyledHelpIconContainer>
          </div>
        </form>
      </FormContainer>
    </Wrapper>
  );
};

const MainInput = forwardRef(({ size, ...args }, ref) => {
  let width = "";
  switch (size) {
    case 1:
      width = " col-4 ";
      break;
    case 2:
      width = " col-12 ";
      break;
    default:
      width = " col-8 ";
  }

  return <InputDefaultStyle {...args} className={`${width}`} ref={ref} />;
});

const MainSelect = forwardRef(({ children, ...args }, ref) => {
  return (
    <MainSelectStyle {...args} ref={ref}>
      {children}
    </MainSelectStyle>
  );
});

const MainSelectStyle = styled.select`
  margin: 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 1rem;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  height: 50px;
  &:focus {
    background-color: #d4af37;
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #00000080;
  }
  &::-webkit-input-placeholder {
    color: #00000080;
  }
  &::-moz-placeholder {
    color: #00000080;
  }
  &:-ms-input-placeholder {
    color: #00000080;
  }
  &:-moz-placeholder {
    color: #00000080;
  }
`;

const InputDefaultStyle = styled.input`
  height: 50px;
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 1rem;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  &:focus {
    background-color: #d4af37;
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #00000080;
  }
  &::-webkit-input-placeholder {
    color: #00000080;
  }
  &::-moz-placeholder {
    color: #00000080;
  }
  &:-ms-input-placeholder {
    color: #00000080;
  }
  &:-moz-placeholder {
    color: #00000080;
  }
`;

const FormContainer = styled.div`
  height: fit-content;
  background-color: #303030;
  color: #fff;
  box-shadow: 0px 0px 20px 0px #d4af3781;
  border-right: 0.5px solid #ffffff4f;
  border-left: 0.5px solid #ffffff4f;
  min-height: calc(100vh - 60px);
  @media screen and (max-width: 500px) {
    border-radius: 0;
  }
`;

const CaptchaContainer = styled.div`
  width: fit-content;
  margin: auto;
`;

const StyledHelpIconContainer = styled.div`
  display: flex;
  img {
    width: 100%;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    overflow: hidden;
  }
`;

const Wrapper = styled.div`
  background-color: #1b1a1e;

  @media screen and (min-width: 200px) {
    min-height: calc(100vh - 60px);
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  transition: 0.3s all;
  &:focus {
    background-color: #d4af37;
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #00000080;
  }
  &::-webkit-input-placeholder {
    color: #00000080;
  }
  &::-moz-placeholder {
    color: #00000080;
  }
  &:-ms-input-placeholder {
    color: #00000080;
  }
  &:-moz-placeholder {
    color: #00000080;
  }
`;

const StyledSelect = styled.select`
  padding: 10px;
  background-color: #d4af37;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  &:focus {
    background-color: #d4af37;
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #000;
  }
  &::-webkit-input-placeholder {
    color: #000;
  }
  &::-moz-placeholder {
    color: #000;
  }
  &:-ms-input-placeholder {
    color: #000;
  }
  &:-moz-placeholder {
    color: #000;
  }
`;
