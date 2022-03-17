import React from "react";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Tooltip,
} from "@mui/material";
import { colorByDifficulty } from "../../../utils";

export default function Book({ book, onDelete }) {
  return (
    <Tooltip title={`ISBN: ${book.isbn}`} arrow placement="left">
      <ListItem
        disablePadding
        secondaryAction={
          <Tooltip title="Sterge carte" arrow placement="right">
            <IconButton edge="end" aria-label="delete" onClick={onDelete}>
              <DeleteTwoToneIcon />
            </IconButton>
          </Tooltip>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <MenuBookTwoToneIcon
              style={{ fill: colorByDifficulty(book.difficulty) }}
            />
          </ListItemIcon>
          <ListItemText
            primary={book.title}
            secondaryTypographyProps={{ style: { whiteSpace: "pre-wrap" } }}
            secondary={book.author + "\npunctaj: " + book.points}
          />
        </ListItemButton>
      </ListItem>
    </Tooltip>
  );
}
