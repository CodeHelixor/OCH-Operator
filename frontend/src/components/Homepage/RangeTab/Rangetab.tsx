import { Button, Collapse } from "@mui/material";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useState } from "react";
import Rangechangebox from "./Rangechangebox";
import Rangetable from "./Rangetable";
import { RangeTabProps } from "./types";

const Rangetab = ({ ranges, visible, onSearch }: RangeTabProps) => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const rangeManageClicked = () => {
    setCollapsed((prev) => !prev);
  };

  return (
    <div style={{ display: visible }}>
      <div className="mt-8 mb-8 w-[85%] lg:w-[55%] ml-[8%] flex flex-col">
        <div className="flex justify-center mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={rangeManageClicked}
            endIcon={collapsed ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            sx={{ whiteSpace: "nowrap", px: 3, py: 1.5 }}
          >
            Click here to manage range
          </Button>
        </div>
        <Collapse in={collapsed} timeout="auto" collapsedSize={0}>
          <Rangechangebox />
        </Collapse>
      </div>
      <Rangetable ranges={ranges} onSearch={onSearch} />
    </div>
  );
};

export default Rangetab;
