import React, { useContext, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { MainButton } from "../../../components/APublic/MainButton/MainButton";
import ReCAPTCHA from "react-google-recaptcha";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import { postSolicitud } from "../../../firebase/database/solicitudes";
import moment from "moment";
import { useNavigate } from "react-router-dom";
import { solicitudesContext } from "../../../storage/AdminContext";

export const RequestUser = () => {
  const { platforms } = useContext(solicitudesContext);

  const { register, handleSubmit } = useForm();

  const [validCaptcha, setValidCaptcha] = useState(false);

  const captcha = useRef(null);

  const navigate = useNavigate();

  const onSubmit = (data) => {
    data.date = moment().format("L");
    data.state = false;
    if (!validCaptcha) {
      toastError("Resuelva la Captcha");
    } else {
      postSolicitud(data)
        .then(() => {
          toastSuccess("Solicitud realizada correctamente");
          window.scrollTo(0, 0);
          navigate("/");
        })
        .catch((error) => {
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
    <Wrapper className="col-12 d-flex justify-content-center align-items-center py-lg-3">
      <FormContainer className="d-flex flex-column col-12 col-sm-10 col-md-7 col-lg-6 col-xl-5 p-2 p-sm-4 pb-5 px-lg-5 py-lg-4">
        <h3 className="m-0 p-0 mt-2 mt-sm-0 mb-2 mb-sm-4 text-center">
          Solicitud de usuario
        </h3>
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
              {...register("email")}
            />
          </StyledInputContainer>
          <div className="col-12 d-flex flex-column flex-sm-row gap-3 gap-lg-0 justify-content-between">
            <StyledInputContainer className="col-12 col-sm-6">
              <StyledInput
                required
                type="text"
                name="phone"
                placeholder="Número de telefono"
                {...register("phone")}
              />
              <p className="m-0 p-0">
                Con número de area Ejemplo: <strong>11</strong>44008833
              </p>
            </StyledInputContainer>
            <StyledInputContainer className="col-12 col-sm-5">
              <StyledSelect name="platform" {...register("platform")}>
                <option value="" disabled selected>
                  Plataforma
                </option>
                {platforms.map(({ visible, id, name }) => (
                  <>{visible && <option key={id}>{name}</option>}</>
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
              {...register("fullname")}
            />
          </StyledInputContainer>

          <CaptchaContainer>
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
              <a href="https://wa.link/jc3ov2" target="_BLANK" rel="noreferrer">
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

const FormContainer = styled.div`
  height: fit-content;
  background-color: #303030;
  /* background: linear-gradient(#3d3d3d 0%, rgba(0, 0, 0, 1) 100%); */
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
