import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

type MsisdnInputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function Msisdninput({ value, onChange }: MsisdnInputProps) {
  return (
    <Box
      className="my-2.5"
      component="div"
      sx={{ "& > :not(style)": { width: "100%" } }}
    >
      <TextField
        id="outlined-basic"
        label=""
        variant="outlined"
        value={value}
        onChange={onChange}
        InputProps={{
          sx: { height: 50, "& input": { fontSize: 18, textAlign: "center" } },
        }}
        inputProps={{
          inputMode: "numeric",
          pattern: "[0-9]*",
        }}
      />
    </Box>
  );
}
