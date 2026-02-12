import * as React from "react";
import { useState, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Fade from "@mui/material/Fade";

type SuccessAlertProps = {
  show: boolean;
  message: string;
  severity?: "success" | "info" | "warning" | "error";
};

export default function AlertComponent({
  show,
  message,
  severity,
}: SuccessAlertProps) {
  const [shouldRender, setShouldRender] = useState(show);
  useEffect(() => {
    if (show) {
      setShouldRender(true); // Start showing
    }
  }, [show]);

  const handleExited = () => {
    setShouldRender(false); // Remove from DOM after fade-out finishes
  };
  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000, // ensure it’s above other UI
      }}
    >
      <Fade
        in={show}
        timeout={{ enter: 1000, exit: 1000 }}
        onExited={handleExited}
      >
        <div>
          <Stack sx={{ width: "100%" }} spacing={2}>
            <Alert variant="filled" severity={severity}>
              {message}
            </Alert>
          </Stack>
        </div>
      </Fade>
    </div>
  );
}
