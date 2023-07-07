import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  deleteImg,
  uploadImgToDB,
  updateAllCajeros,
  updateCajeroInfo,
} from "../../firebase/firebase";
import { animateScroll } from "react-scroll";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import { BsFillTrashFill } from "react-icons/bs";
import { adminContext } from "../../storage/AdminContext";
import { toastError, toastInfo, toastSuccess } from "../../helpers/helpers";

const updateLocalChecker = (actualChecherInfo, newCheckerInfo) => {
  actualChecherInfo.red = newCheckerInfo.red;
  actualChecherInfo.nombre = newCheckerInfo.nombre;
  actualChecherInfo.genero = newCheckerInfo.genero;
  actualChecherInfo.estado = newCheckerInfo.estado;
  actualChecherInfo.numero = newCheckerInfo.numero;
  actualChecherInfo.enlace = newCheckerInfo.enlace;
  actualChecherInfo.pos = newCheckerInfo.pos;
};

const updateFormData = async (
  actualCheckerData,
  formCheckerData,
  laQuiereBorrar
) => {
  if (actualCheckerData.imagen == null) {
    // LLEGA SIN IMAGEN
    if (formCheckerData.imagen?.length > 0) {
      // AGREGO NUEVA
      // LLEGON SIN --> SE VA CON
      await uploadImgToDB(formCheckerData.imagen[0])
        .then((resultado) => {
          let { url, randomId } = resultado;
          formCheckerData.imagen = {
            url,
            randomId,
          };
          actualCheckerData.imagen = formCheckerData.imagen;
        })
        .catch((error) => {
          toastError(error.message);
        });
    } else {
      // NO AGREGO NUEVA
      // LLEGON SIN --> SE VA SIN
      formCheckerData.imagen = null;
    }
  } else if (actualCheckerData.imagen != null) {
    if (laQuiereBorrar) {
      if (formCheckerData.imagen.length > 0) {
        // LA BORRO PERO AGREGO OTRA
        console.log("Llego con la misma, se fue con otra");
        await deleteImg(actualCheckerData.imagen.randomId).catch((error) => {
          toastError(error.message);
        });
        await uploadImgToDB(formCheckerData.imagen[0])
          .then((resultado) => {
            let { url, randomId } = resultado;
            formCheckerData.imagen = {
              url,
              randomId,
            };
          })
          .catch((error) => {
            toastError(error.message);
          });
      } else {
        // LA BORRO PERO NO AGREGO OTRA
        console.log("La borro pero no agregó");
        await deleteImg(actualCheckerData.imagen.randomId)
          .then(() => {
            formCheckerData.imagen = null;
            console.log("Se borro la imagen");
          })
          .catch((error) => {
            toastError(error.message);
          });
      }
    } else {
      // NO LA QUIERE BORRAR
      formCheckerData.imagen = actualCheckerData.imagen;
    }
  } else {
    // NO DEBERIA ENTRAR ACA
    toastError("Ocurrió un error. Reintente nuevamente.");
  }
};

function EditCajerosForm({ onClose, show, cajeroData, cajeroIndex }) {
  const [laQuiereBorrar, setLaQuiereBorrar] = useState(false);

  const scrollToTop = () => {
    const scrollDuration = 200; // Duración de la animación en milisegundos
    const scrollOffset = -100; // Desplazamiento adicional opcional

    animateScroll.scrollToTop({
      duration: scrollDuration,
      offset: scrollOffset,
    });
  };

  useEffect(() => {
    console.table(cajeroData.imagen);
    if (cajeroData.imagen == null) setLaQuiereBorrar(true);
  }, []);

  const {
    cajeros,
    setCajeros,
    moveCajerosPosition,
    traerCajeros,
    setIsLoading,
  } = useContext(adminContext);

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

  const updateInfo = (data) => {
    let esPosicionCambiada = false;
    data.pos = Number(data.pos);
    data.pos--;
    cajeroData.pos = Number(cajeroData.pos);
    data.id = cajeroData.id;
    if (cajeroData.pos != data.pos) esPosicionCambiada = true;
    updateFormData(cajeroData, data, laQuiereBorrar)
      .then(() => {
        if (esPosicionCambiada) {
          let copyCajeros = [...cajeros];
          let newArray = moveCajerosPosition(data.pos, data, copyCajeros);
          setCajeros(newArray);
          setIsLoading(true);
          scrollToTop();
          updateAllCajeros(newArray)
            .then(() => {
              traerCajeros()
                .then(() => {
                  onClose();
                  setIsLoading(false);
                  toastSuccess("Cajero actualizado correctamente.");
                })
                .catch((error) => {
                  toastError(error.message);
                });
            })
            .catch((error) => {
              toastError(error.message);
            });
        } else {
          // NO CAMBIO POSICION
          setIsLoading(true);
          updateLocalChecker(cajeroData, data);
          scrollToTop();
          updateCajeroInfo(cajeroData.id, data).then(() => {
            onClose();
            setIsLoading(false);
            toastSuccess("Cajero actualizado correctamente.");
          });
        }
      })
      .catch((error) => {
        toastError(error.message);
      });
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
          toastSuccess("Información editada correctamente!");
        } else if (result.isDenied) {
          onClose();
          toastInfo("No se guardaron los cambios.");
        }
      });
  };

  const deleteHandler = () => {
    setLaQuiereBorrar(true);
    deleteImg(cajeroData.imagen.randomId)
      .then(() => {
        cajeroData.imagen = null;
        console.log("Se borro la imagen");
        Swal.fire(
          "Se quitó la imagen.",
          "Si guarda los cambios se aplicarán y no se puede deshacer. Si desea cancelar el cambio, cancele los cambios.",
          "success"
        );
      })
      .catch((error) => {
        toastError(error.message);
      });
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

        {!laQuiereBorrar ? (
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
            toastInfo("No se guardaron los cambios.");
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
