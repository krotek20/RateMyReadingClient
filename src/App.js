import React, { useState, useMemo } from "react";
import Layout from "./modules/Layout/Layout.screen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useDispatch } from "react-redux";
import { SnackbarProvider } from "notistack";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import AppConfig from "./config/App.config.js";
import { Box, Slide } from "@mui/material";
import axios from "axios";
import { BrowserRouter } from "react-router-dom";
import { setColors } from "./redux/Color/Color";
import { ro } from "date-fns/locale";
axios.defaults.baseURL = AppConfig;

// const getLightness = () => {
//   return 20 + 50 * Math.random();
// };

// const getColor = () => {
//   return 360 * Math.random();
// };

// const getSaturation = (lightness) => {
//   if (!lightness) {
//     lightness = 20;
//   }
//   return 100 - lightness + 20 * Math.random();
// };

const colorPaletteHSL = [
  ["hsl(170, 45%, 45%)", "hsl(170, 45%, 22%)"],
  ["hsl(282, 52%, 26%)", "hsl(282, 52%, 13%)"],
  ["hsl(40, 100%, 60%)", "hsl(40, 100%, 30%)"],
  ["hsl(200, 77%, 36%)", "hsl(200, 77%, 18%)"],
];

// const randomColor = () => {
//   // const color = getColor();
//   // const lightness = getLightness();
//   // const saturation = getSaturation(lightness);
//   const randomValue = Math.floor(Math.random() * colorPaletteHSL.length);

//   // return random color and his darken version
//   return colorPaletteHSL[randomValue];
// };

const App = () => {
  const [randomValue, setRandomValue] = useState(
    Math.floor(Math.random() * colorPaletteHSL.length)
  );
  const dispatch = useDispatch();

  const theme = useMemo(() => {
    dispatch(
      setColors({
        primary: colorPaletteHSL[randomValue][0],
        secondary: colorPaletteHSL[randomValue][1],
      })
    );
    return createTheme({
      palette: {
        primary: { main: colorPaletteHSL[randomValue][0] },
        secondary: { main: colorPaletteHSL[randomValue][1] },
        text: { primary: colorPaletteHSL[randomValue][1] },
      },
    });
  }, [randomValue, dispatch]);

  const setRandomPrimary = () => {
    setRandomValue((prevState) => {
      let random = Math.floor(Math.random() * colorPaletteHSL.length);
      while (random === prevState) {
        random = Math.floor(Math.random() * colorPaletteHSL.length);
      }
      return random;
    });
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
