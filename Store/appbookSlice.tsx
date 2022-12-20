import { createSlice } from "@reduxjs/toolkit";

type State = any;

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {};

const actions = {
  storeAppBook: (state: State, action: Action) => {
    return { ...state, ...action.payload };
  },
};

const counter = createSlice({
  name: "appBookSlice",
  initialState,
  reducers: actions,
});

export const { storeAppBook } = counter.actions;
export default counter.reducer;
