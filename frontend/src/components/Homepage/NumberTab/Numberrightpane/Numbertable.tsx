import React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import BlockIcon from "@mui/icons-material/Block";
import DeleteIcon from "@mui/icons-material/Delete";
import Tooltip from "@mui/material/Tooltip";
import { useGlobalState } from "../../../../context/GlobalState";
import AlertComponent from "../../../general/AlertComponent";
import RejectModal, { NpRejectFormData } from "../modals/RejectModal";
import CancelConfirmModal from "../modals/CancelConfirmModal";
import { NumberData, NumberTableProps } from "../types";
import { useAuth } from "../../../../context/AuthContext";

/** OCH NP Reject transaction type. */
const NP_REJECT_TRANSACTION_TYPE = "006";

interface Column {
  id: "id" | "telephoneNumber" | "actions" | "regdate" | "moddate" | "status";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "id", label: "Id", minWidth: 25, align: "center" },
  {
    id: "telephoneNumber",
    label: "Listed MSISDN",
    minWidth: 100,
    align: "center",
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 100,
    align: "center",
  },
  { id: "regdate", label: "Reg.Date", minWidth: 100, align: "center" },
  {
    id: "moddate",
    label: "Mod.Date",
    minWidth: 100,
    align: "center",
  },
  {
    id: "status",
    label: "Status",
    minWidth: 100,
    align: "center",
  },
];

interface Data {
  id: number;
  msisdn: string;
  actions?: React.ReactNode;
  regdate: string;
  moddate: string;
  status: string;
}

function createData(
  id: number,
  msisdn: string,
  regdate: string,
  moddate: string,
  status: string
): Data {
  return { id, msisdn, regdate, moddate, status };
}

function isNumberForOperator(row: NumberData, operatorId: string): boolean {
  if (!operatorId) return false;
  return (
    row.recipientServiceOperator === operatorId ||
    row.recipientNetworkOperator === operatorId
  );
}

