import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { adminContext } from "../../../../storage/AdminContext";
import { MainButton } from "../../../../components/MainButton/MainButton";
import { Link, useNavigate } from "react-router-dom";

export const AdminDrawView = () => {
  const [ocupados, setOcupados] = useState(0);
  const { sorteoInfo, deleteDraw, getSorteoAgain, sorteoActivo } =
    useContext(adminContext);
  const navigate = useNavigate();
  useEffect(() => {
    if (sorteoActivo) {
      if (sorteoInfo !== null) {
        let slotsOcupados = 0;
        for (let i = 0; i < sorteoInfo.slots.length; i++) {
          if (sorteoInfo.slots[i]) {
            slotsOcupados++;
          }
        }
        slotsOcupados = sorteoInfo.slots.length - slotsOcupados;
        setOcupados(slotsOcupados);
      }
    }
  }, [sorteoInfo]);

  const handleDeleteDraw = () => {
    deleteDraw();
    getSorteoAgain();
    navigate("/admin");
  };

  return (
    <>
      {sorteoActivo ? (
        <>
          <StyledEditDrawView className="text-white py-2 py-xl-3">
            <h3>Información del sorteo</h3>
            <StyledDrawCard className="col-12 d-flex flex-column flex-wrap align-items-center flex-md-row justify-content-md-center align-items-md-stretch mx-auto">
              <StyledImg className="col-12 col-sm-10 col-md-6 col-xl-4 d-flex align-items-center justify-content-center">
                <img src={sorteoInfo?.image?.url} alt="Draw Image" />
              </StyledImg>
              <StyledTextContainer className="col-12 col-sm-10 col-md-6 col-lg-4 p-2 p-md-3 px-xl-4">
                <div>
                  <p className="d-flex gap-2">
                    Disponibilidad:
                    <strong>
                      {ocupados + "/" + sorteoInfo?.slots?.length}
                    </strong>
                  </p>
                </div>
                <StyledDescription className="col-12 d-flex flex-wrap gap-2">
                  <p className="m-0">Descripcion:</p>
                  <pre>{sorteoInfo?.description}</pre>
                </StyledDescription>
              </StyledTextContainer>
              <ButtonCointainer className="d-flex col-12 justify-content-evenly mt-md-4 mt-lg-0 pb-2 pt-xl-3 align-items-center">
                <Link to="/admin/sorteo/editar">
                  <MainButton primary={true}>Editar</MainButton>
                </Link>
                <MainButton fn={handleDeleteDraw}>Eliminar</MainButton>
              </ButtonCointainer>
            </StyledDrawCard>
          </StyledEditDrawView>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

const StyledEditDrawView = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledDrawCard = styled.div`
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  height: fit-content;
  min-height: 220px;
  overflow: hidden;
  @media screen and (min-width: 768px) {
    max-height: 500px;
  }
`;

const StyledImg = styled.div`
  overflow: hidden;
  height: fit-content;
  @media screen and (min-width: 768px) {
    height: 80%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const StyledTextContainer = styled.div`
  color: #fff;
  height: fit-content;
  @media screen and (min-width: 768px) {
    height: 80%;
  }
`;

const StyledDescription = styled.div`
  color: #fff;

  pre {
    overflow: hidden;
    white-space: pre-wrap;
  }
`;

const ButtonCointainer = styled.div`
  height: fit-content;
  @media screen and (min-width: 768px) {
    height: 20%;
  }
`;
