import React, { useState, useEffect } from "react";
import { makeStyles } from "@mui/styles";
import { Box, Typography, Stack, TextField } from "@mui/material";
import Progress from "../../../core/Charts/Progress.component";
import { getActiveSchoolsByPeriod, getTotalSchools } from "../Metrics.api";
import { useNavigate } from "react-router-dom";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    height: 250,
    [theme.breakpoints.down("md")]: {
      height: 200,
    },
  },
}));

export default function NumberOfActiveSchoolsInPeriod() {
  const [active, setActive] = useState(0);
  const [total, setTotal] = useState(0);
  const [value, setValue] = useState([null, null]);
  const [loading, isLoading] = useState(false);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    isLoading(true);
    const [start, end] = [...value];
    const endFinalDay = new Date(end);
    endFinalDay.setDate(endFinalDay.getDate() + 1);
    getActiveSchoolsByPeriod(
      start ? start.toISOString() : new Date().toISOString(),
      end ? endFinalDay.toISOString() : new Date().toISOString()
    )
      .payload.then((response) => {
        if (response.status === 200) {
          setActive(response.data);
          return getTotalSchools().payload;
        }
      })
      .then((response) => {
        if (response.status === 200) {
          setTotal(response.data);
          isLoading(false);
        }
      })
      .catch((error) => {
        isLoading(false);
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  }, [value, navigate]);

  return (
    <Box className={c.container}>
      <Typography variant="h6" mb={2}>
        Școlile în care cel puțin 10 elevi au rezolvat un chestionar într-o
        anumită perioadă
      </Typography>
      <Stack spacing={3}>
        <MobileDateRangePicker
          mask="__.__.____"
          startText="Din data de"
          endText="Până în data de"
          cancelText="Renunță"
          toolbarTitle="Alege perioada"
          todayText="Astăzi"
          clearText="Ștergeți"
          clearable
          loading={loading}
          value={value}
          onChange={(newValue) => {
            setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <React.Fragment>
              <TextField {...startProps} />
              <Box sx={{ mx: 2, fontSize: 32 }}> - </Box>
              <TextField {...endProps} />
            </React.Fragment>
          )}
        />
      </Stack>
      <Progress value={active} total={total} mb={5} mt={2} />
      <Typography>
        Numărul școlilor active din perioada selectată: {active}
      </Typography>
      <Typography>Numărul total de școli: {total}</Typography>
    </Box>
  );
}
