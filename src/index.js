// import "./wdyr";
import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from "./App";
import { Provider } from "react-redux";
import { persistStore } from "redux-persist";
import { store } from "./redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./core/Loading/Loading.screen";

Sentry.init({
  dsn: "https://9994757f3e9f42ea8d74e154ca9a646f@o1184533.ingest.sentry.io/6302750",
  integrations: [new BrowserTracing()],
  tracesSampleRate: 1.0,
});

const persistor = persistStore(store);

ReactDOM.render(
  <PersistGate loading={<Loading />} persistor={persistor}>
    <Provider store={store}>
      <App />
    </Provider>
  </PersistGate>,
  document.getElementById("root")
);
