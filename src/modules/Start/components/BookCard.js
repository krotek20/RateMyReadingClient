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
        px: 3,
        pb: 3,
        pt: 5,
        maxWidth: 360,
        bgcolor: "#f2f2f2",
        position: "relative",
        m: 4,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <MenuBookTwoToneIcon
        style={{
          fill: colorByDifficulty(book.difficulty),
          position: "absolute",
          top: -30,
          fontSize: 60,
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
        Puncte carte: {book.points}
      </Typography>
      <Typography {...typographyProps(13, "flex-start")}>
        Încercări rămase: {2 - book.attempts}
      </Typography>
    </Box>
  ) : (
    <></>
  );
}
