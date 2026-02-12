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
    <div className="min-w-[200px] max-w-[360px] flex-shrink-0 flex items-center justify-end">
      <Fade in={true} timeout={{ enter: 300, exit: 400 }}>
        <Alert variant="filled" severity={notification.severity}>
          {notification.message}
        </Alert>
      </Fade>
    </div>
  );
}
