import { useState, useCallback } from "react";
import Child from "./Child";
const Parent = () => {
  console.log("Parent Renders");
  const [items, setItems] = useState([]);
  const [count, setCount] = useState(0);
  const increment = () => {
    setCount(count + 1);
  };

  const addItem = useCallback(() => {
    setItems((prev) => [...prev, `item`]);
  }, []);
  return (
    <>
      <h2>Count: {count}</h2>
      <button onClick={() => increment()}> Increment Count</button>
      <Child items={items} addItem={addItem} />
    </>
  );
};

export default Parent;
