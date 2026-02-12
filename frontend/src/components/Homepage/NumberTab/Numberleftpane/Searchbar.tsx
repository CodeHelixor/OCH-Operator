import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";

type SearchbarProps = {
  searchRange: string;
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
};
export default function Searchbar({
  searchRange,
  onClick,
  onChange,
  onKeyDown,
}: SearchbarProps) {
  return (
    <div>
      <p className="flex items-start font-semibold text-xl mb-3 text-slate-800">
        Search Range
      </p>
      <Paper
        component="form"
        sx={{
          p: "2px 4px",
          display: "flex",
          alignItems: "center",
          borderRadius: 2,
          boxShadow: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
          border: "1px solid rgba(148, 163, 184, 0.3)",
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search"
          inputProps={{ "aria-label": "search google maps" }}
          onKeyDown={onKeyDown}
          onChange={onChange}
          value={searchRange}
        />
        <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
          <SearchIcon />
        </IconButton>
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

        <IconButton
          color="primary"
          sx={{ p: "10px" }}
          aria-label="directions"
          onClick={onClick}
        >
          <DirectionsIcon />
        </IconButton>
      </Paper>
    </div>
  );
}
