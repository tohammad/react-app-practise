import { useRef } from "react";

const Card = () => {
  let toggled = useRef(false);
  const handleMouseMove = () => {
    toggled.current = !toggled.current;
    console.log(toggled.current);
  };

  return (
    <>
      <h3 onMouseMove={handleMouseMove}>Hover Over Me</h3>
      {toggled.current && <h3>Hovered</h3>}
    </>
  );
};

export default Card;
