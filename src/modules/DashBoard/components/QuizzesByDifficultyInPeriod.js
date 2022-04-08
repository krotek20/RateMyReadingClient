import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { colorByDifficulty } from "../../../utils";
import Pie from "../../../core/Charts/Pie.component";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import { getQuizzesByDiffPeriod } from "../Metrics.api";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 400,
    [theme.breakpoints.down("md")]: {
      height: 350,
    },
    [theme.breakpoints.down("sm")]: {
      height: 300,
    },
  },
}));

export default function QuizzesByDifficultyInPeriod() {
  const [value, setValue] = useState([null, null]);
  const [loading, isLoading] = useState(false);
  const [diffColors, setDiffColors] = useState([]);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    isLoading(true);
    const [start, end] = [...value];
    const endFinalDay = new Date(end);
    endFinalDay.setDate(endFinalDay.getDate() + 1);
    getQuizzesByDiffPeriod(
      start ? start.toISOString() : new Date().toISOString(),
      end ? endFinalDay.toISOString() : new Date().toISOString()
    )
      .payload.then((response) => {
        if (response.status === 200) {
          const newData = [];
          const newDiffColors = [];

          response.data.forEach((resp) => {
            const difficulty =
              resp.difficulty.charAt(0).toUpperCase() +
              resp.difficulty.slice(1);
            newDiffColors.push(colorByDifficulty(difficulty));
            newData.push({
              id: difficulty.trim(),
              label: difficulty.trim(),
              value: resp.count,
              color: colorByDifficulty(difficulty.trim()),
            });
          });

          setData(newData);
          setDiffColors(newDiffColors);
          isLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
        isLoading(false);
      });
  }, [navigate, value]);

  return (
    <Box className={c.container}>
      <Typography variant="h6" mb={2}>
        Numărul de chestionare create pentru fiecare dificultate într-o anumită
        perioadă
      </Typography>
      <Stack spacing={3}>
        <MobileDateRangePicker
          mask="__.__.____"
          startText="Din data de"
          endText="Până în data de"
          cancelText="Renunță"
          toolbarTitle="Alege perioada"
          todayText="Astăzi"
          clearText="Ștergeți"
          clearable
          loading={loading}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2, fontSize: 32 }}> - </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </Stack>
      {data.length !== 0 ? (
        <Pie
          data={data}
          colors={diffColors}
          innerRadius={0}
          marginTop={50}
          marginBottom={150}
        />
      ) : (
        <Typography color="secondary" fontSize={18} my={10}>
          Nu există date de afișat pentru perioada selectată
        </Typography>
      )}
    </Box>
  );
}
