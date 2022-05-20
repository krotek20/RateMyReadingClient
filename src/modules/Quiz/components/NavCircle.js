import React from "react";
import { Grid } from "@mui/material";
import { useTheme } from "@mui/styles";

export default function NavCircle({ item, selectedQuestion, selectedAnswer }) {
  const theme = useTheme();

  return (
    <Grid
      item
      key={item}
      className="container_circle"
      // onClick={() => handleNavigationClick(item + 1)}
      sx={{
        bgcolor: `${
          selectedAnswer && item + 1 === parseInt(selectedQuestion)
            ? "secondary.main"
            : selectedAnswer
            ? "primary.main"
            : item + 1 === parseInt(selectedQuestion)
            ? "secondary.main"
            : "white"
        }`,
        color: `${
          selectedAnswer || item + 1 === parseInt(selectedQuestion)
            ? theme.palette.secondary.contrastText
            : "black"
        }`,
        "&:hover, &:active": {
          bgcolor: "secondary.main",
          color: theme.palette.secondary.contrastText,
        },
      }}
    >
      <div className="history_content">{item + 1}</div>
    </Grid>
  );
}
