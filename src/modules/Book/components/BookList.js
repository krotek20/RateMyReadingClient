import React from "react";
import List from "@mui/material/List";
import Book from "./Book";

export default function BookList({ books, onDelete }) {
  return (
    <List
      dense
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        marginBottom: "15px",
      }}
    >
      {books.map((book) => {
        return (
          <Book key={book.id} book={book} onDelete={() => onDelete(book.id)} />
        );
      })}
    </List>
  );
}
