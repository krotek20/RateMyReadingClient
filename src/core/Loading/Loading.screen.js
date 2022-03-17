import React, { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import EmojiObjectsIcon from "@mui/icons-material/EmojiObjects";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";

export default function Loading() {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "auto");
  }, []);

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <CircularProgress sx={{ my: 2 }} color="primary" />
      <Typography sx={{ userSelect: "none" }} color="secondary">
        Pagina se încarcă...
      </Typography>
      {[...Array(50).keys()].map((key) => {
        const x = Math.max(0, Math.floor(Math.random() * window.innerHeight));
        const y = Math.max(0, Math.floor(Math.random() * window.innerWidth));
        return key % 5 === 0 ? (
          <EmojiEventsIcon
            key={key}
            sx={{
              position: "absolute",
              top: x,
              left: y,
              opacity: Math.random(),
              fontSize: Math.floor(Math.random() * 50) + 15,
              color: "secondary.main",
            }}
          />
        ) : key % 5 === 1 ? (
          <EmojiObjectsIcon
            key={key}
            sx={{
              position: "absolute",
              top: x,
              left: y,
              opacity: Math.random(),
              fontSize: Math.floor(Math.random() * 50) + 15,
              color: "secondary.main",
            }}
          />
        ) : key % 5 === 2 ? (
          <EmojiEmotionsIcon
            key={key}
            sx={{
              position: "absolute",
              top: x,
              left: y,
              opacity: Math.random(),
              fontSize: Math.floor(Math.random() * 50) + 15,
              color: "secondary.main",
            }}
          />
        ) : key % 5 === 3 ? (
          <FavoriteIcon
            key={key}
            sx={{
              position: "absolute",
              top: x,
              left: y,
              opacity: Math.random(),
              fontSize: Math.floor(Math.random() * 50) + 15,
              color: "secondary.main",
            }}
          />
        ) : (
          <AutoStoriesIcon
            key={key}
            sx={{
              position: "absolute",
              top: x,
              left: y,
              opacity: Math.random(),
              fontSize: Math.floor(Math.random() * 50) + 15,
              color: "secondary.main",
            }}
          />
        );
      })}
    </Box>
  );
}
