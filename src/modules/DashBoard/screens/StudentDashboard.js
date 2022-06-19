import React from "react";
import { Grid, Box } from "@mui/material";
import SelfNumberOfQuizzes from "../components/SelfNumberOfQuizzes";
import SelfAnswersByDifficulty from "../components/SelfAnswersByDifficulty";
import SelfPointsInPeriod from "../components/SelfPointsInPeriod";
import SelfPointsByDifficultyInPeriod from "../components/SelfPointsByDifficultyInPeriod";
import SelfNumberOfQuizzesByDifficulty from "../components/SelfNumberOfQuizzesByDifficulty";
import SelfStudentReport from "../components/SelfStudentReport";

export default function StudentDashboard({ period }) {
  return (
    <Box width="90vw">
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <SelfNumberOfQuizzes />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SelfPointsInPeriod period={period} />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1.5}>
        <Grid item xs={12} md={6} lg={6}>
          <SelfNumberOfQuizzesByDifficulty />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <SelfPointsByDifficultyInPeriod period={period} />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1.5}>
        <Grid item xs={12} md={12} lg={12}>
          <SelfAnswersByDifficulty />
        </Grid>
      </Grid>
      {/* <Grid container spacing={3} mt={1.5}>
        <Grid item xs={12} md={12} lg={12}>
          <SelfStudentReport period={period} />
        </Grid>
      </Grid> */}
    </Box>
  );
}
