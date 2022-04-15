import React from "react";
import { Grid } from "@mui/material";
import QuizzesByDifficultyInPeriod from "../components/QuizzesByDifficultyInPeriod";
import NumberOfActiveStudentsInPeriod from "../components/NumberOfActiveStudentsInPeriod";
import NumberOfPointsByDifficultyInPeriod from "../components/NumberOfPointsByDifficultyInPeriod";
import AverageOfCorrectAnswers from "../components/AverageOfCorrectAnswers";
import TopBooksInPeriod from "../components/TopBooksInPeriod";

const gridItem = (pt) => ({
  xs: 12,
  sm: 12,
  md: 12,
  lg: 12,
  pt: pt,
  pb: 5,
  px: 2,
  sx: {
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

export default function LocalAdminDashboard() {
  return (
    <Grid item md xs container spacing={3}>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        container
        direction="row"
        rowGap={3}
      >
        <Grid {...gridItem(7)} item>
          <NumberOfActiveStudentsInPeriod />
        </Grid>
        <Grid {...gridItem(8)} item>
          <AverageOfCorrectAnswers />
        </Grid>
        <Grid {...gridItem(12)} item>
          <QuizzesByDifficultyInPeriod />
        </Grid>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={6}
        lg={6}
        container
        direction="row"
        rowGap={3}
      >
        <Grid {...gridItem(12)} item>
          <NumberOfPointsByDifficultyInPeriod />
        </Grid>
        <Grid {...gridItem(12)} item>
          <TopBooksInPeriod />
        </Grid>
      </Grid>
    </Grid>
  );
}
