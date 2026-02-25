import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import NPConfirmModal from "./modals/NPConfirmModal";
import {
  NPCompleteModalData,
  NPConfirmationModalData,
  NPReturnModalData,
  TaskData,
  TaskTableProps,
} from "./types";
import AlertComponent from "../../general/AlertComponent";
import NPCompleteModal from "./modals/NPCompleteModal";
import NPReturnModal from "./modals/NPReturnModal";
import { useAuth } from "../../../context/AuthContext";

interface Column {
  id:
    | "transactionType"
    | "telephoneNumber"
    | "recipientNetworkOperator"
    | "requestedExecutionDate"
    | "confirmedExecutionDate"
    | "confirmationStatus";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "transactionType",
    label: "TransactionType",
    minWidth: 170,
    align: "center",
  },
  {
    id: "telephoneNumber",
    label: "PhoneNumber",
    minWidth: 100,
    align: "center",
  },
  {
    id: "recipientNetworkOperator",
    label: "Recipient Operator",
    minWidth: 170,
    align: "center",
  },
  {
    id: "requestedExecutionDate",
    label: "RequestedExecutionDate",
    minWidth: 170,
    align: "center",
  },
  {
    id: "confirmedExecutionDate",
    label: "ConfirmedExecutionDate",
    minWidth: 170,
    align: "center",
  },
  {
    id: "confirmationStatus",
    label: "ConfirmationStatus",
    minWidth: 170,
    align: "center",
  },
];

/** Transaction types shown in the task list table. Only these are displayed. */
const ALLOWED_TASK_TRANSACTION_TYPES = new Set([
  "001", // NP Create
  "002", // NP OCH Resp
  "004", // NP Confirmation
  "008", // NP Completion
  "009", // NP Update
  "012", // NP Return
]);

const tnsTypes = [
  "",
  "NP Create",
  "NP OCH Resp",
  "",
  "NP Confirmation",
  "NP Error",
  "NP Reject",
  "NP Cancel",
  "NP Completion",
  "NP Update",
  "NP Update Complete",
  "NP Update",
  "NP Return",
  "",
  "NP Range Update",
  "NP Range Update",
  "",
  "NP Change",
  "NP Porting Request",
  "NP Porting Response",
];

// interface TaskListRow {
//   id: number;
//   uniqueId: string;
//   transactionType: string;
//   telephoneNumber: string;
//   recipientNetworkOperator: string;
//   requestedExecutionDate: string;
//   confirmedExecutionDate: string;
// }
// interface TasklisttableProps {
//   tasks: TaskListRow[];
// }

/** Unique key for deduplication: prefer originatingOrderNumber, fallback to composite */
function getTaskKey(task: TaskData): string {
  if (task.originatingOrderNumber) return task.originatingOrderNumber;
  if (task.uniqueId) return task.uniqueId;
  return `${task.telephoneNumber}|${task.transactionType}|${task.requestedExecutionDate}|${task.recipientNetworkOperator}`;
}

