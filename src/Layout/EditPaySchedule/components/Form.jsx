import React from "react";
import {
  deleteScheduleImage,
  postScheduleImage,
} from "../../../firebase/firebase";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import { useState } from "react";
import { MainButton } from "../../../components/MainButton/MainButton";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { Ring } from "@uiball/loaders";
import { LoadingModal } from "../../../components/OK-Components/LoadingModal/LoadingModal";
import { useContext } from "react";
import { adminContext } from "../../../storage/AdminContext";

export const Form = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const { handlePayScheduleImage, isLoadingSchedule, setIsLoadingSchedule } =
    useContext(adminContext);
  const [show, setShow] = useState(isLoadingSchedule);
  const navigate = useNavigate();

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

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (wantsToDelete) {
    //   //  ELIMINAR LA ANTERIOR
    //   // SUBIR
    //   // ACTUALIZAR OBJETO EN FIRESTORE
    // }

    console.log(previewImage);

    // if (previewImage !== null) {
    //   postScheduleImage(previewImage).then((result) => {
    //     console.log(result);
    //     toastSuccess("¡Imagén actualizada correctamente!");
    //   });
    // }
  };

  const handleAction = (previewImage) => {
    handlePayScheduleImage(previewImage);
  };

  const handleClose = () => setShow(false);

  return (
    <MainContainer className="col-8 d-flex flex-column align-items-center px-3 pt-2 pb-4">
      <LoadingModal handleClose={handleClose} show={isLoadingSchedule} />
      <h3 className="text-white">Selecciona una imagén</h3>
      {previewImage == null ? (
        <FormContainer
          className="col-4 d-flex flex-column"
          onSubmit={handleSubmit}
        >
          <label htmlFor="schedule_image">Imagén</label>
          <input
            type="file"
            name="schedule_image"
            onChange={handleFileUpload}
          />
        </FormContainer>
      ) : (
        <>
          <div className="d-flex flex-column align-items-center col-8 h-100  py-2">
            <PreviewImageContainer className="">
              <img src={previewImage} />
            </PreviewImageContainer>
            <ButtonsContainer className="d-flex gap-2 justify-content-center align-items-center py-1">
              <MainButton
                fn={() => handleAction(previewImage)}
                primary={true}
                type={"button"}
              >
                Guardar nueva
              </MainButton>
              <MainButton fn={() => setPreviewImage(null)} type={"button"}>
                Eliminar
              </MainButton>
            </ButtonsContainer>
          </div>
        </>
      )}
    </MainContainer>
  );
};

const MainContainer = styled.div`
  height: calc(100vh - 70px);
  background-color: rgb(22, 25, 30);
  box-shadow: 0px 0px 25px 6px rgba(255, 255, 255, 0.34);
`;

const FormContainer = styled.form``;

const ButtonsContainer = styled.div`
  height: 15%;
`;

const PreviewImageContainer = styled.div`
  height: 85%;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    height: 100%;
    object-fit: contain;
  }
`;
