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
import { updateQuestion } from "../../../redux/Question/Question";

export default function Answers({ labels, question }) {
  const [selectedValue, setSelectedValue] = useState(0);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setSelectedValue(e);
    dispatch(
      updateQuestion({
        ...question,
        correctAnswer: e,
      })
    );
  };

  const handleAnswerChange = (e) => {
    if (e.target.value !== "") {
      dispatch(
        updateQuestion({ ...question, [`${e.target.id}`]: e.target.value })
      );
    }
  };

  const controlProps = (item, index) => ({
    checked: selectedValue === index,
    onChange: () => handleChange(index),
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
        {labels.map((label, index) => (
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
            <Radio {...controlProps(label, index + 1)} />
            {labels.length === 4 ? (
              <TextField
                key={label}
                id={label}
                placeholder="Răspuns"
                multiline
                fullWidth
                style={{ zIndex: "999", width: "80vw", maxWidth: 500 }}
                defaultValue={question[label]}
                inputProps={{ maxLength: 250 }}
                onBlur={handleAnswerChange}
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
