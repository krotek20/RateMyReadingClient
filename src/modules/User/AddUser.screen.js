import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import AddUserForm from "./components/AddUserForm";
import { useDecode } from "../../hooks/useDecode";

export default function AddUser() {
  const [role, setRole] = useState("");
  const decode = useDecode();

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

  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: "10px",
        padding: "10px",
        maxWidth: 360,
        minWidth: 200,
        minHeight: 150,
        bgcolor: "white",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 10,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Typography variant="h5" color="secondary.main">
        Adăugare noi utilizatori
      </Typography>
      <FormControl sx={{ m: 2, width: "18ch" }}>
        <InputLabel htmlFor="role-select-label">Rol</InputLabel>
        <Select
          id="role-select-label"
          value={role}
          label="Rol"
          onChange={(e) => setRole(e.target.value)}
        >
          {checkRole() !== 0 && (
            <MenuItem key="ROLE_STUDENT" value="ROLE_STUDENT">
              Elev
            </MenuItem>
          )}
          {(checkRole() === 1 || checkRole() === 2) && (
            <MenuItem key="ROLE_PROFESSOR" value="ROLE_PROFESSOR">
              Profesor
            </MenuItem>
          )}
          {checkRole() === 1 && (
            <MenuItem key="ROLE_CONTRIBUTOR" value="ROLE_CONTRIBUTOR">
              Contributor
            </MenuItem>
          )}
          {checkRole() === 1 && (
            <MenuItem key="ROLE_LOCALADMIN" value="ROLE_LOCALADMIN">
              Local Admin
            </MenuItem>
          )}
          {checkRole() === 1 && (
            <MenuItem key="ROLE_SUPERADMIN" value="ROLE_SUPERADMIN">
              Super Admin
            </MenuItem>
          )}
        </Select>
      </FormControl>
      <AddUserForm role={role} />
    </Box>
  );
}
