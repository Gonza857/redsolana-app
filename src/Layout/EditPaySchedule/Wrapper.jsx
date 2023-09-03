import React from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { deleteScheduleImage, getScheduleImage } from "../../firebase/firebase";
import { useState } from "react";
import { MainButton } from "../../components/MainButton/MainButton";
import { toastError, toastSuccess } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { Ring } from "@uiball/loaders";
import Swal from "sweetalert2";
import { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";

export const Wrapper = () => {
  const [firebaseImage, setFirebaseImage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const { setWantsToUpdateImage, payScheduleImg, isLoadingSchedule } =
    useContext(adminContext);
  const navigate = useNavigate();

  useEffect(() => {
    // getScheduleImage().then((result) => {
    //   console.log(result);
    //   if (result == undefined) {
    //     console.log("No existe nada");
    //     setFirebaseImage(null);
    //   } else {
    //     setFirebaseImage(result);
    //   }
    //   setIsLoading(false);
    // });
    console.log(payScheduleImg);
  }, []);

  const deleteImageFromPaySchedule = () => {
    deleteScheduleImage().then(() => setFirebaseImage(null));
  };

  const deleteImageDialog = () => {
    Swal.fire({
      title: "¿Seguro que deseas eliminar la imagén actual del cronograma?",
      text: "Esta acción no se puede deshacer.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteImageFromPaySchedule();
        Swal.fire("Eliminada!", "Se eliminó correctamente.", "success");
      }
    });
  };

  return (
    <StyledContainer className="col-8 mx-auto d-flexflex-column justify-content-center align-items-center p-3 pt-4">
      <h3 className="text-white text-center">Administración - Cronograma</h3>
      {isLoadingSchedule ? (
        <RingContainer className="d-flex justify-content-center align-items-center">
          <Ring size={40} lineWeight={5} speed={2} color="#d4af37" />
        </RingContainer>
      ) : (
        <>
          {payScheduleImg !== null ? (
            <div className="d-flex flex-column align-items-center gap-2">
              <p className="p_subtitle">Imagén actual</p>
              <PreviewImage>
                <img src={payScheduleImg} alt="Imagén cronograma de pagos." />
              </PreviewImage>
              <div className="d-flex gap-4 justify-content-center">
                <MainButton
                  fn={deleteImageDialog}
                  type={"button"}
                  primary={true}
                >
                  Eliminar
                </MainButton>
                <MainButton
                  fn={() => navigate("/admin/cronograma/configurar")}
                  type={"button"}
                >
                  Actualizar
                </MainButton>
              </div>
            </div>
          ) : (
            <div className="py-5 col-12 text-center text-white d-flex flex-column justify-content-center align-items-center">
              <h1>Sin imágen de cronograma establecida.</h1>
              <MainButton
                fn={() => {
                  setWantsToUpdateImage(true);
                  navigate("/admin/cronograma/configurar");
                }}
              >
                Subir imágen
              </MainButton>
            </div>
          )}
        </>
      )}
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  background-color: rgb(22, 25, 30);
  box-shadow: 0px 0px 25px 6px rgba(255, 255, 255, 0.34);
  form {
    color: #fff;
  }
`;

const PreviewImage = styled.div`
  width: 25%;
  img {
    width: 100%;
    object-fit: contain;
  }
`;

const RingContainer = styled.div`
  height: 100%;
`;
