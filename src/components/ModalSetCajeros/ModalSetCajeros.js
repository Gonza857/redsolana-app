import React, { useState, useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { postCajeros } from "../../firebase/firebase";
import { adminContext } from "../../storage/AdminContext";

function ModalSetCajeros({ onClose, show }) {
  const { addCajero, cajeros } = useContext(adminContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    addCajero(data);
    onClose();
    postCajeros(data).then((respuesta)=>{
    console.log(respuesta)})
  };
  
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
          <Modal.Title>Agregar nuevo cajero</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
            className="d-flex flex-column"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* NOMBRE, GENERO, RED Y NUMERO */}

            <div className="d-flex flex-column">
              {/* GENERO*/}
              <div className="d-flex flex-column justify-content-center align-content-center">
                <div className="d-flex">
                  <p className="m-0">Genero:</p>
                  <div className="d-flex">
                    {/* OPCION 1 */}
                    <div className="d-flex flex-row">
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
                    <div className="d-flex flex-row">
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
              {/* NOMBRE */}
              <div className="d-flex flex-column">
                <input
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
              {/* RED */}
              <div className="d-flex flex-column">
                <input
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
              {/* NUMERO */}
              <div className="d-flex flex-column">
                <input
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
              <div className="d-flex flex-column">
                <input
                  type="text"
                  placeholder="Link de WhatsApp"
                  name="enlace"
                  {...register("enlace", {
                    required: true,
                  })}
                />
                {errors.enlace?.type === "required" && (
                  <small role="alert" className="text-danger">
                    Campo requerido
                  </small>
                )}
              </div>
            </div>

            <div>
              <Button variant="danger" onClick={onClose}>
                Cancelar
              </Button>
              <input type="submit" className="btn btn-primary" />
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalSetCajeros;
