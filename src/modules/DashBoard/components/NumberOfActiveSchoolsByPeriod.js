import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import Progress from "../../../core/Charts/Progress.component";
import { getActiveSchoolsByPeriod, getTotalSchools } from "../Metrics.api";
import { useNavigate } from "react-router-dom";
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
    minHeight: 300,
    position: "relative",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "10px",
  },
}));

export default function NumberOfActiveSchoolsInPeriod({ period }) {
  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    const [start, end] = [...period];
    const endFinalDay = new Date(end);
    endFinalDay.setDate(endFinalDay.getDate() + 1);
    getActiveSchoolsByPeriod(
      start ? start.toISOString() : new Date().toISOString(),
      end ? endFinalDay.toISOString() : new Date().toISOString()
    )
      .payload.then((response) => {
        if (response.status === 200) {
          setActive(response.data);
          return getTotalSchools().payload;
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setTotal(response.data);
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
        divId="numberOfActiveSchools"
        downloadName={`numar_scoli_active${
          period[0] ? "_" + period[0].toLocaleDateString("ro-RO") : ""
        }${period[1] ? "_" + period[1].toLocaleDateString("ro-RO") : ""}.png`}
      />
      <Box id="numberOfActiveSchools" className={c.box}>
        <Typography variant="h6" mb={2}>
          Școlile în care cel puțin 10 elevi au rezolvat un chestionar într-o
          anumită perioadă
        </Typography>
        <PeriodView period={period} />
        <Progress value={active} total={total} mb={5} mt={2} />
        <Typography fontSize={14}>Numărul școlilor active: {active}</Typography>
        <Typography fontSize={14}>Numărul total de școli: {total}</Typography>
      </Box>
    </Box>
  );
}
