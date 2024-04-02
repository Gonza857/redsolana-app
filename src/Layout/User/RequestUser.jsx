import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { MainButton } from "../../components/MainButton/MainButton";
import ReCAPTCHA from "react-google-recaptcha";
import { toastError, toastSuccess } from "../../helpers/helpers";
import { postSolicitud } from "../../firebase/database/solicitudes";
import moment from "moment";

export const RequestUser = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [validCaptcha, setValidCaptcha] = useState(false);

  const captcha = useRef(null);

  const onSubmit = (data) => {
    console.log(data);
    data.date = moment().format("L");
    data.state = false;
    console.log(validCaptcha);
    if (!validCaptcha) {
      toastError("Resuelva la Captcha");
    } else {
      toastSuccess("Captcha correctamente completada");
      postSolicitud(data)
        .then((result) => {
          console.log(result);
          toastSuccess("Formmulario enviado");
        })
        .catch((error) => {
          toastError(error.message);
        });
    }
  };

  const onChange = () => {
    console.log(captcha.current.getValue());
    if (captcha.current.getValue()) {
      setValidCaptcha(true);
    } else {
      setValidCaptcha(false);
    }
  };

  const platforms = ["Vikingo", "Konabet", "ajugar.pro", "Bet39"];

  return (
    <Wrapper className="col-12 d-flex justify-content-center align-items-center py-lg-3">
      <FormContainer className="d-flex flex-column col-12 col-lg-5 px-lg-5 py-lg-4">
        <h3 className="m-0 p-0 mb-4 text-center">Solicitud de usuario</h3>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="d-flex gap-4 flex-wrap flex-column"
        >
          <StyledInputContainer className="col-12">
            <StyledInput
              required
              type="email"
              name="email"
              placeholder="Correo electrónico"
              defaultValue={"test@test.com"}
              {...register("email")}
            />
          </StyledInputContainer>
          <div className="col-12 d-flex flex-column flex-lg-row gap-4 gap-lg-0 justify-content-between">
            <StyledInputContainer className="col-12 col-sm-6">
              <StyledInput
                required
                type="text"
                name="phone"
                placeholder="Número de telefono"
                defaultValue={"11 1234 5678"}
                {...register("phone")}
              />
              <p>
                Con número de area Ejemplo: <strong>11</strong>44008833
              </p>
            </StyledInputContainer>
            <StyledInputContainer className="col-12 col-sm-5">
              <StyledSelect
                name="platform"
                {...register("platform")}
                defaultValue={"Vikingo"}
              >
                <option value="" disabled>
                  {/* selected */}
                  Plataforma
                </option>
                {platforms.map((platform) => (
                  <option>{platform}</option>
                ))}
              </StyledSelect>
            </StyledInputContainer>
          </div>
          <StyledInputContainer className="col-12">
            <StyledInput
              required
              type="text"
              name="fullname"
              placeholder="Nombre y apellido"
              defaultValue={"Mengano Fulano"}
              {...register("fullname")}
            />
          </StyledInputContainer>

          <CaptchaContainer>
            <ReCAPTCHA
              ref={captcha}
              sitekey="6Ld8qqQpAAAAAHNa8HfLDfL2_QhX4kOn16-tvLl5"
              onChange={onChange}
              theme={"dark"}
              size={window.screen.width < 992 ? "compact" : "normal"}
              style={{
                margin: `${window.screen.width < 992 ? "unset" : "auto"}`,
              }}
            />
          </CaptchaContainer>
          <div className="m-auto">
            <MainButton type={"submit"} primary={true}>
              Enviar
            </MainButton>
          </div>
          <div
            className="d-flex flex-column flex-lg-row gap-2 justify-content-center
            align-items-center"
          >
            <p className="m-0 p-0">¿Necesitas ayuda? Contactános</p>
            <StyledHelpIconContainer className="gap-3">
              <img src="./assets/images/wsp-logo.png" />
              <img src="./assets/images/telegram-logo.png" />
            </StyledHelpIconContainer>
          </div>
        </form>
      </FormContainer>
    </Wrapper>
  );
};

const FormContainer = styled.div`
  height: fit-content;
  background: linear-gradient(#3d3d3d 0%, rgba(0, 0, 0, 1) 100%);
  color: #fff;
  border-radius: 30px;
  box-shadow: 0px 0px 20px 0px #d4af3781;
  border: 0.5px solid #ffffff4f;
  @media screen and (min-width: 200px) {
    min-height: calc(100vh - 60px);
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
  background-color: #d4af37;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  &:focus {
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

const StyledSelect = styled.select`
  padding: 10px;
  background-color: #d4af37;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  &:focus {
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
