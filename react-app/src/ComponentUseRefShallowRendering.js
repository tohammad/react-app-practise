import { useRef, useEffect } from "react";

const Username = ({name}) => {
  return <span>{name}</span>
}

const User = () => {
  const user = useRef("Aleem Isiaka");

  console.log("Original Name", user.current);
  const handleOnClick = () => {
    user.current= "Hammad";
    console.log("Original Name", user.current);
  };
  useEffect(() => {
    setTimeout(() => {
      user.current= "Hammad";
    },3000)
  })
  
  // Both children won't be re-rendered due to shallow rendering mechanism
  // implemented for useRef
  return (<>
    <h1 ref={user}>{user.current}</h1> 
    <Username name={user.current} />
     
     <button onClick={handleOnClick}>Change Text</button>
  </>);
}

export default User;