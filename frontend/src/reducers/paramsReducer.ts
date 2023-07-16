import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import storage from "../services/storage";
import { RootState } from "../store";
import { Params } from "../types/params";

const paramsSlice = createSlice({
  name: "params",
  initialState: null as Params | null,
  reducers: {
    setParams(_state, action: PayloadAction<Params | null>) {
      return action.payload;
    },
  },
});

export const { setParams } = paramsSlice.actions;

export const saveParams =
  (params: Params): ThunkAction<void, RootState, unknown, Action<unknown>> =>
  (dispatch) => {
    dispatch(setParams(params));
    storage.saveParams(params);
  };

export const loadParams =
  (): ThunkAction<void, RootState, unknown, Action<unknown>> => (dispatch) => {
    const params: Params | null = storage.loadParams();
    dispatch(setParams(params));
  };

export const clearParams =
  (): ThunkAction<void, RootState, unknown, Action<unknown>> => (dispatch) => {
    storage.removeParams();
    dispatch(setParams(null));
  };

export default paramsSlice.reducer;
