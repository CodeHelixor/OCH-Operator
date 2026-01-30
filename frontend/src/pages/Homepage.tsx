import { useEffect } from "react";
import { useGlobalState } from "../context/GlobalState";
import Hometab from "../components/Homepage/Hometab";

const Homepage = () => {
  const { dispatch } = useGlobalState();
  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";
  // useEffect(() => {
  //   async function fetchOrInitData() {
  //     try {
  //       const res = await fetch(`${API_BASE_URL}/get`, {
  //         method: "POST",
  //       });
  //       const data = await res.json();
  //       dispatch({ type: "SET_INITIAL_NUMBERS", payload: data });
  //       console.log(data);
  //     } catch (err) {
  //       console.log("Error initializing or fetching data: ", err);
  //       dispatch({ type: "SET_INITIAL_NUMBERS", payload: [] });
  //     }
  //   }
  //   fetchOrInitData();
  // }, []);
  return (
    <div className="m-6">
      <Hometab />
    </div>
  );
};

export default Homepage;
