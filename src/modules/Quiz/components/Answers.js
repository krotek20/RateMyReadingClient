import React, { useState } from "react";
import {
  FormControl,
  Box,
  Radio,
  FormLabel,
  RadioGroup,
  Typography,
} from "@mui/material";

const answers = ["a", "b", "c", "d"];

export default function Answers({ labels, handleIsAnswered, selectedAnswer }) {
  const [selectedValue, setSelectedValue] = useState(selectedAnswer);

  const handleChange = (e) => {
    const correctAnswer = e.target.value;
    setSelectedValue(correctAnswer);
    handleIsAnswered(correctAnswer);
    selectedAnswer = correctAnswer;
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
      <FormLabel fontSize={12} component="legend">
        Alege un răspuns
      </FormLabel>
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
            <Typography>{answers[index]}.</Typography>
            <Radio {...controlProps(label)} />
            <Typography>{label}</Typography>
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
