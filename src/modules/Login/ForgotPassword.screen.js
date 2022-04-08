import React, { useState } from "react";
import { Box, Button, TextField, Typography, Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { forgotPassword } from "./Login.api";
import { LoadingButton } from "@mui/lab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";

export default function ForgotPassword() {
  const [username, setUsername] = useState();
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleForgotPassword = () => {
    setLoading(true);
    forgotPassword(username)
      .payload.then((res) => {
        if (res.status === 200) {
          setLoading(false);
          if (res.data === "STUDENT") {
            handleAlert(
              "success",
              "Succes! Cereți ajutor profesorului îndrumător pentru a primi noua parolă!"
            );
          } else {
            handleAlert(
              "success",
              "Succes! Veți primi un email de confirmare in câteva momente!"
            );
          }
        }
      })
      .catch((error) => {
        handleAlert("error", "Numele de utilizator nu este valid");
        setLoading(false);
      });
  };

  return (
    <Box
      sx={{
        borderRadius: "10px",
        padding: "10px",
        bgcolor: "#f8f9fa",
        display: "flex",
        maxWidth: 500,
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 10,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Typography variant="h5" color="secondary.main">
        Schimbă parola
      </Typography>
      <Box
        m={2}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        <Typography fontSize={14}>
          Introduceți numele de utilizator pentru a recupera parola.
        </Typography>
        <Typography fontSize={14}>
          Dacă numele de utilizator introdus aparține unui cont de elev
        </Typography>
        <Typography fontSize={14}>
          responsabilul care a creat contul va primii mail-ul cu noua parola.
        </Typography>
      </Box>
      <TextField
        required
        label="nume de utilizator"
        variant="standard"
        defaultValue={username}
        onBlur={(e) => {
          setUsername(e.target.value);
        }}
      />
      {/* <Grid container spacing={2} justifyContent="center">
        <Grid item>
          <TextField
            label="noua parolă"
            variant="standard"
            defaultValue={password}
            onBlur={(e) => {
              setPassword(e.target.value);
            }}
            onFocus={() => {
              if (!beenFocused) {
                handleAlert(
                  "info",
                  "Pentru a vă genera o nouă parolă random NU completați câmpurile destinate parolei"
                );
              }
              setBeenFocused(true);
            }}
          />
        </Grid>
        <Grid item>
          <TextField
            label="repetă noua parolă"
            variant="standard"
            defaultValue={verifyPassword}
            onBlur={(e) => {
              setVerifyPassword(e.target.value);
            }}
            onFocus={() => {
              if (!beenFocused) {
                handleAlert(
                  "info",
                  "Pentru a vă genera o nouă parolă random NU completați câmpurile destinate parolei"
                );
              }
              setBeenFocused(true);
            }}
          />
        </Grid>
      </Grid> */}
      <Box
        width="100%"
        display="flex"
        flexDirection="row"
        m={2}
        alignItems="center"
        justifyContent="space-evenly"
      >
        {loading ? (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<ArrowBackIcon />}
            variant="contained"
          >
            Înapoi
          </LoadingButton>
        ) : (
          <Tooltip title="Înapoi la pagina de login" arrow placement="bottom">
            <Button
              startIcon={<ArrowBackIcon />}
              variant="contained"
              onClick={() => {
                navigate("/login", { replace: true });
              }}
            >
              Înapoi
            </Button>
          </Tooltip>
        )}
        {loading ? (
          <LoadingButton
            loading
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Schimbă
          </LoadingButton>
        ) : (
          <Tooltip
            title="Trimite mail-ul cu noua parolă"
            arrow
            placement="bottom"
          >
            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={handleForgotPassword}
            >
              Schimbă
            </Button>
          </Tooltip>
        )}
      </Box>
    </Box>
  );
}
