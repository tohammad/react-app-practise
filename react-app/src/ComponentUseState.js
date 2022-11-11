import React, { useState } from "react";

const Card = () => {
  const [name, setName] = useState("Paul");

  return (
    <div>
      <p>My name is {name}</p>
      <button onClick={() => setName("Nikolous")}>Change Name</button>
    </div>
  );
};

export default Card;
