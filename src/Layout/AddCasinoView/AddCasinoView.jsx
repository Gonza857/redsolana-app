import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from "react";
import { PreviewCard } from "../../components/PreviewCard/PreviewCard";

export const AddCasinoView = () => {
  const [casinoPreview, setCasinoPreview] = useState(null);
  const [bgState, setBgState] = useState(false);
  const { viewNewCasino } = useContext(adminContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
    resetField,
  } = useForm();

  const onSubmit = (data) => {
    if (data.padding == "false" || data.padding == null) {
      data.padding = false;
    } else {
      data.padding = true;
    }

    if (data.bgOpacity == "false" || data.bgOpacity == null) {
      data.bgOpacity = false;
    } else {
      data.bgOpacity = true;
    }

    if (bgState) {
      data.bgColor = null;
    } else {
      data.bgImgDirection = null;
    }
    if (data.imgDirection == undefined) {
      data.imgDirection = null;
    }
    console.log(data);
    // viewNewCasino(data);
    setCasinoPreview(data);
  };

  useEffect(() => {
    console.log(casinoPreview);
  }, [casinoPreview]);

  return (
    <StyledContainer className="col-10 bor3 d-flex flex-column">
      <h3 className="mx-auto mt-2 text-white">Añadir casino</h3>
      <div className="d-flex">
        <div
          className={`col-6 text-white ${
            casinoPreview !== null ? "" : "m-auto"
          }`}
        >
          <form
            className="d-flex flex-column gap-2 p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputContainer>
              <label htmlFor="imgDirection">Link de la imagen del casino</label>
              <div className="d-flex align-items-center justify-content-between">
                <input
                  className="col-10"
                  type="text"
                  name="imgDirection"
                  {...register("imgDirection")}
                  required
                />
                <button
                  className="btn btn-primary col-1"
                  type="button"
                  onClick={() => resetField("imgDirection")}
                >
                  <AiFillDelete />
                </button>
              </div>
            </InputContainer>

            <InputContainer>
              <label htmlFor="link">Link del sitio</label>
              <div className="d-flex align-items-center justify-content-between">
                <input
                  className="col-10"
                  type="text"
                  name="link"
                  {...register("link")}
                />
                <button
                  className="btn btn-primary col-1"
                  type="button"
                  onClick={() => resetField("link")}
                >
                  <AiFillDelete />
                </button>
              </div>
            </InputContainer>
            <InputContainer>
              <label htmlFor="casinoName">Nombre del casino</label>
              <input
                type="text"
                name="casinoName"
                {...register("casinoName")}
              />
            </InputContainer>
            {/* BORDES */}
            <div className="d-flex gap-2 align-items-center">
              <label htmlFor="padding">Bordes</label>
              <div className="d-flex align-items-center gap-2 bor2">
                <input
                  type="radio"
                  value={true}
                  name="padding"
                  {...register("padding")}
                />
                <p className="m-0">Si</p>
              </div>
              <div className="d-flex align-items-center gap-2 bor2">
                <input
                  type="radio"
                  value={false}
                  name="padding"
                  {...register("padding")}
                />
                <p className="m-0">No</p>
              </div>
            </div>

            <div>
              <button
                type="button"
                onClick={() => setBgState((prevState) => !prevState)}
              >
                {!bgState ? "Usar imagen de fondo" : "Usar color de fondo"}
              </button>
            </div>
            {bgState ? (
              <>
                <InputContainer>
                  <label htmlFor="bgImgDirection">
                    Link de la imagen de fondo
                  </label>
                  <div className="d-flex align-items-center justify-content-between">
                    <input
                      className="col-10"
                      type="text"
                      name="bgImgDirection"
                      {...register("bgImgDirection")}
                    />
                    <button
                      className="btn btn-primary col-1"
                      type="button"
                      onClick={() => resetField("bgImgDirection")}
                    >
                      <AiFillDelete />
                    </button>
                  </div>
                </InputContainer>

                {/* FONDO MAS OSCURO */}
                <div className="d-flex gap-2 align-items-center">
                  <label htmlFor="padding">Fondo oscuro</label>
                  <div className="d-flex align-items-center gap-2 bor2">
                    <input
                      type="radio"
                      value={true}
                      name="bgOpacity"
                      {...register("bgOpacity")}
                    />
                    <p className="m-0">Si</p>
                  </div>
                  <div className="d-flex align-items-center gap-2 bor2">
                    <input
                      type="radio"
                      value={false}
                      name="bgOpacity"
                      {...register("bgOpacity")}
                    />
                    <p className="m-0">No</p>
                  </div>
                </div>
              </>
            ) : (
              <>
                <div className="d-flex align-items-center gap-3">
                  <label htmlFor="bgColor">Color de fondo</label>
                  <input type="color" name="bgColor" {...register("bgColor")} />
                </div>
              </>
            )}

            <button type="submit" className="btn btn-warning">
              Previsualizar
            </button>
          </form>
        </div>
        {casinoPreview !== null ? (
          <div className="col-6 bor1 d-flex justify-content-center align-items-center">
            <PreviewCard casinoPreview={casinoPreview} />
          </div>
        ) : (
          <></>
        )}
      </div>
    </StyledContainer>
  );
};

const StyledContainer = styled.div`
  min-height: 100vh;
  margin-top: 70px;
  overflow: hidden;
  background-color: #020006;
  background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23d4af37' fill-opacity='0.26'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  border: 3px solid purple;
`;
