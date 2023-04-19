import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { getSelfStudentReport } from "../Metrics.api";
import Table from "../../../core/Table/CustomTable.component";
// import PeriodView from "../../../core/Text/PeriodView.component";
import { Box, Typography } from "@mui/material";

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

export default function SelfStudentReport({ period }) {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    const [start, end] = [...period];
    const endFinalDay = new Date(end);
    endFinalDay.setDate(endFinalDay.getDate() + 1);
    getSelfStudentReport(
      start ? start.toISOString() : new Date().toISOString(),
      end ? endFinalDay.toISOString() : new Date().toISOString()
    )
      .payload.then((response) => {
        if (response.status === 200) {
          const newHistory = [];
          let totalPoints = response.data.currentPoints;

          response.data.pointsHistory.reverse().forEach((data) => {
            let reason = data.note;
            if (data.amount >= 0) {
              reason =
                "Chestionar rezolvat pentru cartea " +
                data.note.split("book:")[1];
            }

            newHistory.push({
              points: data.amount > 0 ? "+" + data.amount : data.amount,
              reason: reason ? reason : "-",
              date: new Date(data.date).toLocaleDateString("ro-RO"),
              totalPoints: totalPoints,
            });
            totalPoints = totalPoints - data.amount;
          });

          setHistory(newHistory);
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
      <Box className={c.box}>
        <Typography variant="h6" mb={2}>
          ISTORICUL PUNCTELOR
        </Typography>
        {/* <PeriodView period={period} /> */}
        {history.length !== 0 ? (
          <Table
            data={history}
            header={["Puncte", "Motiv", "Dată (zi.lună.an)", "Total puncte"]}
            colorful={true}
          />
        ) : (
          <Typography color="secondary" fontSize={18} my={10}>
            Momentan nu ai puncte câștigate!
          </Typography>
        )}
      </Box>
    </Box>
  );
}
