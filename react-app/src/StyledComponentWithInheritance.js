import styled from "styled-components";

const StyledButton = styled.button`
  border: none;
  text-align: center;
  font-size: 20px;
  color: ${(props) => props.color};
`;

const StyledSmallButton = styled(StyledButton)`
  font-size: 10px;
  color: ${(props) => props.color};
`;

const StyledComponentWithInheritance = () => {
  return (
    <>
      <StyledButton color="red"> Submit </StyledButton>
      <StyledSmallButton color="blue"> Submit </StyledSmallButton>
    </>
  );
};
export default StyledComponentWithInheritance;
