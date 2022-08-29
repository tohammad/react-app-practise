import styled, { keyframes } from "styled-components";

const animationName = keyframes`
  from {
    background-color: red;
  }

  to {
    background-color: green;
  }
`;

const Container = styled.div`
  animation: ${animationName};
  animation-duration: 10s;
  border-radius: 5px;
  padding: 20px;
  position: fixed;
  background-color: red;
  animation-delay: 2s;
  animation-iteration-count: 3;
`;

function StyledComponentWithAnimation() {
  return <Container>Animation Example</Container>;
}

export default StyledComponentWithAnimation;
