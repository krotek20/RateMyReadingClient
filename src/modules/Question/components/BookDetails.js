import React from "react";
import { Typography, Box } from "@mui/material";

const BookDetails = (props) => {
  return (
    <Box
      mt={2}
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Typography fontSize={13} color="secondary.main">
        Autor: {props.author}
      </Typography>
      <Typography fontSize={13} color="secondary.main">
        Dificultate: {props.difficulty}
      </Typography>
      <Typography fontSize={13} color="secondary.main">
        Puncte: {props.points}
      </Typography>
    </Box>
  );
};

export default BookDetails;
