import React, { useEffect } from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  adminContext,
  cronoAndNewsContext,
  solana,
} from "../../storage/AdminContext";
import { IoRadioButtonOn } from "react-icons/io5";
import {
  AiOutlineAppstoreAdd,
  AiOutlineEdit,
  AiOutlineEye,
  AiOutlineHistory,
  AiOutlineOrderedList,
  AiOutlinePlus,
  AiOutlineTable,
  AiOutlineUserAdd,
} from "react-icons/ai";
import { FiUsers } from "react-icons/fi";
import { Ring } from "@uiball/loaders";
import { Animated } from "react-animated-css";
import { MainButton } from "../../components/UI/MainButton";
import Firebase from "../../classes/Firebase";
import { toastError, toastSuccess } from "../../helpers/helpers";
import { Loader } from "../../components/UI/Loader";
import { updateDraw } from "../../firebase/database/sorteo";

const iconStyle = { fontSize: "1.5rem" };

export const VistaAdmin = () => {
  const { isLoading, draw } = useContext(adminContext);
  const { newsImage, scheduleImage } = useContext(cronoAndNewsContext);

  return (
    <StyledView className="gap-3 gap-lg-2 gap-xl-3 col-12 py-4 py-md-3">
      <CashiersRow delay={200} isLoading={isLoading} />
      <CasinosRow delay={300} isLoading={isLoading} />
      <DrawRow delay={400} isLoading={isLoading} />
      <RequestsRow delay={500} />
      <TimelineRow delay={600} scheduleImage={scheduleImage} />
      <NewsRow delay={700} newsImage={newsImage} />
    </StyledView>
  );
};

const DrawRow = ({ delay, isLoading }) => {
  return (
    <AnimatedContainer delay={delay}>
      <StyledAdminOption
        className={`d-flex flex-column p-3 justify-content-center ${
          isLoading && " align-items-center"
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="d-flex flex-column flex-md-row gap-3 justify-content-between align-items-center">
              <div className="d-flex flex-column">
                <div className="d-flex align-items-center gap-2">
                  <h3 className="m-0 p-0">Sorteo</h3>
                  <p className="m-0 p-0">
                    <IoRadioButtonOn
                      style={{
                        color: solana.draw.isActive ? "green" : "red",
                      }}
                    />
                  </p>
                </div>
                <div>
                  <p className="d-flex gap-2 m-0 p-0">
                    Disponibles
                    <strong>
                      {solana.draw.getAvailableSlots() +
                        "/" +
                        solana.draw.slots.length}
                    </strong>
                  </p>
                </div>
              </div>
              <div className="gap-2">
                {solana.draw.isActive ? (
                  <>
                    <Link to="/admin/sorteo/informacion">
                      <MainButton>
                        <p className="m-0 d-none d-lg-block">Ver</p>
                        <AiOutlineEye style={iconStyle} />
                      </MainButton>
                    </Link>
                    <Link to="/admin/sorteo/numeros">
                      <MainButton>
                        <p className="m-0 d-none d-lg-block">Ver números</p>
                        <AiOutlineTable style={iconStyle} />
                      </MainButton>
                    </Link>
                    <Link to="/admin/sorteo/participantes">
                      <MainButton>
                        <p className="m-0 d-none d-lg-block">
                          Ver participantes
                        </p>
                        <FiUsers style={iconStyle} />
                      </MainButton>
                    </Link>
                  </>
                ) : (
                  <>
                    <Link to="/admin/sorteo/crear">
                      <MainButton>
                        Crear sorteo
                        <AiOutlineEdit style={iconStyle} />
                      </MainButton>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </StyledAdminOption>
    </AnimatedContainer>
  );
};

const CasinosRow = ({ delay, isLoading }) => {
  return (
    <AnimatedContainer delay={delay}>
      <StyledAdminOption
        className={`d-flex flex-column flex-md-row gap-3 p-3 align-items-center ${
          isLoading && "justify-content-center"
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="d-flex flex-column">
              <h3>Casinos</h3>
              <p className="m-0 p-0">
                Configurados: <strong>{solana.casinos.length}</strong>
              </p>
            </div>
            <div className="gap-2">
              <Link to="/admin/casinos">
                <MainButton>
                  <p className="m-0 d-none d-lg-block">Ver</p>
                  <AiOutlineEye style={iconStyle} />
                </MainButton>
              </Link>
              <Link to="/admin/casinos/agregar">
                <MainButton>
                  <p className="m-0 d-none d-lg-block">Agregar</p>
                  <AiOutlineAppstoreAdd style={iconStyle} />
                </MainButton>
              </Link>
            </div>
          </>
        )}
      </StyledAdminOption>
    </AnimatedContainer>
  );
};

