import React, { createContext, useContext, useReducer } from "react";

//Create Context
const GlobalContext = createContext();

//Initial State
const initialState = {
  numbers: [],
};

//Reducer function
function Reducer(state, action) {
  switch (action.type) {
    case "SET_INITIAL_NUMBERS":
      return { ...state, numbers: action.payload };
    case "ADD_NUMBER":
      return { ...state, numbers: [...state.numbers, action.payload] };
    case "SET_SEARCHED_NUMBERS":
      return { ...state, numbers: action.payload };
    case "DELETE_NUMBER":
      return {
        ...state,
        numbers: state.numbers.filter((item) => item.id !== action.payload),
      };
    case "UPDATE_NUMBER":
      return {
        ...state,
        numbers: state.numbers.map((n) =>
          n.id === action.payload.id ? action.payload : n
        ),
      };
    default:
      return state;
  }
}

//Provider Component
export function GlobalProvider({ children }) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
}

//Custom hook to use global state
export function useGlobalState() {
  return useContext(GlobalContext);
}
