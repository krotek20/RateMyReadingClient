import React, { useState } from "react";
import { Snackbar, Alert } from "@mui/material";

export default function AlertPopUp() {
  const [open, setOpen] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
          Message
        </Alert>
      </Snackbar>
    </>
  );
}
