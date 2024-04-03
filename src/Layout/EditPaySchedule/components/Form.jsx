import React, { useState, useContext } from "react";
import { MainButton } from "../../../components/APublic/MainButton/MainButton";
import styled from "styled-components";
import { LoadingModal } from "../../../components/OK-Components/LoadingModal/LoadingModal";
import { adminContext } from "../../../storage/AdminContext";

export const Form = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const { handlePayScheduleImage, isLoadingSchedule } =
    useContext(adminContext);

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

  const handleAction = (previewImage) => {
    handlePayScheduleImage(previewImage);
  };

  return (
    <MainContainer className="col-12 col-md-8 d-flex flex-column align-items-center px-3 pt-2 pb-4">
      <LoadingModal show={isLoadingSchedule} />
      <h3 className="text-white">Selecciona una imagén</h3>
      {previewImage == null ? (
        <FormContainer className="col-12 col-md-auto d-flex flex-column pt-4">
          <label htmlFor="schedule_image">Imagén</label>
          <input
            type="file"
            name="schedule_image"
            onChange={handleFileUpload}
          />
        </FormContainer>
      ) : (
        <div className="d-flex flex-column align-items-center col-8 h-100 py-2">
          <PreviewImage className="mb-3">
            <img src={previewImage} />
          </PreviewImage>
          <ButtonsContainer className="d-flex gap-2 justify-content-center align-items-center py-1">
            <MainButton
              fn={() => handleAction(previewImage)}
              primary={true}
              type={"button"}
            >
              Guardar
            </MainButton>
            <MainButton fn={() => setPreviewImage(null)} type={"button"}>
              Eliminar
            </MainButton>
          </ButtonsContainer>
        </div>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  min-height: calc(100vh - 70px);
  @media screen and (min-width: 768px) {
    background-color: rgb(22, 25, 30);
    box-shadow: 0px 0px 25px 6px rgba(255, 255, 255, 0.34);
  }
`;

const FormContainer = styled.form``;

const ButtonsContainer = styled.div`
  height: 15%;
`;

const PreviewImage = styled.div`
  width: 100%;
  @media screen and (min-width: 500px) {
    width: 50%;
  }
  @media screen and (min-width: 968px) {
    width: 50%;
  }
  img {
    width: 100%;
    object-fit: contain;
  }
`;
