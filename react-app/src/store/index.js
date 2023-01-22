import { createSlice, configureStore } from "@reduxjs/toolkit";

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

const initialAuthState = { isAuthenticated: false };
const authSlice = createSlice({
    name: "auth",
    initialState: initialAuthState,
    reducers: {
      login(state, action) {
        state.isAuthenticated = true;
      },
      logout(state, action) {
        state.isAuthenticated = false;
      },
    },
  });

const store = configureStore({
  reducer: {counter: counterSlice.reducer, auth: authSlice.reducer},
});
export const counterActions = counterSlice.actions;
export const authActions = authSlice.actions;
export default store;
