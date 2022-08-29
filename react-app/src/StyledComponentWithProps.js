import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  text-align: center;
  font-size: 20px;
  color: ${(props) => props.color};
`;

const StyledComponentWithProps = () => {
  return (
    <>
      <StyledButton color="red"> Submit </StyledButton>
      <StyledButton color="blue"> Submit </StyledButton>
    </>
  );
};
export default StyledComponentWithProps;
