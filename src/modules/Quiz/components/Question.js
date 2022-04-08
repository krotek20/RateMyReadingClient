import React from "react";
import "../Quiz.scss";
import { Typography, Box } from "@mui/material";
import Answers from "./Answers";
import { useDispatch } from "react-redux";
import { updateAnswer } from "../../../redux/Quiz/Quiz";

export default function Question({ question, selectedAnswer }) {
  const dispatch = useDispatch();

  return question ? (
    <Box
      key={question.id}
      className="container_question"
      sx={{
        "&:hover": {
          backgroundColor: "#f8f9fa",
        },
      }}
    >
      <Typography variant="h6" sx={{ userSelect: "none" }}>
        {question.question}
      </Typography>
      <Answers
        labels={question.answers}
        handleIsAnswered={(chosenAnswer) => {
          selectedAnswer = chosenAnswer;
          dispatch(
            updateAnswer({
              questionId: question.id,
              correctAnswer: chosenAnswer,
            })
          );
        }}
        selectedAnswer={selectedAnswer}
      />
    </Box>
  ) : (
    <></>
  );
}
