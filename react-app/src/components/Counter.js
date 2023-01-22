import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/index";
import { useState } from "react";
const Counter = () => {
  const counter = useSelector((state) => state.counter.counter);
  const [number, setNumber] = useState(0);
  const dispatch = useDispatch();
  const handleIncrement = () => {
    dispatch(counterActions.increment({amount: parseInt(number)}));
  };
  const handleDecrement = () => {
    dispatch(counterActions.decrement({amount: parseInt(number)}));
  };

  const handleNumberChange = (value) => {
    setNumber(value);
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
