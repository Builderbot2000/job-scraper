import { configureStore } from "@reduxjs/toolkit";

import postingsReducer from "./reducers/postingsReducer";
import paramsReducer from "./reducers/paramsReducer";
import requestsReducer from "./reducers/requestsReducer";

const store = configureStore({
  reducer: {
    postings: postingsReducer,
    params: paramsReducer,
    requests: requestsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          "requests/addRequest",
          "requests/removeRequest",
          "requests/clearAllRequests",
        ],
        ignoredPaths: [
          "requests.0",
          "requests.addRequest",
          "requests.removeRequest",
          "requests.clearAllRequests",
        ],
      },
    }),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
