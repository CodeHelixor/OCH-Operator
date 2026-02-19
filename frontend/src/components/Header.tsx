import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTab } from "../context/TabContext";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { Badge, Tooltip } from "@mui/material";
import {
  Assignment,
  NotificationsNone,
  SendToMobile,
  Storage,
} from "@mui/icons-material";

const Header = () => {
  const { isAuthenticated, username, setIsAuthenticated, setUsername } = useAuth();
  const { tabIndex, setTabIndex, notificationCount } = useTab();
  const location = useLocation();
  const showNavTabs = isAuthenticated && location.pathname === "/home";

  const handleLogOut = () => {
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <header className="py-2.5 px-4 min-h-[3.25rem] flex items-center justify-between gap-4 lg:py-3 lg:px-8 bg-white/30 backdrop-blur-sm shadow-sm border-b border-slate-200/80 transition-[box-shadow,border-color] duration-280 ease-[cubic-bezier(0.4,0,0.2,1)]">
      <div className="flex items-center gap-3 min-w-0 flex-shrink-0">
        <img src={`${process.env.PUBLIC_URL || ""}/${encodeURIComponent("system logo.png")}`} alt="System logo" className="h-14 w-14 flex-shrink-0 rounded-lg object-contain" aria-hidden />
        <h1 className="text-lg sm:text-xl font-semibold tracking-tight text-slate-800 truncate ml-24">
          <span className="text-indigo-600 font-bold">OCH</span>
          <span className="text-slate-600 font-medium"> Phone Number Porting System</span>
        </h1>
      </div>
      <div className="flex-1 min-w-0" aria-hidden />
      <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
        {showNavTabs && (
          <Tabs
            value={tabIndex}
            onChange={(_e, newValue: number) => setTabIndex(newValue)}
            aria-label="main navigation tabs"
            sx={{ minHeight: 0, flexShrink: 0, "& .MuiTabs-flexContainer": { gap: 0 }, "& .MuiTab-root": { minHeight: 36 } }}
          >
            <Tab icon={<Tooltip title="Database"><Storage /></Tooltip>} aria-label="Database" />
            <Tab icon={<Tooltip title="Range"><SendToMobile /></Tooltip>} aria-label="Range" />
            <Tab icon={<Tooltip title="Tasklist"><Assignment /></Tooltip>} aria-label="Tasklist" />
            <Tab
              icon={
                <Tooltip title="Notification">
                  <Badge color="error" badgeContent={notificationCount}>
                    <NotificationsNone />
                  </Badge>
                </Tooltip>
              }
              aria-label="Notification"
            />
          </Tabs>
        )}
        {isAuthenticated && (
          <span
            className="text-sm font-semibold text-slate-800 truncate max-w-[12rem] sm:max-w-[16rem] md:max-w-none"
            title={username}
          >
            Username : {username}
          </span>
        )}
        <button
          type="button"
          className="btn-primary flex-shrink-0"
          onClick={handleLogOut}
        >
          {isAuthenticated ? "Log out" : "Log in"}
        </button>
      </div>
    </header>
  );
};

export default Header;
