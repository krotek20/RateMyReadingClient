import React from "react";
import { Box, TextField, Tooltip, IconButton } from "@mui/material";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../../../redux/Question/Question";
import DeleteTwoToneIcon from "@mui/icons-material/DeleteTwoTone";
import Answers from "../../../core/QuestionAnswer/Answer.component";

export default function QuestionItem({
  question,
  noOfActiveQuestions,
  onDelete,
}) {
  const dispatch = useDispatch();

  const handleOnChange = (e) => {
    dispatch(updateQuestion({ ...question, question: e.target.value }));
  };

  return (
    <Tooltip
      componentsProps={{
        arrow: {
          sx: {
            color: "#6c757d",
          },
        },
        tooltip: {
          sx: {
            backgroundColor: "#f8f9fa",
            borderRadius: "20%",
            boxShadow:
              "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
          },
        },
      }}
      title={
        noOfActiveQuestions > 5 ? (
          <IconButton aria-label="delete" onClick={() => onDelete(question.id)}>
            <DeleteTwoToneIcon color="primary" />
          </IconButton>
        ) : (
          ""
        )
      }
      placement="right"
      arrow
    >
      <Box
        sx={{
          width: "100%",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          alignItems: "center",
          marginTop: "30px",
          zIndex: 11,
          transition: "0.4s",
          "&:hover": {
            backgroundColor: "#f8f9fa",
          },
        }}
      >
        <TextField
          sx={{
            width: "100%",
          }}
          inputProps={{ maxLength: 250 }}
          id="outlined-textarea"
          label="Enunțul întrebării"
          defaultValue={question.question}
          onChange={handleOnChange}
          multiline
        />
        <Answers
          labels={[...Array(4).keys()].map((x) => "answer" + (x + 1))}
          question={question}
        />
      </Box>
    </Tooltip>
  );
}
