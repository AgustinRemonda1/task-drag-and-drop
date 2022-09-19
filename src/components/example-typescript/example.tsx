import React from "react";
import useExample from "./useExample";
import { ButtonContainer, Container } from "./example.styled";

const Example = () => {
  const { text, onChangeText } = useExample();

  return (
    <Container>
      <div>{text}</div>
      <ButtonContainer>
        <button onClick={() => onChangeText("Example one")}>Example one</button>
        <button onClick={() => onChangeText("Example two")}>Example Two</button>
      </ButtonContainer>
    </Container>
  );
};

export default Example;
