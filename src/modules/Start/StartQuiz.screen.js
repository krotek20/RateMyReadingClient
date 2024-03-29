import React, { useState, useEffect } from "react";
import { Tooltip, Typography, Box, Skeleton, Grid } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getBooksWithTries } from "../Book/Book.api";
import "./StartQuiz.scss";
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
import { logout } from "../../core/NavigationMenu/Logout.api";
import ConfirmDialog, {
  confirmDialog,
} from "../../core/Dialogs/ConfirmDialog.component";

const unselectedPalette = "?colors=e9ecef,dee2e6,adb5bd,6c757d,495057";

export default function StartQuiz() {
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
          logout();
          navigate("/login", { replace: true });
        }
      });
  }, [setBooks, navigate]);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const mapQuestions = (questions) => {
    return [
      ...questions.map((question) => {
        const type = question.type;
        return {
          id: question.id,
          bookId: question.bookId,
          question: question.question,
          status: question.status,
          type: type,
          answers: [...Array(type === 0 ? 2 : 4).keys()]
            .map((index) => {
              return {
                answer: question[`answer${index + 1}`],
                index: index + 1,
              };
            })
            .sort(() => Math.random() - 0.5),
        };
      }),
    ];
  };

  const errorMessage = (error) => {
    const [message, minutes] = error.response.data.message.split(":");
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
                dispatch(
                  addQuiz({
                    ...res.data,
                    questions: mapQuestions(res.data.questions),
                  })
                );
              }
              return res.data.id;
            })
            .then((id) => {
              navigate(`quiz/${id}`);
            })
            .catch((error) => {
              if (error.response.status !== 403) {
                errorMessage(error);
              } else {
                logout();
                navigate("/login", { replace: true });
              }
            })
        );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "space-between",
        height: "70vh",
      }}
    >
      <ConfirmDialog />
      <Typography color="secondary" variant="h5" sx={{ my: 2 }}>
        Selectează o carte și începe!
      </Typography>
      <Grid
        container
        sx={{
          display: "flex",
          flexDirection: "row",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Grid item>
          <Legend onClick={() => {}} />
          {loading ? (
            <Skeleton
              variant="rectangle"
              width={300}
              height={56}
              animation="wave"
              sx={{ my: 1 }}
            />
          ) : (
            <BookAutoComplete
              books={books}
              bookSelection={(book) => dispatch(setCurrentBook(book))}
              difficulty={true}
            />
          )}
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
                  <Box
                    onClick={() =>
                      confirmDialog(
                        `Ești sigur că dorești să începi chestionarul pentru cartea ${book.title}?`,
                        () => generateQuiz()
                      )
                    }
                  >
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
        </Grid>
        <Grid item>
          <BookCard book={book} />
        </Grid>
      </Grid>
      <Grid item></Grid>
    </Box>
  );
}
