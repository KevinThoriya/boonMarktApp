import { createSlice } from "@reduxjs/toolkit";

interface State {
  transaction_id: number;
  loading: boolean;
  error: boolean;
  scanList: any[];
}

interface Action {
  type: string;
  payload?: any;
}

const initialState: State = {
  transaction_id: 0,
  loading: false,
  error: false,
  scanList: [],
};

const actions = {
  loadingScan: (state: State, action: Action) => {
    return {...state, loading: true, error: false};
  },
  successScan: (state: State, action: Action) => {
    return {...state, ...action.payload, error: false, loading: false};
  },
  failureScan: (state: State, action:Action) => {
    return {...state, error: true, loading: false};
  }
};

const counter = createSlice({
  name: "counterSlice",
  initialState,
  reducers: actions,
});

export const { loadingScan, successScan, failureScan } = counter.actions;
export default counter.reducer;
