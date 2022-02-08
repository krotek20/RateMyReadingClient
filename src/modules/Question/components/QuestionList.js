import React from "react";
import { List, Typography } from "@mui/material";
import QuestionItem from "./QuestionItem";

export default function QuestionList({ questions, onApprove, onDeny }) {
  return (
    <List
      dense
      sx={{
        bgcolor: "#f8f9fa",
        position: "relative",
        overflow: "auto",
        maxHeight: 360,
        m: 2,
      }}
    >
      {questions.length !== 0 ? (
        questions.map((question) => {
          return (
            <QuestionItem
              key={question.question.id}
              question={question}
              onApprove={() => onApprove(question.question)}
              onDeny={() => onDeny(question.question)}
            />
          );
        })
      ) : (
        <Typography>Nu sunt întrebări noi</Typography>
      )}
    </List>
  );
}
