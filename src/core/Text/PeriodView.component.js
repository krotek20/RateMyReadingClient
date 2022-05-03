import React from "react";
import { Box, Typography } from "@mui/material";

export default function PeriodView({ period }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center",
        width: "100%",
      }}
    >
      <Typography fontSize={14}>
        Dată de început:{" "}
        {period[0]
          ? period[0].toLocaleDateString("ro-RO")
          : "Nu a fost selectată"}
      </Typography>
      <Typography fontSize={14}>
        Dată de sfârșit:{" "}
        {period[1]
          ? period[1].toLocaleDateString("ro-RO")
          : "Nu a fost selectată"}
      </Typography>
    </Box>
  );
}
