import React from "react";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Link,
  Paper,
  Box,
  Grid,
  Typography,
} from "@mui/material";
import { login } from "./Login.api";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { useSnackbar } from "notistack";
import { setAuthTokens } from "axios-jwt";
import { useNavigate } from "react-router-dom";
import Image from "../../assets/reading/reading1.png";
import { config } from "../../config/Api.config";

const Copyright = (props) => {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="http://localhost:3000">
        Website
      </Link>
      {` ${new Date().getFullYear()}`}
      {"."}
    </Typography>
  );
};

export default function Login() {
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleSubmit = (event) => {
    // start loader
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = new URLSearchParams();
    body.append("username", data.get("username"));
    body.append("password", data.get("password"));
    login(body)
      .payload.then((response) => {
        setAuthTokens({
          accessToken: response.data.access_token,
          refreshToken: response.data.refresh_token,
        });
        config();
        return navigate("/", { replace: true });
      })
      .catch(() =>
        handleAlert("error", "Numele de utilizator sau parola sunt greșite!")
      );
  };

  return (
    <Grid container component="main" sx={{ height: "100vh", width: "100vw" }}>
      <CssBaseline />
      <Grid
        item
        xs={false}
        sm={6}
        md={7}
        elevation={5}
        sx={{
          backgroundImage: `url(${Image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <Grid item xs={12} sm={6} md={5} component={Paper} elevation={5} square>
        <Box
          sx={{
            my: 8,
            mx: 4,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" color="text.primary">
            Conectează-te în aplicație
          </Typography>
          <Box
            component="form"
            noValidate
            onSubmit={handleSubmit}
            sx={{ mx: 4 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="username"
              label="Nume de utilizator"
              name="username"
              autoComplete="User"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Parola"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Contectează-te
            </Button>
          </Box>
          <Link href="#" variant="body2" color="text.primary">
            Ai uitat parola?
          </Link>
          <Copyright sx={{ mt: 5 }} />
        </Box>
      </Grid>
    </Grid>
  );
}