export default function Tasklisttable({ tasks, numbers, onTaskDeleted }: TaskTableProps) {
  const { username } = useAuth();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [selectedRow, setSelectedRow] = React.useState<TaskData | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = React.useState(false);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = React.useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = React.useState(false);

  const [showAlert, setShowAlert] = React.useState(false);
  const [alertMsg, setAlertMsg] = React.useState("");
  const [alertType, setAlertType] = React.useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const visibleTasks = React.useMemo(() => {
    // Set of telephone numbers that exist in the number table (show only tasks for these)
    const numbersInTable =
      numbers != null && numbers.length > 0
        ? new Set(
            numbers
              .map((n) => n.telephoneNumber)
              .filter((p): p is string => p != null && p !== "")
          )
        : null;

    // Deduplicate: keep most recent (highest id) per unique task; only include tasks whose number exists in number table
    const sorted = [...tasks].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    const seen = new Set<string>();
    return sorted.filter((t) => {
      const txType = t.transactionType != null ? t.transactionType.trim() : "";
      if (!ALLOWED_TASK_TRANSACTION_TYPES.has(txType)) return false;
      const key = getTaskKey(t);
      if (seen.has(key)) return false;
      seen.add(key);
      if (numbersInTable != null && t.telephoneNumber != null) {
        if (!numbersInTable.has(t.telephoneNumber)) return false;
      }
      return true;
    });
  }, [tasks, numbers]);

  React.useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(visibleTasks.length / rowsPerPage) - 1);
    setPage((p) => (p > maxPage ? maxPage : p));
  }, [visibleTasks.length, rowsPerPage]);

  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onNPConfirmModalOK = async (formData: NPConfirmationModalData) => {
    setIsConfirmModalOpen(false);
    try {
      // console.log(formData.confirmationStatus);
      const res = await fetch(
        `${API_BASE_URL}/confirm/${selectedRow?.originatingOrderNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            confirmedExecutionDate: formData.confirmedExecutionDate,
            confirmationStatus: formData.confirmationStatus,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Failed to confirm task: ${res.statusText}`);
      }
      const result = await res.json();
      console.log("====================here======================");
      console.log(result);
      if (result) {
        setShowAlert(true);
        setAlertMsg("Confirmation request is sent to OCH");
        setAlertType("success");
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        setShowAlert(true);
        setAlertMsg("Confirmation request is not sent to OCH");
        setAlertType("error");
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (err) {
      // console.error("Error confirming task:", err);
    }
  };

  const onNPConfirmModalCancel = () => {
    setIsConfirmModalOpen(false);
  };

  const onNPCompleteModalOK = async (formData: NPCompleteModalData) => {
    setIsCompleteModalOpen(false);
    // console.log(selectedRow);
    // console.log({
    //   telephoneNumber: selectedRow?.telephoneNumber,
    //   ochOrderNumber: selectedRow?.ochOrderNumber,
    //   uniqueId: selectedRow?.uniqueId,
    //   originatingOrderNumber: selectedRow?.originatingOrderNumber,
    //   ...formData,
    // });
    try {
      const res = await fetch(
        `${API_BASE_URL}/complete/${selectedRow?.originatingOrderNumber}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            telephoneNumber: selectedRow?.telephoneNumber,
            ochOrderNumber: selectedRow?.ochOrderNumber,
            uniqueId: selectedRow?.uniqueId,
            originatingOrderNumber: selectedRow?.originatingOrderNumber,
            ...formData,
          }),
        }
      );
      if (!res.ok) {
        throw new Error(`Failed to confirm task: ${res.statusText}`);
      }
      const result = await res.json();
      console.log("====================here======================");
      console.log(result);
      if (result) {
        setShowAlert(true);
        setAlertMsg("Confirmation request is sent to OCH");
        setAlertType("success");
        setTimeout(() => setShowAlert(false), 3000);
      } else {
        setShowAlert(true);
        setAlertMsg("Confirmation request is not sent to OCH");
        setAlertType("error");
        setTimeout(() => setShowAlert(false), 3000);
      }
    } catch (err) {
      // console.error("Error confirming task:", err);
    }
  };

  const onNPCompleteModalCancel = () => {
    setIsCompleteModalOpen(false);
  };

  const openConfirmModal = (row: TaskData) => {
    setSelectedRow(row);
    setIsConfirmModalOpen(true);
  };

  const openCompleteModal = (row: TaskData) => {
    setSelectedRow(row);
    setIsCompleteModalOpen(true);
  };

  const openReturnModal = (row: TaskData) => {
    setSelectedRow(row);
    setIsReturnModalOpen(true);
  };

  const onNPReturnModalOK = async (formData: NPReturnModalData) => {
    setIsReturnModalOpen(false);
    try {
      const res = await fetch(
        `${API_BASE_URL}/npreturn/${selectedRow?.originatingOrderNumber}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            telephoneNumber: formData.telephoneNumber,
            originatingOrderNumber: formData.originatingOrderNumber,
            seriesCount: formData.seriesCount,
            series: formData.series,
            comments: formData.comments,
          }),
        }
      );
      if (!res.ok) throw new Error(`Return request failed: ${res.statusText}`);
      const result = await res.json();
      if (result) {
        setShowAlert(true);
        setAlertMsg("NP Return request sent to OCH");
        setAlertType("success");
      } else {
        setShowAlert(true);
        setAlertMsg("NP Return request was not sent");
        setAlertType("error");
      }
      setTimeout(() => setShowAlert(false), 3000);
    } catch (err) {
      setShowAlert(true);
      setAlertMsg("NP Return request failed");
      setAlertType("error");
      setTimeout(() => setShowAlert(false), 3000);
    }
  };

  const onNPReturnModalCancel = () => {
    setIsReturnModalOpen(false);
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ height: 650 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  <span className="font-bold text-lg">{column.label}</span>
                </TableCell>
              ))}
              <TableCell align="center" style={{ minWidth: 180 }}>
                <span className="font-bold text-lg">Actions</span>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {visibleTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => (
                  <TableRow
                    hover
                    key={getTaskKey(row)}
                    style={{
                      opacity: row.isCompleted ? 0.6 : 1,
                    }}
                  >
                    {columns.map((column) => {
                      let value =
                        column.id == "transactionType"
                          ? tnsTypes[+row[column.id]]
                          : (row as any)[column.id];
                      if (
                        value &&
                        typeof value === "object" &&
                        "value" in value
                      ) {
                        // @ts-ignore
                        value = value.value;
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center", flexWrap: "wrap", alignItems: "center" }}>
                        {(row.transactionType === "001" || row.transactionType === "002") && !row.isCompleted && (
                          <Button
                            variant="contained"
                            size="small"
                            color="primary"
                            disabled={row.recipientNetworkOperator === username}
                            onClick={() => openConfirmModal(row)}
                          >
                            Confirm
                          </Button>
                        )}
                        {row.transactionType === "004" && !row.isCompleted && (
                          <Button
                            variant="contained"
                            size="small"
                            color="success"
                            // disabled={row.currentNetworkOperator !== username}
                            onClick={() => openCompleteModal(row)}
                          >
                            Complete
                          </Button>
                        )}
                        {row.transactionType === "009" && !row.isCompleted && (
                          <Button
                            variant="contained"
                            size="small"
                            color="error"
                            disabled={row.currentNetworkOperator !== username}
                            onClick={() => openReturnModal(row)}
                          >
                            Return
                          </Button>
                        )}
                        {row.isCompleted && (
                          <span style={{ color: "text.secondary", fontSize: "0.875rem" }}>—</span>
                        )}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={visibleTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      {isConfirmModalOpen && selectedRow && (
        <NPConfirmModal
          selectedTask={selectedRow}
          onNPConfirmModalOK={onNPConfirmModalOK}
          onNPConfirmModalCancel={onNPConfirmModalCancel}
        />
      )}
      {isCompleteModalOpen && selectedRow && (
        <NPCompleteModal
          selectedTask={selectedRow}
          onNPCompleteModalOK={onNPCompleteModalOK}
          onNPCompleteModalCancel={onNPCompleteModalCancel}
        />
      )}
      {isReturnModalOpen && selectedRow && (
        <NPReturnModal
          selectedTask={selectedRow}
          onNPReturnModalOK={onNPReturnModalOK}
          onNPReturnModalCancel={onNPReturnModalCancel}
        />
      )}
      <AlertComponent
        show={showAlert}
        message={alertMsg}
        severity={alertType}
      />
    </Paper>
  );
}
