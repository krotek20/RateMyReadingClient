import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { getSelfQuizCount } from "../Metrics.api";

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
    padding: "20px",
    minHeight: "220px",
  },
  number: {
    background: theme.palette.primary.main,
    color: theme.palette.secondary.contrastText,
    width: 100,
    height: 100,
    borderRadius: "50%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

export default function SelfNumberOfQuizzes() {
  const [number, setNumber] = useState(null);
  const [count, setCount] = useState(0);
  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    getSelfQuizCount()
      .payload.then((response) => {
        if (response.status === 200) {
          setNumber(response.data);

          setTimeout(() => {
            if (count < number) {
              setCount(count + 1);
            }
          }, (1000 * (Math.pow(2, count) - 2)) / Math.pow(2, number));
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  }, [navigate, count, number]);

  return (
    { number } && (
      <Box className={c.container}>
        <Typography variant="h6">AI REZOLVAT</Typography>
        <Box className={c.number} my={3}>
          <Typography fontSize={36}>{count}</Typography>
        </Box>
        <Typography variant="h6">
          {number === 1 ? "CHESTIONAR" : "CHESTIONARE"}
        </Typography>
      </Box>
    )
  );
}
