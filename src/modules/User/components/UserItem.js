import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Typography,
  Tooltip,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import { useTheme } from "@mui/styles";
import { useNavigate } from "react-router-dom";

export default function UserItem({ user }) {
  const theme = useTheme();
  const navigate = useNavigate();

  const getRole = (role) => {
    if (role === "ROLE_STUDENT") return "Elev";
    if (role === "ROLE_PROFESSOR") return "Profesor";
    if (role === "ROLE_CONTRIBUTOR") return "Contributor";
    if (role === "ROLE_LOCALADMIN") return "Local Admin";
    if (role === "ROLE_SUPERADMIN") return "Super Admin";
    return "Invalid";
  };

  return (
    <ListItem
      disablePadding
      secondaryAction={
        user.role === "ROLE_STUDENT" && (
          <Tooltip title="Istoric puncte" arrow>
            <IconButton
              edge="end"
              aria-label="points history"
              // onClick={() => {
              //   navigate(`info`, {
              //     state: { username: user.username },
              //   });
              // }}
            >
              <InfoIcon
                style={{ fill: theme.palette.primary.main, fontSize: 30 }}
              />
            </IconButton>
          </Tooltip>
        )
      }
    >
      <ListItemButton>
        <ListItemText
          primary={
            <Typography color="secondary">
              {user.lastName +
                " " +
                user.firstName +
                " (" +
                user.username +
                ")"}
            </Typography>
          }
          secondaryTypographyProps={{ style: { whiteSpace: "pre-wrap" } }}
          secondary={
            "Membru din: " +
            new Date(user.registrationDate).toLocaleString("ro-RO") +
            "\n" +
            "Ultima dată activ: " +
            (new Date().toDateString() ===
            new Date(user.lastLogin).toDateString()
              ? "Azi"
              : new Date(Date.now() - 864e5).toDateString() ===
                new Date(user.lastLogin).toDateString()
              ? "Ieri"
              : new Date(user.lastLogin).toLocaleDateString("ro-RO")) +
            "\n" +
            (user.email ? "Email: " + user.email + "\n" : "") +
            (user.schoolName ? "Școală: " + user.schoolName + "\n" : "") +
            "Rol: " +
            getRole(user.role)
          }
        />
      </ListItemButton>
    </ListItem>
  );
}
