import React, { useContext } from "react";
import { MainButton } from "../../../components/MainButton/MainButton";
import { Link } from "react-router-dom";
import { TablaPendientes } from "../../../components/AAdmin/Solicitudes/TablaPendientes";
import { solicitudesContext } from "../../../storage/AdminContext";
import { Subtitles } from "../../../components/Comprobados/Subtitles";

export const ViewSolicitudes = () => {
  const { pendientes, isLoading, actualizarEstadoSolicitud, getSolicitudes } =
    useContext(solicitudesContext);

  return (
    <div className="d-flex flex-column gap-3 bor1 col-lg-10 mx-auto">
      <div className="align-self-center">
        <Subtitles>Pendientes</Subtitles>
      </div>
      <div className="bor1 d-flex gap-2">
        <MainButton>
          <Link to={"/admin/solicitudes/historial"}>Ver historial</Link>
        </MainButton>
        <MainButton
          primary={true}
          fn={() => {
            getSolicitudes();
          }}
        >
          Actualizar
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
