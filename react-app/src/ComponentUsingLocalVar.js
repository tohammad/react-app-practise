const Card = () => {
  let toggled = false;

  const handleMouseMove = () => {
    toggled =!toggled;
    console.log(toggled);
  };

  return (
    <>
      <h3 onMouseMove={handleMouseMove}>Hover Over Me</h3>
      {toggled && <h3>Hovered</h3>}
    </>
  );
};

export default Card;
