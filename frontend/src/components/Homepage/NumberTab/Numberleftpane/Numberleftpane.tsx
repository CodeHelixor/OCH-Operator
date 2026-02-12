import React, { useState, useRef, useEffect } from "react";
import Msisdninput from "./MsisdnInput";
import Radiogroup from "./Radiogroup";
import Searchbar from "./Searchbar";
import AlertComponent from "../../../general/AlertComponent";
import { useGlobalState } from "../../../../context/GlobalState";
import ButtonComponent from "./ButtonComponent";
import Importmodal from "../modals/Importmodal";
import { ImportModalData } from "../types";
import { useAuth } from "../../../../context/AuthContext";

const Numberleftpane = () => {
  const [showAlert, setShowAlert] = useState(false);
  const [alertMsg, setAlertMsg] = useState("");
  const [alertType, setAlertType] = useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const [isImportModalOpen, setIsImportModalOpen] = useState(false);

  const [searchRange, setSearchRange] = useState("");
  const [filterType, setFilterType] = useState("0");
  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";

  const { userId } = useAuth();

  let fileInputRef = useRef<HTMLInputElement>(null);

  const onImportModalOk = async (formData: ImportModalData) => {
    // console.log(formData);
    setIsImportModalOpen(false);
    try {
      const res = await fetch(`${API_BASE_URL}/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, userId }),
      });
      const data = await res.json();
      console.log("====================here======================");
      console.log(data);
      if (data.success) {
        setShowAlert(true);
        setAlertMsg("Number porting request is sent to OCH");
        setAlertType("success");
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        setShowAlert(true);
        setAlertMsg(data.error);
        setAlertType("error");
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMsg("The transaction is failed!");
      setAlertType("error");
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const onImportModalCancel = () => {
    setIsImportModalOpen(false);
  };

  const onUploadListClicked = () => {
    fileInputRef.current?.click();
  };

  const onSearch = async () => {
    if (!searchRange.includes("*")) {
      setSearchRange(searchRange + "*");
    }
    const searchStr = searchRange.replace("*", "");
    try {
      const res = await fetch(`${API_BASE_URL}/get/numbers`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      let data = await res.json();
      console.log("====================here======================");
      console.log(data);
      if (searchRange != "") {
        data = data.filter((item: any) => item.msisdn.startsWith(searchStr));
      }
      if (filterType != "0") {
        data = data.filter((item: any) => item.status.value === filterType);
      }
      // dispatch({ type: "SET_SEARCHED_NUMBERS", payload: data });
    } catch (err) {
      // console.log("Error initializing or fetching data: ", err);
    }
  };

  const onUploadFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.type !== "text/plain") {
      setShowAlert(true);
      setAlertMsg("Cannot read this file type.");
      setAlertType("error");
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }

    const reader = new FileReader();
    reader.onload = async (event: ProgressEvent<FileReader>) => {
      const filecontent = event.target?.result as string;
      const lines = filecontent.split(/\r?\n/);
      const requests = lines.map(async (msisdn) => {
        try {
          const res = await fetch(`${API_BASE_URL}/create`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ msisdn }),
          });
          const data = await res.json();
          console.log("====================here======================");
          console.log(data);
          if (data == null) {
            setShowAlert(true);
            setAlertMsg("The transaction is failed!");
            setAlertType("error");
            setTimeout(() => setShowAlert(false), 3000);
            return;
          }
          // dispatch({ type: "ADD_NUMBER", payload: data });
        } catch (error) {
          setShowAlert(true);
          setAlertMsg("The transaction is failed!");
          setAlertType("error");
          setTimeout(() => setShowAlert(false), 3000);
          return;
        }
      });
      await Promise.all(requests);
      setShowAlert(true);
      setAlertMsg("The file is successfully uploaded!");
      setAlertType("success");
      setTimeout(() => setShowAlert(false), 3000);
    };
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Clear file input before handling file
    }
    reader.readAsText(file);
  };

  const onDownloadListClicked = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/get/numbers`, {
        method: "POST",
      });
      const data = await res.json();
      console.log("====================here======================");
      console.log(data);
      const msisdnList = data
        .map((item: any) => item.msisdn ?? item)
        .join("\n");

      const blob = new Blob([msisdnList], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "msisdn_list.txt";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      setShowAlert(true);
      setAlertMsg("Download started.");
      setAlertType("success");
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      // console.error("Error downloading data: ", err);
      setShowAlert(true);
      setAlertMsg("Failed to download the list.");
      setAlertType("error");
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const handleSearchbarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rangeValue = e.target.value.replace(/\D/g, "");
    setSearchRange(rangeValue);
  };
  const searchbarEnterPressed = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault(); // prevent form submit if inside a form
      onSearch(); // call your login function
    }
  };
  const onFilterTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterType(e.target.value);
  };
  useEffect(() => {
    const fetchData = async () => {
      await onSearch();
    };
    fetchData();
  }, [filterType]);

  return (
    <div className="bg-surface-card rounded-xl px-7 py-7 ml-8 my-5 shadow-sm border border-slate-200/60 card-interactive">
      <div>
        <Searchbar
          searchRange={searchRange}
          onChange={handleSearchbarChange}
          onClick={onSearch}
          onKeyDown={searchbarEnterPressed}
        />
        <Radiogroup value={filterType} onChange={onFilterTypeChange} />
        <ButtonComponent
          label="Import Number"
          onClick={() => setIsImportModalOpen(true)}
        />
        {/* <ButtonComponent label="Upload List" onClick={onUploadListClicked} />
        <ButtonComponent
          label="Download List"
          onClick={onDownloadListClicked}
        /> */}
        <AlertComponent
          show={showAlert}
          message={alertMsg}
          severity={alertType}
        />
        <input
          type="file"
          accept=".txt"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={onUploadFileChange}
        />
      </div>
      {isImportModalOpen && (
        <Importmodal
          onImportModalOk={onImportModalOk}
          onImportModalCancel={onImportModalCancel}
        />
      )}
    </div>
  );
};

export default Numberleftpane;
