import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type Logininputfieldprops = {
  label: string;
  value: string;
  type?: string;
  error: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};

export default function Logininputfield({
  label,
  type,
  value,
  error,
  onChange,
  onKeyDown,
}: Logininputfieldprops) {
  return (
    <Box
      component="form"
      sx={{ "& > :not(style)": { m: 1, width: "90%" } }}
      noValidate
      autoComplete="off"
      className="py-1.5"
    >
      <TextField
        label={label}
        color={!error ? "secondary" : "error"}
        focused
        type={type}
        onChange={onChange}
        onKeyDown={onKeyDown}
        value={value}
        helperText={error}
      />
    </Box>
  );
}
