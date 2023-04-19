import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography } from "@mui/material";
import Progress from "../../../core/Charts/Progress.component";
import { getActiveStudents, getTotalStudents } from "../Metrics.api";
import { useNavigate } from "react-router-dom";
// import BeenhereOutlinedIcon from "@mui/icons-material/BeenhereOutlined";
// import BeenhereIcon from "@mui/icons-material/Beenhere";
import DownloadFab from "../../../core/DownloadButton/DownloadFab.component";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "10px",
    zIndex: 10,
    opacity: 0.75,
    background: "#f8f7ff",
    transition: "1s ease",
    boxShadow:
      "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
    "&:hover": {
      opacity: 1,
      background: "#fff",
      transition: "1s ease",
    },
    minHeight: 300,
    position: "relative",
  },
  box: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    padding: "10px",
  },
  checkbox: {
    position: "absolute",
    left: 10,
    top: 10,
    "& .MuiSvgIcon-root": { fontSize: 28 },
  },
}));

export default function NumberOfActiveStudents(/* { onCollectData } */) {
  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(0);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    getActiveStudents()
      .payload.then((response) => {
        if (response.status === 200) {
          setActive(response.data);
          return getTotalStudents().payload;
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setTotal(response.data);
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  }, [navigate]);

  return (
    <Box className={c.container}>
      {/* <Checkbox
        className={c.checkbox}
        onChange={(event, value) => {
          onCollectData(
            "studenti activi",
            value ? [{ activi: active }, { total: total }] : []
          );
        }}
        icon={<BeenhereOutlinedIcon />}
        checkedIcon={<BeenhereIcon />}
      /> */}
      <DownloadFab
        divId="numberOfActiveStudents"
        downloadName="numar_elevi_activi.png"
      />
      <Box id="numberOfActiveStudents" className={c.box}>
        <Typography variant="h6">
          Elevii care au rezolvat cel puțin un chestionar
        </Typography>
        <Progress value={active} total={total} mb={5} mt={2} />
        <Typography fontSize={14}>Numărul elevilor activi: {active}</Typography>
        <Typography fontSize={14}>Numărul total de elevi: {total}</Typography>
      </Box>
    </Box>
  );
}
