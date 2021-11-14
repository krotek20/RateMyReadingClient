import React from "react";
import NavigationMenu from "../../core/NavigationMenu/NavigationMenu.component";
import BooksImport from "../Book/Books.screen";
import BookIcon from "@mui/icons-material/Book";
import HomeIcon from "@mui/icons-material/Home";
import QuestionIcon from "@mui/icons-material/QuestionAnswer";
import DashBoard from "../DashBoard/DashBoard.screen";
import AddQuestions from "../Question/Question.screen";
import { CssBaseline } from "@mui/material";

function Layout({ handleColorChange }) {
  const adminSections = [
    {
      name: "Prima pagină",
      href: "/",
      icon: <HomeIcon />,
      screen: <DashBoard />,
    },
    {
      name: "Listă cărți",
      href: "/carti",
      icon: <BookIcon />,
      screen: <BooksImport />,
    },
    {
      name: "Adaugă întrebări",
      href: "/intrebari",
      icon: <QuestionIcon />,
      screen: <AddQuestions />,
    },
  ];
  return (
    <>
      <CssBaseline />
      <NavigationMenu
        sections={adminSections}
        changePrimary={handleColorChange}
      />
    </>
  );
}

export default Layout;
