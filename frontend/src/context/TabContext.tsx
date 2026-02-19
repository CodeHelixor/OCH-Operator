import React, { createContext, useContext, useState, ReactNode } from "react";

interface TabContextType {
  tabIndex: number;
  setTabIndex: (value: number) => void;
  notificationCount: number;
  setNotificationCount: (value: number) => void;
}

const TabContext = createContext<TabContextType | undefined>(undefined);

export const TabProvider = ({ children }: { children: ReactNode }) => {
  const [tabIndex, setTabIndex] = useState(0);
  const [notificationCount, setNotificationCount] = useState(0);
  return (
    <TabContext.Provider value={{ tabIndex, setTabIndex, notificationCount, setNotificationCount }}>
      {children}
    </TabContext.Provider>
  );
};

export const useTab = () => {
  const ctx = useContext(TabContext);
  if (ctx === undefined) throw new Error("useTab must be used within TabProvider");
  return ctx;
};
