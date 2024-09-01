import React, { useContext, useState } from "react";
import { solicitudesContext } from "../../../storage/AdminContext";
import styled from "styled-components";
import { AiOutlinePlus } from "react-icons/ai";
import { Animated } from "react-animated-css";
import { toastSuccess } from "../../../helpers/helpers";
import { TablaPlataformas } from "../../../components/Solicitudes/TablaPlataformas/TablaPlataformas";
import { MainButton } from "../../../components/UI/MainButton";

export const EditPlatforms = () => {
  const {
    platforms,
    setPlatforms,
    isLoading,
    deletePlatform,
    handleUpdate,
    c_handlePostPlatform,
  } = useContext(solicitudesContext);

  const [wantsToAdd, setWantsToAdd] = useState(false);

  const handleForm = (e) => {
    setWantsToAdd(true);
    e.preventDefault();
    let newPlatform = {
      _name: e.target[0].value,
      _isVisible: true,
    };
    c_handlePostPlatform(newPlatform).then((addedPlatform) => {
      if (addedPlatform) {
        setWantsToAdd(false);
        e.target[0].value = "";
      }
    });
  };

  return (
    <div className="text-white col-12 d-flex flex-column align-items-center gap-2 pt-2">
      <h3 className="m-0 p-0">Plataformas</h3>
      <div className="d-flex gap-3">
        {wantsToAdd ? (
          <>
            <Animated animationIn="fadeIn" animationOut="fadeOut">
              <form
                className="d-flex gap-2 flex-column align-items-center flex-md-row"
                onSubmit={(e) => handleForm(e)}
              >
                <StyledInput
                  type="text"
                  placeholder="Plataforma"
                  name="plataforma"
                  required
                />
                <MainButton type={"submit"}>
                  Agregar <AiOutlinePlus />
                </MainButton>
              </form>
            </Animated>
          </>
        ) : (
          <>
            <Animated animationIn="fadeIn" animationOut="fadeOut">
              <MainButton onClick={() => setWantsToAdd(true)}>
                Agregar plataforma
              </MainButton>
            </Animated>
          </>
        )}
      </div>
      <div className="col-lg-6 mx-auto">
        <TablaPlataformas
          platforms={platforms}
          isLoading={isLoading}
          handleUpdate={handleUpdate}
          deletePlatform={deletePlatform}
        />
      </div>
    </div>
  );
};

const StyledInput = styled.input`
  margin: 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 500;
  &:focus {
    outline: none;
    border-color: #3498db;
    box-shadow: 0 0 5px #3498db;
  }
  &::placeholder {
    color: #000;
  }
  &::-webkit-input-placeholder {
    color: #000;
  }
  &::-moz-placeholder {
    color: #000;
  }
  &:-ms-input-placeholder {
    color: #000;
  }
  &:-moz-placeholder {
    color: #000;
  }
`;
