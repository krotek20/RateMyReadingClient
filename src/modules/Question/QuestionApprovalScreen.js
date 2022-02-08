import React, { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import { createQuestion, getUnapprovedQuestions } from "./Question.api";
import { useNavigate } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import { useSnackbar } from "notistack";

export default function QuestionApprovalScreen() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const populateQuestionList = useRef();
  populateQuestionList.current = () => {
    getUnapprovedQuestions()
      .payload.then((response) => setQuestions(response.data))
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  };

  useEffect(() => {
    populateQuestionList.current();
  }, [setQuestions, navigate]);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleApprove = (item) => {
    createQuestion({ ...item, status: 2 })
      .payload.then((response) => {
        if (response.status === 200) {
          handleAlert("success", "Întrebarea a fost acceptată cu succes");
          populateQuestionList.current();
        }
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  };

  const handleDeny = (item) => {
    createQuestion({ ...item, status: 0 })
      .payload.then((response) => {
        if (response.status === 200) {
          handleAlert("success", "Întrebarea a fost refuzată cu succes");
          populateQuestionList.current();
        }
      })
      .catch(() => {
        navigate("/login", { replace: true });
      });
  };

  return (
    <Box
      sx={{
        flex: 1,
        width: "100%",
        borderRadius: "10px",
        padding: "10px",
        maxWidth: 360,
        bgcolor: "white",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        zIndex: 10,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <Typography variant="h5">Întrebări care necesită aprobare</Typography>
      <QuestionList
        questions={questions}
        onApprove={handleApprove}
        onDeny={handleDeny}
      />
    </Box>
  );
}
