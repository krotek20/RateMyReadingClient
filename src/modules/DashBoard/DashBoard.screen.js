import React, { useState, useEffect } from "react";
import { CssBaseline, Grid } from "@mui/material";
// import { useSelector } from "react-redux";
import QuizzesByDifficulty from "./components/QuizzesByDifficulty";
import { useDecode } from "../../hooks/useDecode";
import QuizzesByDifficultyInPeriod from "./components/QuizzesByDifficultyInPeriod";

export default function DashBoard() {
  // const color = useSelector((state) => state.color);
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

  const gridItem = (xs, sm, md, lg, pt) => ({
    xs: xs,
    sm: sm,
    md: md,
    lg: lg,
    m: 2,
    pt: pt,
    pb: 5,
    px: 2,
    sx: {
      flex: 1,
      borderRadius: "10px",
      zIndex: 10,
      opacity: 0.75,
      background: "#f8f7ff",
      transition: "1s ease",
      boxShadow:
        "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      "&:hover": {
        opacity: 1,
        background: "#fff",
        transition: "1s ease",
      },
    },
  });

  return (
    <Grid container justifyContent="center" alignItems="center" width="100%">
      <CssBaseline />
      {currentRole === 1 && (
        <Grid {...gridItem(9, 9, 5, 6, 7)} item>
          <QuizzesByDifficulty />
        </Grid>
      )}
      {currentRole !== 0 && (
        <Grid {...gridItem(9, 9, 6, 5, 12)} item>
          <QuizzesByDifficultyInPeriod />
        </Grid>
      )}
    </Grid>
  );
}
