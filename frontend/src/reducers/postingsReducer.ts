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
import { addRequest, removeRequest } from "./requestsReducer";

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
    const controller = new AbortController();
    dispatch(addRequest(controller));
    const newPostings = await postings.getPostingsByParams(
      paramsParser.parseParams(params),
      controller
    );
    dispatch(removePostings());
    dispatch(setPostings(newPostings));
    storage.removePostings();
    storage.savePostings(newPostings);
    dispatch(removeRequest(controller));
  };

export const addPostingsByParams =
  (
    params: Params,
    state: Array<Posting>
  ): ThunkAction<void, RootState, unknown, Action<unknown>> =>
  async (dispatch) => {
    const controller = new AbortController();
    dispatch(addRequest(controller));
    const newPostings = await postings.getPostingsByParams(
      paramsParser.parseParams(params),
      controller
    );
    dispatch(appendPostings(newPostings));
    storage.removePostings();
    storage.savePostings(state.concat(newPostings));
    dispatch(removeRequest(controller));
  };

export const clearPostings =
  (): ThunkAction<void, RootState, unknown, Action<unknown>> => (dispatch) => {
    dispatch(removePostings());
    storage.removePostings();
  };

export default postingsSlice.reducer;
