import React, { useContext } from "react";
import { Form } from "react-bootstrap";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import styled from "styled-components";
import { solicitudesContext } from "../../../storage/AdminContext";
import { Loader } from "../../UI/Loader";
import { useState } from "react";

export const PlataformaTr = ({ platform, deletePlatform }) => {
  const { handleUpdate } = useContext(solicitudesContext);

  const [isUpdating, setisUpdating] = useState(false);

  const handleAction = (e, platform) => {
    setisUpdating(true);
    handleUpdate(e, platform).then((r) => {
      if (r) setisUpdating(false);
    });
  };
  return (
    <tr>
      <td>{platform._name}</td>
      <td>
        {isUpdating ? (
          <Loader />
        ) : (
          <>
            {platform._isVisible ? (
              <>
                <AiOutlineEye style={{ fontSize: "1.5rem" }} />
              </>
            ) : (
              <>
                <AiOutlineEyeInvisible
                  style={{ fontSize: "1.5rem", color: "grey" }}
                />
              </>
            )}
          </>
        )}
      </td>
      <td>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            defaultChecked={platform._isVisible}
            onChange={(e) => handleAction(e, platform)}
          />
        </Form>
      </td>
      <td>
        <DeleteBtn onClick={() => deletePlatform(platform)}>
          <AiOutlineDelete />
        </DeleteBtn>
      </td>
    </tr>
  );
};

const StyledBtn = styled.button`
  outline: none;
  background: none;
  border: none;
  border-radius: 50%;
  overflow: hidden;
  width: 30px;
  height: 30px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  @media screen and (min-width: 992px) {
    width: 40px;
    height: 40px;
  }
  svg {
    font-size: 1rem;
    border-radius: 50%;
    color: #000;
    @media screen and (min-width: 992px) {
      font-size: 1.5rem;
    }
  }
`;

const DeleteBtn = styled(StyledBtn)`
  background-color: #ff0000;

  &:hover {
    background-color: #9b0000;
  }
  svg {
    color: #fff;
  }
`;
