import { createSlice } from "@reduxjs/toolkit";

type State = any;

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {  
};

const actions = {
    storeLanguage : (state: State, action: Action) => {
      return {...state, ...action.payload};
  },
};

const counter = createSlice({
  name: "TranslateSlice",
  initialState,
  reducers: actions,
});

export const { storeLanguage } = counter.actions;
export default counter.reducer;
