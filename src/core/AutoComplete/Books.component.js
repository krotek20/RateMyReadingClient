import React from "react";
import {
  TextField,
  Autocomplete,
  ListItem,
  ListItemText,
  ListItemIcon,
} from "@mui/material";
import MenuBookTwoToneIcon from "@mui/icons-material/MenuBookTwoTone";
import { colorByDifficulty } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentBook } from "../../redux/Book/CurrentBook";

export default function Books({ books, bookSelection, difficulty }) {
  const currentBook = useSelector((state) => state.currentBook);
  const dispatch = useDispatch();

  return (
    <Autocomplete
      id="grouped-demo"
      value={currentBook}
      options={books.sort(
        (a, b) =>
          -b.title
            .charAt(0)
            .toLowerCase()
            .localeCompare(a.title.charAt(0).toLowerCase())
      )}
      isOptionEqualToValue={(option, value) => option.title === value.title}
      groupBy={(option) => option.title.charAt(0)}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => (
        <ListItem {...props} disablePadding key={option.id}>
          {difficulty ? (
            <ListItemIcon>
              <MenuBookTwoToneIcon
                style={{ fill: colorByDifficulty(option.difficulty) }}
              />
            </ListItemIcon>
          ) : (
            <></>
          )}
          <ListItemText
            primary={option.title}
            secondaryTypographyProps={{ style: { whiteSpace: "pre-wrap" } }}
            secondary={`de ${option.author}
${option.publisher}`}
          />
        </ListItem>
      )}
      sx={{ width: 300, marginTop: "10px" }}
      renderInput={(params) => (
        <TextField
          {...params}
          id="bookTextField"
          label="Alege carte"
          color="primary"
        />
      )}
      onChange={(event, value, reason) => {
        if (reason === "clear") {
          dispatch(setCurrentBook(null));
        } else {
          bookSelection(value);
        }
      }}
    />
  );
}
