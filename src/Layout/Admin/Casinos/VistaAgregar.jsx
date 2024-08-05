import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { AiFillDelete } from "react-icons/ai";
import { PreviewCard } from "../../../components/PreviewCard/PreviewCard";
import { toastSuccess } from "../../../helpers/helpers";
import { MainButton } from "../../../components/APublic/MainButton/MainButton";
import { useNavigate } from "react-router-dom";
import { getAllCasinos, postCasino } from "../../../firebase/database/casinos";
import { postCasinoImage } from "../../../firebase/storage/casino";
import { adminContext } from "../../../storage/AdminContext";

export const AddCasinoView = () => {
  const [casinoPreview, setCasinoPreview] = useState(null);
  const [previewImageUrl, setPreviewImageUrl] = useState(null);
  const [casinoLink, setCasinoLink] = useState(null);
  const [casinoName, setCasinoName] = useState(null);
  const [casinos, setCasinos] = useState([]);
  const { solana } = useContext(adminContext);

  const { register, handleSubmit, resetField, reset } = useForm();

  const onSubmit = () => {
    reset();
    setPreviewImageUrl(null);
    setCasinoName(null);
  };

  const uploadCasino = () => {
    let c = solana.createCasino();
    c.link = casinoLink;
    c.name = casinoName;
    if (!c.link.includes("https://")) {
      c.link = `https://${c.link}`;
    }
    // postCasinoImage(previewImageUrl).then((result) => {
    //   setPreviewImageUrl(result.url);
    //   newObject.casinoImage = result;
    //   postCasino(newObject).then(() => {
    //     window.scrollTo(0, 0);
    //     toastSuccess("Casino cargado correctamente");
    //     navigate("/admin/casinos");
    //   });
    // });
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
    setCasinos(solana.getCasinos());
    // getAllCasinos().then((result) => {
    //   setCasinos(result);
    // });
  }, []);

  return (
    <div className="col-12 d-flex flex-column align-items-center py-4 py-xl-2 bor2">
      <h3 className="mx-auto text-white py-xl-2">Añadir casino</h3>
      <div className="col-11 col-xl-12 d-flex d-flex flex-wrap justify-content-center">
        <div
          className={`col-12 col-xl-5 text-white d-flex justify-content-center flex-wrap ${
            previewImageUrl == null && "m-auto"
          }`}
        >
          <StyledForm
            className="col-12 col-sm-10 col-md-8 col-lg-7 col-xl-8 d-flex flex-column gap-3 p-3 p-xl-3"
            onSubmit={handleSubmit(onSubmit)}
          >
            <InputContainer>
              <label htmlFor="casinoImage">Imagen casino</label>
              <StyledInput
                required
                type="file"
                name="casinoImage"
                onChange={handleFileUpload}
              />
            </InputContainer>
            <InputContainer className="">
              <label htmlFor="link">Link del sitio</label>
              <div className="d-flex align-items-center justify-content-between">
                <LinkInput
                  required
                  type="text"
                  name="link"
                  {...register("link", {
                    required: true,
                    onChange: (e) => {
                      setCasinoLink(e.target.value);
                    },
                  })}
                />
                <ClearLinkBtn
                  className=""
                  type="button"
                  onClick={() => resetField("link")}
                >
                  <AiFillDelete />
                </ClearLinkBtn>
              </div>
            </InputContainer>
            <InputContainer>
              <label htmlFor="casinoName">Nombre del casino</label>
              <StyledInput
                required
                type="text"
                name="casinoName"
                {...register("casinoName", {
                  required: true,
                  onChange: (e) => {
                    setCasinoName(e.target.value);
                  },
                })}
              />
            </InputContainer>
            <div className="m-auto">
              <MainButton type="submit">Agregar casino</MainButton>
            </div>
          </StyledForm>
        </div>
        {previewImageUrl !== null ? (
          <div className="col-11 col-xl-5 d-flex flex-column justify-content-center align-items-center gap-3">
            <p className="p_subtitle">Vista previa</p>
            <PreviewCard
              casinoPreview={casinoPreview}
              previewImageUrl={previewImageUrl}
              uploadCasino={uploadCasino}
              casinoName={casinoName}
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

const LinkInput = styled.input`
  width: 85%;
  height: 100%;
  border-bottom-left-radius: 0.4em;
  border-top-left-radius: 0.4em;
  border: none;
  padding: 10px;
  border: 1px solid #ccc;
  font-size: 16px;
  @media screen and (min-width: 768px) {
    width: 90%;
  }
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

const ClearLinkBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  border: 0;
  border-bottom-right-radius: 0.4em;
  border-top-right-radius: 0.4em;
  font-size: 1.5rem !important;
  transition: all 0.3s;
  background-color: #7037d4;
  color: #fff;
  height: 100%;
  width: 15%;
  &:active {
    transform: scale(0.95);
  }
  a {
    color: inherit;
  }
  @media screen and (min-width: 768px) {
    width: 10%;
  }
`;

const StyledForm = styled.form`
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-radius: 0.5rem;
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
