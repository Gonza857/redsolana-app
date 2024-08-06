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

export const ViewSolicitudes = () => {
  const { pendientes, isLoading, actualizarEstadoSolicitud, getSolicitudes } =
    useContext(solicitudesContext);

  useEffect(() => {
    getSolicitudes();
  }, []);

  return (
    <div className="d-flex flex-column gap-2 col-lg-10 mx-auto">
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
            getSolicitudes();
          }}
        >
          Actualizar
          <AiOutlineReload />
        </MainButton>
      </div>
      <div>
        <TablaPendientes
          isLoading={isLoading}
          noResueltas={pendientes}
          actualizarEstadoSolicitud={actualizarEstadoSolicitud}
        />
      </div>
    </div>
  );
};
