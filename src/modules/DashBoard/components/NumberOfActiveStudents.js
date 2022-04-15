import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import Progress from "../../../core/Charts/Progress.component";
import { getActiveStudents, getTotalStudents } from "../Metrics.api";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 150,
    [theme.breakpoints.down("md")]: {
      height: 100,
    },
  },
}));

export default function NumberOfActiveStudents() {
  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    getActiveStudents()
      .payload.then((response) => {
        if (response.status === 200) {
          setActive(response.data);
          return getTotalStudents().payload;
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
  }, [navigate]);

  return (
    <Box className={c.container}>
      <Typography variant="h6">
        Elevii care au rezolvat cel puțin un chestionar
      </Typography>
      <Progress value={active} total={total} mb={5} mt={2} />
      <Typography>Numărul elevilor activi: {active}</Typography>
      <Typography>Numărul total de elevi: {total}</Typography>
    </Box>
  );
}
