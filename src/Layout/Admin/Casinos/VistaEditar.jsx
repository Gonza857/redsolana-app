import React, { useContext, useEffect, useState } from "react";
import { adminContext } from "../../../storage/AdminContext";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../helpers/helpers";
import { Ring } from "@uiball/loaders";
import { AiFillEdit } from "react-icons/ai";
import { BsTrash } from "react-icons/bs";
import {
  deleteCasinoImage,
  postCasinoImage,
} from "../../../firebase/storage/casino";
import { updateCasino } from "../../../firebase/database/casinos";
import Firebase from "../../../classes/Firebase";
import { MainButton } from "../../../components/UI/MainButton";

export const EditCasinoView = () => {
  const { casinoToEdit, solana } = useContext(adminContext);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [actualImage, setActualImage] = useState(null);
  const [searchedCasino, setSearchedCasino] = useState(null);
  const [isUpdating, setIsUpdating] = useState(false);

  let { id } = useParams();
  const navigate = useNavigate();

  const { register, handleSubmit, resetField } = useForm();

  useEffect(() => {
    setActualImage(casinoToEdit.casinoImage);
    getCasinoToEdit(id);
  }, []);

  useEffect(() => {
    getCasinoToEdit(id);
  }, [solana.getCasinos()]);

  const fullUpdate = (data) => {
    setIsUpdating(true);
    deleteCasinoImage(searchedCasino.image.id)
      .then(() => {
        toastSuccess("Eliminada correctamente");
        Firebase.postCasinoImage(previewImageUrl)
          .then((result) => {
            let { url, id } = result;
            data.casinoImage = { url, id };
            toastSuccess("Nueva imagen agregada correctamente.");
            Firebase.updateCasino(data)
              .then(() => {
                toastSuccess("Actualizado correctamente");
                setIsUpdating(false);
                navigate("/admin/casinos");
              })
              .catch((error) => toastError(error));
          })
          .catch((error) => toastError(error));
      })
      .catch((error) => toastError(error));
  };

  const textUpdate = (data) => {
    setIsUpdating(true);
    Firebase.updateCasino(data)
      .then(() => {
        toastSuccess("Actualizado correctamente");
        setIsUpdating(false);
        navigate("/admin/casinos");
      })
      .catch((error) => toastError(error));
  };

  const getCasinoToEdit = (id) => {
    let a = solana.getCasinoById(id);
    setSearchedCasino(a);
    setActualImage(a.image.url);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      const fileContent = event.target.result;
      setPreviewImageUrl(fileContent);
    };
    reader.readAsDataURL(file);
  };

  const handleDeleteImage = () => {
    // LANZAR TOAST
  };

  const deleteActualImage = (e) => {
    e.preventDefault();
    // LANZAR TOAST
    setActualImage(null);
  };

  // 1 rojo, 2 azul, 3 verde, 4 amarillo

  const deletePreviewImage = () => setPreviewImageUrl(null);

  const onSubmit = (data) => {
    let newData = {
      casinoName: data.name,
      casinoImage: null,
      id: searchedCasino?.id,
      link: data.link,
    };
    if (actualImage == null) {
      if (previewImageUrl !== null) {
        fullUpdate(newData);
      } else {
        toastError("Inserte una imagén.");
      }
    } else {
      newData.casinoImage = searchedCasino?.casinoImage;
      textUpdate(newData);
    }
  };

  if (searchedCasino == null) {
    return <h3 className="text-white">Nada Pana</h3>;
  } else {
    return (
      <StyledWrapper className="p-2 py-lg-0">
        <StyledForm
          onSubmit={handleSubmit(onSubmit)}
          className={`p-2 p-lg-4 gap-2 ${
            actualImage !== null
              ? "col-lg-8 col-xl-6" // PRINCIPAL - TIENE IMG
              : previewImageUrl !== null
              ? "col-lg-8 col-xl-6" // VIENDO PREVIEW
              : "col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4" // VIENDO NADA
          }`}
        >
          <h3 className="pReset text-center">
            Editar Casino <AiFillEdit />
          </h3>
          <div className="d-flex flex-column flex-lg-row">
            <div
              className={`
            col-12 d-flex flex-column justify-content-center p-3 gap-3 ${
              actualImage !== null
                ? "col-lg-6" // PRINCIPAL - TIENE IMG
                : previewImageUrl !== null
                ? "col-lg-6" // VIENDO PREVIEW
                : "col-lg-12" // VIENDO NADA
            }`}
            >
              <StyledInput>
                <label htmlFor="name">Nombre</label>
                <input
                  type="text"
                  name="name"
                  defaultValue={searchedCasino?.casinoName}
                  {...register("name")}
                />
              </StyledInput>
              <StyledInput>
                <label htmlFor="link">Link</label>
                <input
                  type="text"
                  name="link"
                  defaultValue={searchedCasino?.link}
                  {...register("link")}
                />
              </StyledInput>
              {previewImageUrl == null && actualImage == null && (
                <StyledInput>
                  <label htmlFor="image">Imagén</label>
                  <input name="image" type="file" onChange={handleFileUpload} />
                </StyledInput>
              )}
            </div>
            <div className="col-12 col-lg-6 p-3">
              {actualImage !== null ? (
                <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                  <p className="pReset">Imagén actual</p>
                  <StyledImage>
                    <img src={actualImage} />
                  </StyledImage>
                  <MainButton onClick={() => deleteActualImage()}>
                    <BsTrash />
                  </MainButton>
                </div>
              ) : (
                <>
                  {previewImageUrl !== null && (
                    <div className="d-flex flex-column justify-content-center align-items-center gap-3">
                      <StyledImage>
                        <img src={previewImageUrl} />
                      </StyledImage>
                      <MainButton onClick={() => deletePreviewImage()}>
                        <BsTrash />
                      </MainButton>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
          <div className="col-12 d-flex justify-content-center gap-2">
            {isUpdating ? (
              <>
                <MainButton primary={true} type={"submit"}>
                  <Ring size={25} lineWeight={5} speed={2} color="black" />
                </MainButton>
              </>
            ) : (
              <>
                <MainButton fn={() => navigate(-1)} type={"button"}>
                  Cancelar
                </MainButton>
                <MainButton primary={true} type={"submit"}>
                  Guardar
                </MainButton>
              </>
            )}
          </div>
        </StyledForm>
      </StyledWrapper>
    );
  }
};

const StyledWrapper = styled.div`
  /* border: 5px solid violet; */
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledForm = styled.form`
  color: #fff;
  border: 5px solid orange;
  display: flex;
  flex-direction: column;
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-radius: 0.6rem;
  border: 1px solid gold;
  transition: all 0.5s;
`;

const StyledInput = styled.div`
  display: flex;
  flex-direction: column;
  input {
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 16px;
    &:focus {
      outline: none;
      border-color: #3498db;
      box-shadow: 0 0 5px #3498db;
    }
    &::placeholder {
      color: #999;
    }
    &::-webkit-input-placeholder {
      color: #999;
    }
    &::-moz-placeholder {
      color: #999;
    }
    &:-ms-input-placeholder {
      color: #999;
    }
    &:-moz-placeholder {
      color: #999;
    }
  }
`;

const StyledImage = styled.div`
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;
