import React, { useState } from "react";
import {
  FormControl,
  Box,
  Radio,
  FormLabel,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function Answers({ labels, handleIsAnswered, selectedAnswer }) {
  const [selectedValue, setSelectedValue] = useState(selectedAnswer);

  const handleChange = (index) => {
    setSelectedValue(index);
    handleIsAnswered(index);
    selectedAnswer = index;
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
      <FormLabel fontSize={12} component="legend">
        Alege un răspuns
      </FormLabel>
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
            key={label.index}
          >
            <Radio {...controlProps(label.answer, label.index)} />
            <Typography
              sx={{ fontSize: 18, cursor: "pointer", userSelect: "none" }}
              onClick={() => handleChange(label.index)}
            >
              {label.answer}
            </Typography>
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
