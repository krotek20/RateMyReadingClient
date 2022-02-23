import React, { useState, useMemo, useEffect } from "react";
import BookList from "../Book/components/BookList.component";
import XLSX from "xlsx";
import Search from "../../core/Search/Search.component";
import Legend from "../../core/Legend/Legend.component";
import { getBooks, createBook, deleteBook } from "./Book.api";
import { Typography, Box, Button, Tooltip } from "@mui/material";
import { useSnackbar } from "notistack";
import "fontsource-roboto";
import "../Layout/Layout.css";
import { useNavigate } from "react-router-dom";
import ConfirmDialog, {
  confirmDialog,
} from "../../core/Dialogs/ConfirmDialog.component";
import { localeIncludes, getExtension } from "../../utils";

function BooksImport() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const filteredBooks = useMemo(() => {
    if (!search && !filter) return books;
    if (!search)
      return books.filter((elem) =>
        localeIncludes(elem.difficulty, filter, {
          usage: "search",
          sensitivity: "base",
        })
      );
    return books.filter((elem) => {
      if (
        filter &&
        !localeIncludes(elem.difficulty, filter, {
          usage: "search",
          sensitivity: "base",
        })
      )
        return false;
      const bookTitle = elem.title.toString().toLowerCase();
      const bookAuthor = elem.author.toString().toLowerCase();
      return (
        localeIncludes(bookTitle, search.toString().toLowerCase(), {
          usage: "search",
          sensitivity: "base",
        }) ||
        localeIncludes(bookAuthor, search.toString().toLowerCase(), {
          usage: "search",
          sensitivity: "base",
        })
      );
    });
  }, [search, filter, books]);

  useEffect(() => {
    getBooks()
      .payload.then((response) => setBooks(response.data))
      .catch((error) => {
        if (error.response.status === 403) {
          navigate("/login", { replace: true });
        }
      });
  }, [setBooks, navigate]);

  const handleAlert = (variant, message) => {
    enqueueSnackbar(message, { variant });
  };

  const makeSet = (array) => {
    return array.filter(
      (v, i, a) =>
        a.findIndex((t) => t.title === v.title && t.author === v.author) === i
    );
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
      let booksData = fileData.map((data) => ({
        title: data[0],
        author: data[1],
        difficulty: data[2],
        points: data[3],
        isbn: data[4],
      }));
      if (booksData[0].title === "Titlu") {
        booksData.shift();
      }
      booksData.map((book) =>
        book.title !== undefined ? createBook(book) : undefined
      );
      booksData.push(...books);
      booksData = makeSet(booksData);
      setBooks(booksData);
    };

    if (file !== undefined && getExtension(file)) {
      reader.readAsBinaryString(file);
      handleAlert("success", "Cărțile au fost incărcate cu succes!");
    } else {
      handleAlert("error", "Nu puteți incărca un fișier cu acest format!");
    }
  };

  const handleDelete = (id) => {
    deleteBook(id).payload.catch(() => navigate("/login", { replace: true }));
    const newBooks = books.filter((book) => book.id !== id);
    setBooks(newBooks);
    handleAlert("success", "Cartea a fost ștearsă cu succes!");
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
        Lista cărților
      </Typography>
      {books.length > 0 && (
        <>
          <Search
            searchFunction={(e) => setSearch(e.target.value)}
            text="Caută după titlu / autor"
          />
          <Typography fontSize={13} color="secondary.main">
            Apasă pe un nivel de dificultate pentru filtrare
          </Typography>
          <Legend onClick={(e) => setFilter(filter === e ? "" : e)} clickable />
        </>
      )}
      <BookList
        books={filteredBooks}
        onDelete={(id) =>
          confirmDialog("Ești sigur că dorești să ștergi acestă carte?", () =>
            handleDelete(id)
          )
        }
      />
      <ConfirmDialog />
      <Tooltip title="Selecteaza un excel sau un csv" arrow>
        <Button variant="contained" component="label">
          Adaugă cărți
          <input
            type="file"
            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain"
            onChange={handleImportExcel}
            hidden
          />
        </Button>
      </Tooltip>
    </Box>
  );
}

export default BooksImport;
