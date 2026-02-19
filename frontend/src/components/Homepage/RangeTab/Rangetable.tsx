import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
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
    minWidth: 35,
    align: "center",
  },
  {
    id: "range",
    label: "Range",
    minWidth: 120,
    align: "center",
  },
  {
    id: "startDate",
    label: "Start Date",
    minWidth: 120,
    align: "center",
  },
  {
    id: "rangeHolderId",
    label: "Range Holder Id",
    minWidth: 55,
    align: "center",
  },
  {
    id: "serviceOperator",
    label: "Service Operator",
    minWidth: 55,
    align: "center",
  },
  {
    id: "networkOperator",
    label: "Network Operator",
    minWidth: 55,
    align: "center",
  },
  {
    id: "lubo",
    label: "LUBO",
    minWidth: 50,
    align: "center",
  },
  {
    id: "numberType",
    label: "Number Type",
    minWidth: 55,
    align: "center",
  },
  {
    id: "spc",
    label: "SPC",
    minWidth: 40,
    align: "center",
  },
  {
    id: "municipality",
    label: "Municipality",
    minWidth: 60,
    align: "center",
  },
  {
    id: "chargingInfo",
    label: "Charging Info",
    minWidth: 55,
    align: "center",
  },
  {
    id: "routingInfo",
    label: "Routing Info",
    minWidth: 55,
    align: "center",
  },
  {
    id: "portingCase",
    label: "Porting Case",
    minWidth: 65,
    align: "center",
  },
  {
    id: "ochOrderNumber",
    label: "OCH Order Number",
    minWidth: 70,
    align: "center",
  },
];

const Rangetable = ({ ranges, onSearch }: RangeTableProps) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [localRanges, setLocalRanges] = React.useState<RangeData[]>([]);
  const [phoneStart, setPhoneStart] = React.useState("");
  const [phoneEnd, setPhoneEnd] = React.useState("");

  React.useEffect(() => {
    setLocalRanges(ranges);
  }, [ranges]);

  const handleSearch = () => {
    onSearch?.(phoneStart, phoneEnd);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSearch();
  };

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
      <Box sx={{ py: 1.5, px: 2, borderBottom: 1, borderColor: "divider" }}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="flex-end"
          flexWrap="wrap"
          useFlexGap
        >
          <TextField
            label="Phone Number Start"
            size="small"
            value={phoneStart}
            onChange={(e) => setPhoneStart(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ minWidth: 180 }}
          />
          <TextField
            label="Phone Number End"
            size="small"
            value={phoneEnd}
            onChange={(e) => setPhoneEnd(e.target.value)}
            onKeyDown={handleKeyDown}
            sx={{ minWidth: 180 }}
          />
          <Button variant="contained" onClick={handleSearch}>
            Search
          </Button>
        </Stack>
      </Box>
      <TableContainer sx={{ px: 2, pb: 2 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{ py: 0.75, whiteSpace: "nowrap" }}
                >
                  <span className="font-bold text-sm">{column.label}</span>
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
                            <TableCell key={column.id} align={column.align} sx={{ py: 0.75 }}>
                              {index + 1}
                            </TableCell>
                          );
                        }
                        if (column.id == "range") {
                          return (
                            <TableCell key={column.id} align={column.align} sx={{ py: 0.75 }}>
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
                            <TableCell key={column.id} align={column.align} sx={{ py: 0.75 }}>
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
                            <strong>Recipient Service Operator : </strong>
                            {row.recipientServiceOperator ?? row.serviceOperator}
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
