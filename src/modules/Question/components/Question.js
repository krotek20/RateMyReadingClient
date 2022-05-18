import React from "react";
import {
  Box,
  TextField,
  Tooltip,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../../../redux/Question/Question";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Answers from "./Answers";

export default function Question({
  question,
  noOfActiveQuestions,
  onDelete,
  counter,
}) {
  const dispatch = useDispatch();

  const handleOnChangeQuestion = (e) => {
    dispatch(updateQuestion({ ...question, question: e.target.value.trim() }));
  };

  const handleSwitchChange = (e) => {
    dispatch(
      updateQuestion({
        ...question,
        type: e.target.checked ? 0 : 1,
      })
    );
  };

  const handleOnChangePageNumber = (e) => {
    dispatch(
      updateQuestion({
        ...question,
        pageNumber: e.target.value !== null ? parseInt(e.target.value) : null,
      })
    );
  };

  return (
    <Box
      sx={{
        flex: 1,
        width: 450,
        border: "1px solid #ccc",
        borderRadius: "10px",
        bgcolor: "white",
        padding: "10px",
        alignItems: "center",
        marginTop: "30px",
        mx: 2,
        zIndex: 11,
        transition: "0.4s",
        "&:hover": {
          backgroundColor: "#f8f9fa",
        },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Typography sx={{ fontSize: 20 }}>{counter}.</Typography>
        <TextField
          sx={{
            width: "100%",
            mx: 1.2,
          }}
          inputProps={{ maxLength: 250 }}
          id="outlined-textarea"
          label="Enunțul întrebării"
          defaultValue={question.question}
          onBlur={handleOnChangeQuestion}
          multiline
        />
        {noOfActiveQuestions > 5 && (
          <Tooltip title="Șterge" arrow>
            <IconButton
              variant="contained"
              aria-label="delete"
              onClick={() => onDelete(question.id)}
            >
              <DeleteTwoToneIcon color="primary" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Answers
        labels={
          question.type === 0
            ? ["Adevărat", "Fals"]
            : [...Array(4).keys()].map((x) => "answer" + (x + 1))
        }
        question={question}
      />
      <Box display="flex" alignItems="center" justifyContent="center" m={0.8}>
        <Typography color="secondary.main">
          Răspunsul se găsește la pagina{" "}
        </Typography>
        <TextField
          sx={{ mx: 1, width: 70 }}
          type="number"
          defaultValue={question.pageNumber}
          onChange={handleOnChangePageNumber}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
        mb={2}
      >
        <Typography color={`${question.type === 1 ? "secondary" : ""}`}>
          4 variante de răspunsuri
        </Typography>
        <Switch
          checked={question.type === 0 ? true : false}
          color="primary"
          onChange={handleSwitchChange}
        />
        <Typography color={`${question.type === 0 ? "secondary" : ""}`}>
          Adevărat / Fals
        </Typography>
      </Box>
    </Box>
  );
}
