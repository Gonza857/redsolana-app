import React from "react";
import { useState } from "react";
import styled from "styled-components";
import { MainButton } from "../../../components/MainButton/MainButton";
import {
  getScheduleImage,
  postScheduleImage,
} from "../../../firebase/firebase";
import { toastSuccess } from "../../../helpers/helpers";
import { useEffect } from "react";

export const EditPaySchedule = () => {
  const [previewImage, setPreviewImage] = useState(null);
  const [firebaseImage, setFirebaseImage] = useState(null);
  const [wantsToDelete, setWantsToDelete] = useState(false);

  useEffect(() => {
    getScheduleImage().then((result) => {
      setFirebaseImage(result);
    });
  }, []);

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
    if (wantsToDelete) {
      //  ELIMINAR LA ANTERIOR
      // SUBIR
      // ACTUALIZAR OBJETO EN FIRESTORE
    }
    if (previewImage !== null) {
      postScheduleImage(previewImage).then((result) => {
        toastSuccess("¡Imagén actualizada correctamente!");
      });
    }
  };

  return (
    <StyledContainer className="bor2 d-flex justify-content-center align-items-center">
      {firebaseImage !== null ? (
        <div className="d-flex flex-column align-items-center gap-2">
          <p className="p_subtitle">Imagén actual</p>
          <PreviewImage>
            <img src={firebaseImage?.url} alt={firebaseImage?.id} />
          </PreviewImage>
          <MainButton fn={() => wantsToDelete(true)} type={"button"}>
            Eliminar
          </MainButton>
        </div>
      ) : (
        <>
          <form className="bor1 d-flex flex-column" onSubmit={handleSubmit}>
            {previewImage == null ? (
              <>
                <label htmlFor="schedule_image">Imagén</label>
                <input
                  type="file"
                  name="schedule_image"
                  onChange={handleFileUpload}
                />
              </>
            ) : (
              <>
                <PreviewImage className="bor2">
                  <img src={previewImage} />
                </PreviewImage>
                <div className="bor4 d-flex gap-2 justify-content-center py-1">
                  <MainButton primary={true} type={"submit"}>
                    Guardar
                  </MainButton>
                  <MainButton fn={() => setPreviewImage(null)} type={"button"}>
                    Eliminar
                  </MainButton>
                </div>
              </>
            )}
          </form>
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  width: 100%;
  form {
    color: #fff;
  }
`;

const PreviewImage = styled.div`
  img {
    width: 100%;
    object-fit: contain;
  }
`;
