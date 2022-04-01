import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import { getSchools } from "../../config/School.api";
import { useNavigate } from "react-router-dom";

export default function Schools() {
  const [schools, setSchools] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getSchools()
      .payload.then((response) => {
        if (response.status === 200) {
          setSchools([...response.data.map((school) => school.name)]);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  }, [setSchools, navigate]);

  return (
    <Autocomplete
      disablePortal
      fullWidth
      id="schoolsAutoComplete"
      options={schools}
      renderInput={(params) => (
        <TextField
          {...params}
          margin="normal"
          label="Școli"
          required
          name="school"
        />
      )}
    />
  );
}
