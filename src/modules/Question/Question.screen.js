import React, { useState, useEffect } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import { getBooks } from "../Book/Book.api";
import {
  getSavedQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "./Question.api";
import Question from "./components/Question";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuestion,
  removeQuestion,
  removeAll,
} from "../../redux/Question/Question";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "./Question.css";
import BookAutoComplete from "../../core/BookAutoComplete/BookAutoComplete.component";
import { getId } from "../Login/Login.api";

export default function AddQuestions() {
  const [books, setBooks] = useState([]);
  const [currentBookId, setCurrentBookId] = useState(0);
  const questions = useSelector((state) => state.question.activeQuestions);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  useEffect(() => {
    getBooks()
      .payload.then((response) => setBooks(response.data))
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  }, [setBooks, navigate]);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleBookSelection = (book) => {
    if (book === null) {
      dispatch(removeAll());
      setCurrentBookId(0);
      return;
    }
    if (books.some((b) => b.id === book.id)) {
      dispatch(removeAll());
      getSavedQuestions(book.id)
        .payload.then((response) => {
          for (const resp of response.data) {
            dispatch(addQuestion(resp));
          }
          setCurrentBookId(book.id);
        })
        .catch((error) => {
          navigate("/login", { replace: true });
        });
    }
  };

  const handleAddQuestion = () => {
    if (currentBookId !== 0) {
      const newQuestion = {
        bookId: currentBookId,
        userId: 1,
        type: 1,
        answer1: "",
        answer2: "",
        answer3: "",
        answer4: "",
        correctAnswer: 0,
        question: "",
        status: 0,
      };
      getId()
        .payload.then((res) => res.data)
        .then((userId) => (newQuestion.userId = userId))
        .then(() => {
          createQuestion(newQuestion)
            .payload.then((response) => dispatch(addQuestion(response.data)))
            .catch((error) => {
              navigate("/login", { replace: true });
            });
        });
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
      questions.forEach((x) => {
        if (x.question !== "") {
          updateQuestion({ ...x, status: 0 }).payload.catch((error) => {
            navigate("/login", { replace: true });
          });
        }
      });
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
    deleteQuestion(id).payload.catch((error) => {
      navigate("/login", { replace: true });
    });
    dispatch(removeQuestion(id));
    handleAlert("success", "Ștergere efectuată cu succes!");
  };

  const checkQuestion = (question) => {
    if (question.question === null) return false;
    if (question.answer1 === null) return false;
    if (question.answer2 === null) return false;
    if (
      question.type === 1 &&
      (question.answer3 === null || question.answer4 === null)
    ) {
      return false;
    }
    if (question.correctAnswer === null) return false;
    return true;
  };

  const handleSendForValidation = () => {
    if (questions.length >= 5 && currentBookId !== 0) {
      for (let question of questions) {
        if (question.type === 0) {
          question = { ...question, answer1: "Adevarat", answer2: "Fals" };
        }
        if (!checkQuestion(question)) {
          handleAlert("error", "Toate întrebările trebuie să fie completate");
          return;
        }
      }
      questions.forEach((x) => {
        updateQuestion({ ...x, status: 1 }).payload.catch(() => {
          navigate("/login", { replace: true });
        });
      });
      handleAlert(
        "success",
        "Întrebările au fost trimise cu succes catre validare"
      );
      dispatch(removeAll());
      setCurrentBookId(0);
    } else {
      handleAlert(
        "error",
        "Trebuie sa aveți o carte selectată pentru a salva întrebările!"
      );
    }
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
      <BookAutoComplete books={books} bookSelection={handleBookSelection} />
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 13 }}>
          Puteți salva local întrebările create folosind
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 13 }}>CTRL + SHIFT + S</Typography>
      {currentBookId !== 0 && questions.length !== 0 ? (
        questions.map((question) => (
          <Question
            key={question.id}
            question={question}
            noOfActiveQuestions={questions.length}
            onDelete={handleOnDelete}
          />
        ))
      ) : (
        <></>
      )}
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
          <Button
            variant="contained"
            size="medium"
            onClick={handleSendForValidation}
          >
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
