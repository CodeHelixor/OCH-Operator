import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import ConfirmDialog from "../../general/ConfirmDialog";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Collapse } from "@mui/material";
import { ErrorData, ErrorTableProps } from "./types";

interface Column {
  id: "id" | "transactionType" | "telephoneNumber" | "createdAt" | "isViewed";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "id",
    label: "Id",
    minWidth: 25,
    align: "center",
  },
  { id: "transactionType", label: "TnsType", minWidth: 100, align: "center" },
  {
    id: "telephoneNumber",
    label: "PhoneNumber",
    minWidth: 100,
    align: "center",
  },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 100,
    align: "center",
  },
  {
    id: "isViewed",
    label: "Viewed",
    minWidth: 40,
    align: "center",
  },
];

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

// interface NotificationRow {
//   id: number;
//   transactionType: String;
//   telephoneNumber: String;
//   ochOrderNumber: String;
//   uniqueId: String;
//   originatingOrderNumber: String;
//   errors: [];
//   isViewed: boolean;
// }
// interface ErrortableProps {
//   notifications: NotificationRow[];
// }

export default function Errortable({ errors }: ErrorTableProps) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [localTasks, setLocalTasks] = React.useState<ErrorData[]>([]);
  const [expandedRowId, setExpandedRowId] = React.useState<String | null>(null);

  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";

  React.useEffect(() => {
    setLocalTasks(errors);
  }, [errors]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onConfirm = async (row: ErrorData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/errorViewed/${row.uniqueId}`, {
        method: "POST",
      });
      let data;
      try {
        data = await res.json();
      } catch {
        data = null;
      }
      console.log("====================here======================");
      console.log(data);
      if (!res.ok) {
        throw new Error(`Error viewed request failed:  ${res.statusText}`);
      }
      setLocalTasks((prev) =>
        prev.map((task) =>
          task.uniqueId === row.uniqueId ? { ...task, isViewed: true } : task
        )
      );
    } catch (err) {
      // console.error("Error viewed request failed: ", err);
    }
  };

  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
            {localTasks
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <React.Fragment key={+row.uniqueId}>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      onClick={() => {
                        onConfirm(row);
                        setExpandedRowId(
                          expandedRowId === row.uniqueId ? null : row.uniqueId
                        );
                      }}
                    >
                      {columns.map((column) => {
                        if (column.id === "id") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {index + 1}
                            </TableCell>
                          );
                        }
                        if (column.id == "isViewed") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              <VisibilityIcon
                                sx={{
                                  color: row[column.id]
                                    ? "success.main"
                                    : "text.primary",
                                }}
                              />
                            </TableCell>
                          );
                        } else {
                          const value = (row as any)[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>

                    <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        style={{ padding: 0, border: 0 }}
                      >
                        <Collapse
                          in={expandedRowId === row.uniqueId}
                          timeout="auto"
                          unmountOnExit
                          collapsedSize={0}
                        >
                          <div style={{ padding: "16px" }}>
                            <strong>Telephone Number : </strong>{" "}
                            {row.telephoneNumber} <br />
                            <strong>OCH Order Number : </strong>{" "}
                            {row.ochOrderNumber} <br />
                            <strong>UniqueId : </strong> {row.uniqueId} <br />
                            <strong>Originating Order Number: </strong>{" "}
                            {row.originatingOrderNumber} <br />
                            <strong>Errors:</strong>
                            <pre style={{ whiteSpace: "pre-wrap" }}>
                              {JSON.stringify(row.errors, null, 2)}
                            </pre>
                          </div>
                        </Collapse>
                      </TableCell>
                    </TableRow>
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={localTasks.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
