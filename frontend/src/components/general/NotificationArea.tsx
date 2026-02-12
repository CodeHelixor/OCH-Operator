import React from "react";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";
import { useNotification } from "../../context/NotificationContext";

/**
 * Renders the current app notification in the designated blue area
 * (top-right of main content, to the left of Log out).
 */
export default function NotificationArea() {
  const { notification } = useNotification();

  if (!notification) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 1000,
        minWidth: "200px",
        maxWidth: "360px",
      }}
    >
      <Fade in={true} timeout={{ enter: 300, exit: 400 }}>
        <Alert variant="filled" severity={notification.severity}>
          {notification.message}
        </Alert>
      </Fade>
    </div>
  );
}
