import React, { useState, useContext } from "react";
import styled from "styled-components";
import { set, useForm } from "react-hook-form";
import {
  deleteImg,
  uploadImgToDB,
  updateAllCajeros,
  updateCajeroInfo,
  getAllCajeros,
} from "../../firebase/firebase";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { adminContext } from "../../storage/AdminContext";
import { toastError } from "../../helpers/helpers";

const updateAllCheckersDB = (checkersArray) => {
  updateAllCajeros(checkersArray).catch((error) => {
    toastError(error.message);
  });
};

const updateLocalChecker = (actualChecherInfo, newCheckerInfo) => {
  actualChecherInfo.red = newCheckerInfo.red;
  actualChecherInfo.nombre = newCheckerInfo.nombre;
  actualChecherInfo.genero = newCheckerInfo.genero;
  actualChecherInfo.estado = newCheckerInfo.estado;
  actualChecherInfo.numero = newCheckerInfo.numero;
  actualChecherInfo.enlace = newCheckerInfo.enlace;
  actualChecherInfo.pos = --newCheckerInfo.pos;
  console.log(actualChecherInfo);
};

const updateCheckerV1 = (thisCajero, formCajero, booleanBorroLaImagen) => {
  if (thisCajero.imagen != null) {
    // VINO CON IMAGEN
    // PREGUNTAMOS SI LA BORRO
    if (booleanBorroLaImagen) {
      // TRUE, BORRADA

      formCajero.imagen = thisCajero.imagen;
      updateLocalChecker(thisCajero, formCajero);
    } else {
      // FALSE, NO BORRADA
    }
  } else if (thisCajero.imagen == null) {
  } else {
    console.log("aca no debe entrar xd");
  }
};

