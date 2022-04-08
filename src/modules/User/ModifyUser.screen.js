import React, { useState } from "react";
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
import VerticalTabs from "../../core/Tabs/VerticalTabs.component";
import { resetPassword, updateUser } from "./User.api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";
import { useDecode } from "../../hooks/useDecode";
import Schools from "../../core/AutoComplete/Schools.component";

const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default function ModifyUser() {
  const [randomGenerate, setRandomGenerate] = useState(false);
  const [newSchool, setNewSchool] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const checkRole = () => {
    const user = decode();
    if (user.roles.includes("ROLE_SUPERADMIN")) {
      return 1;
    }
    if (user.roles.includes("ROLE_LOCALADMIN")) {
      return 2;
    }
    if (user.roles.includes("ROLE_PROFESSOR")) {
      return 3;
    }
    return 0;
  };

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
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        } else {
          setValidate({ ...validate, username: false });
        }
        setLoading(false);
      });
  };

  const formInactivate = () => (
    <>
      <Typography fontSize={13}>
        Introduceți numele utilizatorului pe care doriți să îl activați /
        inactivați
      </Typography>
      <Typography fontSize={13}>
        Dacă contul acestuia este activ atunci va fi inactivat
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
          Activează / Inactivează
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
          Activează / Inactivează
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
            `Parola a fost resetată cu succes pentru utilizatorul ${data.get(
              "username"
            )}`
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        } else {
          if (error.response.data.message === "Cerere respinsa") {
            handleAlert(
              "error",
              "Nu aveți acces să schimbați parola acestui utilizator!"
            );
          } else {
            setValidate({ ...validate, username: false });
          }
        }
        setLoading(false);
      });
  };

  const formResetPassword = () => (
    <>
      <Typography fontSize={13}>
        Introduceți numele utilizatorului căruia doriți să îi resetați parola!
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
        label="Parola Nouă"
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
          label="Generează o parolă aleatoare"
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
          Resetează
        </LoadingButton>
      ) : (
        <Button
          sx={{ mt: 1.5 }}
          variant="contained"
          fullWidth
          startIcon={<LockResetIcon />}
          type="submit"
        >
          Resetează
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
            `Școală schimbată cu succes pentru utilizatorul cu numele ${username}`
          );
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        } else {
          setValidate({ ...validate, username: false });
        }
        setLoading(false);
      });
  };

  const formChangeSchool = () => (
    <>
      <Typography fontSize={13}>
        Introduceți numele utilizatorului căruia doriți să îi schimbați școala!
      </Typography>
      <Typography fontSize={13}>
        Puteți să adăugați o școală nouă sau să alegeți una deja salvată
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
          label="Școală nouă"
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
          label="Adaugați școală nouă"
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
          Schimbă școala
        </LoadingButton>
      ) : (
        <Button
          sx={{ mt: 1.5 }}
          variant="contained"
          fullWidth
          startIcon={<SchoolIcon />}
          type="submit"
        >
          Schimbă școala
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
          if (error.response.status === 403) {
            navigate("/login", { replace: true });
          } else {
            setValidate({ ...validate, username: false });
          }
          setLoading(false);
        });
    }
  };

  const formChangeEmail = () => (
    <>
      <Typography fontSize={13}>
        Introduceți numele utilizatorului căruia doriți să îi schimbați
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
          Schimbă email
        </LoadingButton>
      ) : (
        <Button
          sx={{ mt: 1.5 }}
          variant="contained"
          fullWidth
          startIcon={<AlternateEmailIcon />}
          type="submit"
        >
          Schimbă email
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
        checkRole() === 1
          ? [
              {
                children: wrapper(formResetPassword, handleResetPassword),
                label: "Resetează parola",
              },
              {
                children: wrapper(formInactivate, handleInactivateUser),
                label: "(In)activează user",
              },
              {
                children: wrapper(formChangeSchool, handleChangeSchool),
                label: "Schimbă școala",
              },
              {
                children: wrapper(formChangeEmail, handleChangeEmail),
                label: "Schimbă email",
              },
            ]
          : checkRole() === 2 || checkRole() === 3
          ? [
              {
                children: wrapper(formResetPassword, handleResetPassword),
                label: "Resetează parola",
              },
            ]
          : []
      }
    />
  );
}
