import React, { useEffect } from "react";
import { useContext } from "react";
import { adminContext } from "../../storage/AdminContext";
import styled from "styled-components";
import { useState } from "react";
import { toastSuccess } from "../../helpers/helpers";
import { postSorteoImage, updateDraw } from "../../firebase/firebase";
import { MainButton } from "../../components/MainButton/MainButton";
import { useNavigate } from "react-router-dom";

const getInputData = (e) => {
  let { description } = e.target;
  return description.value;
};

export const EditDrawView = () => {
  const { sorteoInfo, getSorteoAgain, participants } = useContext(adminContext);
  const [previewImage, setPreviewImage] = useState("");
  const [wantsToDeleteImage, setWantsToDeleteImage] = useState(false);
  const navigate = useNavigate();

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    let fileContent;
    reader.onload = (event) => {
      fileContent = event.target.result;
      setPreviewImage(fileContent);
    };
    reader.readAsDataURL(file);
    return fileContent;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const descripcion = getInputData(e);
    let newSorteo;
    if (wantsToDeleteImage) {
      if (previewImage !== "") {
        newSorteo = {
          slots: sorteoInfo.slots,
          description: descripcion,
          image: null,
          isActive: true,
          participants,
        };
        postSorteoImage(previewImage).then((result) => {
          let { randomId, url } = result;
          newSorteo.image = { randomId, url };
          updateDraw(newSorteo).then(() => {
            toastSuccess("Sorteo Actualizado correctamente");
            getSorteoAgain();
            window.scrollTo(0, 0);
            navigate("/admin");
          });
        });
      } else {
        newSorteo = {
          slots: sorteoInfo.slots,
          description: descripcion,
          image: null,
          isActive: true,
          participants,
        };
        updateDraw(newSorteo).then(() => {
          toastSuccess("Sorteo Actualizado correctamente");
          getSorteoAgain();
          window.scrollTo(0, 0);
          navigate("/admin");
        });
      }
    } else {
      newSorteo = {
        slots: sorteoInfo.slots,
        description: descripcion,
        image: sorteoInfo.image,
        isActive: true,
        participants,
      };
      updateDraw(newSorteo).then(() => {
        toastSuccess("Sorteo Actualizado correctamente");
        getSorteoAgain();
        window.scrollTo(0, 0);
        navigate("/admin");
      });
    }
  };

  return (
    <StyledContainer className="col-11 col-sm-12 mx-auto d-flex flex-column pt-2 mb-4">
      <h3>Editar sorteo</h3>
      <StyledFormContainer className="d-flex flex-column col-12 col-sm-8 col-md-6 col-xl-4 mx-auto">
        <form className="gap-3" onSubmit={handleSubmit}>
          <div className="d-flex flex-column gap-2">
            <p className="m-0">
              Si deseas editar los cupos disponibles, debes borrar el sorteo e
              iniciar otro nuevo.
            </p>
          </div>
          <div className="d-flex flex-column gap-2">
            <label htmlFor="description">Descripción del sorteo</label>
            <StyledTextArea
              name="description"
              defaultValue={sorteoInfo?.description}
            />
          </div>
          <StyledImagePreviewContainer className="d-flex flex-column gap-2 align-items-center flex-lg-row justify-content-xl-center gap-xl-3">
            {wantsToDeleteImage ? (
              <>
                {previewImage !== "" ? (
                  <>
                    <div className="bor1">
                      <img
                        src={
                          previewImage == ""
                            ? sorteoInfo?.image?.url
                            : previewImage
                        }
                        // style={{ objectFit: "contain", width: "50%" }}
                      />
                    </div>
                    <MainButton
                      type="button"
                      fn={() => {
                        setPreviewImage("");
                        setWantsToDeleteImage(true);
                        toastSuccess("Imagen elimnada");
                      }}
                    >
                      Eliminar imagen
                    </MainButton>
                  </>
                ) : (
                  <div className="col-12 d-flex flex-column bor2">
                    <label htmlFor="image">Imagén del sorteo</label>
                    <input
                      className="col-12 bor"
                      type="file"
                      name="image"
                      onChange={handleFileUpload}
                    />
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="col-12 col-lg-7 col-xl-7">
                  <img src={sorteoInfo?.image?.url} />
                </div>
                <div className="col-12 col-lg-5 col-xl-5 d-flex justify-content-center">
                  <MainButton
                    type="button"
                    fn={() => {
                      setWantsToDeleteImage(true);
                      toastSuccess("Imagen eliminada");
                    }}
                  >
                    Eliminar imagen
                  </MainButton>
                </div>
              </>
            )}
          </StyledImagePreviewContainer>
          <div className="m-auto">
            <MainButton primary={true} type="submit">
              Editar
            </MainButton>
          </div>
        </form>
      </StyledFormContainer>
    </StyledContainer>
  );
};

const StyledImagePreviewContainer = styled.div`
  div {
    display: flex;
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
`;

const StyledFormContainer = styled.div`
  background: radial-gradient(
    circle,
    rgba(0, 0, 0, 1) 0%,
    rgba(88, 88, 88, 1) 100%
  );
  border-radius: 1rem;
  padding: 20px;
  border: 1px solid gold;
  form {
    display: flex;
    flex-direction: column;
  }
`;

const StyledContainer = styled.div`
  color: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  margin: auto;
  min-height: 150px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 16px;
  resize: none;
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
