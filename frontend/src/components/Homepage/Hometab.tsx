import * as React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Numbertab from "./NumberTab/Numbertab";
import {
  Assignment,
  Home,
  NotificationsNone,
  SendToMobile,
  Storage,
} from "@mui/icons-material";
import Tasklisttab from "./TaskListTab/Tasklisttab";
import { Badge, Tooltip } from "@mui/material";
import Notificationtab from "./ErrorTab/Errortab";
import AlertComponent from "../general/AlertComponent";
import Rangetab from "./RangeTab/Rangetab";
import { RangeData } from "./RangeTab/types";
import { NumberData } from "./NumberTab/types";
import { TaskData } from "./TaskListTab/types";
import { useAuth } from "../../context/AuthContext";
import Errortab from "./ErrorTab/Errortab";
import { ErrorData } from "./ErrorTab/types";

export default function Hometab() {
  const [value, setValue] = React.useState(0);
  const [badgeContent, setBadgeContent] = React.useState(0);
  const [numbers, setNumbers] = React.useState<NumberData[]>([]);
  const [ranges, setRanges] = React.useState<RangeData[]>([]);
  const [filteredRanges, setFilteredRanges] = React.useState<RangeData[]>([]);
  const [tasks, setTasks] = React.useState<TaskData[]>([]);
  const [errors, setErrors] = React.useState<ErrorData[]>([]);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");
  const [alertType, setAlertType] = React.useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const [phoneStart, setPhoneStart] = React.useState<string>("");
  const [phoneEnd, setPhoneEnd] = React.useState<string>("");
  // const prevBadgeContent = React.useRef(0);

  const { userId } = useAuth();

  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";

  React.useEffect(() => {
    readNumbers();
    readRanges();
    readErrors();
    readNotifications();
    readTasks();

    const intervalId = setInterval(() => {
      readNumbers();
      readRanges();
      readErrors();
      readNotifications();
      readTasks();
    }, 10000);
    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    handleRangeSearch(phoneStart, phoneEnd);
  }, [ranges]);

  // React.useEffect(() => {
  //   if (badgeContent > prevBadgeContent.current) {
  //     setShowAlert(true);
  //     setAlertMsg("Received Error message from OCH");
  //     setAlertType("warning");
  //     setTimeout(() => setShowAlert(false), 3000);
  //   }
  //   prevBadgeContent.current = badgeContent;
  // }, [badgeContent]);

  const readNumbers = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/get/numbers`, {
        method: "POST",
      });
      let data = await res.json();
      if (data) {
        setNumbers(data.filter((item: NumberData) => item.status != null));
      }
    } catch {
      console.log("Error in reading ranges");
    }
  };

  const readRanges = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/get/ranges`, {
        method: "POST",
      });
      let data = await res.json();
      if (data) {
        setRanges(data);
      }
    } catch {
      console.log("Error in reading ranges");
    }
  };

  const readTasks = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/get/tasks`, {
        method: "POST",
      });
      let data = await res.json();
      setTasks(data);
    } catch (err) {
      console.log("Error reading from TaskLists: ", err);
    }
  };
  const readErrors = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/readErrors`, {
        method: "POST",
      });
      let data = await res.json();
      setBadgeContent(
        data.filter((note: any) => !note.isViewed && note.userId == userId)
          .length
      );
      setErrors(data.filter((note: any) => note.userId == userId));
    } catch (err) {
      console.log("Error reading from TaskLists: ", err);
    }
  };

  const readNotifications = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/readNotifications`, {
        method: "POST",
      });
      let data = await res.json();
      let notifications = data.filter((note: any) => userId == note.userId);
      for (let i = 0; i < notifications.length; i++) {
        if (notifications[i].userId == userId) {
          if (notifications[i].notifyType == "error") {
            setShowAlert(true);
            setAlertMsg(notifications[i].notify);
            setAlertType("error");
            setTimeout(() => setShowAlert(false), 3000);
          } else {
            setShowAlert(true);
            setAlertMsg(notifications[i].notify);
            setAlertType("success");
            setTimeout(() => setShowAlert(false), 3000);
          }
          await fetch(`${API_BASE_URL}/deleteNotify/${notifications[i].id}`, {
            method: "POST",
          });
        }
      }
    } catch (err) {
      console.log("Error reading from TaskLists: ", err);
    }
  };

  const handleRangeSearch = (start: string, end: string) => {
    const s = start.trim();
    const e = end.trim();

    setPhoneStart(s);
    setPhoneEnd(e);

    // if both empty -> show all
    if (s === "" && e === "") {
      setFilteredRanges(ranges);
      return;
    }

    // we assume your range item has .rangeStart and .rangeEnd as strings
    const filtered = ranges.filter((r) => {
      const rStart = Number(r.rangeStart);
      const rEnd = Number(r.rangeEnd);
      //  // user gave only start
      // if (s && !e) {
      //   return rStart >= Number(s);
      // }

      // // user gave only end
      // if (!s && e) {
      //   return rEnd <= Number(e);
      // }

      // // user gave both -> overlap check or inside check
      // // simplest: show ranges that cover [s, e]
      // return rStart >= Number(s) && rEnd <= Number(e);

      // user gave only start
      if (s && !e) {
        return rEnd >= Number(s);
      }

      // user gave only end
      if (!s && e) {
        return rStart <= Number(e);
      }

      // user gave both -> overlap check or inside check
      // simplest: show ranges that cover [s, e]
      return rEnd >= Number(s) && rStart <= Number(e);
    });

    setFilteredRanges(filtered);
  };

  ////////////////////   For Changing the Tab   ///////////////////////
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const renderTabContent = () => {
    return (
      <div>
        <Numbertab numbers={numbers} visible={value === 0 ? "block" : "none"} />
        <Rangetab
          ranges={filteredRanges}
          visible={value === 1 ? "block" : "none"}
          onSearch={handleRangeSearch}
        />
        <Tasklisttab tasks={tasks} visible={value === 2 ? "block" : "none"} />
        <Errortab errors={errors} visible={value === 3 ? "block" : "none"} />
      </div>
    );
  };
  // const renderTabContent = () => {
  //   switch (value) {
  //     case 0:
  //       return <Numbertab numbers={numbers} />;
  //     case 1:
  //       return <Rangetab ranges={ranges} />;
  //     case 2:
  //       return <Tasklisttab tasks={tasks} />;
  //     case 3:
  //       return <Notificationtab />;
  //     default:
  //       return null;
  //   }
  // };

  return (
    <div>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon tabs example"
      >
        <Tab
          icon={
            <Tooltip title="Database">
              <Storage />
            </Tooltip>
          }
          aria-label="phone"
        />
        <Tab
          icon={
            <Tooltip title="Range">
              <SendToMobile />
            </Tooltip>
          }
          aria-label="favorite"
        />
        <Tab
          icon={
            <Tooltip title="Tasklist">
              <Assignment />
            </Tooltip>
          }
          aria-label="favorite"
        />
        <Tab
          icon={
            <Tooltip title="Notification">
              <Badge color="error" badgeContent={badgeContent}>
                <NotificationsNone />
              </Badge>
            </Tooltip>
          }
          aria-label="person"
        />
      </Tabs>
      <div>{renderTabContent()}</div>
      <AlertComponent
        show={showAlert}
        message={alertMsg}
        severity={alertType}
      />
    </div>
  );
}
