import React, { useState, useMemo } from "react";
import Layout from "./modules/Layout/Layout.screen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import Slide from "@mui/material/Slide";
import { store } from "./redux/store";
import AppConfig from "./config/App.config.js";
import Grid from "@mui/material/Grid";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
axios.defaults.baseURL = AppConfig;

const randomColor = () =>
  `#${((Math.random() * 0xffffff) << 0).toString(16).padStart(6, "0")}`;

const convertToDarken = (hex, percent) => {
  // strip the leading # if it's there
  hex = hex.replace(/^\s*#|\s*$/g, "");

  // convert 3 char codes --> 6, e.g. `E0F` --> `EE00FF`
  if (hex.length === 3) {
    hex = hex.replace(/(.)/g, "$1$1");
  }

  const r = parseInt(hex.substr(0, 2), 16),
    g = parseInt(hex.substr(2, 2), 16),
    b = parseInt(hex.substr(4, 2), 16);

  return (
    "#" +
    (0 | ((1 << 8) + r * (1 - percent / 100))).toString(16).substring(1) +
    (0 | ((1 << 8) + g * (1 - percent / 100))).toString(16).substring(1) +
    (0 | ((1 << 8) + b * (1 - percent / 100))).toString(16).substring(1)
  );
};

const App = () => {
  const firstColor = randomColor();
  const [primary, setPrimary] = useState(firstColor);
  const [darkenPrimary, setDarkenPrimary] = useState(
    convertToDarken(firstColor, 30)
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: primary },
          secondary: { main: darkenPrimary },
          text: { primary: darkenPrimary },
        },
      }),
    [primary, darkenPrimary]
  );

  const setRandomPrimary = () => {
    const color = randomColor();
    const darkenColor = convertToDarken(color, 30);
    setPrimary(color);
    setDarkenPrimary(darkenColor);
  };

  const persistor = persistStore(store);

  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <SnackbarProvider TransitionComponent={Slide} dense>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh" }}
              >
                <Grid item xs={3}>
                  <BrowserRouter>
                    <Layout handleColorChange={setRandomPrimary} />
                  </BrowserRouter>
                </Grid>
              </Grid>
            </LocalizationProvider>
          </SnackbarProvider>
        </PersistGate>
      </Provider>
    </ThemeProvider>
  );
};

export default App;
