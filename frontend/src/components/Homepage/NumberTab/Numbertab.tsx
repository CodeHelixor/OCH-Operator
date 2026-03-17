import React from "react";
import Numberleftpane from "./Numberleftpane/Numberleftpane";
import Numbertable from "./Numberrightpane/Numbertable";
import { NumberTabProps } from "./types";

const Numbertab = ({
  numbers,
  visible,
  filterType,
  onFilterTypeChange,
  onSearchSubmit,
  onNumberDeleted,
  phoneNumbersWithCompletedTask,
  phoneNumbersWithConfirmedExecutionDate,
}: NumberTabProps) => {
  return (
    <div className="flex flex-1 flex-col min-h-0" style={{ display: visible }}>
      <div className="flex flex-1 flex-col md:flex-row gap-5 p-4 mr-6 min-h-0">
        <div className="w-full md:w-1/3 lg:w-1/4 min-h-0 flex flex-col">
          <Numberleftpane
            filterType={filterType}
            onFilterTypeChange={onFilterTypeChange}
            onSearchSubmit={onSearchSubmit}
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4 flex-1 flex flex-col min-h-0">
          <Numbertable
            numbers={numbers}
            onNumberDeleted={onNumberDeleted}
            phoneNumbersWithCompletedTask={phoneNumbersWithCompletedTask}
            phoneNumbersWithConfirmedExecutionDate={phoneNumbersWithConfirmedExecutionDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Numbertab;
