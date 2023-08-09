import {
  Action,
  PayloadAction,
  ThunkAction,
  createSlice,
} from "@reduxjs/toolkit";

import { RootState } from "../store";
import storage from "../services/storage";
import { isNumber } from "../utils/typeGuards";

const positionSlice = createSlice({
  name: "position",
  initialState: 0,
  reducers: {
    setPosition(_state, action: PayloadAction<number>) {
      storage.saveField("position", action.payload);
      return action.payload;
    },
  },
});

export const { setPosition } = positionSlice.actions;

export const initializePositionFromLocalStorage =
  (): ThunkAction<void, RootState, unknown, Action<unknown>> => (dispatch) => {
    const initialPosition = storage.loadField("position");
    if (initialPosition && isNumber(Number(initialPosition))) {
      const initialPositionNum = Number(initialPosition);
      dispatch(setPosition(initialPositionNum));
    }
  };

export default positionSlice.reducer;
