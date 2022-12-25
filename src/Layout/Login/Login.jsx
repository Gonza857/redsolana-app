import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginWithPersistance, signInFB } from "../../firebase/firebase";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminContext } from "../../storage/AdminContext";
import { Animated } from "react-animated-css";
import { AiOutlineUser } from "react-icons/ai";
import { Metronome } from "@uiball/loaders";
import styled from "styled-components";

function Login() {
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useContext(adminContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isAdmin) navigate("/adminCajeros");
  }, [isAdmin, navigate]);

  const signInToast = () =>
    toast.success("Iniciaste sesión correctamente", {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });

  const errorSignIn = (error) => {
    toast.error(`${error}`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const completeFields = () => {
    toast.error(`Completa los campos vacios`, {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: false,
      pauseOnFocusLoss: false,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "colored",
    });
  };

  const onSubmit = (data) => {
    setIsLoading(true);
    signInFB(data.adminMail, data.adminPass)
      .then(() => {
        signInToast();
        navigate("/adminCajeros");
        setIsAdmin(true);
      })
      .catch((error) => {
        errorSignIn(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (
    errors.adminMail?.type === "required" &&
    errors.adminPass?.type === "required"
  ) {
    completeFields();
  }

  return (
    <>
      <LoginContainer>
        <Animated
          animationIn="bounceInLeft"
          animationOut="fadeOut"
          isVisible={true}
        >
          <LoginFormContainer className="col-11 col-sm-8 px-sm-5 col-sm-6 col-md-5 px-md-4 px-lg-3 col-xl-3">
            {isLoading ? (
              <>
                <div className="m-auto">
                  <Metronome size={40} speed={1.6} color="#fff" />
                </div>
              </>
            ) : (
              <>
                <Animated
                  animationIn="fadeIn"
                  animationOut="fadeOut"
                  isVisible={true}
                >
                  <LoginForm
                    className="gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* IMAGEN */}
                    <LoginImage>
                      <AiOutlineUser />
                    </LoginImage>
                    {/* CONTENEDOR INPUTS */}
                    <InputsContainer>
                      {/* EMAIL */}
                      <InputContainer className="d-flex flex-column signIn-inputs mb-4">
                        <StyledInput
                          className="col-10"
                          type="mail"
                          placeholder="Correo electrónico"
                          name="adminMail"
                          {...register("adminMail", {
                            required: true,
                          })}
                        />
                        {errors.adminMail?.type === "required" && (
                          <AlertText role="alert">Campo requerido</AlertText>
                        )}
                      </InputContainer>
                      {/* CONTRASEÑA */}
                      <InputContainer className="d-flex flex-column signIn-inputs">
                        <StyledInput
                          className="col-10"
                          type="password"
                          placeholder="Contraseña"
                          name="adminPass"
                          {...register("adminPass", {
                            required: true,
                          })}
                        />
                        {errors.adminPass?.type === "required" && (
                          <AlertText role="alert">Campo requerido</AlertText>
                        )}
                      </InputContainer>
                    </InputsContainer>
                    <SubmitInput type="submit" value="Iniciar sesión" />
                  </LoginForm>
                </Animated>
              </>
            )}
          </LoginFormContainer>
        </Animated>
        <ToastContainer />
      </LoginContainer>
    </>
  );
}

export default Login;

const LoginContainer = styled.div`
  margin-top: 70px;
  height: calc(100vh - 70px);
  display: grid;
  align-items: center;
  background-color: #020006;
  background-image: url("data:image/svg+xml,%3Csvg width='42' height='44' viewBox='0 0 42 44' xmlns='http://www.w3.org/2000/svg'%3E%3Cg id='Page-1' fill='none' fill-rule='evenodd'%3E%3Cg id='brick-wall' fill='%23d4af37' fill-opacity='0.4'%3E%3Cpath d='M0 0h42v44H0V0zm1 1h40v20H1V1zM0 23h20v20H0V23zm22 0h20v20H22V23z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const LoginFormContainer = styled.div`
  margin: auto;
  height: 408px;
  display: grid;
  align-items: center;
  overflow: hidden;
  border-radius: 15px;
  background: radial-gradient(
    circle,
    rgba(88, 88, 88, 1) 0%,
    rgba(0, 0, 0, 1) 100%
  );
  border: 1px solid #424242;
`;

const LoginForm = styled.form`
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
`;

const LoginImage = styled.div`
  justify-content: center;
  width: fit-content;
  margin: auto;
  svg {
    color: #fff;
    font-size: 90px;
  }
`;

const InputsContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const InputContainer = styled.div`
  padding-bottom: 25px;
  position: relative;
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  margin: auto;
  padding: 5px 10px;
  outline: none;
  border: none;
  border-radius: 10px;
`;

const AlertText = styled.small`
  color: #fff;
  position: absolute;
  bottom: 0;
  left: 40px;
`;

const SubmitInput = styled.input`
  width: fit-content;
  margin: auto;
  background-color: #d4af37;
  padding: 7px 15px;
  border-radius: 15px;
  color: #000;
  font-weight: 600;
  transition: all 0.15s;
  border: 0.3px solid #c7c7c7;
  &:hover {
    background-color: #d4af37c2;
    border: 0.3px solid #000;
  }
`;
