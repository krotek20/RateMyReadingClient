import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
import { useDecode } from "../../hooks/useDecode";
import SuperAdminDashboard from "./screens/SuperAdminDashboard";
import LocalAdminDashboard from "./screens/LocalAdminDashboard";

export default function DashBoard() {
  const [currentRole, setCurrentRole] = useState(0);

  const decode = useDecode();

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

  return (
    <Grid container alignItems="center" justifyContent="center" p={3}>
      <CssBaseline />
      {currentRole === 1 && <SuperAdminDashboard />}
      {(currentRole === 2 || currentRole === 3) && <LocalAdminDashboard />}
    </Grid>
  );
}
