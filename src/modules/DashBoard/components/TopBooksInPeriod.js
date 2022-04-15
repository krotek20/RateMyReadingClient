import React, { useState, useEffect } from "react";
import { Box, Typography, Stack, TextField } from "@mui/material";
import { getTop25BooksInPeriod } from "../Metrics.api";
import { useNavigate } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import Table from "../../../core/Table/CustomTable.component";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
  },
}));

export default function TopBooksInPeriod() {
  const [data, setData] = useState([]);
  const [value, setValue] = useState([null, null]);
  const [loading, isLoading] = useState(false);

  const navigate = useNavigate();
  const c = useStyles();

  useEffect(() => {
    isLoading(true);
    const [start, end] = [...value];
    const endFinalDay = new Date(end);
    endFinalDay.setDate(endFinalDay.getDate() + 1);
    getTop25BooksInPeriod(
      start ? start.toISOString() : new Date().toISOString(),
      end ? endFinalDay.toISOString() : new Date().toISOString()
    )
      .payload.then((response) => {
        if (response.status === 200) {
          const newData = [];

          response.data.forEach((resp) => {
            newData.push({
              name: resp.name,
              author: resp.author,
              publisher: resp.publisher,
              quizzes: resp.quizzes,
            });
          });

          setData(newData);
          isLoading(false);
        }
      })
      .catch((error) => {
        isLoading(false);
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  }, [navigate, value]);

  return (
    <Box className={c.container}>
      <Typography variant="h6" mb={2}>
        Top 25 cărți după numărul de chestionare într-o anumită perioadă
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
      {data.length !== 0 ? (
        <Table
          data={data}
          header={["Titlu", "Autor", "Editura", "Nr. chestionare"]}
        />
      ) : (
        <Typography color="secondary" fontSize={18} my={10}>
          Nu există date de afișat pentru perioada selectată
        </Typography>
      )}
    </Box>
  );
}
