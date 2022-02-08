import React, { useState } from "react";
import { Box, Typography, Tooltip, Button } from "@mui/material";
import { useTheme } from "@mui/styles";
import "./Quiz.scss";
import Question from "./components/Question";
import { selectedAnswers } from "./components/Question";

export default function QuizScreen() {
  const [selectedQuestion, setSelectedQuestion] = useState(1);
  const theme = useTheme();

  const getTextColor = () => {
    const bgColor = theme.palette.secondary.main;
    const color = bgColor.charAt(0) === "#" ? bgColor.substring(1, 7) : bgColor;
    const r = parseInt(color.substring(0, 2), 16); // hexToR
    const g = parseInt(color.substring(2, 4), 16); // hexToG
    const b = parseInt(color.substring(4, 6), 16); // hexToB
    const uicolors = [r / 255, g / 255, b / 255];
    const c = uicolors.map((col) => {
      if (col <= 0.03928) {
        return col / 12.92;
      }
      return Math.pow((col + 0.055) / 1.055, 2.4);
    });
    const L = 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
    return L > 0.179 ? "black" : "white";
  };

  const handleNavigationClick = (item) => {
    setSelectedQuestion(item);
  };

  const decrementQuestion = () => {
    setSelectedQuestion(selectedQuestion - 1);
  };

  const incrementQuestion = () => {
    setSelectedQuestion(selectedQuestion + 1);
    if (selectedQuestion + 1 === 10) {
      handleFinishQuiz();
    }
  };

  const handleFinishQuiz = () => {};

  return (
    <Box className="container">
      <Box className="container_tab">
        <Typography color="secondary">Navigare printre întrebări</Typography>
        <Box className="container_navigation">
          {[...Array(5).keys()].map((item) => (
            <Box
              key={item}
              className="container_navigation_circle"
              onClick={() => handleNavigationClick(item + 1)}
              sx={{
                bgcolor: `${
                  selectedAnswers[item + 1] && item + 1 == selectedQuestion
                    ? "secondary.main"
                    : selectedAnswers[item + 1]
                    ? "primary.main"
                    : item + 1 == selectedQuestion
                    ? "secondary.main"
                    : "white"
                }`,
                color: `${
                  selectedAnswers[item + 1] || item + 1 == selectedQuestion
                    ? getTextColor()
                    : "black"
                }`,
                "&:hover, &:active": {
                  bgcolor: "secondary.main",
                  color: `${getTextColor()}`,
                },
              }}
            >
              <div className="history_content">{item + 1}</div>
            </Box>
          ))}
        </Box>
      </Box>
      <Question questionIndex={selectedQuestion - 1} />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Tooltip title="Întrebarea anterioară" arrow placement="bottom">
          <Button
            variant="contained"
            size="medium"
            onClick={decrementQuestion}
            sx={{
              visibility: `${selectedQuestion > 1 ? "visible" : "hidden"}`,
              m: 2,
            }}
          >
            Înapoi
          </Button>
        </Tooltip>
        <Tooltip title="Întrebarea următoare" arrow placement="bottom">
          <Button
            variant="contained"
            size="medium"
            onClick={incrementQuestion}
            sx={{ m: 2 }}
          >
            {selectedQuestion < 5 ? "Următoare" : "Finalizează"}
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
