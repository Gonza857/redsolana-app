import React, { useContext, useEffect } from "react";
import { MainButton } from "../../../components/APublic/MainButton/MainButton";
import { Link } from "react-router-dom";
import { TablaPendientes } from "../../../components/AAdmin/Solicitudes/TablaPendientes";
import { solicitudesContext } from "../../../storage/AdminContext";
import { Subtitles } from "../../../components/Comprobados/Subtitles";
import {
  AiOutlineEdit,
  AiOutlineHistory,
  AiOutlineReload,
} from "react-icons/ai";

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
      <div className="d-flex gap-2">
        <Link to={"/admin/solicitudes/historial"}>
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
          fn={() => {
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
