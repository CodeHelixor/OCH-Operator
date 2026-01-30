import React, { useEffect, useState } from "react";

import Button from "@mui/material/Button";
import { Box } from "@mui/material";
import Notificationtable from "./Errortable";
import Errortable from "./Errortable";
import { ErrorTabProps } from "./types";
// import { useAuth } from "../../../context/AuthContext";

// interface ErrortabPros {
//   visible: string;
// }

const Errortab = ({ visible, errors }: ErrorTabProps) => {
  // const [errors, setErrors] = useState([]);
  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";

  // const { userId } = useAuth();

  // useEffect(() => {
  //   readErrors();
  // }, []);

  // const readErrors = async () => {
  //   try {
  //     const res = await fetch(`${API_BASE_URL}/readErrors`, {
  //       method: "POST",
  //     });
  //     let data = await res.json();
  //     console.log(data);
  //     setErrors(data.filter((error: any) => error.userId == userId));
  //     console.log(errors);
  //   } catch (err) {
  //     console.log("Error reading from TaskLists: ", err);
  //   }
  // };
  return (
    <div className="m-5 mt-10" style={{ display: visible }}>
      {/* <Box display="flex" justifyContent="flex-end" mb={2}>
        <Button variant="contained" color="success" onClick={readNotifications}>
          Read Tasklist
        </Button>
      </Box> */}
      <Errortable errors={errors} />
    </div>
  );
};

export default Errortab;
