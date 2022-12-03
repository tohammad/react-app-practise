import { useRef } from "react";

const Card = () => {
  const titleRef = useRef();
  const handleOnClick = () => {
    titleRef.current.textContent = "Updated Text";
  };

  return (
    <>
      <button onClick={handleOnClick}>Change Text</button>
      <div className="title" ref={titleRef}>
        Original Text
      </div>
    </>
  );
};

export default Card;
