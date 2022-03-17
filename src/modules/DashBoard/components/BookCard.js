import React from "react";
import { Box, Typography } from "@mui/material";
import { colorByDifficulty } from "../../../utils";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";

export default function BookCard({ book }) {
  return book ? (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        borderRadius: "10px",
        p: 3,
        maxWidth: 360,
        bgcolor: "#f2f2f2",
        zIndex: 10,
        m: 4,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <MenuBookTwoToneIcon
        style={{
          fill: colorByDifficulty(book.difficulty),
          alignSelf: "center",
        }}
      />
      <Typography color="secondary" variant="h5">
        {book.title}
      </Typography>
      <Typography fontSize={11} alignSelf="flex-end">
        de {book.author}
      </Typography>
      <br></br>
      <Typography fontSize={13} alignSelf="flex-start">
        Dificultate:{" "}
        <Box component="span" color={() => colorByDifficulty(book.difficulty)}>
          {book.difficulty}
        </Box>
      </Typography>
      <Typography fontSize={13} alignSelf="flex-start">
        Puncte: {book.points}
      </Typography>
    </Box>
  ) : (
    <></>
  );
}
