import React from "react";
import { Box, Grid } from "@mui/material";
import QuizzesByDifficultyInPeriod from "../components/QuizzesByDifficultyInPeriod";
import NumberOfActiveStudentsInPeriod from "../components/NumberOfActiveStudentsInPeriod";
import NumberOfPointsByDifficultyInPeriod from "../components/NumberOfPointsByDifficultyInPeriod";
import AverageOfCorrectAnswers from "../components/AverageOfCorrectAnswers";
import TopBooksInPeriod from "../components/TopBooksInPeriod";

export default function LocalAdminDashboard({ period }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={6}>
          <NumberOfActiveStudentsInPeriod period={period} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <AverageOfCorrectAnswers />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1.5}>
        <Grid item xs={12} md={6} lg={6}>
          <QuizzesByDifficultyInPeriod period={period} />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <NumberOfPointsByDifficultyInPeriod period={period} />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1.5}>
        <Grid item xs={12} md={12} lg={12}>
          <TopBooksInPeriod period={period} />
        </Grid>
      </Grid>
    </Box>
  );
}
