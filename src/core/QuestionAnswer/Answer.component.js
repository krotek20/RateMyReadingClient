import React, { useState } from "react";
import {
  Radio,
  TextField,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { updateQuestion } from "../../redux/Question/Question";

export default function Answers({ labels, question }) {
  const [selectedValue, setSelectedValue] = useState(
    "answer" + question.correctAnswer
  );
  const dispatch = useDispatch();

  const handleChange = (e) => {
    const correctAnswer = e.target.value;
    setSelectedValue(correctAnswer);
    dispatch(
      updateQuestion({
        ...question,
        correctAnswer: parseInt(
          correctAnswer.slice(correctAnswer.length - 1),
          10
        ),
      })
    );
  };

  const handleAnswerChange = (e) => {
    dispatch(
      updateQuestion({ ...question, [`${e.target.id}`]: e.target.value })
    );
  };

  const controlProps = (item) => ({
    checked: selectedValue === item,
    onChange: handleChange,
    value: item,
    name: "color-radio-button-demo",
    inputProps: { "aria-label": item },
  });

  return (
    <FormControl
      sx={{
        margin: "10px",
      }}
    >
      <FormLabel component="legend">Răspunsuri</FormLabel>
      <RadioGroup aria-label="raspunsuri" name="radio-buttons-group">
        {labels.map((label) => (
          <Box sx={{ margin: "10px" }} key={label}>
            <Radio {...controlProps(label)} />
            <TextField
              key={label}
              id={label}
              placeholder="Răspuns"
              multiline
              style={{ zIndex: "999", width: "80vw", maxWidth: 450 }}
              defaultValue={question[label]}
              inputProps={{ maxLength: 250 }}
              onChange={handleAnswerChange}
            />
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
