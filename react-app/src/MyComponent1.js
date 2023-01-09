import { useRef } from "react";
const MyComponent1 = () => {
  const text = useRef("initial text");
  const handleClick = async () => {
    text.current = "changed text";
    alert(text.current);
  };

  return (
    <>
      <div>
        <button onClick={() => handleClick()}>Change Text</button>
        <h2>{text.current}</h2>
      </div>
    </>
  );
};

export default MyComponent1;
