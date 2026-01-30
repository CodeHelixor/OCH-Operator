import { Button, Collapse, Stack, TextField } from "@mui/material";
import { useState } from "react";
import Rangechangebox from "./Rangechangebox";
import Rangetable from "./Rangetable";
import { RangeTabProps } from "./types";

const Rangetab = ({ ranges, visible, onSearch }: RangeTabProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const rangeManageClicked = () => {
    setCollapsed((prev) => !prev);
  };

  const [phoneStart, setPhoneStart] = useState("");
  const [phoneEnd, setPhoneEnd] = useState("");

  const handleSearch = () => {
    onSearch(phoneStart, phoneEnd);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div style={{ display: visible }}>
      <div className="mt-8 mb-8">
        <Button
          variant="outlined"
          color="secondary"
          onClick={rangeManageClicked}
        >
          Click here to manage range
        </Button>
        <Collapse in={collapsed} timeout="auto" collapsedSize={0}>
          <Rangechangebox />
        </Collapse>
      </div>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="flex-end"
        className="mt-4 mb-4"
      >
        <TextField
          label="Phone Number Start"
          size="small"
          value={phoneStart}
          onChange={(e) => setPhoneStart(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <TextField
          label="Phone Number End"
          size="small"
          value={phoneEnd}
          onChange={(e) => setPhoneEnd(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button variant="contained" onClick={handleSearch}>
          Search
        </Button>
      </Stack>
      <Rangetable ranges={ranges} />
    </div>
  );
};

export default Rangetab;
