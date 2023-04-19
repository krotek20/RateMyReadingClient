import React from "react";
import { Box, Divider, List } from "@mui/material";
import UserItem from "./UserItem";

const UserList = (props) => {
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        marginBottom: "15px",
      }}
    >
      {props.users.map((user, index) => (
        <Box key={index}>
          <UserItem user={user} infoClick={props.infoClick.bind(null, user)} />
          <Divider variant="middle" />
        </Box>
      ))}
    </List>
  );
};

export default UserList;
