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
import {
  deductPoints,
  getAllUsers,
  resetPassword,
  updateUser,
} from "./User.api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import { useDecode } from "../../hooks/useDecode";
import Schools from "../../core/AutoComplete/Schools.component";
import { logout } from "../../core/NavigationMenu/Logout.api";
import CustomLoadingButton from "../../core/LoadingButton/CustomLoadingButton";
import UsernameField from "../../core/AutoComplete/Usernames.component";

const mailFormat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

export default function ModifyUser() {
  const [randomGenerate, setRandomGenerate] = useState(false);
  const [newSchool, setNewSchool] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentRole, setCurrentRole] = useState(0);
  const [usernames, setUsernames] = useState();
  const [emailIsValid, setEmailIsValid] = useState(true);
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const decode = useDecode();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  useEffect(() => {
    getAllUsers()
      .payload.then((response) => {
        setUsernames(response.data.map((data) => data.username));
      })
      .catch((error) => {
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        }
      });
  }, [navigate]);

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
          handleAlert("error", "A apărut o eroare! Încercați din nou.");
        }
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
      <UsernameField usernames={usernames} />
      {loading ? (
        <CustomLoadingButton
          startIcon={<PersonIcon />}
          endIcon={<PersonOffIcon />}
        >
          Activează / Inactivează
        </CustomLoadingButton>
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
        setLoading(false);
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        } else {
          if (error.response.data.message === "Cerere respinsa") {
            handleAlert(
              "error",
              "Nu aveți acces să schimbați parola acestui utilizator!"
            );
          } else {
            handleAlert("error", "A apărut o eroare! Încercați din nou.");
          }
        }
      });
  };

  const formResetPassword = () => (
    <>
      <Typography fontSize={13}>
        Introduceți numele utilizatorului căruia doriți să îi resetați parola!
      </Typography>
      <UsernameField usernames={usernames} />
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
        <CustomLoadingButton startIcon={<LockResetIcon />}>
          Resetează
        </CustomLoadingButton>
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
        setLoading(false);
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        } else {
          handleAlert("error", "A apărut o eroare! Încercați din nou.");
        }
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
      <UsernameField usernames={usernames} />
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
        <CustomLoadingButton startIcon={<SchoolIcon />}>
          Schimbă școala
        </CustomLoadingButton>
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
      setEmailIsValid(false);
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
            handleAlert("error", "A apărut o eroare! Încercați din nou.");
          }
        });
    }
  };

  const formChangeEmail = () => (
    <>
      <Typography fontSize={13}>
        Introduceți numele utilizatorului căruia doriți să îi schimbați
        email-ul!
      </Typography>
      <UsernameField usernames={usernames} />
      <TextField
        margin="normal"
        required
        fullWidth
        name="email"
        label="Email nou"
        type="email"
        id="email_change"
        autoComplete="new-email"
        onChange={() => setEmailIsValid(true)}
        error={!emailIsValid}
        helperText={emailIsValid ? "" : "Email invalid: example@yahoo.com"}
      />
      {loading ? (
        <CustomLoadingButton startIcon={<AlternateEmailIcon />}>
          Schimbă email
        </CustomLoadingButton>
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

  const handleExtractPoints = (event) => {
    setLoading(true);
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const username = data.get("username");
    const points = data.get("points");
    const message = data.get("message");
    deductPoints(username, points, message)
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
            handleAlert("error", "Nu există un utilizator cu acest nume!");
          } else if (error.response.data.message === "Puncte insuficiente") {
            handleAlert(
              "error",
              `Utilizatorul ${username} nu are suficiente puncte!`
            );
          } else {
            handleAlert(
              "error",
              "Nu puteți să introduceți un număr negativ de puncte!"
            );
          }
        }
      });
  };

  const formExtractPoints = () => (
    <>
      <Typography fontSize={13}>
        Introduceți numele utilizatorului căruia doriți sa îi extrageți puncte
      </Typography>
      <UsernameField usernames={usernames} />
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
      <TextField
        margin="normal"
        required
        fullWidth
        multiline
        name="message"
        label="Descriere / Motiv"
        id="description_reason"
        autoComplete="description"
        rows={3}
      />
      {loading ? (
        <CustomLoadingButton startIcon={<NumbersIcon />}>
          Extrage puncte
        </CustomLoadingButton>
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
              {
                children: wrapper(formExtractPoints, handleExtractPoints),
                label: "Extrage puncte",
              },
            ]
          : currentRole === 2
          ? [
              {
                children: wrapper(formResetPassword, handleResetPassword),
                label: "Resetează parola",
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
                label: "Resetează parola",
              },
            ]
          : []
      }
    />
  );
}
