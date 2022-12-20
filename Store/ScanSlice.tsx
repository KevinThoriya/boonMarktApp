import { createSlice } from "@reduxjs/toolkit";

interface State {
  count: number;
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  count: 0,
};

const actions = {
  loading: (state: State, action: Action) => {
    return {...state, count: action.payload?.count};
  },
  success: (state: State, action: Action) => {
    return state;
  },
};

const counter = createSlice({
  name: "counterSlice",
  initialState,
  reducers: actions,
});

export const { loading, success } = counter.actions;
export default counter.reducer;
