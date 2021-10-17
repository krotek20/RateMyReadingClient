import React, { useState, useMemo } from "react";
import BookList from "../Book/components/BookList.component";
import XLSX from "xlsx";
import Search from "../../core/Search/Search.component";
import Legend from "../../core/Legend/Legend.component";
import { Typography, Box, Button, Tooltip } from "@mui/material";
import "fontsource-roboto";
import "../Layout/Layout.css";
// import { useAlert } from "../../hooks/useAlert";

export default function BooksImport() {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  // const alert = useAlert();

  const filteredBooks = useMemo(() => {
    if (!search) return books;
    return books.filter((elem) => {
      const bookTitle = elem.name.toString().toLowerCase();
      const bookAuthor = elem.author.toString().toLowerCase();
      return (
        bookTitle.includes(search.toString().toLowerCase()) ||
        bookAuthor.includes(search.toString().toLowerCase())
      );
    });
  }, [search, books]);

  const getExtension = (file) => {
    const splittedFile = file.name.split(".");
    const extension = splittedFile[splittedFile.length - 1];
    return (
      extension === "xlsx" ||
      extension === "xls" ||
      extension === "txt" ||
      extension === "csv"
    );
  };

  const makeSet = (array) => {
    return array.filter(
      (v, i, a) =>
        a.findIndex((t) => t.name === v.name && t.author === v.author) === i
    );
  };

  const importExcel = (e) => {
    const file = e.target.files[0];

    const reader = new FileReader();
    reader.onload = (event) => {
      const binaryString = event.target.result;
      const workBook = XLSX.read(binaryString, { type: "binary" });

      const workSheetName = workBook.SheetNames[0];
      const workSheet = workBook.Sheets[workSheetName];

      const fileData = XLSX.utils.sheet_to_json(workSheet, { header: 1 });
      let booksData = fileData.map((data) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: data[0],
        author: data[1],
        difficulty: data[2],
        points: data[3],
        isbn: data[4],
      }));
      if (booksData[0].name === "Titlu") {
        booksData.shift();
      }
      booksData.push(...books);
      booksData = makeSet(booksData);
      setBooks(booksData);
    };
    if (file !== undefined && getExtension(file)) {
      reader.readAsBinaryString(file);
    } else {
      // alert("error", "Nu puteți încărca un fișier de acest tip!", true);
      // TODO: pop error alert
    }
  };

  const handleDelete = (id) => {
    const newBooks = books.filter((book) => book.id !== id);
    setBooks(newBooks);
  };

  return (
    <>
      <Box
        sx={{
          width: "100%",
          borderRadius: "10px",
          padding: "10px",
          maxWidth: 360,
          bgcolor: "white",
          alignItems: "center",
          zIndex: 10,
          boxShadow:
            "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
        }}
      >
        <div className="app">
          <Typography variant="h5">Lista cărților</Typography>
          {books.length > 0 && (
            <>
              <Search
                searchFunction={(e) => setSearch(e.target.value)}
                text="Caută după titlu / autor"
              />
              <Legend />
            </>
          )}
          <BookList books={filteredBooks} onDelete={handleDelete} />
          <Tooltip title="Selecteaza un excel sau un csv" arrow>
            <Button variant="contained" component="label">
              Adaugă cărți
              <input
                type="file"
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, text/plain"
                onChange={importExcel}
                hidden
              />
            </Button>
          </Tooltip>
        </div>
      </Box>
    </>
  );
}
