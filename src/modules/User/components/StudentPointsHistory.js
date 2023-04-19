import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Table from "../../../core/Table/CustomTable.component";
import { getStudentReport } from "../User.api";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    zIndex: 10,
    background: "#f8f7ff",
    transition: "1s ease",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    "&:hover": {
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
    padding: "15px",
  },
}));

export default function StudentPointsHistory({ user }) {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    getStudentReport(
      user.username,
      new Date().toISOString(),
      new Date().toISOString()
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
  }, [navigate, user.username]);

  return (
    <Box className={c.container}>
      <Box className={c.box}>
        <Typography variant="h6" color="secondary.main" mb={2}>
          {"ISTORICUL PUNCTELOR (" + user.lastName + " " + user.firstName + ")"}
        </Typography>
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
