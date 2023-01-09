import { useState, React, useEffect } from "react";
const MyComponent = () => {
  const [text, setText] = useState("initial text");
  const handleClick = async () => {
    setText("changed text");
  };

  useEffect(() => {
    alert(text);
  }, [text]);
  return (
    <>
      <div>
        <button onClick={() => handleClick()}>Change Text</button>
        <h2>{text}</h2>
      </div>
    </>
  );
};

export default MyComponent;
