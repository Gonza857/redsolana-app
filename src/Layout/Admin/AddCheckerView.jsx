import React, { useState, useContext, forwardRef } from "react";
import styled from "styled-components";
import { adminContext } from "../../storage/AdminContext";
import { toastSuccess } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";

import { useForm } from "react-hook-form";
import { MainButton } from "../../components/UI/MainButton";
import Firebase from "../../classes/Firebase";
import { Image } from "../../classes/Image";

export const AddCheckerView = () => {
  const { c_reGetCashiers, solana } = useContext(adminContext);
  const [previewImage, setPreviewImage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const {
    register,

    handleSubmit,
  } = useForm();
  const navigate = useNavigate();

  const successNavigation = () => {
    navigate("/admin/cajeros");
    toastSuccess("Agregado correctamente");
  };

  const endProcess = () => {
    c_reGetCashiers();
    setIsSending(false);
    successNavigation();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let fileContent;
    reader.onload = (event) => {
      fileContent = event.target.result;
      setPreviewImage(fileContent);
    };
    reader.readAsDataURL(file);
    return fileContent;
  };

  const onSubmit = (data) => {
    data.pos = Number(data.pos);
    data.numero = Number(data.numero);
    data.pos = solana.cajeros.length;
    setIsSending(true);
    if (previewImage !== "") {
      console.log("Con img");
      Firebase.uploadCheckerImageDB(previewImage).then(({ randomId, url }) => {
        data.imagen = new Image(randomId, url);
        solana.addCashier(data);
        endProcess();
      });
    } else {
      console.log("Sin img");
      data.imagen = null;
      solana.addCashier(data);
      endProcess();
    }
  };

  return (
    <StyledView className="py-3">
      <Form
        className="d-flex flex-column flex-wrap gap-3 p-3 p-xl-3 col-11 col-sm-8 col-md-7 col-lg-5 col-xl-4 m-auto"
        onSubmit={handleSubmit(onSubmit)}
      >
        <h3>Agregar cajero</h3>
        <div className="col-12 d-flex flex-wrap gap-3 gap-xl-1 justify-content-sm-between">
          <Network {...register("red")} />
          <Name {...register("nombre")} />
        </div>
        <InputContainer2>
          {/* GENERO*/}
          <div className="d-flex gap-3">
            <label className="m-0" htmlFor="genero">
              Genero:
            </label>
            <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 gap-xl-4">
              {/* OPCION 1 */}
              <div className="d-flex flex-row gap-1">
                <input
                  required
                  type="radio"
                  value="M"
                  name="genero"
                  {...register("genero")}
                />
                <p className="m-0">Masculino</p>
              </div>
              {/* OPCION 2 */}
              <div className="d-flex flex-row gap-1">
                <input
                  required
                  type="radio"
                  value="F"
                  name="genero"
                  {...register("genero")}
                />
                <p className="m-0">Femenino</p>
              </div>
            </div>
          </div>
        </InputContainer2>
        <InputContainer2>
          {/* ESTADO*/}
          <div className="d-flex gap-3">
            <p className="m-0">Estado:</p>
            <div className="d-flex flex-column flex-sm-row gap-2 gap-sm-3 gap-xl-4">
              {/* OPCION 1 */}
              <div className="d-flex flex-row gap-1">
                <input
                  required
                  type="radio"
                  value="conectado"
                  {...register("estado")}
                />
                <p className="m-0">Conectado</p>
              </div>
              {/* OPCION 2 */}
              <div className="d-flex flex-row gap-1">
                <input
                  required
                  type="radio"
                  value="desconectado"
                  {...register("estado")}
                />
                <p className="m-0">Desconectado</p>
              </div>
            </div>
          </div>
        </InputContainer2>
        <div className="col-12 d-flex flex-wrap gap-3 gap-xl-1 justify-content-sm-between">
          {/* NUMERO */}
          <Phone {...register("numero")} />
          <Position {...register("pos")} value={solana.cajeros.length + 1} />
        </div>
        <Link {...register("enlace")} />
        {previewImage !== "" ? (
          <>
            <div className="d-flex col-12">
              <StyledPreviewImage className="col-8">
                <img src={previewImage} />
              </StyledPreviewImage>
              <div className="col-4 d-flex justify-content-center align-items-center">
                <MainButton fn={() => setPreviewImage("")}>Eliminar</MainButton>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="d-flex flex-column col-12">
              <label htmlFor="imagen">Imagen</label>
              <StyledInput
                type="file"
                name="imagen"
                {...register("imagen")}
                onChange={handleFileUpload}
              />
            </div>
          </>
        )}
        <div className="d-flex justify-content-center">
          {isSending ? (
            <div className="blockButton">
              <MainButton primary={true}>
                <Ring size={25} lineWeight={5} speed={2} color="#000" />
              </MainButton>
            </div>
          ) : (
            <>
              <MainButton type={"submit"} primary={true}>
                Enviar
              </MainButton>
            </>
          )}
        </div>
      </Form>
    </StyledView>
  );
};

const Position = forwardRef((props, ref) => {
  return (
    <StyledInputContainer className="col-5">
      <label htmlFor="pos">Posición</label>
      <StyledInput
        required
        type="number"
        name="pos"
        value={props.value}
        readOnly
        ref={ref}
        {...props}
      />
    </StyledInputContainer>
  );
});

const Phone = forwardRef((props, ref) => {
  return (
    <StyledInputContainer className="col-6">
      <label htmlFor="numero">Número</label>
      <StyledInput required type="number" name="numero" {...props} ref={ref} />
    </StyledInputContainer>
  );
});

const Link = forwardRef((props, ref) => {
  return (
    <StyledInputContainer className="col-12">
      <label htmlFor="enlace">Enlace de Contacto</label>
      <StyledInput required type="text" name="enlace" {...props} ref={ref} />
    </StyledInputContainer>
  );
});

const Name = forwardRef((props, ref) => {
  return (
    <StyledInputContainer className="col-12 col-sm-5">
      <label htmlFor="nombre">Nombre</label>
      <StyledInput required type="text" name="nombre" {...props} ref={ref} />
    </StyledInputContainer>
  );
});

const Network = forwardRef((props, ref) => {
  return (
    <InputBox>
      <label htmlFor="red">Red</label>
      <StyledInput required type="text" name="red" {...props} ref={ref} />
    </InputBox>
  );
});
const InputBox = ({ children }) => {
  return (
    <StyledInputContainer className="col-12 col-sm-6">
      {children}
    </StyledInputContainer>
  );
};

const StyledView = styled.div`
  /* border: 5px solid blueviolet; */
  width: 100%;
  color: #fff;
  display: flex;
  flex-direction: column;
`;

const Form = styled.form`
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-radius: 1rem;
  border: 1px solid gold;
  box-shadow: 0px 0px 43px 4px rgba(255, 255, 255, 0.3);
  transition: all 0.5s;
`;

const StyledPreviewImage = styled.div`
  height: 120px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StyledInputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #999;
  }
  &::-webkit-input-placeholder {
    color: #999;
  }
  &::-moz-placeholder {
    color: #999;
  }
  &:-ms-input-placeholder {
    color: #999;
  }
  &:-moz-placeholder {
    color: #999;
  }
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
