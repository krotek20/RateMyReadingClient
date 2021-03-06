import React, { useState, useEffect } from "react";
import { Box, Button, Tooltip, Typography } from "@mui/material";
import XLSX from "xlsx";
import { getBooks } from "../Book/Book.api";
import {
  getSavedQuestions,
  createQuestion,
  deleteQuestion,
  updateQuestion,
} from "./Question.api";
import Question from "./components/Question";
import { useSelector, useDispatch } from "react-redux";
import {
  addQuestion,
  removeQuestion,
  removeAll,
} from "../../redux/Question/Question";
import { setCurrentBook } from "../../redux/Book/CurrentBook";
import { useSnackbar } from "notistack";
import { useNavigate } from "react-router-dom";
import "./Question.css";
import BookAutoComplete from "../../core/AutoComplete/Books.component";
import { getId } from "../Login/Login.api";
import { incremenetUnapprovedQuestions } from "../../redux/Badge/Badge";
import { getExtension } from "../../utils";
import { useDecode } from "../../hooks/useDecode";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import PublishIcon from "@mui/icons-material/Publish";
import SendIcon from "@mui/icons-material/Send";
import SaveIcon from "@mui/icons-material/Save";
import { logout } from "../../core/NavigationMenu/Logout.api";

export default function AddQuestions() {
  const [books, setBooks] = useState([]);
  const [initialQuestion] = useState({
    bookId: 0,
    userId: 1,
    type: 1,
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctAnswer: 0,
    question: "",
    status: 0,
    pageNumber: null,
  });

  const questions = useSelector((state) => state.question.activeQuestions);
  const currentBook = useSelector((state) => state.currentBook);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();
  const decode = useDecode();

  useEffect(() => {
    getBooks()
      .payload.then((response) => setBooks(response.data))
      .catch((error) => {
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        }
      });
  }, [setBooks, navigate]);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const handleBookSelection = (book) => {
    if (book === null) {
      dispatch(removeAll());
      dispatch(setCurrentBook(null));
      return;
    }
    if (books.some((b) => b.id === book.id)) {
      dispatch(removeAll());
      getSavedQuestions(book.id)
        .payload.then((response) => {
          for (const resp of response.data) {
            dispatch(addQuestion(resp));
          }
          dispatch(setCurrentBook(book));
        })
        .catch((error) => {
          if (error.response.status === 403) {
            logout();
            navigate("/login", { replace: true });
          }
        });
    }
  };

  const createNewQuestion = (newQuestion) => {
    getId()
      .payload.then((res) => res.data)
      .then((userId) => (newQuestion.userId = userId))
      .then(() => {
        createQuestion(newQuestion)
          .payload.then((res) => {
            if (res.status === 200) {
              dispatch(addQuestion(res.data));
            }
          })
          .catch((error) => {
            if (error.response.status === 403) {
              logout();
              navigate("/login", { replace: true });
            }
          });
      });
  };

  const handleAddQuestion = () => {
    if (currentBook) {
      let newQuestion = { ...initialQuestion, bookId: currentBook.id };
      createNewQuestion({ ...newQuestion });
      handleAlert("success", "??ntrebare ad??ugat?? cu succes!");
    } else {
      handleAlert(
        "error",
        "Trebuie sa ave??i o carte selectat?? pentru a ad??uga ??ntreb??ri noi!"
      );
    }
  };

  const handleImportExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryString = event.target.result;

      const workBook = XLSX.read(binaryString, { type: "binary" });

      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      // column 0 : id of question, column 1 : book title / question / answers, column 2 : T / Q / correctAnswer
      let okay = false;
      let bookId = 0;
      if (fileData[0][2] === "T") {
        books.forEach((book) => {
          if (
            book.title.toLowerCase().trim() ===
            fileData[0][1].toLowerCase().trim()
          ) {
            bookId = book.id;
            dispatch(setCurrentBook(book));
            okay = true;
          }
        });
      }
      if (!currentBook && !okay) {
        handleAlert(
          "error",
          "Nu a fost g??sit?? nicio carte cu acest titlu. Asigura??i-v?? c?? a??i introdus corect titlul c??r??ii ??n excel!"
        );
      } else {
        if (bookId === 0) {
          bookId = currentBook.id;
        }
        fileData.shift();
        let answerCount = 1;
        let newQuestion = { ...initialQuestion, bookId: bookId };

        dispatch(removeAll());
        fileData.forEach((question, index) => {
          if (question[2] === "Q") {
            if (answerCount === 3 || answerCount === 5) {
              newQuestion.type = answerCount === 3 ? 0 : 1;
              createNewQuestion({ ...newQuestion });
              newQuestion = { ...initialQuestion, bookId: bookId };
            }
            newQuestion.question = question[1].trim();
            answerCount = 1;
          } else if (question[2] === 0 || question[2] === 1) {
            newQuestion[`answer${answerCount}`] = (question[1] + "").trim();
            if (question[2] === 1) {
              newQuestion.correctAnswer = answerCount;
            }
            answerCount += 1;
            if (index === fileData.length - 1) {
              if (answerCount === 3 || answerCount === 5) {
                newQuestion.type = answerCount === 3 ? 0 : 1;
                createNewQuestion({ ...newQuestion });
              }
            }
          }
        });
        newQuestion.type = answerCount === 3 ? 0 : 1;
        createNewQuestion({ ...newQuestion });
        handleAlert("success", "??ntreb??rile au fost inc??rcate cu succes!");
      }
    };

    if (file !== undefined && getExtension(file)) {
      reader.readAsBinaryString(file);
    } else {
      handleAlert(
        "error",
        "Nu pute??i inc??rca un fi??ier cu acest format! Pute??i ad??uga doar fi??iere EXCEL sau CSV!"
      );
    }
    const input = document.getElementById("excelInputQuestion");
    input.value = "";
  };

  const handleLocalSave = () => {
    if (questions.length >= 5 && currentBook) {
      questions.forEach((x) => {
        if (x.question !== "") {
          if (x.type === 0) {
            x = {
              ...x,
              answer1: "Adev??rat",
              answer2: "Fals",
              answer3: "",
              answer4: "",
            };
          }
          updateQuestion({ ...x, status: 0 }).payload.catch((error) => {
            if (error.response.status === 403) {
              logout();
              navigate("/login", { replace: true });
            }
          });
        }
      });
      handleAlert("success", "Salvare efectuat?? cu succes!");
    } else {
      handleAlert(
        "error",
        "Trebuie sa ave??i o carte selectat?? pentru a salva ??ntreb??rile!"
      );
    }
  };

  document.onkeyup = (e) => {
    if (e.ctrlKey && e.shiftKey && e.key === "S") {
      handleLocalSave();
    }
  };

  const handleOnDelete = (id) => {
    deleteQuestion(id)
      .payload.then((res) => {
        if (res.status === 200) {
          dispatch(removeQuestion(id));
          handleAlert("success", "??tergere efectuat?? cu succes!");
        }
      })
      .catch((error) => {
        if (error.response.status === 403) {
          logout();
          navigate("/login", { replace: true });
        }
      });
  };

  const checkQuestion = (question) => {
    if (!question.question === null) return false;
    if (
      question.type === 1 &&
      (!question.answer1 ||
        !question.answer2 ||
        !question.answer3 ||
        !question.answer4)
    ) {
      return false;
    }
    if (!question.correctAnswer) return false;
    return true;
  };

  const handleSendForValidation = () => {
    if (questions.length >= 5 && currentBook) {
      let index = 1;
      for (let question of questions) {
        // if (question.type === 0) {
        //   dispatch(
        //     updateQuestion({
        //       ...question,
        //       answer1: "Adevarat",
        //       answer2: "Fals",
        //     })
        //   );
        // }
        if (!checkQuestion(question)) {
          handleAlert(
            "error",
            `Toate ??ntreb??rile trebuie s?? fie completate! (eroare la ??ntrebarea ${index})`
          );
          return;
        }
        index += 1;
      }

      const user = decode();
      questions.forEach((x) => {
        if (!user.roles.includes("ROLE_SUPERADMIN")) {
          dispatch(incremenetUnapprovedQuestions());
        }
        updateQuestion({
          ...x,
          answer1: x.type === 0 ? "Adev??rat" : x.answer1,
          answer2: x.type === 0 ? "Fals" : x.answer2,
          status: user.roles.includes("ROLE_SUPERADMIN") ? 2 : 1,
        }).payload.catch((error) => {
          if (error.response.status === 403) {
            logout();
            navigate("/login", { replace: true });
          }
        });
      });

      handleAlert(
        "success",
        user.roles.includes("ROLE_SUPERADMIN")
          ? "??ntreb??rile au fost ad??ugate cu succes!"
          : "??ntreb??rile au fost trimise cu succes c??tre validare!"
      );

      dispatch(removeAll());
      dispatch(setCurrentBook(null));
    } else {
      handleAlert(
        "error",
        "Trebuie sa ave??i o carte selectat?? pentru a trimite ??ntreb??rile!"
      );
    }
  };

  return (
    <Box
      sx={{
        flex: 1,
        borderRadius: "10px",
        padding: "10px",
        bgcolor: "#f8f9fa",
        display: "flex",
        maxWidth: 500,
        flexDirection: "column",
        alignItems: "center",
        zIndex: 10,
        boxShadow:
          "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
      }}
    >
      <BookAutoComplete books={books} bookSelection={handleBookSelection} />
      {currentBook ? (
        <Box
          mt={2}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Typography fontSize={13} color="secondary.main">
            Autor: {currentBook.author}
          </Typography>
          <Typography fontSize={13} color="secondary.main">
            Dificultate: {currentBook.difficulty}
          </Typography>
          <Typography fontSize={13} color="secondary.main">
            Puncte: {currentBook.points}
          </Typography>
        </Box>
      ) : (
        <></>
      )}
      <Box sx={{ mt: 2 }}>
        <Typography sx={{ fontSize: 13 }}>
          Pute??i salva local ??ntreb??rile create folosind
        </Typography>
      </Box>
      <Typography sx={{ fontSize: 13 }}>CTRL + SHIFT + S</Typography>
      {currentBook && questions.length !== 0 ? (
        questions.map((question, index) => (
          <Question
            key={question.id}
            question={question}
            noOfActiveQuestions={questions.length}
            onDelete={handleOnDelete}
            counter={index + 1}
          />
        ))
      ) : (
        <></>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "10px",
          "& button": { m: 1 },
        }}
      >
        <Box
          display="flex"
          flexDirection="row"
          justifyContent="center"
          alignItems="center"
        >
          <Tooltip title="Adaug?? o nou?? ??ntrebare" arrow placement="top">
            <Button
              startIcon={<AddCircleOutlineIcon />}
              variant="contained"
              onClick={handleAddQuestion}
            >
              Adaug?? ??ntrebare
            </Button>
          </Tooltip>
          <Tooltip
            title="Import?? un set de ??ntreb??ri din excel"
            arrow
            placement="top"
          >
            <Button
              variant="contained"
              component="label"
              startIcon={<PublishIcon />}
            >
              <input
                id="excelInputQuestion"
                className="input"
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain"
                onChange={handleImportExcel}
                hidden
              />
              Excel
            </Button>
          </Tooltip>
        </Box>
        <Box display="flex" flexDirection="row">
          <Tooltip
            title="Trimite ??ntreb??rile compuse c??tre validare"
            arrow
            placement="top"
          >
            <Button
              variant="contained"
              onClick={handleSendForValidation}
              startIcon={<SendIcon />}
            >
              Trimite
            </Button>
          </Tooltip>
          <Tooltip
            title={
              <span style={{ whiteSpace: "pre-line" }}>
                Salveaz?? ??ntreb??rile scrise local (Ctrl + Shift + S)
                <br />
                Acestea nu vor fi trimise c??tre validare
              </span>
            }
            arrow
            placement="top"
          >
            <Button
              variant="contained"
              onClick={handleLocalSave}
              startIcon={<SaveIcon />}
            >
              Salveaz?? temporar
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
