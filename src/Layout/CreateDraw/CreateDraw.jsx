import React, { useContext, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { DrawNumbersTable } from "../../components/DrawNumbersTable/DrawNumbersTable";
import { DrawPreview } from "../DrawPreview/DrawPreview";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../../storage/AdminContext";
import { MainButton } from "../../components/MainButton/MainButton";
import { get } from "react-hook-form";
import { toastError } from "../../helpers/helpers";
import { useEffect } from "react";

const getInputData = (e) => {
  let { slots, description } = e.target;
  slots = slots.value;
  description = description.value;
  return {
    slots,
    description,
  };
};

export const CreateDraw = () => {
  const [wantPreview, setWantPreview] = useState(false);
  const navigate = useNavigate();
  const {
    setPreviewDraw,
    previewDraw,
    setPreviewImage,
    previewImage,
    setPreviewSlots,
    setPreviewDescription,
    setSorteoActivo,
  } = useContext(adminContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (getInputData(e).description == "" || getInputData(e).slots == 0) {
      toastError("Llena los campos");
    } else {
      if (previewImage == null) {
        toastError("Agrega una imagén");
      } else {
        Swal.fire({
          title: "¿Quieres previsualizar el diseño antes de crear el sorteo?",
          showDenyButton: true,
          confirmButtonText: "Si",
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            setWantPreview(true);
            handlePreview(e);
            setSorteoActivo(true);
            navigate("/admin/sorteo/preview");
          } else if (result.isDenied) {
            setWantPreview(false);
          }
        });
      }
    }
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

  const handlePreview = (e) => {
    const data = getInputData(e);
    data.slots = Number(data.slots);
    const numeros = new Array(data.slots).fill(false);
    const participants = new Array(data.slots).fill(null);
    setPreviewSlots(numeros);
    setPreviewDescription(data.description);
    let newSorteo = {
      slots: numeros,
      description: data.description,
      image: previewImage,
      isActive: true,
      participants,
    };
    setPreviewDraw(newSorteo);
  };

  return (
    <StyledContainer className="col-12 py-2 py-md-0">
      <StyledFormContainer className="d-flex flex-column col-11 mx-auto col-sm-8 col-md-6 col-lg-4">
        <h3>Crear sorteo</h3>
        <form className="gap-3" onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="slots">Numeros disponibles</label>
            <StyledInput
              type="number"
              name="slots"
              defaultValue={previewDraw?.slots?.length}
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="description">Descripción del sorteo</label>
            <StyledTextArea
              name="description"
              defaultValue={previewDraw?.description}
            />
          </div>
          <div className="col-12 d-flex flex-column justify-content-center align-items-center gap-2 justify-content-md-evenly align-items-md-center py-1 -py-md-2">
            {previewImage !== null ? (
              <>
                <div>
                  <p className="pReset">Imagén cargada</p>
                </div>
                <div className="d-flex flex-column align-items-center gap-2 gap-md-0 flex-md-row justify-content-md-evenly">
                  <img
                    className="col-12 col-md-6"
                    src={previewImage}
                    style={{ objectFit: "contain" }}
                  />
                  <div className="col-md-6 w-auto">
                    <MainButton fn={() => setPreviewImage(null)}>
                      Eliminar
                    </MainButton>
                  </div>
                </div>
              </>
            ) : (
              <>
                <label htmlFor="image">Imagén del sorteo</label>
                <input
                  className="col-12"
                  type="file"
                  name="image"
                  onChange={handleFileUpload}
                />
              </>
            )}
          </div>
          <div className="m-auto">
            <MainButton primary={true} type="submit">
              Crear Sorteo
            </MainButton>
          </div>
        </form>
      </StyledFormContainer>
    </StyledContainer>
  );
};

const StyledFormContainer = styled.div`
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  padding: 20px;
  border: 1px solid gold;
  form {
    display: flex;
    flex-direction: column;
  }
`;

const StyledContainer = styled.div`
  color: #fff;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
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

const StyledTextArea = styled.textarea`
  width: 100%;
  height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
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
