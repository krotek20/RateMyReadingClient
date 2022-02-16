import React from "react";
import { List, Typography } from "@mui/material";
import QuestionItem from "./QuestionItem";

export default function QuestionList({
  questions,
  onApprove,
  onDeny,
  onEdit,
  onDelete,
  onOpenDialog,
}) {
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
        questions.map((question) =>
          onApprove ? (
            <QuestionItem
              key={question.question.id}
              question={question}
              onApprove={(e) => {
                e.stopPropagation();
                return onApprove(question.question);
              }}
              onDeny={(e) => {
                e.stopPropagation();
                return onDeny(question.question);
              }}
              onOpenDialog={() => onOpenDialog(question)}
            />
          ) : (
            <QuestionItem
              key={question.question.id}
              question={question}
              onEdit={(e) => {
                e.stopPropagation();
                return onEdit(question);
              }}
              onDelete={(e) => {
                e.stopPropagation();
                return onDelete(question.question);
              }}
              onOpenDialog={() => onOpenDialog(question)}
            />
          )
        )
      ) : (
        <Typography>Nu sunt întrebări noi</Typography>
      )}
    </List>
  );
}
