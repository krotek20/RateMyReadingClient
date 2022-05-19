import React, { useState, useEffect, useRef } from "react";
import { Typography, Box } from "@mui/material";
import {
  createQuestion,
  deleteQuestion,
  getDeniedQuestions,
} from "./Question.api";
import { useNavigate } from "react-router-dom";
import QuestionList from "./components/QuestionList";
import { useSnackbar } from "notistack";
import FormDialogEdit, {
  formDialogEdit,
} from "../../core/Dialogs/FormDialogEdit.component";
import { useDispatch } from "react-redux";
import { decrementDeniedQuestions } from "../../redux/Badge/Badge";
import { logout } from "../../core/NavigationMenu/Logout.api";

export default function DeniedQuestions() {
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const populateQuestionList = useRef();
  populateQuestionList.current = () => {
    getDeniedQuestions()
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
          dispatch(decrementDeniedQuestions());
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

  const handleDelete = (item) => {
    deleteQuestion(item.id)
      .payload.then((res) => {
        if (res.status === 200) {
          handleAlert("success", "Ștergere efectuată cu succes!");
          dispatch(decrementDeniedQuestions());
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
    formDialogEdit(
      item.question,
      item.book.title,
      item.author.username,
      (newItem) => handleApprove(newItem),
      () => handleDelete(item.question)
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
        Întrebări care necesită editare
      </Typography>
      <Typography>Apasă pe o întrebare pentru a o edita</Typography>
      <QuestionList
        questions={questions}
        onEdit={handleOpenDialog}
        onDelete={handleDelete}
        onOpenDialog={handleOpenDialog}
      />
      <FormDialogEdit />
    </Box>
  );
}
