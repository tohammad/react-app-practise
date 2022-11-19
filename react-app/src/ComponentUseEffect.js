import { useState, useEffect } from "react";

const Card = () => {
  const [name, setName] = useState("Paul");
  useEffect(() => {
    // Good!
    document.title = `Greetings to ${name}`; // Side-effect!
  }, [name]);
  return (
    <div>
      <p>My name is {name}</p>
      <button onClick={() => setName("Nikolous")}>Change Name</button>
    </div>
  );
};

export default Card;
