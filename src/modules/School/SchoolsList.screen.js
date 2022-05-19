import React, { useState, useEffect, useMemo } from "react";
import { Box, Typography, Skeleton, List, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Search from "../../core/Search/Search.component";
import { getSchools } from "./School.api";
import { logout } from "../../core/NavigationMenu/Logout.api";
import { localeIncludes } from "../../utils";
import SchoolItem from "./components/SchoolItem";

export default function SchoolsList() {
  const [loading, isLoading] = useState(false);
  const [schools, setSchools] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const filteredSchools = useMemo(() => {
    if (!search) return schools;
    return schools.filter((elem) => {
      const name = elem.name.toString().toLowerCase();
      return localeIncludes(name, search.toString().toLowerCase(), {
        usage: "search",
        sensitivity: "base",
      });
    });
  }, [search, schools]);

  useEffect(() => {
    isLoading(true);
    getSchools()
      .payload.then((response) => {
        setSchools(response.data);
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
    <Box
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
        Lista școlilor
      </Typography>
      {schools.length > 0 && (
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
          {filteredSchools.map((school, index) => (
            <Box key={index}>
              <SchoolItem school={school} />
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
            height={316}
          />
        </Stack>
      )}
    </Box>
  );
}
