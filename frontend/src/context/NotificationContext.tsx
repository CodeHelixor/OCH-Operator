import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
} from "react";

export type NotificationSeverity = "error" | "warning" | "info" | "success";

export interface Notification {
  message: string;
  severity: NotificationSeverity;
}

interface NotificationContextType {
  notification: Notification | null;
  showNotification: (message: string, severity?: NotificationSeverity) => void;
  clearNotification: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = useCallback(
    (message: string, severity: NotificationSeverity = "info") => {
      setNotification({ message, severity });
    },
    []
  );

  const clearNotification = useCallback(() => {
    setNotification(null);
  }, []);

  return (
    <NotificationContext.Provider
      value={{ notification, showNotification, clearNotification }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};
