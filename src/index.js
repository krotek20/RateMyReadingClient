// import "./wdyr";
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./core/Loading/Loading.screen";

const persistor = persistStore(store);

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>
);
