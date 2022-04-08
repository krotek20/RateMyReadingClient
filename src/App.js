import React, { useState, useMemo } from "react";
import Layout from "./modules/Layout/Layout.screen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { SnackbarProvider } from "notistack";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import AppConfig from "./config/App.config.js";
import { Box, Slide } from "@mui/material";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { setColors } from "./redux/Color/Color";
import { ro } from "date-fns/locale";
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
  const dispatch = useDispatch();

  const theme = useMemo(() => {
    dispatch(setColors({ primary: primary, secondary: darkenPrimary }));
    return createTheme({
      palette: {
        primary: { main: primary },
        secondary: { main: darkenPrimary },
        text: { primary: darkenPrimary },
      },
    });
  }, [primary, darkenPrimary, dispatch]);

  const setRandomPrimary = () => {
    const color = randomColor();
    const darkenColor = convertToDarken(color, 30);
    setPrimary(color);
    setDarkenPrimary(darkenColor);
  };

  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider TransitionComponent={Slide} dense>
        <LocalizationProvider dateAdapter={AdapterDateFns} locale={ro}>
          <Box
            flex={1}
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <BrowserRouter>
              <Layout handleColorChange={setRandomPrimary} />
            </BrowserRouter>
          </Box>
        </LocalizationProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
};

export default App;
