import React, { useContext, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import {
  deleteImg,
  prePostImg,
  updateCajeroInfo,
} from "../../firebase/firebase";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { BsFillTrashFill } from "react-icons/bs";

function EditCajerosForm({ onClose, show, cajeroData }) {
  const [hasImage, setHasImage] = useState(false);
  const [recentlyDeleted, setRecentlyDeleted] = useState(false);

  useEffect(() => {
    if (cajeroData.imagen === null) {
      console.log("llego sin imagen");
      setHasImage(false);
    } else {
      setHasImage(true);
      console.log("llego con imagen");
    }
  }, []);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const updateInfo = async (data) => {
    /*
        CASO 1) LLEGA CON IMAGEN, ELIMINAMOS, ENVIAMOS SIN IMAGEN
        CASO 2) LLEGA CON IMAGEN, ACTUALIZAMOS, ENVIAMOS IMAGEN
        CASO 3) LLEGA SIN IMAGEN, ACTUALIZAMOS, ENVIAMOS IMAGEN
        CASO 4) LLEGA SIN IMAGEN, AGREGAMOS, ENVIAMOS SIN IMAGEN
    */
    if (cajeroData.imagen === null) {
      //CASO 1,3,4
      if (data.imagen.length === 0) {
        //CASO 4) LLEGA SIN IMAGEN, AGREGAMOS, ENVIAMOS SIN IMAGEN
        console.log("envio sin imagen");
        data.imagen = null;
        cajeroData.nombre = data.nombre;
        cajeroData.red = data.red;
        cajeroData.enlace = data.enlace;
        cajeroData.genero = data.genero;
        cajeroData.numero = data.numero;
        updateCajeroInfo(cajeroData.id, data);
        onClose();
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
      } else {
        // CASO 1) LLEGA CON IMAGEN, ELIMINAMOS, ENVIAMOS SIN IMAGEN
        //CASO 3) LLEGA SIN IMAGEN, ACTUALIZAMOS, ENVIAMOS IMAGEN
        console.log("envio con imagen");
        const result = await prePostImg(data.imagen[0]);
        console.log(result);
        let { url, randomId } = result;
        data.imagen = {
          url,
          randomId,
        };
        cajeroData.nombre = data.nombre;
        cajeroData.red = data.red;
        cajeroData.enlace = data.enlace;
        cajeroData.genero = data.genero;
        cajeroData.numero = data.numero;
        cajeroData.imagen = {
          url,
          randomId,
        };
        updateCajeroInfo(cajeroData.id, data);
        onClose();
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
      }
    } else {
      //CASO 2) LLEGA CON IMAGEN, ACTUALIZAMOS, ENVIAMOS IMAGEN
      if (hasImage) {
        cajeroData.nombre = data.nombre;
        cajeroData.red = data.red;
        cajeroData.enlace = data.enlace;
        cajeroData.genero = data.genero;
        cajeroData.numero = data.numero;
        data.imagen = cajeroData.imagen;
        updateCajeroInfo(cajeroData.id, data);
        onClose();
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
      } else {
        console.log(cajeroData.imagen);
        console.log("id de la imagen -->", cajeroData.imagen.randomId);
        const deleteAction = await deleteImg(cajeroData.imagen.ramdomId);
        console.log(deleteAction);
        data.imagen = null;
        cajeroData.imagen = null;
        cajeroData.nombre = data.nombre;
        cajeroData.red = data.red;
        cajeroData.enlace = data.enlace;
        cajeroData.genero = data.genero;
        cajeroData.numero = data.numero;
        setHasImage(false);
        setRecentlyDeleted(true);
        updateCajeroInfo(cajeroData.id, data);
        onClose();
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
      }
    }
  };

  const onSubmit = (data) => {
    console.log("información del cajero traida de la base -->", cajeroData);
    console.log("informacion actualizada -->", data);
    console.log(cajeroData.imagen);

    Swal.fire({
      title: "¿Estas seguro que quieres actualizar la información?",
      text: "Los cambios no se pueden deshacer.",
      showDenyButton: true,
      confirmButtonText: "Guardar",
      denyButtonText: `No guardar`,
    }).then((result) => {
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
    console.log("boton de borrar presionado");
    if (cajeroData.imagen !== null) {
      // VERIFICAMOS QUE LLEGUE CON IMAGEN
      console.log("verificado que tiene imagen");
      cajeroData.imagen = null;
      setHasImage(false);
      setRecentlyDeleted(true);
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
          <InputsBox className="col-5">
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

        <InputContainer3 className="col-12">
          {/* NUMERO */}
          <label htmlFor="numero">Teléfono</label>
          <StyledInput
            className="col-5"
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

const ViewImageContainer = styled.div``;

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
