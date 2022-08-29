import styled from "styled-components";

// Styled component named StyledButton
const StyledButton = styled.button`
  background-color: green;
  border: none;
  color: white;
  text-align: center;
  font-size: 20px;
`;

const StyledComponent = () => {
  return <StyledButton> Submit </StyledButton>;
};
export default StyledComponent;
