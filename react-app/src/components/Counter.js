import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
const Counter = () => {
  const counter = useSelector((state) => state.counter);
  const [number, setNumber] = useState(0);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch({ type: "increment", amount: number });
  };

  const handleNumberChange = (value) => {
    setNumber(value);
  };

  const handleDecrement = () => {
    dispatch({ type: "decrement", amount: number });
  };

  return (
    <>
      <h2>Counter: {counter}</h2>
      <div>
        <input
          type="number"
          onChange={(e) => handleNumberChange(e.target.value)}
        ></input>
        <button className="counter" onClick={handleIncrement}>
          Increment
        </button>
        <button className="counter" onClick={handleDecrement}>
          Decrement
        </button>
      </div>
    </>
  );
};

export default Counter;
