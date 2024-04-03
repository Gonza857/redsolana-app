import React, { useContext, useEffect } from "react";
import { TablaHistorial } from "../../../components/AAdmin/Solicitudes/TablaHistorial";
import { solicitudesContext } from "../../../storage/AdminContext";
import { Subtitles } from "../../../components/Comprobados/Subtitles";

export const ViewHistorial = () => {
  const {
    deleteThisSolicitud,
    isLoading,
    historial,
    devolverHistorialHaciaPendiente,
    getSolicitudes,
  } = useContext(solicitudesContext);

  useEffect(() => {
    getSolicitudes();
  }, []);

  return (
    <div className="d-flex flex-column gap-2 col-lg-10 mx-auto">
      <div className="align-self-center pt-2">
        <Subtitles>Historial</Subtitles>
      </div>
      <div>
        <TablaHistorial
          devolverHistorialHaciaPendiente={devolverHistorialHaciaPendiente}
          deleteThisSolicitud={deleteThisSolicitud}
          isLoading={isLoading}
          resueltas={historial}
        />
      </div>
    </div>
  );
};
