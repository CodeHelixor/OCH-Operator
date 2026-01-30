import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Collapse } from "@mui/material";
import { RangeData, RangeTableProps } from "./types";

interface Column {
  id:
    | "id"
    | "range"
    | "startDate"
    | "rangeHolderId"
    | "serviceOperator"
    | "networkOperator"
    | "lubo"
    | "numberType"
    | "spc"
    | "municipality"
    | "chargingInfo"
    | "routingInfo"
    | "portingCase"
    | "ochOrderNumber";
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  {
    id: "id",
    label: "No",
    minWidth: 25,
    align: "center",
  },
  {
    id: "range",
    label: "Range",
    minWidth: 250,
    align: "center",
  },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 250,
    align: "center",
  },
  {
    id: "rangeHolderId",
    label: "Range Holder Id",
    minWidth: 80,
    align: "center",
  },
  {
    id: "serviceOperator",
    label: "Service Operator",
    minWidth: 80,
    align: "center",
  },
  {
    id: "networkOperator",
    label: "Network Operator",
    minWidth: 80,
    align: "center",
  },
  {
    id: "lubo",
    label: "LUBO",
    minWidth: 80,
    align: "center",
  },
  {
    id: "numberType",
    label: "Number Type",
    minWidth: 80,
    align: "center",
  },
  {
    id: "spc",
    label: "SPC",
    minWidth: 80,
    align: "center",
  },
  {
    id: "municipality",
    label: "Municipality",
    minWidth: 80,
    align: "center",
  },
  {
    id: "chargingInfo",
    label: "Charging Info",
    minWidth: 80,
    align: "center",
  },
  {
    id: "routingInfo",
    label: "Routing Info",
    minWidth: 80,
    align: "center",
  },
  {
    id: "portingCase",
    label: "Porting Case",
    minWidth: 80,
    align: "center",
  },
  {
    id: "ochOrderNumber",
    label: "OCH Order Number",
    minWidth: 80,
    align: "center",
  },
];

const Rangetable = ({ ranges }: RangeTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [localRanges, setLocalRanges] = React.useState<RangeData[]>([]);
  // const [expandedRowId, setExpandedRowId] = React.useState<number | null>(null);

  const API_BASE_URL =
    window._env_?.REACT_APP_API_BASE_URL || "http://localhost:8080";

  React.useEffect(() => {
    setLocalRanges(ranges);
  }, [ranges]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
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
            {localRanges
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <React.Fragment key={index}>
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      // onClick={() => {
                      //   setExpandedRowId(
                      //     expandedRowId === row.id ? null : row.id
                      //   );
                      // }}
                    >
                      {columns.map((column) => {
                        if (column.id === "id") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {index + 1}
                            </TableCell>
                          );
                        }
                        if (column.id == "range") {
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {`${row.rangeStart} - ${row.rangeEnd}`}
                            </TableCell>
                          );
                        }
                        // if (column.id === "isCompleted") {
                        //   const actions = {
                        //     I: "Inserted",
                        //     U: "Updated",
                        //     D: "Deleted",
                        //   };
                        //   const value = actions[row.rangeUpdateType];
                        //   return (
                        //     <TableCell key={column.id} align={column.align}>
                        //       {row.isCompleted === true ? value : ""}
                        //     </TableCell>
                        //   );
                        // }
                        else {
                          const value = (row as any)[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {value}
                            </TableCell>
                          );
                        }
                      })}
                    </TableRow>

                    {/* <TableRow>
                      <TableCell
                        colSpan={columns.length}
                        style={{ padding: 0, border: 0 }}
                      >
                        <Collapse
                          in={expandedRowId === row.id}
                          timeout="auto"
                          unmountOnExit
                          collapsedSize={0}
                        >
                          <div style={{ padding: "16px" }}>
                            <strong>OCH Order Number : </strong>
                            {row.ochOrderNumber}
                            <br />
                            <strong>Originating Order Number : </strong>
                            {row.originatingOrderNumber}
                            <br />
                            <strong>Unique ID : </strong>
                            {row.uniqueId}
                            <br />
                            <strong>Other Operator : </strong>
                            {row.otherOperator}
                            <br />
                            <strong>Current Range Operator : </strong>
                            {row.currentRangeHolder}
                            <br />
                            <strong>Current Service Operator : </strong>
                            {row.currentServiceOperator}
                            <br />
                            <strong>Current Network Operator : </strong>
                            {row.currentNetworkOperator}
                            <br />
                          </div>
                        </Collapse>
                      </TableCell>
                    </TableRow> */}
                  </React.Fragment>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={localRanges.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default Rangetable;
