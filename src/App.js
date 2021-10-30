import React from "react";
import Layout from "./modules/Layout/Layout.screen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import { store } from "./redux/store";
import { orange, green } from "@material-ui/core/colors";
import AppConfig from "./config/App.config.js";
import Grid from "@mui/material/Grid";
import axios from "axios";
axios.defaults.baseURL = AppConfig;

const theme = createTheme({
  palette: {
    primary: {
      main: orange[400],
    },
    secondary: {
      main: green[400],
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={5}>
          <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: "100vh" }}
          >
            <Grid item xs={3}>
              <Layout />
            </Grid>
          </Grid>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
