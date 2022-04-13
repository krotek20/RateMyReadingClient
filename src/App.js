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

const getLightness = () => {
  return 20 + 50 * Math.random();
};

const getColor = () => {
  return 360 * Math.random();
};

const getSaturation = (lightness) => {
  if (!lightness) {
    lightness = 20;
  }
  return 100 - lightness + 20 * Math.random();
};

const randomColor = () => {
  const color = getColor();
  const lightness = getLightness();
  const saturation = getSaturation(lightness);

  // return random color and his darken version
  return [
    `hsl(${color}, ${saturation}%, ${lightness}%)`,
    `hsl(${color}, ${saturation}%, ${lightness / 2}%)`,
  ];
};

const App = () => {
  const [palette, setPalette] = useState(randomColor());
  const dispatch = useDispatch();

  const theme = useMemo(() => {
    dispatch(setColors({ primary: palette[0], secondary: palette[1] }));
    return createTheme({
      palette: {
        primary: { main: palette[0] },
        secondary: { main: palette[1] },
        text: { primary: palette[1] },
      },
    });
  }, [palette, dispatch]);

  const setRandomPrimary = () => {
    setPalette(randomColor());
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
