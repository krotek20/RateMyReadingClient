import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getPointsByDiffInPeriod } from "../Metrics.api";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Bar from "../../../core/Charts/Bar.component";
import { colorByDifficulty } from "../../../utils";
import DownloadFab from "../../../core/DownloadButton/DownloadFab.component";
import PeriodView from "../../../core/Text/PeriodView.component";

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

export default function NumberOfPointsByDifficultyInPeriod({ period }) {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    const [start, end] = [...period];
    const endFinalDay = new Date(end);
    endFinalDay.setDate(endFinalDay.getDate() + 1);
    getPointsByDiffInPeriod(
      start ? start.toISOString() : new Date().toISOString(),
      end ? endFinalDay.toISOString() : new Date().toISOString()
    )
      .payload.then((response) => {
        if (response.status === 200) {
          const newData = [];

          response.data.forEach((resp) => {
            const difficulty =
              resp.difficulty.charAt(0).toUpperCase() +
              resp.difficulty.slice(1);
            console.log(resp.count);
            newData.push({
              count: resp.count,
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
  }, [navigate, period]);

  return (
    <Box className={c.container}>
      <DownloadFab
        divId="numberOfPoints"
        downloadName={`numar_puncte${
          period[0] ? "_" + period[0].toLocaleDateString("ro-RO") : ""
        }${period[1] ? "_" + period[1].toLocaleDateString("ro-RO") : ""}.png`}
      />
      <Box id="numberOfPoints" className={c.box}>
        <Typography variant="h6" mb={2}>
          Numărul total de puncte pe fiecare dificultate într-o anumită perioadă
        </Typography>
        <PeriodView period={period} />
        {data.length !== 0 ? (
          <Bar
            data={data}
            marginTop={20}
            marginBottom={60}
            leftAxisText="Număr de puncte"
          />
        ) : (
          <Typography color="secondary" fontSize={18} my={10}>
            Nu există date de afișat pentru perioada selectată
          </Typography>
        )}
      </Box>
    </Box>
  );
}
