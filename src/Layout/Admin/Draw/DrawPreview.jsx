import React, { useEffect, useContext } from "react";
import { DrawNumbersTable } from "./DrawNumbersTable";
import styled from "styled-components";
import { adminContext } from "../../../storage/AdminContext";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../../../helpers/helpers";
import { postSorteoImage } from "../../../firebase/storage/sorteo";
import { updateDraw } from "../../../firebase/database/sorteo";
import { MainButton } from "../../../components/UI/MainButton";

export const DrawPreview = () => {
  const {
    previewDraw,
    setSorteoActivo,
    setDraw,
    c_postDrawImg,
    c_updateDraw,
    setIsLoading,
    draw,
  } = useContext(adminContext);
  const navigate = useNavigate();

  const handleUploadDraw = async () => {
    setSorteoActivo(false); // ?
    setIsLoading(true);
    let result = await c_postDrawImg(previewDraw.image);
    let { url, randomId } = result;
    let copyOfDraw = { ...previewDraw };
    copyOfDraw._image = { url, randomId };
    c_updateDraw(copyOfDraw).then((r) => {
      setIsLoading(false);
      window.scrollTo(0, 0);
      navigate("/admin");
      toastSuccess("Sorteo creado correctamente");
    });
  };

  if (previewDraw == null) {
    navigate("/admin");
  } else {
    return (
      <>
        {draw !== null ? (
          <>
            <Container>
              <h3 className="text-center">Preview</h3>
              <CardContainer className="col-12">
                <CardWrapper className="mx-auto d-flex">
                  <StyledPreviewImage className="col-6 p-3">
                    <img src={previewDraw?.image} />
                  </StyledPreviewImage>
                  <StyledCardText className="col-6 p-2 px-lg-3">
                    <p>Descripción:</p>
                    <pre>{previewDraw?.description}</pre>
                  </StyledCardText>
                </CardWrapper>
              </CardContainer>
              <div className="mx-auto">
                <h3 className="text-center m-0 p-0 py-3">
                  Tabla de números disponibles
                </h3>
                <DrawNumbersTable slots={previewDraw?.slots} preview={true} />
              </div>
              {/* <div className="col-11 col-xl-8 m-auto">
          <StyledPreviewCard className="d-flex flex-column flex-md-row col-12 bor3">
            <StyledPreviewImage className="col-12 col-md-6">
              <img src={previewDraw?.image} />
            </StyledPreviewImage>
            <div className="col-8 col-md-6 p-2">
              <p>Cupos totales: {previewDraw?.slots?.length}</p>
              <div>
                <pre>{previewDraw?.description}</pre>
              </div>
            </div>
          </StyledPreviewCard>
          <div className="col-10 m-auto">
            <h3 className="text-center m-0 p-0 py-3">
              Tabla de números disponibles
            </h3>
            <DrawNumbersTable slots={previewDraw?.slots} preview={true} />
          </div>
        </div> */}
              <div className="col-12 py-3 d-flex flex-column gap-4 align-items-center justify-content-center flex-md-row gap-md-4">
                <MainButton
                  onClick={() => {
                    setSorteoActivo(false);
                    navigate(-1);
                  }}
                >
                  Editar
                </MainButton>
                <MainButton onClick={handleUploadDraw} primary={true}>
                  Confirmar cambios y crear
                </MainButton>
                <MainButton onClick={handleUploadDraw} primary={true}>
                  Crear vacio
                </MainButton>
              </div>
            </Container>
          </>
        ) : (
          <>
            <h1>Cargando PA!</h1>
          </>
        )}
      </>
    );
  }
};

const MyToast = () => {
  return <StyledToast>Hello world!</StyledToast>;
};

const StyledToast = styled.div`
  position: absolute;
  width: 200px;
  height: 200px;
  border: 3px solid red;
`;

const Container = ({ children }) => {
  return (
    <StyledContainer className="col-8 mx-auto text-white py-3 gap-3 d-flex flex-column justify-content-evenly bor3">
      {children}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: #212121;
`;

const StyledPreviewImage = styled.div`
  background-color: red;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const StyledPreviewCard = styled.div`
  background: radial-gradient(circle, #3d3d3d 0%, rgba(0, 0, 0, 1) 100%);
  border-radius: 0.7rem;
  overflow: hidden;
`;

const CardContainer = styled.div`
  /* background: radial-gradient(circle, #3d3d3d 0%, rgba(0, 0, 0, 1) 100%); */
  height: fit-content;
`;

const CardWrapper = styled.div`
  /* border: 1px solid gold; */
`;

const StyledCardText = styled.div`
  background-color: red;
  overflow: hidden;
  border-left: 1px solid #cecece7b;
  pre {
    width: 100%;
    height: 100%;
    white-space: pre-wrap;
  }
`;
