import React from "react";
import "../Quiz.scss";
import { Typography, Box } from "@mui/material";
import Answers from "./Answers";
import { useSelector } from "react-redux";

export const selectedAnswers = [...Array(5).keys()].map(() => "");

export default function Question({ questionIndex }) {
  const questions = useSelector((state) => state.quiz.questions);
  console.log(questions);
  return questions.length > 0 ? (
    <Box
      key={questionIndex}
      className="container_question"
      sx={{
        "&:hover": {
          backgroundColor: "#f8f9fa",
        },
      }}
    >
      <Typography variant="h6">{questions[questionIndex].question}</Typography>
      <Answers
        labels={
          questions[questionIndex].type === 0
            ? [
                questions[questionIndex].answer1,
                questions[questionIndex].answer2,
              ]
            : [
                questions[questionIndex].answer1,
                questions[questionIndex].answer2,
                questions[questionIndex].answer3,
                questions[questionIndex].answer4,
              ]
        }
        handleIsAnswered={(selectedAnswer) => {
          selectedAnswers[questionIndex] = selectedAnswer;
        }}
        selectedAnswer={selectedAnswers[questionIndex]}
      />
    </Box>
  ) : (
    <></>
  );
}