export default function Numbertable({ numbers }: NumberTableProps) {
  const { username } = useAuth();
  const [localNumbers, setLocalNumbers] = React.useState<NumberData[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [showAlert, setShowAlert] = React.useState(false);
  const [rejectModalOpen, setRejectModalOpen] = React.useState(false);
  const [rejectSubmitting, setRejectSubmitting] = React.useState(false);
  const [cancelModalOpen, setCancelModalOpen] = React.useState(false);
  const [cancelSubmitting, setCancelSubmitting] = React.useState(false);
  const [editModalOpen, setEditModalOpen] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState<NumberData | null>(null);
  const [alertMsg, setAlertMsg] = React.useState("");
  const [alertType, setAlertType] = React.useState<
    "success" | "info" | "warning" | "error"
  >("success");

  const visibleNumbers = React.useMemo(() => {
    if (!username) return [];
    const filtered = numbers.filter((n) => isNumberForOperator(n, username));
    // Deduplicate by telephoneNumber: keep most recent (highest id)
    const sorted = [...filtered].sort((a, b) => (b.id ?? 0) - (a.id ?? 0));
    const seenPhones = new Set<string>();
    return sorted.filter((n) => {
      const phone = n.telephoneNumber;
      if (!phone || seenPhones.has(phone)) return false;
      seenPhones.add(phone);
      return true;
    });
  }, [numbers, username]);

  React.useEffect(() => {
    setLocalNumbers(visibleNumbers);
  }, [visibleNumbers]);

  React.useEffect(() => {
    const maxPage = Math.max(0, Math.ceil(visibleNumbers.length / rowsPerPage) - 1);
    setPage((p) => (p > maxPage ? maxPage : p));
  }, [visibleNumbers.length, rowsPerPage]);

  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";

  const [portationDate, setPortationDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [registrationDate, setRegistrationDate] = React.useState(
    new Date().toISOString().split("T")[0]
  );
  const [portationStatus, setPortationStatus] = React.useState("1");

  const { state, dispatch } = useGlobalState();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const openRejectModal = (row: NumberData) => {
    setSelectedRow(row);
    setRejectModalOpen(true);
  };

  const openCancelModal = (row: NumberData) => {
    setSelectedRow(row);
    setCancelModalOpen(true);
  };

  const handleCancelApply = async () => {
    if (!selectedRow) return;
    setCancelSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/cancel`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          telephoneNumber: selectedRow.telephoneNumber,
          ochOrderNumber: selectedRow.ochOrderNumber ?? "",
          originatingOrderNumber: selectedRow.originatingOrderNumber ?? "",
          uniqueId: selectedRow.uniqueId ?? "",
        }),
      });
      const result = await res.json();
      if (result === true) {
        setShowAlert(true);
        setAlertMsg("Cancel request was sent to OCH successfully.");
        setAlertType("success");
        setTimeout(() => setShowAlert(false), 3000);
        setCancelModalOpen(false);
        setSelectedRow(null);
        return;
      }
      setShowAlert(true);
      setAlertMsg("Cancel request failed.");
      setAlertType("error");
      setTimeout(() => setShowAlert(false), 3000);
    } catch {
      setShowAlert(true);
      setAlertMsg("Cancel request failed.");
      setAlertType("error");
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setCancelSubmitting(false);
    }
  };

  const handleRejectSubmit = async (data: NpRejectFormData) => {
    setRejectSubmitting(true);
    try {
      const res = await fetch(`${API_BASE_URL}/reject`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          transactionType: NP_REJECT_TRANSACTION_TYPE,
          telephoneNumber: data.telephoneNumber,
          ochOrderNumber: data.ochOrderNumber,
          uniqueId: data.uniqueId,
          originatingOrderNumber: data.originatingOrderNumber,
          otherOperator: data.otherOperator,
          rejectCode: data.rejectCode,
          rejectText: data.rejectText,
        }),
      });
      const result = await res.json();
      if (result === true) {
        setShowAlert(true);
        setAlertMsg("NP Reject was sent to OCH successfully.");
        setAlertType("success");
        setTimeout(() => setShowAlert(false), 3000);
        setRejectModalOpen(false);
        setSelectedRow(null);
        return;
      }
      setShowAlert(true);
      setAlertMsg("NP Reject request failed.");
      setAlertType("error");
      setTimeout(() => setShowAlert(false), 3000);
    } catch {
      setShowAlert(true);
      setAlertMsg("NP Reject request failed.");
      setAlertType("error");
      setTimeout(() => setShowAlert(false), 3000);
    } finally {
      setRejectSubmitting(false);
    }
  };

  // const openEditModal = (row: Data) => {
  //   setEditModalOpen(true);
  //   const today = new Date().toISOString().split("T")[0];
  //   setRegistrationDate(
  //     row.regdate && row.regdate !== "" ? row.regdate : today
  //   );
  //   setPortationDate(row.moddate && row.moddate !== "" ? row.moddate : today);
  //   const statusId =
  //     row.status === "Pending" ? "1" : row.status === "Ported" ? "2" : "3";
  //   setPortationStatus(statusId);
  //   setSelectedRow(row);
  // };
  // const editConfirm = () => {
  //   setEditModalOpen(false);
  //   handleEdit(selectedRow);
  // };
  const handleEdit = async (row: Data | null) => {
    try {
      const res = await fetch(`${API_BASE_URL}/update/${row?.id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          portationDate,
          registrationDate,
          portationStatus,
        }),
      });
      let data = await res.json();
      if (data !== null) {
        dispatch({ type: "UPDATE_NUMBER", payload: data });
        setShowAlert(true);
        setAlertMsg("Successfully Updated!");
        setAlertType("success");
        setTimeout(() => setShowAlert(false), 3000);
        return;
      } else {
        setShowAlert(true);
        setAlertMsg("Updating was failed!");
        setAlertType("error");
        setTimeout(() => setShowAlert(false), 3000);
        return;
      }
    } catch (error) {
      setShowAlert(true);
      setAlertMsg("Updating was failed!");
      setAlertType("error");
      setTimeout(() => setShowAlert(false), 3000);
      return;
    }
  };
  const editModalOk = () => {};
  return (
    <Paper
      sx={{ width: "100%", overflow: "hidden" }}
      className="rounded-lg px-7 py-7 my-5"
    >
      <TableContainer sx={{ maxHeight: 440 }}>
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
            </TableRow>
          </TableHead>
          <TableBody>
            {localNumbers
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      let value = row[column.id as keyof NumberData];
                      // if value is an object with 'value' key, use that string:
                      if (
                        value &&
                        typeof value === "object" &&
                        "value" in value
                      ) {
                        // @ts-ignore
                        value = value.value;
                      }
                      if (column.id === "id") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {index + 1}
                          </TableCell>
                        );
                      }

                      if (column.id === "actions") {
                        const isCurrentOperator =
                          username && row.recipientServiceOperator === username;
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <div className="flex items-center justify-center gap-3">
                              {isCurrentOperator && (
                                <>
                                  <IconButton
                                    sx={{
                                      color: "black",
                                      "&:hover": { color: "red" },
                                    }}
                                    // onClick={() => openEditModal(row)}
                                  >
                                    <EditIcon />
                                  </IconButton>
                                  <Tooltip title="Reject" arrow>
                                    <IconButton
                                      sx={{
                                        color: "#d32f2f",
                                        "&:hover": {
                                          color: "#b71c1c",
                                          backgroundColor: "rgba(211, 47, 47, 0.08)",
                                        },
                                      }}
                                      onClick={() => openRejectModal(row)}
                                      aria-label="Reject flow"
                                    >
                                      <BlockIcon />
                                    </IconButton>
                                  </Tooltip>
                                </>
                              )}
                              {!isCurrentOperator && (
                                <Tooltip title="Cancel" arrow>
                                  <IconButton
                                    sx={{
                                      color: "#757575",
                                      "&:hover": {
                                        color: "#424242",
                                        backgroundColor: "rgba(0, 0, 0, 0.04)",
                                      },
                                    }}
                                    onClick={() => openCancelModal(row)}
                                    aria-label="Cancel (send to OCH)"
                                  >
                                    <DeleteIcon />
                                  </IconButton>
                                </Tooltip>
                              )}
                            </div>
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={localNumbers.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AlertComponent
        show={showAlert}
        message={alertMsg}
        severity={alertType}
      />
      <RejectModal
        open={rejectModalOpen}
        onClose={() => {
          setRejectModalOpen(false);
          setSelectedRow(null);
        }}
        row={selectedRow}
        onReject={handleRejectSubmit}
        isSubmitting={rejectSubmitting}
      />
      <CancelConfirmModal
        open={cancelModalOpen}
        onClose={() => {
          setCancelModalOpen(false);
          setSelectedRow(null);
        }}
        row={selectedRow}
        onApply={handleCancelApply}
        isSubmitting={cancelSubmitting}
      />
      {/* <EditModal
        show={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        onOk={editConfirm}
        portationDate={portationDate}
        registrationDate={registrationDate}
        portationStatus={portationStatus}
        setPortationDate={setPortationDate}
        setRegistrationDate={setRegistrationDate}
        setPortationStatus={setPortationStatus}
      /> */}
    </Paper>
  );
}
