// import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./core/Loading/Loading.screen";

const persistor = persistStore(store);

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={<Loading />} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
