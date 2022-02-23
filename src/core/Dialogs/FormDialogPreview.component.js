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
  onApprove: undefined,
  onDeny: undefined,
  close: () => set({ onApprove: undefined, onDeny: undefined }),
}));

export const formDialogPreview = (
  question,
  bookTitle,
  author,
  onApprove,
  onDeny
) => {
  useFormDialogStore.setState({
    question,
    bookTitle,
    author,
    onApprove,
    onDeny,
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
      my: 1,
      flex: 1,
      alignItems: "center",
    },
  };
});

const FormDialogPreview = () => {
  const c = useStyles();
  const { question, bookTitle, author, onApprove, onDeny, close } =
    useFormDialogStore();
  return (
    <Dialog
      open={!!onApprove || !!onDeny}
      onClose={close}
      maxWidth="sm"
      fullWidth
    >
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <DialogTitle>Vizualizare întrebare</DialogTitle>
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
          <Typography sx={{ fontWeight: "bold" }}>
            Întrebare: {question.question}
          </Typography>
          <Typography>Răspunsuri:</Typography>
          {question.type === 0 ? (
            <Box>
              {[...Array(2)].map((x, i) => (
                <Box className={c.boxStyle} key={i}>
                  <Radio disabled checked={question.correctAnswer === i + 1} />
                  <Typography
                    sx={{
                      fontWeight: `${
                        question.correctAnswer === i + 1 ? "bold" : "normal"
                      }}`,
                    }}
                  >
                    {i === 0 ? "Adevărat" : "Fals"}
                  </Typography>
                </Box>
              ))}
            </Box>
          ) : (
            <Box>
              {[...Array(4)].map((x, i) => (
                <Box className={c.boxStyle} key={i}>
                  <Radio disabled checked={question.correctAnswer === i + 1} />
                  <Typography
                    sx={{
                      fontWeight: `${
                        question.correctAnswer === i + 1 ? "bold" : "normal"
                      }}`,
                    }}
                  >
                    {question["answer" + (i + 1)]}
                  </Typography>
                </Box>
              ))}
            </Box>
          )}
        </Box>
        <Typography fontSize={15}>
          Numărul paginii:{" "}
          {question.pageNumber === 0 || question.pageNumber === null
            ? "Nu a fost adăugat"
            : question.pageNumber}
        </Typography>
      </DialogContent>
      <DialogActions className={c.actions}>
        <Button
          color="primary"
          variant="outlined"
          onClick={() => {
            if (onDeny) {
              onDeny();
            }
            close();
          }}
        >
          Refuză
        </Button>
        <Button
          color="primary"
          variant="contained"
          onClick={() => {
            if (onApprove) {
              onApprove();
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

export default FormDialogPreview;
