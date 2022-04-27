import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";
import { getSelfAnswersByDiff } from "../Metrics.api";
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
    minHeight: 250,
    padding: "10px",
  },
}));

export default function SelfAnswersByDifficulty() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    getSelfAnswersByDiff()
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
        MEDIA RĂSPUNSURILOR CORECTE ÎN FUNCȚIE DE DIFICULTATE
      </Typography>
      {data.length !== 0 ? (
        <Grid container>
          {data.map((progress) => (
            <Grid key={progress.difficulty} item xs={6}>
              <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
              >
                <Typography>{progress.difficulty}</Typography>
                <Progress
                  value={progress.count}
                  total={100}
                  mb={2}
                  mt={1}
                  barColorPrimary={progress.barColor}
                  colorPrimary={progress.color}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography color="secondary" fontSize={18} my={10}>
          Nu există date de afișat
        </Typography>
      )}
    </Box>
  );
}
