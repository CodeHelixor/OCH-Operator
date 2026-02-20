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
}: NumberTabProps) => {
  return (
    <div style={{ display: visible }}>
      <div className="flex flex-col md:flex-row gap-5 p-4 mr-6">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Numberleftpane
            filterType={filterType}
            onFilterTypeChange={onFilterTypeChange}
            onSearchSubmit={onSearchSubmit}
          />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Numbertable numbers={numbers} />
        </div>
      </div>
    </div>
  );
};

export default Numbertab;
