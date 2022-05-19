import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";

export default function SchoolItem({ school }) {
  console.log(school);
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText
          primary={
            <Typography color="secondary" textAlign="center">
              {school.name}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