function EditCajerosForm({ onClose, show, cajeroData, cajeroIndex }) {
  const [hasImage, setHasImage] = useState(false);

  const [laQuiereBorrar, setLaQuiereBorrar] = useState(false);

  const { cajeros, setCajeros, moveCajerosPosition, traerCajeros } =
    useContext(adminContext);

  useEffect(() => {
    if (cajeroData.imagen === null) {
      setHasImage(false);
    } else {
      setHasImage(true);
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-primary mx-2",
      cancelButton: "btn btn-danger",
      denyButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const thisWillBeTheBestFunction = (data) => {
    data.pos = Number(data.pos);
    if (data.imagen.length == 0) {
      // LA BORRÓ
      if (cajeroData.pos != data.pos) {
        // LA BORRO Y LA POS ES DISTINTA
        let fueBorrada = deleteImg(cajeroData.imagen.randomId);
        if (fueBorrada) {
          console.log("Borrada correctamente");
          data.imagen = null;
          updateLocalChecker(cajeroData, data);
          updateCajeroInfo(cajeroData.id, data)
            .then(() => {
              onClose();
            })
            .catch((error) => {
              toastError(error.message);
            });
        } else {
          console.log("No la pude borrar");
        }
      } else {
        // LA BORRO Y LA POS ES IGUAL
        let fueBorrada = deleteImg(cajeroData.imagen.randomId);
        if (fueBorrada) {
          console.log("Borrada correctamente");
          data.imagen = null;
          updateLocalChecker(cajeroData, data);
          updateCajeroInfo(cajeroData.id, data)
            .then(() => {
              onClose();
            })
            .catch((error) => {
              toastError(error.message);
            });
        } else {
          console.log("No la pude borrar");
        }
      }
    } else {
      // NO LA BORRO
      if (cajeroData.pos != data.pos) {
        // NO LA BORRO Y LA POS ES DISTINTA
        updateLocalChecker(cajeroData, data);
        let newArray = moveCajerosPosition(data.pos - 1, data, [...cajeros]);
        updateAllCheckersDB(newArray);
        traerCajeros();
      } else {
        // NO LA BORRO Y LA POS ES IGUAL
        updateLocalChecker(cajeroData, data);
        updateCajeroInfo(cajeroData.id, data)
          .then(() => {
            onClose();
          })
          .catch((error) => {
            toastError(error.message);
          });
      }
    }
  };

  const updateInfo = async (data) => {
    // console.log("INFORMACION DEL FORMULARIO");
    // console.table(data);

    // console.log("INFORMACION ACTUAL");
    // console.table(cajeroData);

    let esPosicionCambiada = false;

    data.pos = Number(data.pos);
    data.pos--;
    cajeroData.pos = Number(cajeroData.pos);

    let posicionAntigua = cajeroData.pos;

    if (cajeroData.pos != data.pos) esPosicionCambiada = true;

    data.id = cajeroData.id;

    // if (esPosicionCambiada) {
    //   // CAMBIO LA POSICION
    //   console.log("Cambio la posicion");
    // } else {
    //   // NO CAMBIO LA POSICION
    //   console.log("No cambio la posicion");
    // }

    const actualizo = () => {
      if (cajeroData.imagen == null) {
        // LLEGA SIN IMAGEN
        if (data.imagen.length > 0) {
          // AGREGO NUEVA
          // LLEGON SIN --> SE VA CON
          uploadImgToDB(data.imagen[0])
            .then((resultado) => {
              console.log("Subida correctamente a Storage.");
              let { url, randomId } = resultado;
              data.imagen = {
                url,
                randomId,
              };
            })
            .catch(() => {
              console.log("Sucedio un error");
            });
          // YA CARGAMOS A LA DATA.IMAGEN LOS DATOS DE LA IMAGEN NUEVA
          // ACTUALIZAZR CAJERO TODO:
          updateCajeroInfo(cajeroData.id, data).then(() => {
            console.log("DB -  cajero, actualizado correctamente.");
          });
          updateLocalChecker(cajeroData, data);
        } else {
          // NO AGREGO NUEVA
          // LLEGON SIN --> SE VA SIN
          // ACTUALIZAR CAJERO TODO:
          updateCajeroInfo(cajeroData.id, data).then(() => {
            console.log("DB -  cajero, actualizado correctamente.");
          });
          updateLocalChecker(cajeroData, data);
        }
      } else if (cajeroData.imagen != null) {
        console.log("LLEGO CON IMAGEN");
        if (laQuiereBorrar) {
          if (data.imagen.length > 0) {
            // LA BORRO PERO AGREGO OTRA
            deleteImg(cajeroData.imagen.randomId).then(() => {
              console.log("Borrada correctamente");
            });
            uploadImgToDB(data.imagen[0])
              .then((resultado) => {
                console.log("Subida correctamente a Storage.");
                let { url, randomId } = resultado;
                data.imagen = {
                  url,
                  randomId,
                };
              })
              .catch(() => {
                console.log("Sucedio un error");
              });
            console.log("Llego con la misma, se fue con otra");

            // ACTUALIZAR CAJERO TODO:
          } else {
            // LA BORRO PERO NO AGREGO OTRA
            deleteImg(cajeroData.imagen.randomId).then(() => {
              console.log("Borrada correctamente");
            });
            data.imagen = null;
            console.log("Llego con la misma, se fue sin ella");

            // ACTUALIZAR CAJERO TODO:

            updateCajeroInfo(cajeroData.id, data).then(() => {
              console.log("DB -  cajero, actualizado correctamente.");
            });
            updateLocalChecker(cajeroData, data);
          }
        } else {
          // NO LA QUIERE BORRAR
          console.log("Llego con la misma, se va con la misma.");
          // ACTUALIZAR CAJERO TODO:
          updateCajeroInfo(cajeroData.id, data).then(() => {
            console.log("DB -  cajero, actualizado correctamente.");
          });
          updateLocalChecker(cajeroData, data);
        }
      } else {
        console.log("Algo salio mal");
      }
    };

    if (esPosicionCambiada) {
      console.log(data);
      let copyCajeros = [...cajeros];
      let newArray = moveCajerosPosition(data.pos, data, copyCajeros);
      setCajeros(newArray);
      updateAllCajeros(newArray)
        .then(() => {
          console.log("DB - array cajeros, actualizado correctamente");
        })
        .catch((error) => {
          throw new Error(error);
          // toastError(error.message);
        });
      onClose();
      traerCajeros();
    } else {
      // NO CAMBIO POSICION
      actualizo();
      updateCajeroInfo(cajeroData.id, data).then(() => {
        console.log("DB -  cajero, actualizado correctamente.");
      });
      updateLocalChecker(cajeroData, data);
      onClose();
    }
  };

  const onSubmit = (data) => {
    swalWithBootstrapButtons
      .fire({
        title: "¿Estas seguro que quieres actualizar la información?",
        text: "Los cambios no se pueden deshacer.",
        showDenyButton: true,
        denyButtonText: `No guardar`,
        confirmButtonText: "Guardar",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          updateInfo(data);
          toast.success("Información editada correctamente!", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (result.isDenied) {
          onClose();
          toast.info("No se guardaron los cambios.", {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        }
      });
  };

  const deleteHandler = () => {
    setLaQuiereBorrar(true);
    if (cajeroData.imagen !== null) {
      setHasImage(false);
      cajeroData.imagen = null;
      Swal.fire(
        "Se quitó la imagen.",
        "Si guarda los cambios se aplicarán y no se puede deshacer. Si desea cancelar el cambio, cancele los cambios.",
        "success"
      );
    }
  };

  return (
    <AddForm className="gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* NOMBRE, GENERO, RED Y NUMERO */}
      <Wrapper className="gap-2">
        <InputContainer1 className="col-12">
          <InputsBox className="col-5">
            {/* RED */}
            <label htmlFor="red">Red</label>
            <StyledInput
              type="text"
              placeholder="Red"
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
          </InputsBox>
          {/* NOMBRE */}
          <InputsBox className="col-6">
            <label htmlFor="nombre">Nombre</label>
            <StyledInput
              type="text"
              placeholder="Nombre"
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
          </InputsBox>
        </InputContainer1>

        <InputContainer2>
          {/* GENERO*/}
          <div className="d-flex gap-3 pt-1">
            <p className="m-0">Genero:</p>
            <div className="d-flex gap-4">
              {/* OPCION 1 */}
              <div className="d-flex flex-row gap-1">
                <StyledInput
                  type="radio"
                  value="M"
                  defaultChecked={cajeroData.genero === "M" ? true : false}
                  {...register("genero", {
                    required: "Selecciona un genero",
                  })}
                />
                <p className="m-0">Masculino</p>
              </div>
              {/* OPCION 2 */}
              <div className="d-flex flex-row gap-1">
                <StyledInput
                  type="radio"
                  value="F"
                  defaultChecked={cajeroData.genero === "F" ? true : false}
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
        </InputContainer2>

        <InputContainer2>
          {/* ESTADO*/}
          <div className="d-flex gap-3">
            <p className="m-0">Estado:</p>
            <div className="d-flex gap-4">
              {/* OPCION 1 */}
              <div className="d-flex flex-row gap-1">
                <StyledInput
                  type="radio"
                  value="conectado"
                  defaultChecked={
                    cajeroData.estado === "conectado" ? true : false
                  }
                  {...register("estado", {
                    required: "Selecciona un estado",
                  })}
                />
                <p className="m-0">Conectado</p>
              </div>
              {/* OPCION 2 */}
              <div className="d-flex flex-row gap-1">
                <StyledInput
                  type="radio"
                  value="desconectado"
                  defaultChecked={
                    cajeroData.estado === "desconectado" ? true : false
                  }
                  {...register("estado", {
                    required: "Selecciona un estado",
                  })}
                />
                <p className="m-0">Desconectado</p>
              </div>
            </div>
          </div>
          {errors.genero && (
            <small className="text-danger col-12">
              {errors.estado.message}
            </small>
          )}
        </InputContainer2>

        <InputContainer3 className="col-12 flex-row border justify-content-start gap-5">
          <div className="d-flex flex-column col-4">
            {/* NUMERO */}
            <label htmlFor="numero">Teléfono</label>
            <StyledInput
              type="number"
              placeholder="Telefono"
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

          <div className="d-flex flex-column col-3">
            {/* POSICION */}
            <label htmlFor="numero">Posición</label>
            <StyledInput
              type="number"
              placeholder="Posición"
              defaultValue={cajeroIndex}
              name="pos"
              {...register("pos", {
                required: true,
              })}
            />
            {errors.pos?.type === "required" && (
              <small role="alert" className="text-danger">
                Campo requerido
              </small>
            )}
          </div>
        </InputContainer3>

        <InputContainer3 className="col-12">
          {/* ENLACE WHASTAPP */}
          <label htmlFor="enlace">Link</label>
          <StyledInput
            type="text"
            placeholder="Link de WhatsApp"
            defaultValue={cajeroData.enlace}
            name="enlace"
            {...register("enlace")}
          />
        </InputContainer3>

        {hasImage ? (
          <>
            <div className="d-flex flex-column justify-content-evenly flex-wrap col-12 p-0 imagenContainer gap-2 mt-1">
              <TextContainer className="d-flex justify-content-between align-items-center">
                <p className="p-0 m-0 mb-1">Imagen actual:</p>
                <Button
                  className="d-flex align-items-center gap-2"
                  onClick={() => deleteHandler()}
                  variant="danger"
                >
                  Borrar imagen
                  <BsFillTrashFill />
                </Button>
              </TextContainer>
              <div className="col-6 m-auto p-0 m-0 mt-1">
                <CajeroPhoto
                  src={cajeroData.imagen?.url}
                  alto="fotito"
                  className="p-0 m-0"
                />
              </div>
              <div className="col-6 p-0 px-3 d-flex flex-column justify-content-evenly"></div>
            </div>
          </>
        ) : (
          <>
            <InputContainer3 className="col-12">
              <StyledInput type="file" name="imagen" {...register("imagen")} />
            </InputContainer3>
          </>
        )}
      </Wrapper>

      <SubmitContainer className="flex-wrap py-3 gap-2">
        <Button
          variant="danger"
          onClick={() => {
            onClose();
            toast.info("No se guardaron los cambios.", {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: true,
              closeOnClick: false,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }}
        >
          Cancelar
        </Button>
        <Button type="submit">Guardar cambios</Button>
      </SubmitContainer>
    </AddForm>
  );
}

export default EditCajerosForm;

const TextContainer = styled.div`
  width: 100%;
`;

const AddForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: auto;
`;

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const InputContainer1 = styled.div`
  justify-content: space-between;
  display: flex;
`;

const InputContainer2 = styled(InputContainer1)`
  flex-direction: column;
  align-content: center;
  justify-content: center;
`;

const InputContainer3 = styled(InputContainer1)`
  flex-direction: column;
`;

const SubmitContainer = styled.div`
  border-top: 1px solid #c7c7c7;
  display: flex;
  justify-content: center;
`;

const InputsBox = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  border-radius: 10px;
  padding: 5px 10px;
  outline: none;
  border: 0.5px solid #c7c7c7;
`;

const CajeroPhoto = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;
