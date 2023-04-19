import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const UsernameField = (props) => {
  const [value, setValue] = useState("");
  return (
    <Autocomplete
      open={!!value}
      options={props.usernames}
      fullWidth
      onInputChange={(event) => {
        setValue(event.target.value);
      }}
      renderInput={(params) => (
        <TextField
          margin="normal"
          required
          label="Numele utilizatorului"
          name="username"
          autoFocus
          {...params}
        />
      )}
    />
  );
};

export default UsernameField;
