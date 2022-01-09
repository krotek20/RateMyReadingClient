import React, { useState } from "react";
import {
  Radio,
  TextField,
  Box,
  FormControl,
  FormLabel,
  RadioGroup,
  Typography,
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
        m: 1.2,
        flex: 1,
      }}
    >
      <FormLabel component="legend">Răspunsuri</FormLabel>
      <RadioGroup aria-label="raspunsuri" name="radio-buttons-group">
        {labels.map((label) => (
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              my: 1,
              flex: 1,
              alignItems: "center",
            }}
            key={label}
          >
            <Radio {...controlProps(label)} />
            {labels.length === 4 ? (
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
            ) : (
              <Typography>{label}</Typography>
            )}
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
