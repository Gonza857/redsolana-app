import React, { useContext } from "react";
import styled from "styled-components";
import { cronoAndNewsContext } from "../../../storage/AdminContext";
import { LoadingModal } from "../../../components/OK-Components/LoadingModal/LoadingModal";
import { MainButton } from "../../../components/APublic/MainButton/MainButton";
import Swal from "sweetalert2";

export const Novedades = () => {
  const {
    handleNovedadImg,
    isLoadingSchedule,
    setPreviewImage,
    previewImage,
    handleFileUpload,
    newsImage,
    deleteNovedad,
  } = useContext(cronoAndNewsContext);

  const handleDelete = () => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar la imagén actual??",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3745d4",
      cancelButtonColor: "#d4af37",
      confirmButtonText: "Eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteNovedad();
      }
    });
  };

  return (
    <div className="col-12 d-flex justify-content-center">
      <MainContainer className="col-12 col-md-8 d-flex gap-lg-2 flex-column align-items-center px-3 pt-2 pt-lg-3 pb-4">
        <LoadingModal show={isLoadingSchedule} />
        {/* SI TENGO IMAGEN, MUESTRO LA QUE TENGO Y LOS BOTONES PARA EDITARLA */}
        {newsImage !== null ? (
          <>
            <h3 className="text-white">Imagén actual</h3>
            <StyledImageContainer className="col-12 col-sm-11 col-md-10 col-lg-5">
              <img src={newsImage} alt="Imagen de la novedad" />
            </StyledImageContainer>
            <div>
              <MainButton fn={() => handleDelete()}>Eliminar</MainButton>
            </div>
          </>
        ) : (
          <>
            {previewImage != null ? (
              <>
                <div className="d-flex flex-column align-items-center col-8 h-100 py-2">
                  <h3 className="text-white">Vista previa</h3>
                  <PreviewImage className="mb-3">
                    <img
                      src={previewImage}
                      alt="Preview de la imagén de la novedad"
                    />
                  </PreviewImage>
                  <ButtonsContainer className="d-flex gap-2 justify-content-center align-items-center py-1">
                    <MainButton
                      fn={() => handleNovedadImg()}
                      primary={true}
                      type={"button"}
                    >
                      Guardar
                    </MainButton>
                    <MainButton
                      fn={() => setPreviewImage(null)}
                      type={"button"}
                    >
                      Eliminar
                    </MainButton>
                  </ButtonsContainer>
                </div>
              </>
            ) : (
              <>
                {/* SI NO TENGO MUESTRO EL FORMULARIO PARA AGREGAR */}
                <h3 className="text-white p-0 m-0">Selecciona una imagén</h3>
                <form className="col-12 col-md-auto d-flex flex-column text-white">
                  <label htmlFor="news_image">Imagén</label>
                  <input
                    type="file"
                    name="news_image"
                    onChange={handleFileUpload}
                  />
                </form>
              </>
            )}
          </>
        )}
      </MainContainer>
    </div>
  );
};

const StyledImageContainer = styled.div`
  img {
    width: 100%;
    height: 100%;
  }
`;

const MainContainer = styled.div`
  min-height: calc(100vh - 70px);
  @media screen and (min-width: 768px) {
    background-color: rgb(22, 25, 30);
    box-shadow: 0px 0px 25px 6px rgba(255, 255, 255, 0.34);
  }
`;

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
