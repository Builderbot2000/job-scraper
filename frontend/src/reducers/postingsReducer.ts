import {
  Action,
  createSlice,
  PayloadAction,
  ThunkAction,
} from "@reduxjs/toolkit";
import postings from "../services/postings";
import storage from "../services/storage";
import { Posting } from "../types/posting";
import { RootState } from "../store";
import { Params } from "../types/params";
import paramsParser from "../utils/paramsParser";

const postingsSlice = createSlice({
  name: "postings",
  initialState: [] as Array<Posting>,
  reducers: {
    setPostings(_state, action: PayloadAction<Array<Posting>>) {
      return action.payload;
    },
    appendPostings(state, action: PayloadAction<Array<Posting>>) {
      return state.concat(action.payload);
    },
    removePostings() {
      return [];
    },
  },
});

export const { setPostings, appendPostings, removePostings } =
  postingsSlice.actions;

export const initializePostingsFromLocalStorage =
  (): ThunkAction<void, RootState, unknown, Action<unknown>> => (dispatch) => {
    const initialPostings = storage.loadPostings();
    if (initialPostings) dispatch(setPostings(initialPostings));
  };

export const initializePostingsByParams =
  (params: Params): ThunkAction<void, RootState, unknown, Action<unknown>> =>
  async (dispatch) => {
    console.log("Getting New Postings...");
    const newPostings = await postings.getPostingsByParams(
      paramsParser.parseParams(params)
    );
    console.log("New Postings: ", newPostings);
    dispatch(removePostings());
    dispatch(setPostings(newPostings));
  };

export const addPostingsByParams =
  (params: Params): ThunkAction<void, RootState, unknown, Action<unknown>> =>
  async (dispatch) => {
    const newPostings = await postings.getPostingsByParams(
      paramsParser.parseParams(params)
    );
    dispatch(appendPostings(newPostings));
  };

export const clearPostings =
  (): ThunkAction<void, RootState, unknown, Action<unknown>> => (dispatch) => {
    storage.removePostings;
    dispatch(removePostings());
  };

export default postingsSlice.reducer;
