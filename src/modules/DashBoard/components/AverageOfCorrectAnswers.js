import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getCorrectAnswerPercentage } from "../Metrics.api";
import { useNavigate } from "react-router-dom";
import { colorByDifficulty } from "../../../utils";
import { makeStyles } from "@mui/styles";
import Progress from "../../../core/Charts/Progress.component";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 300,
    [theme.breakpoints.down("md")]: {
      height: 250,
    },
  },
}));

export default function AverageOfCorrectAnswers() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    getCorrectAnswerPercentage()
      .payload.then((response) => {
        if (response.status === 200) {
          const newData = [];

          response.data.forEach((resp) => {
            const difficulty =
              resp.difficulty.charAt(0).toUpperCase() +
              resp.difficulty.slice(1);
            newData.push({
              count: resp.count,
              difficulty: difficulty,
              barColor: colorByDifficulty(resp.difficulty),
              color:
                difficulty === "Incepator"
                  ? "rgba(63, 167, 150, 0.3)"
                  : difficulty === "Mediu"
                  ? "rgba(80, 32, 100, 0.3)"
                  : difficulty === "Avansat"
                  ? "rgba(255, 189, 53, 0.3)"
                  : "rgba(21, 114, 161, 0.3)",
            });
          });

          setData(newData);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  }, [navigate]);

  return (
    <Box className={c.container}>
      <Typography variant="h6" mb={2}>
        Media răspunsurilor corecte în funcție de dificultate
      </Typography>
      {data.length !== 0 ? (
        data.map((progress) => (
          <Box
            key={progress.difficulty}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "center",
              width: "100%",
            }}
          >
            <Typography alignSelf="flex-start" ml={4}>
              {progress.difficulty}
            </Typography>
            <Progress
              value={progress.count}
              total={100}
              mb={2}
              mt={1}
              barColorPrimary={progress.barColor}
              colorPrimary={progress.color}
            />
          </Box>
        ))
      ) : (
        <Typography color="secondary" fontSize={18} my={10}>
          Nu există date de afișat
        </Typography>
      )}
    </Box>
  );
}
