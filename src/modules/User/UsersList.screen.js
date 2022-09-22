import React, { useEffect, useState, useMemo } from "react";
import {
  Box,
  Skeleton,
  Typography,
  Stack,
  List,
  Divider,
  Grid,
  Fade,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getAllUsers } from "./User.api";
import { localeIncludes } from "../../utils";
import { useDecode } from "../../hooks/useDecode";
import Search from "../../core/Search/Search.component";
import UserItem from "./components/UserItem";
import Roles from "../../core/AutoComplete/Roles.component";
import { logout } from "../../core/NavigationMenu/Logout.api";
import StudentPointsHistory from "./components/StudentPointsHistory";

export default function UsersList() {
  const [loading, isLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");
  const [role, setRole] = useState("");
  const [showInfo, setShowInfo] = useState(null);
  const [animation, setAnimation] = useState(false);
  const navigate = useNavigate();
  const decode = useDecode();

  const filteredUsers = useMemo(() => {
    if (!search && !filter) return users;
    if (!search)
      return users.filter((elem) =>
        localeIncludes(elem.role, filter, {
          usage: "search",
          sensitivity: "base",
        })
      );
    return users.filter((elem) => {
      if (
        filter &&
        !localeIncludes(elem.role, filter, {
          usage: "search",
          sensitivity: "base",
        })
      )
        return false;
      const username = elem.username.toString().toLowerCase();
      return localeIncludes(username, search.toString().toLowerCase(), {
        usage: "search",
        sensitivity: "base",
      });
    });
  }, [search, filter, users]);

  useEffect(() => {
    const user = decode();
    setRole(user.roles[0]);
  }, [decode]);

  useEffect(() => {
    isLoading(true);
    getAllUsers()
      .payload.then((response) => {
        setUsers(response.data);
        isLoading(false);
      })
      .catch((error) => {
        isLoading(false);
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        }
      });
  }, [navigate]);

  return (
    <Grid
      container
      spacing={3}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      my={3}
    >
      <Grid
        item
        sx={{
          flex: 1,
          width: "100%",
          borderRadius: "10px",
          padding: "10px",
          maxWidth: 360,
          bgcolor: "white",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          zIndex: 10,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <Typography variant="h5" color="secondary.main">
          Lista utilizatorilor
        </Typography>
        {users.length > 0 && (
          <Box
            my={1}
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Search
              searchFunction={(e) => setSearch(e.target.value)}
              text="Caută după nume"
            />
            <Roles
              onInputChange={(e, value) => setFilter(value ? value.role : "")}
              role={role}
            />
          </Box>
        )}
        {!loading ? (
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
            {filteredUsers.map((user, index) => (
              <Box key={index}>
                <UserItem
                  user={user}
                  infoClick={() => {
                    if (animation) {
                      setAnimation(false);
                      setTimeout(() => {
                        setAnimation(true);
                        setShowInfo(user);
                      }, 500);
                    } else {
                      setAnimation(true);
                      setShowInfo(user);
                    }
                  }}
                />
                <Divider variant="middle" />
              </Box>
            ))}
          </List>
        ) : (
          <Stack spacing={1} mt={2} mb={1}>
            <Skeleton
              sx={{ bgcolor: "primary" }}
              animation="wave"
              variant="rectangular"
              width={360}
              height={56}
            />
            <Skeleton
              sx={{ bgcolor: "primary" }}
              animation="wave"
              variant="rectangular"
              width={360}
              height={56}
            />
            <Skeleton
              sx={{ bgcolor: "primary" }}
              animation="wave"
              variant="rectangular"
              width={360}
              height={316}
            />
          </Stack>
        )}
      </Grid>
      {showInfo && (
        <Fade in={animation}>
          <Grid item>
            <StudentPointsHistory user={showInfo} />
          </Grid>
        </Fade>
      )}
    </Grid>
  );
}
