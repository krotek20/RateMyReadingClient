import React from "react";
import QuizTwoToneIcon from "@mui/icons-material/QuizTwoTone";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DoDisturbAltOutlinedIcon from "@mui/icons-material/DoDisturbAltOutlined";
import {
  ListItem,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  IconButton,
  Tooltip,
  Typography,
  Box,
} from "@mui/material";

export default function QuestionItem({
  question,
  onApprove,
  onDeny,
  onEdit,
  onDelete,
  onOpenDialog,
}) {
  return (
    <ListItem
      disablePadding
      onClick={onOpenDialog}
      secondaryAction={
        onApprove ? (
          <Box display="flex" flexDirection="column">
            <Tooltip title="Acceptă" arrow placement="right">
              <IconButton aria-label="accept" onClick={onApprove}>
                <CheckCircleOutlinedIcon sx={{ fill: "#43aa8b" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Refuză" arrow placement="right">
              <IconButton aria-label="deny" onClick={onDeny}>
                <DoDisturbAltOutlinedIcon sx={{ fill: "#ae2012" }} />
              </IconButton>
            </Tooltip>
          </Box>
        ) : (
          <Box display="flex" flexDirection="column">
            <Tooltip title="Editează" arrow placement="right">
              <IconButton aria-label="edit" onClick={onEdit}>
                <EditIcon sx={{ fill: "#0096c7" }} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Șterge" arrow placement="right">
              <IconButton aria-label="delete" onClick={onDelete}>
                <DeleteIcon sx={{ fill: "#d62828" }} />
              </IconButton>
            </Tooltip>
          </Box>
        )
      }
    >
      <ListItemButton>
        <ListItemIcon>
          <QuizTwoToneIcon />
        </ListItemIcon>
        <ListItemText
          disableTypography
          primary={
            <Typography
              sx={{ fontSize: 14, fontWeight: "bold" }}
              color="secondary.main"
            >
              {question.question.question}
            </Typography>
          }
          secondary={
            <Typography sx={{ fontSize: 12, whiteSpace: "pre-wrap" }}>
              {`Propusă de: ${question.author.username} \nTitlul cărții: ${question.book.title}`}
            </Typography>
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
