import React from "react";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";

export default function QuestionItem({ question, onApprove, onDeny }) {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>
          <QuizTwoToneIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography sx={{ fontSize: 14, fontWeight: "bold" }}>
              {question.question.question}
            </Typography>
          }
          secondary={
            <Typography sx={{ fontSize: 12, whiteSpace: "pre-wrap" }}>
              {`Author: ${question.author.username} \nBook title: ${question.book.title}`}
            </Typography>
          }
        />
        <Tooltip title="Acceptă" arrow placement="right">
          <IconButton aria-label="accept" onClick={onApprove}>
            <CheckCircleOutlinedIcon sx={{ fill: "#43aa8b" }} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Refuză" arrow placement="right">
          <IconButton edge="end" aria-label="deny" onClick={onDeny}>
            <DoDisturbAltOutlinedIcon sx={{ fill: "#ae2012" }} />
          </IconButton>
        </Tooltip>
      </ListItemButton>
    </ListItem>
  );
}
