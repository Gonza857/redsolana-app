import React, { useEffect, useContext } from "react";
import { DrawNumbersTable } from "../../../components/DrawNumbersTable/DrawNumbersTable";
import styled from "styled-components";
import { adminContext } from "../../../storage/AdminContext";
import { useNavigate } from "react-router-dom";
import { toastSuccess } from "../../../helpers/helpers";
import { postSorteoImage } from "../../../firebase/storage/sorteo";
import { updateDraw } from "../../../firebase/database/sorteo";
import { MainButton } from "../../../components/UI/MainButton";

export const VistaPreviaSorteo = () => {
  const { previewDraw, setSorteoActivo, setSorteo } = useContext(adminContext);
  const navigate = useNavigate();
  return (
    <div className="col-12 text-white py-3 d-flex flex-column justify-content-evenly">
      <h3 className="text-center">¡Participa del sorteo!</h3>
      <CardContainer className="col-12">
        <CardWrapper className="col-11 col-md-6 mx-auto d-flex flex-column flex-md-row">
          <StyledPreviewImage className="col-12 col-md-6">
            <img src={previewDraw?.image} />
          </StyledPreviewImage>
          <StyledCardText className="col-12 col-md-6 p-2 px-lg-3">
            <pre>{previewDraw?.description}</pre>
          </StyledCardText>
        </CardWrapper>
      </CardContainer>
      <div className="col-lg-8 mx-auto">
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
        <MainButton
          onClick={() => {
            setSorteoActivo(false);
            postSorteoImage(previewDraw.image).then((result) => {
              let { url, randomId } = result;
              let copyOfDraw = { ...previewDraw };
              copyOfDraw.image = { url, randomId };
              updateDraw(copyOfDraw).then(() => {
                setSorteo();
                window.scrollTo(0, 0);
                navigate("/admin");
                toastSuccess("Sorteo creado correctamente");
              });
              //   .catch((error) => {
              //     toastError(error.message);
              //   });
            });
            //   .catch((error) => {
            //     toastError(error.message);
            //   });
          }}
          primary={true}
        >
          Confirmar cambios y crear
        </MainButton>
      </div>
    </div>
  );
};

const StyledPreviewImage = styled.div`
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
  background: radial-gradient(circle, #3d3d3d 0%, rgba(0, 0, 0, 1) 100%);
  height: fit-content;
`;

const CardWrapper = styled.div`
  border: 1px solid gold;
`;

const StyledCardText = styled.div`
  overflow: hidden;
  pre {
    width: 100%;
    height: 100%;
    white-space: pre-wrap;
  }
`;
