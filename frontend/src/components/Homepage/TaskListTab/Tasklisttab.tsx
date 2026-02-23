import React, { useEffect, useState } from "react";
import Tasklisttable from "./Tasklisttable";

import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import { TaskTabProps } from "./types";

const Tasklisttab = ({ tasks, visible, numbers, onTaskDeleted }: TaskTabProps) => {
  return (
    <div className="m-5 mt-10" style={{ display: visible }}>
      <Tasklisttable tasks={tasks} numbers={numbers} onTaskDeleted={onTaskDeleted} />
    </div>
  );
};

export default Tasklisttab;
