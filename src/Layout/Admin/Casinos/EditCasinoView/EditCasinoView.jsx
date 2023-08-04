import React from "react";
import { useContext } from "react";
import { adminContext } from "../../../../storage/AdminContext";
import { useEffect } from "react";
import styled from "styled-components";
import { MainButton } from "../../../../components/MainButton/MainButton";
import { useState } from "react";

export const EditCasinoView = () => {
  const { casinoToEdit } = useContext(adminContext);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [actualImage, setActualImage] = useState(null);

  useEffect(() => {
    setActualImage(casinoToEdit.casinoImage);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      setPreviewImageUrl(fileContent);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    // LANZAR TOAST
  };

  const deleteActualImage = (e) => {
    e.preventDefault();
    // LANZAR TOAST
    setActualImage(null);
  };

  // 1 rojo, 2 azul, 3 verde, 4 amarillo

  const deletePreviewImage = () => setPreviewImageUrl(null);

  return (
    <StyledWrapper className="p-2 py-lg-0">
      <StyledForm
        className={`p-2 p-lg-4 gap-2 ${
          actualImage !== null
            ? "col-lg-8 bor1" // PRINCIPAL - TIENE IMG
            : previewImageUrl !== null
            ? "col-lg-8 bor2" // VIENDO PREVIEW
            : "col-lg-4 bor3" // VIENDO NADA
        }`}
      >
        <h3 className="pReset">Editar Casino</h3>
        <div className="d-flex flex-column flex-lg-row">
          <div
            className={`
          col-12  d-flex flex-column justify-content-center p-3 gap-3 ${
            actualImage !== null
              ? "col-lg-6 bor1" // PRINCIPAL - TIENE IMG
              : previewImageUrl !== null
              ? "col-lg-6 bor2" // VIENDO PREVIEW
              : "col-lg-12 bor3" // VIENDO NADA
          }`}
          >
            <StyledInput>
              <label htmlFor="name">Nombre</label>
              <input
                type="text"
                name="name"
                defaultValue={casinoToEdit.casinoName}
              />
            </StyledInput>
            <StyledInput>
              <label htmlFor="link">Link</label>
              <input type="text" name="link" defaultValue={casinoToEdit.link} />
            </StyledInput>
            {previewImageUrl == null && actualImage == null && (
              <StyledInput>
                <label htmlFor="image">Imagén</label>
                <input name="image" type="file" onChange={handleFileUpload} />
              </StyledInput>
            )}
          </div>
          <div className="col-12 col-lg-6 p-3">
            {actualImage !== null ? (
              <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                <p className="pReset">Imagén actual</p>
                <StyledImage>
                  <img src={casinoToEdit?.casinoImage?.url} />
                </StyledImage>
                <MainButton fn={deleteActualImage}>Eliminar</MainButton>
              </div>
            ) : (
              <>
                {previewImageUrl !== null && (
                  <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                    <StyledImage>
                      <img src={previewImageUrl} />
                    </StyledImage>
                    <MainButton fn={deletePreviewImage}>Eliminar</MainButton>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        <div className="col-12 d-flex justify-content-center">
          <MainButton primary={true} type={"submit"}>
            Guardar
          </MainButton>
        </div>
      </StyledForm>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  /* border: 5px solid violet; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  color: #fff;
  border: 5px solid orange;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-radius: 0.6rem;
  border: 1px solid gold;
  transition: all 0.5s;
`;

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  input {
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
  }
`;

const StyledImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
