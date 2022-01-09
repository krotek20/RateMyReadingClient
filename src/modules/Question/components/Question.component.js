import React from "react";
import {
  Box,
  TextField,
  Tooltip,
  IconButton,
  Switch,
  Typography,
} from "@mui/material";
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

  const handleSwitchChange = (e) => {
    dispatch(updateQuestion({ ...question, type: e.target.checked ? 0 : 1 }));
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
          labels={
            question.type === 0
              ? ["Adevarat", "Fals"]
              : [...Array(4).keys()].map((x) => "answer" + (x + 1))
          }
          question={question}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-start",
            mx: 2.5,
            alignItems: "center",
          }}
        >
          <Switch
            checked={question.type === 0 ? true : false}
            color="primary"
            onChange={handleSwitchChange}
          />
          <Typography>
            {question.type === 0 ? "Adevarat / Fals" : "4 răspunsuri"}
          </Typography>
        </Box>
      </Box>
    </Tooltip>
  );
}
