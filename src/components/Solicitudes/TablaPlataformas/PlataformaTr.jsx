import React from "react";
import { Form } from "react-bootstrap";
import {
  AiOutlineDelete,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import styled from "styled-components";

export const PlataformaTr = ({ platform, handleUpdate, deletePlatform }) => {
  return (
    <tr>
      <td>{platform.name}</td>
      <td>
        {platform.visible ? (
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
      </td>
      <td>
        <Form>
          <Form.Check
            type="switch"
            id="custom-switch"
            defaultChecked={platform.visible}
            onChange={(e) => handleUpdate(e, platform)}
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
