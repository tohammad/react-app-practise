import { createSlice } from "@reduxjs/toolkit";
const initialCounterState = { counter: 0 };
const counterSlice = createSlice({
    name: "counter",
    initialState: initialCounterState,
    reducers: {
      increment(state, action) {
        state.counter = state.counter + action.payload.amount;
      },
      decrement(state, action) {
        state.counter = state.counter - action.payload.amount;
      },
    },
  });
  export const counterActions = counterSlice.actions;
  export default counterSlice.reducer;

  