import { createStore } from "redux";

const counterReducer = (state = { counter: 0 }, action) => {
  if (action.type === "increment") {
    return {
      counter: state.counter + parseInt(action.amount),
    };
  } else if (action.type === "decrement") {
    return {
      counter: state.counter - parseInt(action.amount),
    };
  }
  return state;
};

const store = createStore(counterReducer);

export default store;
