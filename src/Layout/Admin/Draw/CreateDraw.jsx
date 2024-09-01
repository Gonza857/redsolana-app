import React, { forwardRef, useContext, useState } from "react";
import styled from "styled-components";
import Swal from "sweetalert2";
import { DrawNumbersTable } from "./DrawNumbersTable";
import { DrawPreview } from "./DrawPreview";
import { useNavigate } from "react-router-dom";
import { adminContext } from "../../../storage/AdminContext";
import { get } from "react-hook-form";
import { toastError } from "../../../helpers/helpers";
import { useEffect } from "react";
import { MainButton } from "../../../components/UI/MainButton";
import Draw from "../../../classes/Draw";

const getInputData = (e) => {
  let { slots, description } = e.target;
  slots = slots.value;
  description = description.value;
  return {
    slots,
    description,
  };
};

const uploadFile = (e) => {
  const file = e.target.files[0];
  const reader = new FileReader();
  let fileContent;
  reader.onload = (event) => {
    fileContent = event.target.result;
  };
  reader.readAsDataURL(file);
  return fileContent;
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

    // let file = uploadFile(e);
    // setPreviewImage(fileContent);
  };

  const handlePreview = (e) => {
    const data = getInputData(e);
    data.slots = Number(data.slots);
    const numeros = new Array(data.slots).fill(false);
    setPreviewSlots(numeros);
    setPreviewDescription(data.description);
    let newSorteo = {
      _slots: numeros,
      _description: data.description,
      _image: previewImage,
      _isActive: true,
    };
    let a = new Draw(newSorteo);
    setPreviewDraw(a);
  };

  return (
    <StyledContainer className="col-12 py-2 py-md-0">
      <StyledFormContainer className="d-flex flex-column col-11 mx-auto col-sm-8 col-md-6 col-lg-4 rounded">
        <h3>Crear sorteo</h3>
        <form className="gap-3 d-flex flex-col" onSubmit={handleSubmit}>
          <div className="d-flex flex-col">
            <MainInput
              size={2}
              name="slots"
              placeholder={"Números disponibles para el sorteo"}
              type="number"
            />
          </div>
          <div className="d-flex flex-column gap-2">
            <StyledTextArea
              name="description"
              placeholder="Introduce una descripción"
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
                    <MainButton onClick={() => setPreviewImage(null)}>
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

const MainInput = forwardRef(({ size, ...args }, ref) => {
  let width = "";
  switch (size) {
    case 1:
      width = " col-4 ";
      break;
    case 2:
      width = " col-12 ";
      break;
    default:
      width = " col-8 ";
  }

  return <InputDefaultStyle {...args} className={`${width}`} ref={ref} />;
});

const InputDefaultStyle = styled.input`
  height: 50px;
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  &:focus {
    background-color: #d4af37;
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #00000077;
  }
  &::-webkit-input-placeholder {
    color: #00000077;
  }
  &::-moz-placeholder {
    color: #00000077;
  }
  &:-ms-input-placeholder {
    color: #00000077;
  }
  &:-moz-placeholder {
    color: #00000077;
  }
`;

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
  min-height: 250px;
  margin: 0;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s;
  &:focus {
    background-color: #d4af37;
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #00000077;
  }
  &::-webkit-input-placeholder {
    color: #00000077;
  }
  &::-moz-placeholder {
    color: #00000077;
  }
  &:-ms-input-placeholder {
    color: #00000077;
  }
  &:-moz-placeholder {
    color: #00000077;
  }
`;
