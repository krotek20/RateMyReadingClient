import React from "react";
import "../Quiz.scss";
import { Typography, Box } from "@mui/material";
import Answers from "./Answers";
import { useSelector, useDispatch } from "react-redux";
import { updateAnswer } from "../../../redux/Quiz/Quiz";

export default function Question({ questionIndex, selectedAnswer }) {
  const questions = useSelector((state) => state.quiz.questions);
  const dispatch = useDispatch();

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
      <Typography variant="h6" sx={{ userSelect: "none" }}>
        {questions[questionIndex].question}
      </Typography>
      <Answers
        labels={
          questions[questionIndex].type === 0
            ? ["Adevărat", "Fals"]
            : [
                questions[questionIndex].answer1,
                questions[questionIndex].answer2,
                questions[questionIndex].answer3,
                questions[questionIndex].answer4,
              ]
        }
        handleIsAnswered={(chosenAnswer) => {
          selectedAnswer = chosenAnswer;
          dispatch(
            updateAnswer({
              questionId: questions[questionIndex].id,
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
