import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../firebase/firebase";
import "./login.css";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { adminContext } from "../../storage/AdminContext";
import { Animated } from "react-animated-css";
import { AiOutlineUser } from "react-icons/ai";
import { Metronome } from "@uiball/loaders";

function Login() {
  const navigate = useNavigate();
  const { isAdmin, setIsAdmin } = useContext(adminContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);

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
    console.log(error);
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
    loginUser(data.adminMail, data.adminPass)
      .then((respuesta) => {
        if (
          respuesta.user.uid === "INdShNqqCJS6pMg8g9iZmLd7hBo1" ||
          respuesta.user.uid === "SG6i2m7MaVSTuXGo83hfwPNKido1"
        ) {
          signInToast();
          navigate("/adminCajeros");
          setIsAdmin(true);
          localStorage.setItem("active", true);
        }
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
      <div className="authContainer">
        <Animated
          animationIn="bounceInLeft"
          animationOut="fadeOut"
          isVisible={true}
        >
          <div className="signIn-container col-11 col-sm-8 px-sm-5 col-sm-6 col-md-5 px-md-4 px-lg-3 col-xl-3">
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
                  <form
                    className="signIn-form gap-3"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    {/* IMAGEN */}
                    <div className="signIn-form_img">
                      <AiOutlineUser className="signIn-form_icon" />
                    </div>
                    {/* CONTENEDOR INPUTS */}
                    <div className="d-flex flex-column">
                      {/* EMAIL */}
                      <div className="d-flex flex-column signIn-inputs mb-4">
                        <input
                          className="signIn-mail_input col-10 m-auto"
                          type="mail"
                          placeholder="Correo electrónico"
                          name="adminMail"
                          {...register("adminMail", {
                            required: true,
                          })}
                        />
                        {errors.adminMail?.type === "required" && (
                          <small role="alert" className="text-danger">
                            Campo requerido
                          </small>
                        )}
                      </div>
                      {/* CONTRASEÑA */}
                      <div className="d-flex flex-column signIn-inputs">
                        <input
                          className="signIn-pass_input col-10 m-auto"
                          type="text"
                          placeholder="Contraseña"
                          name="adminPass"
                          {...register("adminPass", {
                            required: true,
                          })}
                        />
                        {errors.adminPass?.type === "required" && (
                          <small role="alert" className="text-danger">
                            Campo requerido
                          </small>
                        )}
                      </div>
                    </div>
                    <input
                      type="submit"
                      className="btn signIn-submit_btn"
                      value="Iniciar sesión"
                    />
                  </form>
                </Animated>
              </>
            )}
          </div>
        </Animated>
        <ToastContainer />
      </div>
    </>
  );
}

export default Login;

{
  /* <form
                  className="signIn-form col-8 col-sm-6 col-md-5 col-xl-3 my-5 py-5 px-3 px-md-5 gap-3 redB"
                  on */
}
