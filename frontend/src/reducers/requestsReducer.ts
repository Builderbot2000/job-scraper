import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: [] as Array<AbortController>,
  reducers: {
    addRequest(state, action: PayloadAction<AbortController>) {
      state.push(action.payload);
    },
    removeRequest(state, action: PayloadAction<AbortController>) {
      return state.filter((controller) => controller !== action.payload);
    },
    clearAllRequests(state) {
      for (const controller of state) {
        controller.abort();
      }
      return [];
    },
  },
});

export const { addRequest, removeRequest, clearAllRequests } =
  requestsSlice.actions;

export default requestsSlice.reducer;
