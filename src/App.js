import React from "react";
import Layout from "./modules/Layout/Layout.screen";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { orange, green } from "@material-ui/core/colors";
import Grid from "@mui/material/Grid";

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
    <>
      <ThemeProvider theme={theme}>
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
      </ThemeProvider>
    </>
  );
}

export default App;
