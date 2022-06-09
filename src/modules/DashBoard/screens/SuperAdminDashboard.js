import React from "react";
import { Grid, Box } from "@mui/material";
import QuizzesByDifficultyInPeriod from "../components/QuizzesByDifficultyInPeriod";
import NumberOfActiveStudents from "../components/NumberOfActiveStudents";
import NumberOfActiveStudentsInPeriod from "../components/NumberOfActiveStudentsInPeriod";
import QuizzesByDifficulty from "../components/QuizzesByDifficulty";
import NumberOfActiveSchoolsInPeriod from "../components/NumberOfActiveSchoolsByPeriod";
import AveragePointsByDifficulty from "../components/AveragePointsByDifficulty";
import AveragePointsByDifficultyInPeriod from "../components/AveragePointsByDifficultyInPeriod";
import TopUsersInPeriod from "../components/TopUsersInPeriod";
import TopSchoolsInPeriod from "../components/TopSchoolsInPeriod";
import TopBooksInPeriod from "../components/TopBooksInPeriod";
import NumberOfPointsByDifficultyInPeriod from "../components/NumberOfPointsByDifficultyInPeriod";
import AverageOfCorrectAnswers from "../components/AverageOfCorrectAnswers";

export default function SuperAdminDashboard({ period, onCollectData }) {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
    >
      <Grid container spacing={3}>
        <Grid item xs={12} md={6} lg={4}>
          <NumberOfActiveStudents onCollectData={onCollectData} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <NumberOfActiveStudentsInPeriod
            period={period}
            onCollectData={onCollectData}
          />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <NumberOfActiveSchoolsInPeriod period={period} />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1.5}>
        <Grid item xs lg={12}>
          <AverageOfCorrectAnswers />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1.5}>
        <Grid item xs={12} md={12} lg={4}>
          <TopBooksInPeriod period={period} />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TopUsersInPeriod period={period} />
        </Grid>
        <Grid item xs={12} md={12} lg={4}>
          <TopSchoolsInPeriod period={period} />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1.5}>
        <Grid item xs={12} md={6} lg={6}>
          <QuizzesByDifficulty />
        </Grid>
        <Grid item xs={12} md={6} lg={6}>
          <QuizzesByDifficultyInPeriod period={period} />
        </Grid>
      </Grid>
      <Grid container spacing={3} mt={1.5}>
        <Grid item xs={12} md={6} lg={4}>
          <AveragePointsByDifficulty />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <AveragePointsByDifficultyInPeriod period={period} />
        </Grid>
        <Grid item xs={12} md={6} lg={4}>
          <NumberOfPointsByDifficultyInPeriod period={period} />
        </Grid>
      </Grid>
    </Box>
  );
}
