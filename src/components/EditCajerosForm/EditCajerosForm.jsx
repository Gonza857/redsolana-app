import React, { useState, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  deleteImg,
  prePostImg,
  updateAllCajeros,
  updateCajeroInfo,
} from "../../firebase/firebase";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { adminContext } from "../../storage/AdminContext";

function EditCajerosForm({ onClose, show, cajeroData, cajeroIndex }) {
  const [hasImage, setHasImage] = useState(false);
  const { cajeros, setCajeros, moveCajerosPosition } = useContext(adminContext);

  useEffect(() => {
    if (cajeroData.imagen === null) {
      setHasImage(false);
    } else {
      setHasImage(true);
    }
  }, [cajeroData.imagen]);

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

  const updateInfo = async (data) => {
    /*
        CASO 1) LLEGA CON IMAGEN, ELIMINAMOS, ENVIAMOS SIN IMAGEN
        CASO 2) LLEGA CON IMAGEN, ACTUALIZAMOS, ENVIAMOS IMAGEN
        CASO 3) LLEGA SIN IMAGEN, ACTUALIZAMOS, ENVIAMOS IMAGEN
        CASO 4) LLEGA SIN IMAGEN, AGREGAMOS, ENVIAMOS SIN IMAGEN
    */

    if (cajeroData.imagen === null) {
      //CASO 3,4
      if (data.imagen.length === 0) {
        // console.log("CASO 4) LLEGA SIN IMAGEN, AGREGAMOS, ENVIAMOS SIN IMAGEN");
        data.imagen = null;
        data.pos = Number(data.pos);
        if (data.pos - 1 !== cajeroData.pos) {
          // console.log("CASO 4) Y CAMBIO DE POSICION");
          data.id = cajeroData.id;
          let copyCajeros = [...cajeros];
          let newArray = moveCajerosPosition(data.pos - 1, data, copyCajeros);
          console.table(newArray);
          setCajeros(newArray);
          updateAllCajeros(newArray).catch((error) => {
            toast.error(error.message, {
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
          });
          onClose();
        } else {
          // console.log("CASO 4) Y NO CAMBIO DE POSICION");
          cajeroData.red = data.red;
          cajeroData.nombre = data.nombre;
          cajeroData.genero = data.genero;
          cajeroData.estado = data.estado;
          cajeroData.numero = data.numero;
          cajeroData.pos = data.pos - 1;
          cajeroData.enlace = data.enlace;
          updateCajeroInfo(cajeroData.id, data)
            .then(() => {
              onClose();
            })
            .catch((error) => {
              toast.error(error.message, {
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
            });
        }
      } else {
        // console.log("CASO 3) LLEGA SIN IMAGEN, ACTUALIZAMOS, ENVIAMOS IMAGEN");
        data.pos = Number(data.pos);
        const result = await prePostImg(data.imagen[0]);
        let { url, randomId } = result;
        data.imagen = {
          url,
          randomId,
        };
        if (data.pos - 1 !== cajeroData.pos) {
          // console.log("CASO 3) Y CAMBIO DE POSICION");
          data.id = cajeroData.id;
          let copyCajeros = [...cajeros];
          let newArray = moveCajerosPosition(data.pos - 1, data, copyCajeros);
          console.table(newArray);
          setCajeros(newArray);
          updateAllCajeros(newArray).catch((error) => {
            toast.error(error.message, {
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
          });
          onClose();
        } else {
          // console.log("CASO 3) Y NO CAMBIO DE POSICION");
          cajeroData.nombre = data.nombre;
          cajeroData.estado = data.estado;
          cajeroData.pos = data.pos;
          cajeroData.red = data.red;
          cajeroData.enlace = data.enlace;
          cajeroData.genero = data.genero;
          cajeroData.numero = data.numero;
          cajeroData.imagen = {
            url,
            randomId,
          };
          cajeros.forEach((caj, i) => {
            caj.pos = i;
          });
          data.pos = cajeroData.pos;
          updateCajeroInfo(cajeroData.id, data);
          onClose();
        }
      }
      // FIN CASO 3,4
    } else {
      // CASO 1) LLEGA CON IMAGEN, ELIMINAMOS, ENVIAMOS SIN IMAGEN
      // CASO 2) LLEGA CON IMAGEN, ENVIAMOS IMAGEN
      // CASO 2.A) LLEGA CON IMAGEN, ACTUALIZAMOS, MANDAMOS UNA DIFERENTE
      // CASO 2.B) LLEGA CON IMAGEN, ENVIAMOS LA MISMA

      data.pos = Number(data.pos);

      if (hasImage === false && data.imagen.length !== 0) {
        // console.log(
        //   "CASO 2.A) LLEGA CON IMAGEN, ACTUALIZAMOS, MANDAMOS UNA DIFERENTE"
        // );
        await deleteImg(cajeroData.imagen.randomId);
        const result = await prePostImg(data.imagen[0]);
        let { url, randomId } = result;
        data.imagen = {
          url,
          randomId,
        };

        if (data.pos - 1 !== cajeroData.pos) {
          data.id = cajeroData.id;
          // console.log("CASO 2.A) Y CAMBIO DE POSICION");
          let copyCajeros = [...cajeros];
          let newArray = moveCajerosPosition(data.pos - 1, data, copyCajeros);
          console.table(newArray);
          setCajeros(newArray);
          updateAllCajeros(newArray).catch((error) => {
            toast.error(error.message, {
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
          });
          onClose();
        } else {
          // console.log("CASO 2.A) Y NO CAMBIO DE POSICION");
          cajeroData.red = data.red;
          cajeroData.nombre = data.nombre;
          cajeroData.genero = data.genero;
          cajeroData.estado = data.estado;
          cajeroData.numero = data.numero;
          cajeroData.pos = data.pos - 1;
          cajeroData.enlace = data.enlace;
          cajeroData.imagen = data.imagen;
          cajeros.forEach((caj, i) => {
            caj.pos = i;
          });
          data.pos = cajeroData.pos;
          updateCajeroInfo(cajeroData.id, data);
          onClose();
        }
      } else if (hasImage === false) {
        // console.log(
        //   "CASO 1) LLEGA CON IMAGEN, ELIMINAMOS, ENVIAMOS SIN IMAGEN"
        // );
        await deleteImg(cajeroData.imagen.randomId);
        cajeroData.imagen = null;
        data.pos = Number(data.pos);
        data.imagen = null;

        if (data.pos - 1 !== cajeroData.pos) {
          data.id = cajeroData.id;
          // console.log("CASO 1) Y CAMBIO DE POSICION");
          let copyCajeros = [...cajeros];
          let newArray = moveCajerosPosition(data.pos - 1, data, copyCajeros);
          setCajeros(newArray);
          updateAllCajeros(newArray).catch((error) => {
            toast.error(error.message, {
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
          });
          onClose();
        } else {
          // console.log("CASO 1) Y NO CAMBIO DE POSICION");
          cajeroData.red = data.red;
          cajeroData.nombre = data.nombre;
          cajeroData.genero = data.genero;
          cajeroData.estado = data.estado;
          cajeroData.numero = data.numero;
          cajeroData.pos = data.pos;
          cajeroData.enlace = data.enlace;
          cajeros.forEach((caj, i) => {
            caj.pos = i;
          });
          data.pos = cajeroData.pos;
          updateCajeroInfo(cajeroData.id, data);
          onClose();
        }
      } else {
        // console.log("CASO 2.B) LLEGA CON IMAGEN, ENVIAMOS LA MISMA");
        data.imagen = cajeroData.imagen;

        if (data.pos - 1 !== cajeroData.pos) {
          // console.log("CASO 2.B) Y CAMBIO DE POSICION");
          data.id = cajeroData.id;
          let copyCajeros = [...cajeros];
          let newArray = moveCajerosPosition(data.pos - 1, data, copyCajeros);
          console.table(newArray);
          setCajeros(newArray);
          updateAllCajeros(newArray).catch((error) => {
            toast.error(error.message, {
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
          });
          onClose();
        } else {
          // console.log("CASO 2.B) Y NO CAMBIO DE POSICION");
          cajeroData.red = data.red;
          cajeroData.nombre = data.nombre;
          cajeroData.genero = data.genero;
          cajeroData.estado = data.estado;
          cajeroData.numero = data.numero;
          cajeroData.pos = data.pos;
          cajeroData.enlace = data.enlace;
          cajeros.forEach((caj, i) => {
            caj.pos = i;
          });
          data.pos = cajeroData.pos;
          updateCajeroInfo(cajeroData.id, data);
          onClose();
        }
      }
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
    if (cajeroData.imagen !== null) {
      setHasImage(false);
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
