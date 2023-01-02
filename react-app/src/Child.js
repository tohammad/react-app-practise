import { memo } from "react";
const Child = ({ items, addItem }) => {
  console.log("Child Renders");
  return (
    <>
      <h2>Items</h2>
      {items.map((item, index) => {
        return <p key={index}>{item + index}</p>;
      })}
      <button onClick={() => addItem()}> Add Item</button>
    </>
  );
};

export default memo(Child);
