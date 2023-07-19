import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const requestsSlice = createSlice({
  name: "requests",
  initialState: 0 as number,
  reducers: {
    setRequests(_state, action: PayloadAction<number>) {
      return action.payload;
    },
    incrementRequests(state) {
      return (state += 1);
    },
    decrementRequests(state) {
      return (state -= 1);
    },
  },
});

export const { setRequests, incrementRequests, decrementRequests } =
  requestsSlice.actions;

export default requestsSlice.reducer;