const CashiersRow = ({ delay, isLoading }) => {
  return (
    <AnimatedContainer delay={delay}>
      <StyledAdminOption
        className={`d-flex flex-column flex-md-row gap-3 p-3 align-items-center ${
          isLoading && "justify-content-center"
        }`}
      >
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="d-flex flex-column">
              <h3>Cajeros</h3>
              <div className="d-flex gap-2">
                <p className="m-0 p-0">
                  Conectados:{" "}
                  <strong>{solana.getCashiersQuantityByState(true)}</strong>
                </p>
                <p className="m-0 p-0">
                  Desconectados:{" "}
                  <strong>{solana.getCashiersQuantityByState(false)}</strong>
                </p>
              </div>
            </div>
            <div className="gap-2">
              <Link to="/admin/cajeros">
                <MainButton>
                  <p className="m-0 d-none d-lg-block">Ver lista</p>
                  <AiOutlineOrderedList style={iconStyle} />
                </MainButton>
              </Link>
              <Link to="/admin/cajeros/agregar">
                <MainButton>
                  <p className="m-0 d-none d-lg-block">Agregar</p>
                  <AiOutlineUserAdd style={iconStyle} />
                </MainButton>
              </Link>
            </div>
          </>
        )}
      </StyledAdminOption>
    </AnimatedContainer>
  );
};

const RequestsRow = ({ delay }) => {
  return (
    <AnimatedContainer delay={delay}>
      <StyledAdminOption className="d-flex flex-column flex-md-row gap-3 p-3  align-items-center">
        <div className="d-flex flex-column">
          <h3>Solicitudes</h3>
          <div className="d-flex gap-2">
            <p className="m-0">
              Resueltas: {solana.getNumberOfResolvedRequests()}
            </p>
            <p className="m-0">
              Pendientes: {solana.getNumberOfUnresolvedRequests()}
            </p>
          </div>
        </div>
        <div className="gap-2">
          <Link to="/admin/solicitudes/plataformas">
            <MainButton onClick={() => window.scrollTo(0, 0)}>
              <p className="m-0 d-none d-lg-block">Plataformas</p>
              <AiOutlineOrderedList style={iconStyle} />
            </MainButton>
          </Link>
          <Link to="/admin/solicitudes">
            <MainButton onClick={() => window.scrollTo(0, 0)}>
              <p className="m-0 d-none d-lg-block">Pendientes</p>
              <AiOutlineEye style={iconStyle} />
            </MainButton>
          </Link>
          <Link to="/admin/solicitudes/historial">
            <MainButton onClick={() => window.scrollTo(0, 0)}>
              <p className="m-0 d-none d-lg-block">Historial</p>
              <AiOutlineHistory style={iconStyle} />
            </MainButton>
          </Link>
        </div>
      </StyledAdminOption>
    </AnimatedContainer>
  );
};

const TimelineRow = ({ delay, scheduleImage }) => {
  return (
    <AnimatedContainer delay={delay}>
      <StyledAdminOption className="d-flex flex-column flex-md-row gap-3 p-3  align-items-center">
        <h3>Cronograma</h3>
        <div className="gap-2">
          <Link to="/admin/cronograma/editar">
            <MainButton onClick={() => window.scrollTo(0, 0)}>
              {scheduleImage != null ? (
                <>
                  <p className="m-0 d-none d-lg-block">Ver</p>
                  <AiOutlineEye style={iconStyle} />
                </>
              ) : (
                <>
                  <p className="m-0 d-none d-lg-block">Agregar</p>
                  <AiOutlinePlus style={iconStyle} />
                </>
              )}
            </MainButton>
          </Link>
        </div>
      </StyledAdminOption>
    </AnimatedContainer>
  );
};

const NewsRow = ({ delay, newsImage }) => {
  return (
    <AnimatedContainer delay={delay}>
      <StyledAdminOption className="d-flex flex-column flex-md-row gap-3 p-3  align-items-center">
        <h3>Novedades</h3>
        <div className="gap-2">
          <Link to="/admin/novedades">
            <MainButton onClick={() => window.scrollTo(0, 0)}>
              {newsImage != null ? (
                <>
                  <p className="m-0 d-none d-lg-block">Ver</p>
                  <AiOutlineEye style={iconStyle} />
                </>
              ) : (
                <>
                  <p className="m-0 d-none d-lg-block">Agregar</p>
                  <AiOutlinePlus style={iconStyle} />
                </>
              )}
            </MainButton>
          </Link>
        </div>
      </StyledAdminOption>
    </AnimatedContainer>
  );
};

const AnimatedContainer = ({ delay, children }) => {
  return (
    <Animated
      animationIn="fadeIn"
      animationOut="fedeOut"
      isVisible={true}
      animationInDelay={delay}
      className="col-10 col-sm-6 col-md-9 col-lg-10 col-xl-7"
    >
      {children}
    </Animated>
  );
};

const CasinoOption = () => {
  return <></>;
};

const StyledView = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  @media screen and (min-width: 768px) {
    justify-content: center;
  }
`;

const StyledAdminOption = styled.div`
  width: 100%;
  height: fit-content;
  background: radial-gradient(circle, #3d3d3d 0%, rgba(0, 0, 0, 1) 100%);
  border-left: 7px solid #d4af37;
  justify-content: space-between;
  box-shadow: 0px 0px 43px 4px rgba(255, 255, 255, 0.3);
  border-radius: 1rem;
  @media screen and (min-width: 768px) {
    /* height: 100px; */
  }
  p {
    svg {
      font-size: 1.5rem;
      box-shadow: 0px 0px 10px 4px rgba(21, 255, 0, 0.1);
      border-radius: 50%;
    }
  }
  h3 {
    margin: 0;
    padding: 0;
  }
  div {
    display: flex;
  }
`;
