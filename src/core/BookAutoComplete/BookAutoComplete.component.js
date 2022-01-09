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

export default function BookAutoComplete({ books, bookSelection, difficulty }) {
  return (
    <Autocomplete
      id="grouped-demo"
      options={books.sort(
        (a, b) =>
          -b.title
            .charAt(0)
            .toLowerCase()
            .localeCompare(a.title.charAt(0).toLowerCase())
      )}
      groupBy={(option) => option.title.charAt(0)}
      getOptionLabel={(option) => option.title}
      renderOption={(props, option) => (
        <ListItem {...props} disablePadding>
          {difficulty ? (
            <ListItemIcon>
              <MenuBookTwoToneIcon
                style={{ fill: colorByDifficulty(option) }}
              />
            </ListItemIcon>
          ) : (
            <></>
          )}
          <ListItemText
            primary={option.title}
            secondaryTypographyProps={{ style: { whiteSpace: "pre-wrap" } }}
            secondary={`de ${option.author}`}
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
      onChange={(event, value) => bookSelection(value)}
    />
  );
}
