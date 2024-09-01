import React, { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import { TablaPendientes } from "../../../components/AAdmin/Solicitudes/TablaPendientes";
import { solicitudesContext } from "../../../storage/AdminContext";
import { Subtitles } from "../../../components/Comprobados/Subtitles";
import {
  AiOutlineEdit,
  AiOutlineHistory,
  AiOutlineReload,
} from "react-icons/ai";
import { MainButton } from "../../../components/UI/MainButton";

export const Requests = () => {
  const {
    pendientes,

    c_getRequests,
  } = useContext(solicitudesContext);

  return (
    <div className="d-flex flex-column gap-2 col-12 col-sm-11 col-xl-10 mx-auto">
      <div className="align-self-center pt-2">
        <Subtitles>Pendientes</Subtitles>
      </div>
      <div className="d-flex flex-column flex-sm-row gap-2 col-12 align-items-center">
        <Link to="/admin/solicitudes/plataformas">
          <MainButton primary={true}>
            Editar plataformas
            <AiOutlineEdit />
          </MainButton>
        </Link>
        <Link to={"/admin/solicitudes/historial"}>
          <MainButton>
            Ver historial
            <AiOutlineHistory />
          </MainButton>
        </Link>
        <MainButton
          primary={true}
          onClick={() => {
            c_getRequests();
          }}
        >
          Actualizar
          <AiOutlineReload />
        </MainButton>
      </div>
      <div className="col-12 mx-auto">
        {/* <RequestManager pendientes={pendientes} isLoading={isLoading} /> */}
        <TablaPendientes pendientes={pendientes} />
        {/* {isLoading && requests.length == 0 ? (
          <Subtitles>Cargando solicitudes pendientes...</Subtitles>
        ) : (
          <>{!isLoading && <TablaPendientes pendientes={pendientes} />}</>
        )} */}
        {/* {isLoading ? (
          <></>
        ) : (
          <>
            {requests.length > 0 && !isLoading ? (
              
            ) : (
              <>
                <Subtitles>No hay pendientes.</Subtitles>
              </>
            )}
          </>
        )} */}
      </div>
    </div>
  );
};

const RequestManager = ({ pendientes, isLoading }) => {
  if (isLoading && pendientes) return <Subtitles>Cargando pa...</Subtitles>;
  if (!isLoading && pendientes !== null)
    return <TablaPendientes pendientes={pendientes} />;
  if (pendientes.length === 0 && pendientes)
    return <Subtitles>No hay solicitudes</Subtitles>;
  return <Subtitles>Hay algo</Subtitles>;
};
