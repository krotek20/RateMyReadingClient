import React, { useState, useEffect } from "react";
import { Tooltip, Typography, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../Book/Book.api";
import "./DashBoard.scss";
import BookAutoComplete from "../../core/BookAutoComplete/BookAutoComplete.component";
import BookCard from "./components/BookCard";
import { avatarNames } from "../../utils";
import Legend from "../../core/Legend/Legend.component";
import { quizGeneration } from "../Quiz/Quiz.api";
import { getId } from "../Login/Login.api";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { addQuiz, removeQuiz } from "../../redux/Quiz/Quiz";

const unselectedPalette = "?colors=e9ecef,dee2e6,adb5bd,6c757d,495057";

export default function DashBoard() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const avatarName =
    avatarNames[Math.floor(Math.random() * avatarNames.length)];
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  useEffect(() => {
    getBooks()
      .payload.then((response) => setBooks(response.data))
      .catch((error) => {
        console.log(error);
        navigate("/login", { replace: true });
      });
  }, [setBooks, navigate]);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const generateQuiz = () => {
    if (book !== null) {
      getId()
        .payload.then((res) => res.data)
        .then((userId) =>
          quizGeneration(book.id, userId)
            .payload.then((res) => {
              dispatch(removeQuiz());
              if (res.status === 200) {
                dispatch(addQuiz(res.data));
              }
              return res;
            })
            .then((res) => {
              navigate(`quiz/${res.data.id}`);
            })
            .catch(() => {
              handleAlert(
                "error",
                "Nu există suficiente întrebări pentru a începe un quiz pe această carte!"
              );
            })
        );
    }
  };

  return (
    <Box className="container_first">
      <Box>
        <Typography
          color="secondary"
          variant="h5"
          component="div"
          sx={{ my: 2, textAlign: "center" }}
        >
          Selectează o carte și începe quiz-ul!
        </Typography>
        <Legend />
      </Box>
      <Box className="container_second">
        <Box
          sx={{ justifyContent: "center", alignItems: "center", flex: 1, m: 4 }}
        >
          <BookAutoComplete
            books={books}
            bookSelection={(book) => setBook(book)}
            difficulty={true}
          />
          <Box sx={{ mt: 2 }}>
            <Tooltip title="START QUIZ" arrow>
              {book ? (
                <Box onClick={generateQuiz}>
                  <img
                    className="start_quiz_img_active"
                    src={`https://source.boringavatars.com/beam/100/${avatarName}/`}
                    alt="START QUIZ"
                  />
                </Box>
              ) : (
                <img
                  src={`https://source.boringavatars.com/beam/100/${avatarName}/${unselectedPalette}`}
                  alt="START QUIZ"
                />
              )}
            </Tooltip>
          </Box>
        </Box>
        <BookCard book={book} />
      </Box>
      <Box></Box>
    </Box>
  );
}
