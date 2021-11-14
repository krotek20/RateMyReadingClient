import React, { useState, useEffect } from "react";
import { Box, TextField, Autocomplete, Button, Tooltip } from "@mui/material";
import { getBooks } from "../Book/Book.api";
import {
  getSavedQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "./Question.api";
import QuestionItem from "./components/Question.component";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuestion,
  removeQuestion,
  removeAll,
} from "../../redux/Question/Question";
import { useSnackbar } from "notistack";
import "./Question.css";

export default function AddQuestions() {
  const [books, setBooks] = useState([]);
  const [currentBookId, setCurrentBookId] = useState(0);
  const questions = useSelector((state) => state.question.activeQuestions);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getBooks().payload.then((response) => setBooks(response.data));
  }, [setBooks]);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleBookSelection = (book) => {
    if (book === null) {
      setCurrentBookId(0);
      dispatch(removeAll());
      return;
    }
    if (books.some((b) => b.id === book.id)) {
      setCurrentBookId(book.id);
      dispatch(removeAll());
      getSavedQuestions(book.id, 1).payload.then((response) => {
        for (const resp of response.data) {
          dispatch(addQuestion(resp));
        }
      });
    }
  };

  const handleAddQuestion = () => {
    if (currentBookId !== 0) {
      const newQuestion = {
        bookId: currentBookId,
        userId: 1,
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: 0,
        question: "",
        status: 0,
      };
      createQuestion(newQuestion).payload.then((response) =>
        dispatch(addQuestion(response.data))
      );
      handleAlert("success", "Întrebare adăugată cu succes!");
    } else {
      handleAlert(
        "error",
        "Trebuie sa aveți o carte selectată pentru a adăuga întrebări noi!"
      );
    }
  };

  const handleLocalSave = () => {
    if (questions.length >= 5 && currentBookId !== 0) {
      questions.map((x) => updateQuestion(x));
      handleAlert("success", "Salvare efectuată cu succes!");
    } else {
      handleAlert(
        "error",
        "Trebuie sa aveți o carte selectată pentru a salva întrebările!"
      );
    }
  };

  document.onkeyup = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "S") {
      handleLocalSave();
    }
  };

  const handleOnDelete = (id) => {
    deleteQuestion(id);
    dispatch(removeQuestion(id));
    handleAlert("success", "Ștergere efectuată cu succes!");
  };

  return (
    <Box
      sx={{
        width: "100%",
        borderRadius: "10px",
        padding: "10px",
        bgcolor: "white",
        display: "flex",
        maxWidth: 600,
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Autocomplete
        id="grouped-demo"
        options={books.sort(
          (a, b) =>
            -b.title
              .charAt(0)
              .toLowerCase()
              .localeCompare(a.title.charAt(0).toLowerCase())
        )}
        groupBy={(option) => option.title.charAt(0)}
        getOptionLabel={(option) => option.title}
        sx={{ width: 300, marginTop: "10px" }}
        renderInput={(params) => (
          <TextField {...params} id="bookTextField" label="Alege carte" />
        )}
        onChange={(event, value) => handleBookSelection(value)}
      />
      {questions.map((question) => (
        <QuestionItem
          key={question.id}
          question={question}
          noOfActiveQuestions={questions.length}
          onDelete={handleOnDelete}
        />
      ))}
      <Box
        sx={{
          padding: "10px",
          "& button": { m: 1 },
        }}
      >
        <Tooltip title="Adaugă o nouă întrebare" arrow placement="top">
          <Button variant="contained" size="medium" onClick={handleAddQuestion}>
            Adaugă întrebare
          </Button>
        </Tooltip>
        <Tooltip title="Trimite întrebările compuse" arrow placement="top">
          <Button variant="contained" size="medium">
            Trimite
          </Button>
        </Tooltip>
        <Tooltip
          title="Salvează întrebările scrise (Ctrl + Shift + S)"
          arrow
          placement="top"
        >
          <Button variant="contained" size="medium" onClick={handleLocalSave}>
            Salvează
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
