import React, { useState, useEffect } from "react";
import { Tooltip, Typography, Box } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { getBooks } from "../Book/Book.api";
import "./DashBoard.scss";
import BookAutoComplete from "../../core/BookAutoComplete/BookAutoComplete.component";
import BookCard from "./components/BookCard";
import { avatarNames } from "../../utils";
import Legend from "../../core/Legend/Legend.component";

const unselectedPalette = "?colors=e9ecef,dee2e6,adb5bd,6c757d,495057";

export default function DashBoard() {
  const [books, setBooks] = useState([]);
  const [book, setBook] = useState(null);
  const avatarName =
    avatarNames[Math.floor(Math.random() * avatarNames.length)];
  const navigate = useNavigate();

  useEffect(() => {
    getBooks()
      .payload.then((response) => setBooks(response.data))
      .catch((error) => {
        console.log(error);
        navigate("/login", { replace: true });
      });
  }, [setBooks, navigate]);

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
                <Box component={NavLink} to="quiz">
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
