import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import ScanSlice from "./ScanSlice";
import appbookSlice from "./appbookSlice";
import settingSlice from "./settingSlice";
import translateSlice from "./translateSlice";

export const store = configureStore({
  reducer: {
    scan: ScanSlice,
    setting: settingSlice,
    app: appbookSlice,
    translate: translateSlice,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useTranslate = () => useAppSelector(state => state.translate);