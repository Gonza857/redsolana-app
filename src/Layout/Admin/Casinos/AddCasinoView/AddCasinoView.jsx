import React from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useContext } from "react";
import { adminContext } from "../../../../storage/AdminContext";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { useEffect } from "react";
import { PreviewCard } from "../../../../components/PreviewCard/PreviewCard";
import {
  getAllCasinos,
  postCasino,
  postCasinoImage,
} from "../../../../firebase/firebase";
import { toastSuccess } from "../../../../helpers/helpers";
import { MainButton } from "../../../../components/MainButton/MainButton";
import { useNavigate } from "react-router-dom";

export const AddCasinoView = () => {
  const [casinoPreview, setCasinoPreview] = useState(null);
  const [casinoLink, setCasinoLink] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [casinoName, setCasinoName] = useState(null);
  const [casinos, setCasinos] = useState([]);
  const { viewNewCasino } = useContext(adminContext);
  const navigate = useNavigate();

  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = (data) => {
    setCasinoPreview(data);
  };

  const uploadCasino = () => {
    let imageInfo = { url: "", id: "" };
    postCasinoImage(previewImageUrl).then((result) => {
      setPreviewImageUrl(result.url);
      imageInfo.url = result.url;
      imageInfo.id = result.randomId;
      casinoPreview.casinoImage = imageInfo;
      postCasino(casinoPreview).then(() => {
        window.scrollTo(0, 0);
        toastSuccess("Casino cargado correctamente");
        navigate("/admin/casinos");
      });
    });
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

  useEffect(() => {
    getAllCasinos().then((result) => {
      setCasinos(result);
      console.table(result);
    });
  }, []);

  return (
    <div className="col-12 d-flex flex-column align-items-center py-4 py-xl-2">
      <h3 className="mx-auto text-white py-xl-2">Añadir casino</h3>
      <div className="col-11 col-xl-12 d-flex d-flex flex-wrap justify-content-center gap-4 gap-xl-0">
        <div
          className={`col-12 col-xl-6 text-white d-flex justify-content-center flex-wrap ${
            casinoPreview !== null ? "" : "m-auto"
          }`}
        >
          <StyledForm
            className="col-12 col-xl-8 d-flex flex-column gap-3 p-2 p-xl-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputContainer>
              <label htmlFor="casinoImage">Imagen casino</label>
              <StyledInput
                type="file"
                name="casinoImage"
                onChange={handleFileUpload}
              />
            </InputContainer>
            <InputContainer>
              <label htmlFor="link">Link del sitio</label>
              <div className="d-flex align-items-center justify-content-between">
                <StyledInput
                  className="col-10"
                  type="text"
                  name="link"
                  {...register("link", {
                    required: true,
                  })}
                />
                <button
                  className="btn btn-primary col-2 col-xl-1 h-100"
                  type="button"
                  onClick={() => resetField("link")}
                >
                  <AiFillDelete />
                </button>
              </div>
            </InputContainer>
            <InputContainer>
              <label htmlFor="casinoName">Nombre del casino</label>
              <StyledInput
                type="text"
                name="casinoName"
                {...register("casinoName", {
                  required: true,
                })}
              />
            </InputContainer>
            <div className="m-auto">
              <MainButton type="submit">Previsualizar</MainButton>
            </div>
          </StyledForm>
        </div>
        {previewImageUrl !== null ? (
          <div className="col-11 col-xl-6 d-flex flex-column justify-content-center align-items-center gap-3">
            <PreviewCard
              casinoPreview={casinoPreview}
              previewImageUrl={previewImageUrl}
              uploadCasino={uploadCasino}
            />
            <MainButton primary={true} fn={uploadCasino}>
              Añadir
            </MainButton>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

const StyledForm = styled.form`
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-radius: 1rem;
  padding: 20px;
  border: 1px solid gold;
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledInput = styled.input`
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
`;
