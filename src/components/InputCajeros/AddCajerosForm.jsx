import React, { useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import { toast } from "react-toastify";
import { adminContext } from "../../storage/AdminContext";
import { uploadImgToDB } from "../../firebase/firebase";
import { postCajeros, updateAllCajeros } from "../../firebase/cajeros";

const successfullAdd = () => {
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
};

const errorOnAdd = (errorMsg) => {
  toast.error(errorMsg, {
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

function AddCajerosForm({ onClose }) {
  const { addCajero, cajeros, setCajeros, moveCajerosPosition } =
    useContext(adminContext);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // const onSubmit = async (data) => {
  //   // SI NO TIENE IMAGEN, ES NULL
  //   data.imagen = data.imagen.length !== 1 && null;
  //   // PARSEAMOS LA POS A NUMBER
  //   data.pos = Number(data.pos);
  //   // SI NO HAY, POR DEFECTO ES LA ULTIMA POSICIÓN DEL ARRAY
  //   // CASA, AUTO, JARDIN
  //   // 0   , 1   , 2
  //   // arr.length --> 3
  //   // CASA, AUTO, JARDIN, PLAZA
  //   // 0   , 1   , 2     , 3
  //   // arr.length --> 4 --> asignado a posición 4

  // };

  const onSubmit = async (data) => {
    if (data.imagen[0] === undefined) {
      // SE ENVIA SIN IMAGEN
      data.imagen = null;
      data.pos = Number(data.pos);
      if (data.pos !== cajeros.length + 1) {
        data.pos = data.pos - 1;
        postCajeros(data).then((result) => {
          const orderedCajeros = moveCajerosPosition(
            data.pos - 1,
            result,
            cajeros
          );
          setCajeros(orderedCajeros);
          updateAllCajeros(orderedCajeros).catch((error) => {
            errorOnAdd(error.message);
          });
          successfullAdd();
        });
        onClose();
      } else {
        // console.log("no cambiaste la posición");
        data.pos = data.pos - 1;
        postCajeros(data).then((result) => {
          addCajero(result);
          successfullAdd();
          onClose();
        });
      }
    } else {
      const result = await uploadImgToDB(data.imagen[0]);
      let { url, randomId } = result;
      data.imagen = {
        url,
        randomId,
      };
      data.pos = Number(data.pos);
      if (data.pos !== cajeros.length + 1) {
        postCajeros(data).then((result) => {
          const orderedCajeros = moveCajerosPosition(
            data.pos - 1,
            result,
            cajeros
          );
          setCajeros(orderedCajeros);
          updateAllCajeros(orderedCajeros)
            .then(() => successfullAdd())
            .catch((error) => {
              errorOnAdd(error.message);
            });
        });
        onClose();
      } else {
        addCajero(data);
        onClose();
        postCajeros(data).then(() => {
          successfullAdd();
        });
      }
    }
  };

  return (
    <AddForm className="gap-3" onSubmit={handleSubmit(onSubmit)}>
      {/* NOMBRE, GENERO, RED Y NUMERO */}
      <Wrapper className="gap-2">
        <InputContainer1 className="col-12">
          <InputsBox className="col-5">
            {/* RED */}
            <StyledInput
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
          </InputsBox>
          {/* NOMBRE */}
          <InputsBox className="col-5">
            <StyledInput
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
          </InputsBox>
        </InputContainer1>

        <InputContainer2>
          {/* GENERO*/}
          <div className="d-flex gap-3">
            <p className="m-0">Genero:</p>
            <div className="d-flex gap-4">
              {/* OPCION 1 */}
              <div className="d-flex flex-row gap-1">
                <StyledInput
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
                <StyledInput
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
        <InputContainer3 className="col-12 flex-row justify-content-start gap-5">
          <div className="d-flex flex-column col-4">
            {/* NUMERO */}
            <label htmlFor="numero">Teléfono</label>
            <StyledInput
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

          <div className="d-flex flex-column col-3">
            {/* POSICION */}
            <label htmlFor="numero">Posición</label>
            <StyledInput
              type="number"
              placeholder="Posición"
              defaultValue={cajeros.length + 1}
              name="pos"
              {...register("pos")}
            />
          </div>
        </InputContainer3>

        <InputContainer3 className="col-12">
          {/* ENLACE WHASTAPP */}
          <StyledInput
            type="text"
            placeholder="Link de WhatsApp"
            name="enlace"
            {...register("enlace")}
          />
        </InputContainer3>
        <InputContainer3 className="col-12">
          <StyledInput type="file" name="imagen" {...register("imagen")} />
        </InputContainer3>
      </Wrapper>
      <SubmitContainer className="py-3 gap-2">
        <Button variant="danger" onClick={onClose}>
          Cancelar
        </Button>
        <Button type="submit">
          Agregar
          <AiOutlineUserAdd className="addCajeroIcon" />
        </Button>
      </SubmitContainer>
    </AddForm>
  );
}

export default AddCajerosForm;

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
