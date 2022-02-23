import React, { useState } from "react";
import { Box, Tooltip, Button, TextField, Typography } from "@mui/material";
import DatePicker from "@mui/lab/DatePicker";
import { register } from "../User.api";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";

export default function AddUserForm({ role }) {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    school: "",
    birthYear: new Date().getFullYear(),
    firstGradeRegistrationYear: new Date().getFullYear(),
    city: "",
    email: "",
  });
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const checkUserFields = () => {
    switch (role) {
      case "ROLE_STUDENT":
        return (
          !user.firstname ||
          !user.lastname ||
          !user.school ||
          !user.birthYear ||
          !user.firstGradeRegistrationYear
        );
      case "ROLE_CONTRIBUTOR":
        return !user.firstname || !user.lastname || !user.email;
      case ("ROLE_PROFESSOR", "ROLE_LOCALADMIN"):
        return (
          !user.firstname ||
          !user.lastname ||
          !user.school ||
          !user.city ||
          !user.email
        );
      default:
        return null;
    }
  };

  const handleAddUser = () => {
    if (!checkUserFields()) {
      register(user, role)
        .payload.then((res) => {
          if (res.status === 200) {
            handleAlert("success", "Utilizatorul a fost adăugat cu succes!");
          }
        })
        .catch((error) => {
          if (error.response.status === 403) {
            navigate("/login", { replace: true });
          } else {
            handleAlert(
              "error",
              "A apărut o eroare, vă rugăm să încercați din nou"
            );
          }
        });
    } else {
      handleAlert(
        "error",
        "Asigurați-vă că ați completat toate câmpurile obligatorii"
      );
    }
  };

  const textFieldProps = (item, label) => ({
    sx: { mx: 1.2 },
    inputProps: { "max-length": 250, style: { "font-size": 14 } },
    InputLabelProps: { shrink: true, style: { "font-size": 14 } },
    required: true,
    id: `${item}-field`,
    label: label,
    variant: "standard",
    defaultValue: user[item],
    onBlur: (e) => setUser({ ...user, [`${item}`]: e.target.value }),
  });

  const datePickerProps = (item, label) => ({
    views: ["year"],
    InputLabelProps: { shrink: true },
    id: `${item}-field`,
    label: label,
    maxDate: new Date(),
    value: user[item],
    onChange: (e) => setUser({ ...user, [`${item}`]: e }),
  });

  const boxProps = () => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    my: 1.5,
  });

  const studentForm = () => (
    <Box display="flex" flexDirection="column" my={2}>
      <Box {...boxProps()}>
        <TextField {...textFieldProps("lastname", "Nume")} />
        <TextField {...textFieldProps("firstname", "Prenume")} />
      </Box>
      <TextField {...textFieldProps("school", "Școală")} />
      <Box {...boxProps()}>
        <DatePicker
          {...datePickerProps("birthYear", "Anul nașterii")}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ mx: 1.2 }}
              variant="standard"
              required
              helperText={null}
            />
          )}
        />
        <DatePicker
          {...datePickerProps(
            "firstGradeRegistrationYear",
            "Anul înmatriculării în clasa I"
          )}
          renderInput={(params) => (
            <TextField
              {...params}
              sx={{ mx: 1.2 }}
              variant="standard"
              required
              helperText={null}
            />
          )}
        />
      </Box>
    </Box>
  );

  const professorAndLocalAdminForm = () => (
    <Box display="flex" flexDirection="column" my={2}>
      <Box {...boxProps()}>
        <TextField {...textFieldProps("lastname", "Nume")} />
        <TextField {...textFieldProps("firstname", "Prenume")} />
      </Box>
      <TextField {...textFieldProps("school", "Școală")} />
      <Box {...boxProps()}>
        <TextField {...textFieldProps("city", "Localitate")} />
        <TextField {...textFieldProps("email", "Email")} />
      </Box>
    </Box>
  );

  const contributorForm = () => (
    <Box display="flex" flexDirection="column" my={2}>
      <Box {...boxProps()}>
        <TextField {...textFieldProps("lastname", "Nume")} />
        <TextField {...textFieldProps("firstname", "Prenume")} />
      </Box>
      <TextField {...textFieldProps("email", "Email")} />
    </Box>
  );

  const formByUserRole = () => {
    if (role === "ROLE_STUDENT") return studentForm();
    if (role === "ROLE_PROFESSOR") return professorAndLocalAdminForm();
    if (role === "ROLE_LOCALADMIN") return professorAndLocalAdminForm();
    if (role === "ROLE_CONTRIBUTOR") return contributorForm();
  };

  return role ? (
    <Box>
      <Typography color="secondary.main" fontSize={13} fontWeight="bold">
        Toate câmpurile notate cu (*) sunt obligatorii!
      </Typography>
      {formByUserRole()}
      <Tooltip title="Înregistrează utilizator" arrow placement="bottom">
        <Button variant="contained" size="medium" onClick={handleAddUser}>
          Salvează
        </Button>
      </Tooltip>
    </Box>
  ) : (
    <></>
  );
}
