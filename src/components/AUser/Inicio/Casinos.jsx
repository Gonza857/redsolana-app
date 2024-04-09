import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { adminContext } from "../../../storage/AdminContext";
import { CasinoCard } from "../../CasinoCard/CasinoCard";

export const Casinos = () => {
  const { casinos } = useContext(adminContext);
  const [loadFake, setLoadFake] = useState(false);
  useEffect(() => {
    if (casinos.length == 0) {
      setLoadFake(true);
    } else {
      setLoadFake(false);
    }
  }, [casinos]);

  return (
    <Wrapper className="col-12 gap-4 col-lg-12 py-4">
      {loadFake ? (
        <>
          {new Array(6).fill(null).map((card) => (
            <CasinoCard key={card?.link} {...card} loadFake={loadFake} />
          ))}
        </>
      ) : (
        <>
          {casinos.map((card) => (
            <CasinoCard key={card?.link} {...card} loadFake={loadFake} />
          ))}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  padding: 0;
  margin: auto;
`;
