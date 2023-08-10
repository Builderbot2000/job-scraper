import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { v4 as uuidv4 } from "uuid";

import App from "./App.tsx";

import store from "./store.ts";
import { SERVICE_URL } from "./utils/config.ts";

console.log("SERVICE_URL: ", SERVICE_URL);

export const instanceId = uuidv4();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
