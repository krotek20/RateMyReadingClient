import React, { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import { createQuestion, getUnapprovedQuestions } from "./Question.api";
import { useNavigate } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import { useSnackbar } from "notistack";
import FormDialogPreview, {
  formDialogPreview,
} from "../../core/Dialogs/FormDialogPreview.component";
import { useDispatch } from "react-redux";
import {
  decrementUnapprovedQuestions,
  incremenetDeniedQuestions,
} from "../../redux/Badge/Badge";
import { logout } from "../../core/NavigationMenu/Logout.api";

export default function ApprovedQuestions() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const populateQuestionList = useRef();
  populateQuestionList.current = () => {
    getUnapprovedQuestions()
      .payload.then((response) => setQuestions(response.data))
      .catch((error) => {
        if (error.response.status === 403) {
          logout();
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
          dispatch(decrementUnapprovedQuestions());
          populateQuestionList.current();
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        }
      });
  };

  const handleDeny = (item) => {
    createQuestion({ ...item, status: 3 })
      .payload.then((response) => {
        if (response.status === 200) {
          handleAlert("success", "Întrebarea a fost refuzată cu succes");
          dispatch(decrementUnapprovedQuestions());
          dispatch(incremenetDeniedQuestions());
          populateQuestionList.current();
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        }
      });
  };

  const handleOpenDialog = (item) => {
    formDialogPreview(
      item.question,
      item.book.title,
      item.author.username,
      () => handleApprove(item.question),
      () => handleDeny(item.question)
    );
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
      <Typography variant="h5" color="secondary.main">
        Întrebări care necesită aprobare
      </Typography>
      <Typography>Apasă pe o întrebare pentru a o vizualiza</Typography>
      <QuestionList
        questions={questions}
        onApprove={handleApprove}
        onDeny={handleDeny}
        onOpenDialog={handleOpenDialog}
      />
      <FormDialogPreview />
    </Box>
  );
}
