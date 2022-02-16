import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Radio,
  Typography,
  TextField,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Close from "@mui/icons-material/Close";
import create from "zustand";

const useFormDialogStore = create((set) => ({
  question: {
    question: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    type: 0,
    correctAnswer: 0,
    pageNumber: 0,
  },
  bookTitle: "",
  author: "",
  onEdit: undefined,
  onDelete: undefined,
  close: () => set({ onEdit: undefined, onDelete: undefined }),
}));

export const formDialogEdit = (
  question,
  bookTitle,
  author,
  onEdit,
  onDelete
) => {
  useFormDialogStore.setState({
    question,
    bookTitle,
    author,
    onEdit,
    onDelete,
  });
};

const useStyles = makeStyles((theme) => {
  return {
    actions: {
      padding: theme.spacing(2),
    },
    boxStyle: {
      display: "flex",
      flexDirection: "row",
      flex: 1,
      alignItems: "center",
    },
  };
});

const FormDialogEdit = () => {
  const c = useStyles();
  const { question, bookTitle, author, onEdit, onDelete, close } =
    useFormDialogStore();

  const handleChangeQuestion = (e) => {
    useFormDialogStore.setState({
      question: { ...question, question: e.target.value },
    });
  };

  const handleChangePageNumber = (e) => {
    useFormDialogStore.setState({
      question: {
        ...question,
        pageNumber: e.target.value !== null ? parseInt(e.target.value) : null,
      },
    });
  };

  const handleAnswerChange = (e) => {
    useFormDialogStore.setState({
      question: {
        ...question,
        [`${e.target.id + 1}`]: e.target.value,
      },
    });
  };

  const handleCorrectAnswerChange = (e) => {
    useFormDialogStore.setState({
      question: {
        ...question,
        correctAnswer: parseInt(e),
      },
    });
  };

  return (
    <Dialog
      open={!!onEdit || !!onDelete}
      onClose={close}
      maxWidth="sm"
      fullWidth
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>Editare întrebare</DialogTitle>
        <IconButton onClick={close}>
          <Close />
        </IconButton>
      </Box>
      <DialogContent>
        <Box mb={2}>
          <Typography>Titlul cății: &emsp;&emsp;{bookTitle}</Typography>
          <Typography>Propusă de: &emsp; {author}</Typography>
        </Box>
        <Box mb={1}>
          <TextField
            sx={{
              m: 1,
              width: "90%",
            }}
            inputProps={{ maxLength: 250 }}
            label="Enunțul întrebării"
            defaultValue={question.question}
            onBlur={handleChangeQuestion}
            multiline
          />
          <Typography>Răspunsuri:</Typography>
          {question.type === 0 ? (
            <Box>
              {[...Array(2)].map((x, i) => (
                <Box className={c.boxStyle} key={i}>
                  <Radio
                    checked={question.correctAnswer === i + 1}
                    onChange={() => handleCorrectAnswerChange(i + 1)}
                  />
                  <Typography
                    sx={{ cursor: "pointer", userSelect: "none" }}
                    onClick={() => handleCorrectAnswerChange(i + 1)}
                  >
                    {i === 0 ? "Adevărat" : "Fals"}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Box>
              {[...Array(4)].map((x, i) => (
                <Box className={c.boxStyle} my={1.2} key={i}>
                  <Radio
                    checked={question.correctAnswer === i + 1}
                    onChange={() => handleCorrectAnswerChange(i + 1)}
                  />
                  <TextField
                    sx={{ width: "84%" }}
                    key={i}
                    id={i}
                    placeholder="Răspuns"
                    multiline
                    defaultValue={question["answer" + (i + 1)]}
                    inputProps={{ maxLength: 250 }}
                    onBlur={handleAnswerChange}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Box display="flex" alignItems="center" m={0.8}>
          <Typography>Răspunsul se găsește la pagina </Typography>
          <TextField
            sx={{ mx: 1, width: 70 }}
            type="number"
            defaultValue={question.pageNumber}
            onChange={handleChangePageNumber}
          />
        </Box>
      </DialogContent>
      <DialogActions className={c.actions}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            if (onDelete) {
              onDelete();
            }
            close();
          }}
        >
          Șterge
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (onEdit) {
              onEdit(question);
            }
            close();
          }}
        >
          Acceptă
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default FormDialogEdit;
