import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getSchools } from "../../modules/School/School.api";
import { useNavigate } from "react-router-dom";
import { logout } from "../NavigationMenu/Logout.api";

export default function Schools({ variant, fullWidth, onInputChange }) {
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSchools()
      .payload.then((response) => {
        if (response.status === 200) {
          setSchools([...response.data]);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        }
      });
  }, [setSchools, navigate]);

  return (
    <Autocomplete
      disablePortal
      id="schoolsAutoComplete"
      sx={{ mx: 1.2, mb: 1.5 }}
      options={schools}
      fullWidth={fullWidth}
      getOptionLabel={(option) => option.name}
      isOptionEqualToValue={(option, value) => option === value}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          label="Școli"
          fullWidth
          required
          name="school"
          variant={variant}
        />
      )}
      onChange={onInputChange}
    />
  );
}
