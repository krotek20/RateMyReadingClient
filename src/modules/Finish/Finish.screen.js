import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography, Tooltip, IconButton } from "@mui/material";
import { useTheme } from "@mui/styles";
import { useNavigate } from "react-router-dom";
import { feedbackQuiz } from "../../utils";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import "./Finish.scss";

export default function FinishScreen() {
  const quiz = useSelector((state) => state.quizResult);
  const navigate = useNavigate();
  const theme = useTheme();

  return (
    <Box
      className="result_container"
      sx={{
        bgcolor: "primary.main",
      }}
    >
      <Box sx={{ flex: 1, minHeight: "50px" }}>
        <Typography
          variant="h3"
          color={theme.palette.primary.contrastText}
          sx={{ borderColor: theme.palette.primary.contrastText }}
        >
          SCOR
        </Typography>
        <Typography color={theme.palette.primary.contrastText}>
          {quiz.book.title}
        </Typography>
        <Typography variant="body2" color={theme.palette.primary.contrastText}>
          de {quiz.book.author}
        </Typography>
      </Box>
      <Box sx={{ flex: 1, minHeight: "50px", m: 2 }}></Box>
      <Box
        className="result_container__scale"
        sx={{ flex: 1, minHeight: "50px", m: 2 }}
      >
        <Typography color={theme.palette.primary.contrastText} variant="h4">
          {quiz.numberOfCorrectAnswers} / {quiz.numberOfQuestions}
        </Typography>
        <Typography color={theme.palette.primary.contrastText}>
          Răspunsuri corecte
        </Typography>
        <Typography color={theme.palette.primary.contrastText}>
          {
            feedbackQuiz[quiz.numberOfCorrectAnswers][
              Math.floor(
                Math.random() * feedbackQuiz[quiz.numberOfCorrectAnswers].length
              )
            ]
          }
        </Typography>
        <Typography mt={2} color={theme.palette.primary.contrastText}>
          Ai obținut {quiz.points} puncte.
        </Typography>
      </Box>
      <Box>
        <Tooltip title="ÎNTOARCE-TE LA PRIMA PAGINĂ" arrow>
          <IconButton aria-label="Home" onClick={() => navigate("/")}>
            <HomeRoundedIcon
              className="img_active"
              sx={{ fill: theme.palette.primary.contrastText }}
            />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
}
