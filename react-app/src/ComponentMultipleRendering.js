import { useState } from "react";

const Card = () => {
  const [toggled, setToggled] = useState(false);

  const handleMouseMove = () => {
    setToggled(!toggled);
    console.log(toggled);
  };

  return (
    <div>
      <h3 onMouseMove={handleMouseMove}>Hover Over Me</h3>
      {toggled && <h3>Hovered</h3>}
    </div>
  );
};

export default Card;
