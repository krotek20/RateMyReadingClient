import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getAvgPointsByDifficulty } from "../Metrics.api";
import { useNavigate } from "react-router-dom";
import { colorByDifficulty } from "../../../utils";
import { makeStyles } from "@mui/styles";
import Bar from "../../../core/Charts/Bar.component";
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
    height: 300,
    [theme.breakpoints.down("md")]: {
      height: 250,
    },
    padding: "50px 25px",
    marginTop: "20px",
  },
}));

export default function AveragePointsByDifficulty() {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    getAvgPointsByDifficulty()
      .payload.then((response) => {
        if (response.status === 200) {
          const newData = [];

          response.data.forEach((resp) => {
            const difficulty =
              resp.difficulty.charAt(0).toUpperCase() +
              resp.difficulty.slice(1);
            newData.push({
              count: resp.count.toFixed(2),
              difficulty: difficulty,
              color: colorByDifficulty(resp.difficulty),
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
      <DownloadFab
        divId="averagePointsByDiff"
        downloadName="medie_puncte.png"
      />
      <Box id="averagePointsByDiff" className={c.box}>
        <Typography variant="h6" mb={2}>
          Media punctelor obținute pe chestionare (după dificultate)
        </Typography>
        {data.length !== 0 ? (
          <Bar
            data={data}
            marginTop={20}
            marginBottom={60}
            leftAxisText="Media"
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
