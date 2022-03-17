import React, { useState, useEffect } from "react";
import { Box, Typography, Tooltip, Button } from "@mui/material";
import { useTheme } from "@mui/styles";
import "./Quiz.scss";
import Question from "./components/Question";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { quizSubmit } from "./Quiz.api";
import { addQuizResult } from "../../redux/Quiz/QuizResult";
import { useSnackbar } from "notistack";
import { minTwoDigits, getTextColor } from "../../utils";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import DoneIcon from "@mui/icons-material/Done";
import ConfirmDialog, {
  confirmDialog,
} from "../../core/Dialogs/ConfirmDialog.component";

export default function QuizScreen() {
  const quiz = useSelector((state) => state.quiz);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const selectedAnswers = quiz.questions.map((x) =>
    x.correctAnswer ? x.correctAnswer : ""
  );

  const calculateTimeLeft = () => {
    const timeLimit = new Date(quiz.startDate);
    timeLimit.setMinutes(timeLimit.getMinutes() + 15);
    const currentTime = new Date();
    let difference = +timeLimit - +currentTime;
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
      return timeLeft;
    }

    return null;
  };

  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
      if (timeLeft === null) {
        // handleFinishQuiz();
      }
    }, 1000);

    return () => clearTimeout(timer);
  });

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  // const handleNavigationClick = (item) => {
  //   setSelectedQuestion(item);
  // };

  // const decrementQuestion = () => {
  //   setSelectedQuestion(selectedQuestion - 1);
  // };

  const incrementQuestion = (item) => {
    if (!selectedAnswers[item]) {
      confirmDialog(
        "Nu ai ales nicio variantă de răspuns. Ești sigur că vrei să treci la următoarea întrebare?",
        () => {
          setSelectedQuestion(selectedQuestion + 1);
          if (selectedQuestion + 1 === 5) {
            handleFinishQuiz();
          }
        }
      );
    } else {
      setSelectedQuestion(selectedQuestion + 1);
      if (selectedQuestion + 1 === 5) {
        handleFinishQuiz();
      }
    }
  };

  const handleFinishQuiz = () => {
    let body = {};
    body.quizId = quiz.id;
    body.endDate = new Date();
    body.questions = [];
    for (const question of quiz.questions) {
      body.questions.push({
        questionId: question.id,
        chosenAnswer:
          question.correctAnswer !== undefined ? question.correctAnswer : -1,
      });
    }
    quizSubmit(body)
      .payload.then((res) => {
        if (res.status === 200) {
          dispatch(addQuizResult(res.data));
        }
        return Promise.resolve();
      })
      .then(() => {
        navigate("finish");
      })
      .catch((err) => {
        if (err.response.status === 500) {
          handleAlert("error", "Acest chestionar a fost deja completat!");
          navigate("/");
        } else {
          navigate("/login");
        }
      });
  };

  return (
    <Box className="container">
      <ConfirmDialog />
      <Box className="container_timeLimit">
        <Typography sx={{ fontSize: 25 }}>{quiz.book.title}</Typography>
        <Typography
          sx={{
            fontSize: 20,
            // color:
            // timeLeft.minutes && timeLeft.minutes < 1 ? "#ee6c4d" : "#000",
          }}
        >
          {timeLeft !== null
            ? `Timp rămas: ${minTwoDigits(timeLeft.minutes)}:${minTwoDigits(
                timeLeft.seconds
              )}`
            : `Timpul a expirat`}
        </Typography>
      </Box>
      <Box className="container_tab">
        <Typography color="secondary">Navigare printre întrebări</Typography>
        <Box className="container_navigation">
          {[...Array(5).keys()].map((item) => (
            <Box
              key={item}
              className="container_navigation_circle"
              // onClick={() => handleNavigationClick(item + 1)}
              sx={{
                bgcolor: `${
                  selectedAnswers[item] &&
                  item + 1 === parseInt(selectedQuestion)
                    ? "secondary.main"
                    : selectedAnswers[item]
                    ? "primary.main"
                    : item + 1 === parseInt(selectedQuestion)
                    ? "secondary.main"
                    : "white"
                }`,
                color: `${
                  selectedAnswers[item] ||
                  item + 1 === parseInt(selectedQuestion)
                    ? getTextColor(theme.palette.secondary.main)
                    : "black"
                }`,
                "&:hover, &:active": {
                  bgcolor: "secondary.main",
                  color: `${getTextColor(theme.palette.secondary.main)}`,
                },
              }}
            >
              <div className="history_content">{item + 1}</div>
            </Box>
          ))}
        </Box>
      </Box>
      <Question
        questionIndex={selectedQuestion - 1}
        selectedAnswer={selectedAnswers[selectedQuestion - 1]}
      />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-end",
        }}
      >
        {/* <Tooltip title="Întrebarea anterioară" arrow placement="bottom">
          <Button
            variant="contained"
            size="medium"
            onClick={decrementQuestion}
            sx={{
              visibility: `${selectedQuestion > 1 ? "visible" : "hidden"}`,
              m: 2,
            }}
          >
            Înapoi
          </Button>
        </Tooltip> */}
        <Tooltip
          title={
            selectedQuestion < 5 ? "Întrebarea următoare" : "Finalizează testul"
          }
          arrow
          placement="bottom"
        >
          <Button
            variant="contained"
            size="medium"
            onClick={
              selectedQuestion < 5
                ? () => incrementQuestion(selectedQuestion - 1)
                : handleFinishQuiz
            }
            sx={{ m: 2 }}
            endIcon={selectedQuestion < 5 ? <ArrowForwardIcon /> : <DoneIcon />}
          >
            {selectedQuestion < 5 ? "Următoare" : "Finalizează"}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
