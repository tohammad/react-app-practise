import styled from "styled-components";

const StyledProfileCard = styled.div`
  border: 1px solid black;

  > .username {
    font-size: 20px;
    color: black;
    transition: 0.2s;

    &:hover {
      color: red;
    }

    + .dob {
      color: green;
    }
  }
`;

function StyledComponentWithSCSS() {
  return (
    <StyledProfileCard>
      <h1 className="username">Hammad Mustafa</h1>
      <p className="dob">
        Date: <span>18th September</span>
      </p>
      <p className="gender">Male</p>
    </StyledProfileCard>
  );
}

export default StyledComponentWithSCSS;
