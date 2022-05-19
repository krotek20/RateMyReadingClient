import React from "react";
import { Autocomplete, TextField } from "@mui/material";

const rolesSuperAdmin = [
  {
    label: "Elev",
    role: "ROLE_STUDENT",
  },
  {
    label: "Profesor",
    role: "ROLE_PROFESSOR",
  },
  {
    label: "Contributor",
    role: "ROLE_CONTRIBUTOR",
  },
  {
    label: "Local Admin",
    role: "ROLE_LOCALADMIN",
  },
  {
    label: "Super Admin",
    role: "ROLE_SUPERADMIN",
  },
];

const rolesLocalAdmin = [
  {
    label: "Elev",
    role: "ROLE_STUDENT",
  },
  {
    label: "Profesor",
    role: "ROLE_PROFESSOR",
  },
];

export default function Roles({ onInputChange, role }) {
  return (
    role && (
      <Autocomplete
        disablePortal
        id="rolesAutoComplete"
        sx={{ mx: 1.2, mb: 1.5, width: "25ch" }}
        options={role === "ROLE_SUPERADMIN" ? rolesSuperAdmin : rolesLocalAdmin}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option === value}
        renderInput={(params) => (
          <TextField
            {...params}
            margin="normal"
            label="Filtrează după rol"
            name="role"
            variant="filled"
          />
        )}
        onChange={onInputChange}
      />
    )
  );
}
