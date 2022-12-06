import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { postCajeros } from "../../firebase/firebase";
import { adminContext } from "../../storage/AdminContext";
// import second from 'styled'
import "./modalSetCajeros.css";
import { AiOutlineUserAdd } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";

function ModalSetCajeros({ onClose, show }) {
  const { addCajero } = useContext(adminContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    addCajero(data);
    onClose();
    postCajeros(data).then((respuesta) => {
      console.log(respuesta);
      toast.success("Cajero agregado correctamente!", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    });
  };

  const completeFields = () => {
    toast.error(`Completa los campos requeridos`, {
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

  if (
    errors.red?.type === "required" ||
    errors.adminPass?.type === "required" ||
    errors.nombre?.type ||
    errors.genero ||
    errors.numero?.type
  ) {
    completeFields();
  }

  return (
    <>
      {/* <Button variant="primary" onClick={handleShow}>
        Launch static backdrop modal
      </Button> */}

      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title className="d-flex align-items-center">
            Agregar nuevo cajero
            <AiOutlineUserAdd className="addCajeroIcon" />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="pb-0">
          <form
            className="d-flex flex-column m-auto gap-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* NOMBRE, GENERO, RED Y NUMERO */}
            <div className="d-flex flex-wrap gap-2">
              <div className="col-12 d-flex gap-5">
                {/* RED */}
                <div className="d-flex flex-column col-5">
                  <input
                    className="inputStyle"
                    type="text"
                    placeholder="Red"
                    name="red"
                    {...register("red", {
                      required: true,
                    })}
                  />
                  {errors.red?.type === "required" && (
                    <small role="alert" className="text-danger">
                      Campo requerido
                    </small>
                  )}
                </div>
                {/* NOMBRE */}
                <div className="d-flex flex-column col-5">
                  <input
                    className="inputStyle"
                    type="text"
                    placeholder="Nombre"
                    name="nombre"
                    {...register("nombre", {
                      required: true,
                    })}
                  />
                  {errors.nombre?.type === "required" && (
                    <small role="alert" className="text-danger">
                      Campo requerido
                    </small>
                  )}
                </div>
              </div>
              {/* GENERO*/}
              <div className="d-flex flex-column justify-content-center align-content-center">
                <div className="d-flex gap-3">
                  <p className="m-0">Genero:</p>
                  <div className="d-flex gap-4">
                    {/* OPCION 1 */}
                    <div className="d-flex flex-row gap-1">
                      <input
                        type="radio"
                        value="M"
                        {...register("genero", {
                          required: "Selecciona un genero",
                        })}
                      />
                      <p className="m-0">Masculino</p>
                    </div>
                    {/* OPCION 2 */}
                    <div className="d-flex flex-row gap-1">
                      <input
                        type="radio"
                        value="F"
                        {...register("genero", {
                          required: "Selecciona un genero",
                        })}
                      />
                      <p className="m-0">Femenino</p>
                    </div>
                  </div>
                </div>
                {errors.genero && (
                  <small className="text-danger col-12">
                    {errors.genero.message}
                  </small>
                )}
              </div>
              {/* NUMERO */}
              <div className="d-flex flex-column col-12 ">
                <input
                  className="col-5 inputStyle input-control"
                  type="number"
                  placeholder="Telefono"
                  name="numero"
                  {...register("numero", {
                    required: true,
                  })}
                />
                {errors.numero?.type === "required" && (
                  <small role="alert" className="text-danger">
                    Campo requerido
                  </small>
                )}
              </div>
              {/* ENLACE WHASTAPP */}
              <div className="d-flex flex-column col-12">
                <input
                  className="inputStyle"
                  type="text"
                  placeholder="Link de WhatsApp"
                  name="enlace"
                  {...register("enlace")}
                />
              </div>
            </div>

            <div className="modalButtons py-3 d-flex justify-content-center gap-2">
              <Button variant="danger" onClick={onClose}>
                Cancelar
              </Button>
              <Button type="submit">
                Agregar
                <AiOutlineUserAdd className="addCajeroIcon" />
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSetCajeros;
