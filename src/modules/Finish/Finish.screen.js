import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { feedbackQuiz, minTwoDigits } from "../../utils";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import "./Finish.scss";

export default function FinishScreen() {
  const quiz = useSelector((state) => state.quizResult);
  const navigate = useNavigate();

  const calculateTimeLeft = () => {
    const startDate = new Date(quiz.startDate);
    const endDate = new Date(quiz.endDate);
    let difference = +endDate - +startDate;
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

  const [time] = useState(calculateTimeLeft());

  return (
    <Box
      className="result_container"
      sx={{
        "&:hover": {
          bgcolor: "secondary.main",
          boxShadow: "inset 0 1.5em 1.5em -0.5em rgba(255, 255, 255, 0.5)",
          transform: "scale(1.02)",
          p: {
            color: "white",
            transform: "none",
          },
          h3: {
            color: "white",
            borderBottomColor: "white",
          },
          h4: {
            color: "white",
          },
          svg: {
            color: "white",
          },
        },
      }}
    >
      <Box sx={{ flex: 1, minHeight: "50px" }}>
        <Typography variant="h3">SCOR</Typography>
        <Typography>{quiz.book.title}</Typography>
        <Typography>
          Finalizat în: {minTwoDigits(time.minutes)}:
          {minTwoDigits(time.seconds)}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, minHeight: "50px", m: 2 }}></Box>
      <Box
        className="result_container__scale"
        sx={{ flex: 1, minHeight: "50px", m: 2 }}
      >
        <Typography variant="h4">
          {quiz.numberOfCorrectAnswers} / {quiz.numberOfQuestions}
        </Typography>
        <Typography>Răspunsuri corecte</Typography>
        <Typography>
          {
            feedbackQuiz[quiz.numberOfCorrectAnswers][
              Math.floor(
                Math.random() * feedbackQuiz[quiz.numberOfCorrectAnswers].length
              )
            ]
          }
        </Typography>
        <Typography mt={2}>Ai obținut {quiz.points} puncte.</Typography>
      </Box>
      <Box>
        <Tooltip title="ÎNTOARCE-TE LA PRIMA PAGINĂ" arrow>
          <IconButton aria-label="Home" onClick={() => navigate("/")}>
            <HomeRoundedIcon className="img_active" />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
