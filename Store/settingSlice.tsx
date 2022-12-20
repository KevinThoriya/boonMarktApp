import { createSlice } from "@reduxjs/toolkit";

type State = any;

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
};

const actions = {
  storeSetting: (state: State, action: Action) => {
    return {...state, ...action.payload};
  },
};

const counter = createSlice({
  name: "settingSlice",
  initialState,
  reducers: actions,
});

export const { storeSetting } = counter.actions;
export default counter.reducer;
