import React from "react";
import { Box, Typography } from "@mui/material";
import { colorByDifficulty } from "../../../utils";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";

export default function BookCard({ book }) {
  const typographyProps = (fontSize, align) => ({
    fontSize: fontSize,
    alignSelf: align,
  });

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
      <Typography {...typographyProps(11, "center")}>
        de {book.author}
      </Typography>
      <br></br>
      <br></br>
      <Typography {...typographyProps(13, "flex-start")}>
        Dificultate: {book.difficulty}
      </Typography>
      <Typography {...typographyProps(13, "flex-start")}>
        Total puncte: {book.points}
      </Typography>
      <Typography {...typographyProps(13, "flex-start")}>
        Număr de încercări rămase: {2 - book.attempts}/2
      </Typography>
    </Box>
  ) : (
    <></>
  );
}
