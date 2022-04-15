import React from "react";
import { Box, Typography, LinearProgress } from "@mui/material";

function LinearProgressWithLabel({ value, barColorPrimary, colorPrimary }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
      <Box sx={{ width: "100%", mr: 1 }}>
        <LinearProgress
          sx={{
            height: 30,
            borderRadius: 5,
            "& .MuiLinearProgress-barColorPrimary": {
              backgroundColor: barColorPrimary,
            },
            "&.MuiLinearProgress-colorPrimary": {
              backgroundColor: colorPrimary,
            },
          }}
          variant="determinate"
          value={value}
        />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" color="secondary">{`${Math.round(
          value
        )}%`}</Typography>
      </Box>
    </Box>
  );
}

export default function Progress({
  value,
  total,
  colorPrimary,
  barColorPrimary,
  mb,
  mt,
}) {
  return (
    <Box width="90%" mb={mb} mt={mt}>
      <LinearProgressWithLabel
        value={(value * 100) / total}
        colorPrimary={colorPrimary}
        barColorPrimary={barColorPrimary}
      />
    </Box>
  );
}
