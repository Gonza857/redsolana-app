import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import {
  adminContext,
  cronoAndNewsContext,
} from "../../../storage/AdminContext";
import { IoRadioButtonOn } from "react-icons/io5";
import { MainButton } from "../../../components/APublic/MainButton/MainButton";
import {
  AiFillEdit,
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

const iconStyle = { fontSize: "1.5rem" };

export const VistaAdmin = () => {
  const { sorteoActivo, isDrawLoading } = useContext(adminContext);
  const { newsImage, scheduleImage } = useContext(cronoAndNewsContext);

  return (
    <StyledView className="gap-3 gap-lg-2 gap-xl-3 col-12 py-4 py-md-3">
      <Animated
        animationIn="fadeIn"
        animationOut="fedeOut"
        isVisible={true}
        animationInDelay={400}
        className=" col-10 col-sm-6 col-md-9 col-lg-10 col-xl-7"
      >
        <StyledAdminOption className="d-flex flex-column flex-md-row gap-3 p-3  align-items-center">
          <h3>Cajeros</h3>
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
        </StyledAdminOption>
      </Animated>
      <Animated
        animationIn="fadeIn"
        animationOut="fedeOut"
        isVisible={true}
        animationInDelay={200}
        className="col-10 col-sm-6 col-md-9 col-lg-10 col-xl-7"
      >
        <StyledAdminOption className="d-flex flex-column flex-md-row gap-3 p-3  align-items-center">
          <h3>Casinos</h3>
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
        </StyledAdminOption>
      </Animated>
      <Animated
        animationIn="fadeIn"
        animationOut="fedeOut"
        isVisible={true}
        animationInDelay={100}
        className=" col-10 col-sm-6 col-md-9 col-lg-10 col-xl-7"
      >
        <StyledAdminOption
          className={`d-flex flex-column flex-md-row gap-3 p-3  align-items-center ${
            isDrawLoading ? "justify-content-center" : ""
          }`}
        >
          {isDrawLoading ? (
            <>
              <Ring size={40} lineWeight={5} speed={2} color="#d4af37" />
            </>
          ) : (
            <>
              <div className={`d-flex align-items-center gap-3`}>
                <h3 className="m-0 p-0">Sorteo</h3>
                <p className="m-0 p-0">
                  <IoRadioButtonOn
                    style={{ color: sorteoActivo ? "green" : "red" }}
                  />
                </p>
              </div>
              <div className="gap-2">
                {sorteoActivo ? (
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
            </>
          )}
        </StyledAdminOption>
      </Animated>
      <Animated
        animationIn="fadeIn"
        animationOut="fedeOut"
        isVisible={true}
        animationInDelay={50}
        className="col-10 col-sm-6 col-md-9 col-lg-10 col-xl-7"
      >
        <StyledAdminOption className="d-flex flex-column flex-md-row gap-3 p-3  align-items-center">
          <h3>Cronograma</h3>
          <div className="gap-2">
            <Link to="/admin/cronograma/editar">
              <MainButton fn={() => window.scrollTo(0, 0)}>
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
      </Animated>
      <Animated
        animationIn="fadeIn"
        animationOut="fedeOut"
        isVisible={true}
        animationInDelay={50}
        className="col-10 col-sm-6 col-md-9 col-lg-10 col-xl-7"
      >
        <StyledAdminOption className="d-flex flex-column flex-md-row gap-3 p-3  align-items-center">
          <h3>Solicitudes</h3>
          <div className="gap-2">
            <Link to="/admin/solicitudes/plataformas">
              <MainButton fn={() => window.scrollTo(0, 0)}>
                <p className="m-0 d-none d-lg-block">Plataformas</p>
                <AiOutlineOrderedList style={iconStyle} />
              </MainButton>
            </Link>
            <Link to="/admin/solicitudes">
              <MainButton fn={() => window.scrollTo(0, 0)}>
                <p className="m-0 d-none d-lg-block">Pendientes</p>
                <AiOutlineEye style={iconStyle} />
              </MainButton>
            </Link>
            <Link to="/admin/solicitudes/historial">
              <MainButton fn={() => window.scrollTo(0, 0)}>
                <p className="m-0 d-none d-lg-block">Historial</p>
                <AiOutlineHistory style={iconStyle} />
              </MainButton>
            </Link>
          </div>
        </StyledAdminOption>
      </Animated>
      <Animated
        animationIn="fadeIn"
        animationOut="fedeOut"
        isVisible={true}
        animationInDelay={50}
        className="col-10 col-sm-6 col-md-9 col-lg-10 col-xl-7"
      >
        <StyledAdminOption className="d-flex flex-column flex-md-row gap-3 p-3  align-items-center">
          <h3>Novedades</h3>
          <div className="gap-2">
            <Link to="/admin/novedades">
              <MainButton fn={() => window.scrollTo(0, 0)}>
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
      </Animated>
    </StyledView>
  );
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
    height: 100px;
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

const StyledButton = styled.button`
  background-color: #d4af37;
  color: #000;
  outline: none;
  border: none;
  border-radius: 0.5rem;
  padding: 8px 15px;
  font-weight: 600;
`;
