import React from "react";
import Numberleftpane from "./Numberleftpane/Numberleftpane";
import Numbertable from "./Numberrightpane/Numbertable";
import { useGlobalState } from "../../../context/GlobalState";
import { NumberTabProps } from "./types";

const Numbertab = ({ numbers, visible }: NumberTabProps) => {
  const { state } = useGlobalState();
  // When Filter MSISDN or search has been used, show that list from global state (even if empty); otherwise show full list from parent
  const numbersToShow = state.filterApplied ? (state.numbers || []) : numbers;

  return (
    <div style={{ display: visible }}>
      <div className="flex flex-col md:flex-row gap-5 p-4 mr-6">
        <div className="w-full md:w-1/3 lg:w-1/4">
          <Numberleftpane />
        </div>
        <div className="w-full md:w-2/3 lg:w-3/4">
          <Numbertable numbers={numbersToShow} />
        </div>
      </div>
    </div>
  );
};

export default Numbertab;
