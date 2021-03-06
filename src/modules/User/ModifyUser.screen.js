import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import PersonOffIcon from "@mui/icons-material/PersonOff";
import PersonIcon from "@mui/icons-material/Person";
import SchoolIcon from "@mui/icons-material/School";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import NumbersIcon from "@mui/icons-material/Numbers";
import VerticalTabs from "../../core/Tabs/VerticalTabs.component";
import { deductPoints, resetPassword, updateUser } from "./User.api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useDecode } from "../../hooks/useDecode";
import Schools from "../../core/AutoComplete/Schools.component";
import { logout } from "../../core/NavigationMenu/Logout.api";

const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default function ModifyUser() {
  const [randomGenerate, setRandomGenerate] = useState(false);
  const [newSchool, setNewSchool] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [validate, setValidate] = useState({
    username: true,
    email: true,
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const decode = useDecode();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    const user = decode();
    if (user.roles.includes("ROLE_SUPERADMIN")) {
      setCurrentRole(1);
    }
    if (user.roles.includes("ROLE_LOCALADMIN")) {
      setCurrentRole(2);
    }
    if (user.roles.includes("ROLE_PROFESSOR")) {
      setCurrentRole(3);
    }
  }, [decode]);

  const handleInactivateUser = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    updateUser({ username: username, toggleIsActive: true })
      .payload.then((resp) => {
        if (resp.status === 200) {
          handleAlert(
            "success",
            `Utilizatorul a fost ${
              resp.data ? "activat" : "inactivat"
            } cu succes`
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        } else {
          setValidate({ ...validate, username: false });
        }
      });
  };

  const formInactivate = () => (
    <>
      <Typography fontSize={13}>
        Introduce??i numele utilizatorului pe care dori??i s?? ??l activa??i /
        inactiva??i
      </Typography>
      <Typography fontSize={13}>
        Dac?? contul acestuia este activ atunci va fi inactivat
      </Typography>
      <Typography fontSize={13}>
        Altfel, daca contul acestuia este inactiv atunci va fi activat
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username_inactivate"
        label="Numele utilizatorului"
        name="username"
        autoComplete="user"
        onChange={() => setValidate({ ...validate, username: true })}
        error={!validate.username}
        helperText={
          validate.username ? "" : "Nu exista un utilizator cu acest nume"
        }
        autoFocus
      />
      {loading ? (
        <LoadingButton
          sx={{ mt: 1.5 }}
          fullWidth
          loading
          loadingPosition="start"
          startIcon={<PersonIcon />}
          endIcon={<PersonOffIcon />}
          variant="contained"
        >
          Activeaz?? / Inactiveaz??
        </LoadingButton>
      ) : (
        <Button
          sx={{ mt: 1.5 }}
          variant="contained"
          fullWidth
          startIcon={<PersonIcon />}
          endIcon={<PersonOffIcon />}
          type="submit"
        >
          Activeaz?? / Inactiveaz??
        </Button>
      )}
    </>
  );

  const handleResetPassword = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = {
      username: data.get("username"),
      password: randomGenerate ? "" : data.get("password"),
    };
    resetPassword(body)
      .payload.then((response) => {
        if (response.status === 200) {
          handleAlert(
            "success",
            `Parola a fost resetat?? cu succes pentru utilizatorul ${data.get(
              "username"
            )}`
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        } else {
          if (error.response.data.message === "Cerere respinsa") {
            handleAlert(
              "error",
              "Nu ave??i acces s?? schimba??i parola acestui utilizator!"
            );
          } else {
            setValidate({ ...validate, username: false });
          }
        }
      });
  };

  const formResetPassword = () => (
    <>
      <Typography fontSize={13}>
        Introduce??i numele utilizatorului c??ruia dori??i s?? ??i reseta??i parola!
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username_reset_password"
        label="Numele utilizatorului"
        name="username"
        autoComplete="user"
        onChange={() => setValidate({ ...validate, username: true })}
        error={!validate.username}
        helperText={
          validate.username ? "" : "Nu exista un utilizator cu acest nume"
        }
        autoFocus
      />
      <TextField
        margin="normal"
        required={!randomGenerate}
        fullWidth
        name="password"
        label="Parola Nou??"
        type="password"
        id="password_reset_password"
        autoComplete="new-password"
        disabled={randomGenerate}
      />
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={randomGenerate}
              onChange={() => setRandomGenerate(!randomGenerate)}
            />
          }
          label="Genereaz?? o parol?? aleatoare"
        />
      </FormGroup>
      {loading ? (
        <LoadingButton
          sx={{ mt: 1.5 }}
          fullWidth
          loading
          loadingPosition="start"
          startIcon={<LockResetIcon />}
          variant="contained"
        >
          Reseteaz??
        </LoadingButton>
      ) : (
        <Button
          sx={{ mt: 1.5 }}
          variant="contained"
          fullWidth
          startIcon={<LockResetIcon />}
          type="submit"
        >
          Reseteaz??
        </Button>
      )}
    </>
  );

  const handleChangeSchool = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const schoolName = data.get("school");
    updateUser({ username: username, schoolName: schoolName })
      .payload.then((resp) => {
        if (resp.status === 200) {
          handleAlert(
            "success",
            `??coal?? schimbat?? cu succes pentru utilizatorul cu numele ${username}`
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        } else {
          setValidate({ ...validate, username: false });
        }
      });
  };

  const formChangeSchool = () => (
    <>
      <Typography fontSize={13}>
        Introduce??i numele utilizatorului c??ruia dori??i s?? ??i schimba??i ??coala!
      </Typography>
      <Typography fontSize={13}>
        Pute??i s?? ad??uga??i o ??coal?? nou?? sau s?? alege??i una deja salvat??
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username_change_school"
        label="Numele utilizatorului"
        name="username"
        autoComplete="user"
        onChange={() => setValidate({ ...validate, username: true })}
        error={!validate.username}
        helperText={
          validate.username ? "" : "Nu exista un utilizator cu acest nume"
        }
        autoFocus
      />
      {newSchool ? (
        <TextField
          margin="normal"
          required
          fullWidth
          name="school"
          label="??coal?? nou??"
          type="school"
          id="new_school"
          autoComplete="new-school"
        />
      ) : (
        <Schools variant="outlined" fullWidth={true} onInputChange={() => {}} />
      )}
      <FormGroup>
        <FormControlLabel
          control={
            <Checkbox
              checked={newSchool}
              onChange={() => setNewSchool(!newSchool)}
            />
          }
          label="Adauga??i ??coal?? nou??"
        />
      </FormGroup>
      {loading ? (
        <LoadingButton
          sx={{ mt: 1.5 }}
          fullWidth
          loading
          loadingPosition="start"
          startIcon={<SchoolIcon />}
          variant="contained"
        >
          Schimb?? ??coala
        </LoadingButton>
      ) : (
        <Button
          sx={{ mt: 1.5 }}
          variant="contained"
          fullWidth
          startIcon={<SchoolIcon />}
          type="submit"
        >
          Schimb?? ??coala
        </Button>
      )}
    </>
  );

  const handleChangeEmail = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const email = data.get("email");
    if (!email.match(mailFormat)) {
      setValidate({ ...validate, email: false });
      setLoading(false);
    } else {
      updateUser({ username: username, email: email })
        .payload.then((resp) => {
          if (resp.status === 200) {
            handleAlert(
              "success",
              `Email schimbat cu succes pentru utilizatorul cu numele ${username}`
            );
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          if (error.response.status === 403) {
            logout();
            navigate("/login", { replace: true });
          } else {
            setValidate({ ...validate, username: false });
          }
        });
    }
  };

  const formChangeEmail = () => (
    <>
      <Typography fontSize={13}>
        Introduce??i numele utilizatorului c??ruia dori??i s?? ??i schimba??i
        email-ul!
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username_change_email"
        label="Numele utilizatorului"
        name="username"
        autoComplete="user"
        onChange={() => setValidate({ ...validate, username: true })}
        error={!validate.username}
        helperText={
          validate.username ? "" : "Nu exista un utilizator cu acest nume"
        }
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email nou"
        type="email"
        id="email_change"
        autoComplete="new-email"
        onChange={() => setValidate({ ...validate, email: true })}
        error={!validate.email}
        helperText={validate.email ? "" : "Email invalid: example@yahoo.com"}
      />
      {loading ? (
        <LoadingButton
          sx={{ mt: 1.5 }}
          fullWidth
          loading
          loadingPosition="start"
          startIcon={<AlternateEmailIcon />}
          variant="contained"
        >
          Schimb?? email
        </LoadingButton>
      ) : (
        <Button
          id="change-email-button"
          sx={{ mt: 1.5 }}
          variant="contained"
          fullWidth
          startIcon={<AlternateEmailIcon />}
          type="submit"
        >
          Schimb?? email
        </Button>
      )}
    </>
  );

  const handleExtractPoints = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const points = data.get("points");
    deductPoints(username, points)
      .payload.then((resp) => {
        if (resp.status === 200) {
          handleAlert(
            "success",
            `Puncte extrase cu succes pentru utilizatorul cu numele ${username}`
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        } else {
          if (error.response.data.message === "User not found") {
            setValidate({ ...validate, username: false });
          } else if (error.response.data.message === "Puncte insuficiente") {
            handleAlert(
              "error",
              `Utilizatorul ${username} nu are suficiente puncte!`
            );
          } else {
            handleAlert(
              "error",
              "Nu pute??i s?? introduce??i un num??r negativ de puncte!"
            );
          }
        }
      });
  };

  const formExtractPoints = () => (
    <>
      <Typography fontSize={13}>
        Introduce??i numele utilizatorului c??ruia dori??i sa ??i extrage??i puncte
      </Typography>
      <TextField
        margin="normal"
        required
        fullWidth
        id="username_extract_points"
        label="Numele utilizatorului"
        name="username"
        autoComplete="user"
        onChange={() => setValidate({ ...validate, username: true })}
        error={!validate.username}
        helperText={
          validate.username ? "" : "Nu exista un utilizator cu acest nume"
        }
        autoFocus
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="points"
        label="Puncte extrase"
        type="number"
        id="points_change"
        autoComplete="extract-points"
        InputProps={{ inputProps: { min: 0 } }}
      />
      {loading ? (
        <LoadingButton
          sx={{ mt: 1.5 }}
          fullWidth
          loading
          loadingPosition="start"
          startIcon={<NumbersIcon />}
          variant="contained"
        >
          Extrage puncte
        </LoadingButton>
      ) : (
        <Button
          sx={{ mt: 1.5 }}
          variant="contained"
          fullWidth
          startIcon={<NumbersIcon />}
          type="submit"
        >
          Extrage puncte
        </Button>
      )}
    </>
  );

  const wrapper = (renderFunction, handleSubmit) => (
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        minHeight: 200,
      }}
      onSubmit={handleSubmit}
    >
      {renderFunction()}
    </Box>
  );

  return (
    <VerticalTabs
      tabs={
        currentRole === 1
          ? [
              {
                children: wrapper(formResetPassword, handleResetPassword),
                label: "Reseteaz?? parola",
              },
              {
                children: wrapper(formInactivate, handleInactivateUser),
                label: "(In)activeaz?? user",
              },
              {
                children: wrapper(formChangeSchool, handleChangeSchool),
                label: "Schimb?? ??coala",
              },
              {
                children: wrapper(formChangeEmail, handleChangeEmail),
                label: "Schimb?? email",
              },
              {
                children: wrapper(formExtractPoints, handleExtractPoints),
                label: "Extrage puncte",
              },
            ]
          : currentRole === 2
          ? [
              {
                children: wrapper(formResetPassword, handleResetPassword),
                label: "Reseteaz?? parola",
              },
              {
                children: wrapper(formExtractPoints, handleExtractPoints),
                label: "Extrage puncte",
              },
            ]
          : currentRole === 3
          ? [
              {
                children: wrapper(formResetPassword, handleResetPassword),
                label: "Reseteaz?? parola",
              },
            ]
          : []
      }
    />
  );
}
