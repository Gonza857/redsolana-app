import React, { useContext } from "react";
import { Button, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { updateCajeroInfo } from "../../firebase/firebase";
import { adminContext } from "../../storage/AdminContext";

function ModalEditCajeros({ onClose, show, cajeroData }) {
  const { cajeros, setCajeros } = useContext(adminContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = (data) => {
    const newCajero = {
      ...data,
      id: cajeroData.id,
    };
    let copyCajeros = [...cajeros];
    const searchCajeroPosition = cajeros.findIndex(
      (cajero) => cajero.id === newCajero.id
    );
    copyCajeros.splice(searchCajeroPosition, 1);
    copyCajeros.push(newCajero);
    setCajeros(copyCajeros);
    updateCajeroInfo(newCajero);
    onClose();
  };

  let generoMasc;
  let generoFem;
  if (cajeroData.genero === "M") {
    generoMasc = true;
    generoFem = false;
  } else {
    generoMasc = false;
    generoFem = true;
  }

  return (
    <>
      <Modal
        show={show}
        onHide={onClose}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Editar información del cajero</Modal.Title>
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
                        defaultChecked={generoMasc}
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
                        defaultChecked={generoFem}
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
                  defaultValue={cajeroData.nombre}
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
                  defaultValue={cajeroData.red}
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
                  defaultValue={cajeroData.numero}
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
                  defaultValue={cajeroData.enlace}
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
              <Button variant="success">{cajeroData.id}</Button>
              <Button type="submit">Actualizar datos</Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default ModalEditCajeros;
