import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import Pie from "../../../core/Charts/Pie.component";
import { getQuizzesByDiff } from "../Metrics.api";
import { useNavigate } from "react-router-dom";
import { colorByDifficulty } from "../../../utils";
import { makeStyles } from "@mui/styles";
import DownloadFab from "../../../core/DownloadButton/DownloadFab.component";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
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
    position: "relative",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "50px 25px",
    height: 300,
    [theme.breakpoints.down("md")]: {
      height: 250,
    },
    marginTop: "20px",
  },
}));

export default function QuizzesByDifficulty() {
  const [diffColors, setDiffColors] = useState([]);
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    getQuizzesByDiff()
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
      <DownloadFab
        divId="quizzesByDiff"
        downloadName="numar_chestionare_dificultate.png"
      />
      <Box id="quizzesByDiff" className={c.box}>
        <Typography variant="h6" mb={2}>
          Numărul de chestionare create pentru fiecare dificultate
        </Typography>
        {data.length !== 0 ? (
          <Pie
            data={data}
            colors={diffColors}
            innerRadius={0.5}
            marginTop={20}
            marginBottom={60}
          />
        ) : (
          <Typography color="secondary" fontSize={18} my={10}>
            Nu există date de afișat
          </Typography>
        )}
      </Box>
    </Box>
  );
}
