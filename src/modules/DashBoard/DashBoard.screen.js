import React, { useState, useEffect } from "react";
import { Tooltip, Typography, Box, Skeleton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getBooksWithTries } from "../Book/Book.api";
import "./DashBoard.scss";
import BookAutoComplete from "../../core/AutoComplete/Books.component";
import BookCard from "./components/BookCard";
import { avatarNames, convertToHoursAndMinutes } from "../../utils";
import Legend from "../../core/Legend/Legend.component";
import { quizGeneration } from "../Quiz/Quiz.api";
import { getId } from "../Login/Login.api";
import { useSnackbar } from "notistack";
import { addQuiz, removeQuiz } from "../../redux/Quiz/Quiz";
import { setCurrentBook } from "../../redux/Book/CurrentBook";
import { useDispatch, useSelector } from "react-redux";

const unselectedPalette = "?colors=e9ecef,dee2e6,adb5bd,6c757d,495057";

export default function DashBoard() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [avatarName, setAvatarName] = useState(
    avatarNames[Math.floor(Math.random() * avatarNames.length)]
  );

  const book = useSelector((state) => state.currentBook);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const changeAvatarName = () => {
    setAvatarName(avatarNames[Math.floor(Math.random() * avatarNames.length)]);
  };

  useEffect(() => {
    window.addEventListener("afterload", changeAvatarName);
    setTimeout(() => {
      setLoading(false);
    }, 2500);
    return () => {
      window.removeEventListener("afterload", changeAvatarName);
    };
  }, []);

  useEffect(() => {
    getBooksWithTries()
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
            .catch((error) => {
              if (error.response.status !== 403) {
                const [message, minutes] =
                  error.response.data.message.split(":");
                let time;
                if (minutes) {
                  time = convertToHoursAndMinutes(minutes);
                }
                handleAlert(
                  "error",
                  message === "Intrebari insuficiente"
                    ? "Nu există suficiente întrebări pentru a începe un chestionar pe această carte!"
                    : message === "Maxim quizuri pe zi atins"
                    ? "Limită atinsă! Ai voie sa rezolvi maxim 3 chestionare pe zi"
                    : message === "Maxim incercari atins"
                    ? "Ai atins numărul maxim de încercări pentru această carte! (maxim 2)"
                    : message === "Prea putin timp intre incercari"
                    ? `Poți completa din nou acest chestionar în ${time}`
                    : "Server error"
                );
              } else {
                navigate("/login", { replace: true });
              }
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
          Selectează o carte și începe!
        </Typography>
        <Legend onClick={() => {}} />
      </Box>
      <Box className="container_second">
        <Box
          sx={{ justifyContent: "center", alignItems: "center", flex: 1, m: 4 }}
        >
          <BookAutoComplete
            books={books}
            bookSelection={(book) => dispatch(setCurrentBook(book))}
            difficulty={true}
          />
          <Box
            sx={{
              mt: 2,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {loading ? (
              <Skeleton
                variant="circular"
                width={100}
                height={100}
                animation="wave"
              />
            ) : (
              <Tooltip title="START" arrow>
                {book ? (
                  <Box onClick={generateQuiz}>
                    <img
                      className="start_quiz_img_active"
                      src={`https://source.boringavatars.com/beam/100/${avatarName}/`}
                      alt="START"
                    />
                  </Box>
                ) : (
                  <img
                    src={`https://source.boringavatars.com/beam/100/${avatarName}/${unselectedPalette}`}
                    alt="START"
                  />
                )}
              </Tooltip>
            )}
          </Box>
        </Box>
        <BookCard book={book} />
      </Box>
      <Box></Box>
    </Box>
  );
}
