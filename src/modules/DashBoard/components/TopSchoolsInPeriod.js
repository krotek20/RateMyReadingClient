import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getTop5SchoolsInPeriod } from "../Metrics.api";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import Table from "../../../core/Table/CustomTable.component";
import DownloadFab from "../../../core/DownloadButton/DownloadFab.component";
import PeriodView from "../../../core/Text/PeriodView.component";

const useStyles = makeStyles(() => ({
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
    minHeight: 350,
    position: "relative",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "10px",
    marginTop: "20px",
  },
}));

export default function TopSchoolsInPeriod({ period }) {
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    const [start, end] = [...period];
    const endFinalDay = new Date(end);
    endFinalDay.setDate(endFinalDay.getDate() + 1);
    getTop5SchoolsInPeriod(
      start ? start.toISOString() : new Date().toISOString(),
      end ? endFinalDay.toISOString() : new Date().toISOString()
    )
      .payload.then((response) => {
        if (response.status === 200) {
          const newData = [];

          response.data.forEach((resp) => {
            newData.push({
              name: resp.name,
              points: resp.points ? resp.points : 0,
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
        divId="topSchools"
        downloadName={`top_5_scoli${
          period[0] ? "_" + period[0].toLocaleDateString("ro-RO") : ""
        }${period[1] ? "_" + period[1].toLocaleDateString("ro-RO") : ""}.png`}
      />
      <Box id="topSchools" className={c.box}>
        <Typography variant="h6" mb={2}>
          Top 5 școli într-o anumită perioadă
        </Typography>
        <PeriodView period={period} />
        {data.length !== 0 ? (
          <Table data={data} header={["Școală", "Puncte obținute"]} />
        ) : (
          <Typography color="secondary" fontSize={18} my={10}>
            Nu există date de afișat pentru perioada selectată
          </Typography>
        )}
      </Box>
    </Box>
  );
}
