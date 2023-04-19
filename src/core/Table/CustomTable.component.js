import React, { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableContainer,
  TableFooter,
  TablePagination,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import TablePaginationActions from "./TablePaginationActions.component";

const useStyles = makeStyles((theme) => ({
  tableCellGreen: {
    color: "green",
  },
  tableCellRed: {
    color: "red",
  },
  tableCellHeaderFooter: {
    color: theme.palette.primary.contrastText,
    "$hover:hover &": {
      transition: "all 0.2s ease-in-out",
      color: theme.palette.secondary.contrastText,
    },
  },
  tableRow: {
    background: theme.palette.primary.main,
    "&$hover:hover": {
      transition: "all 0.2s ease-in-out",
      background: theme.palette.secondary.main,
    },
  },
  hover: {},
}));

export default function CustomTable({ data, header, colorful }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const c = useStyles();

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <TableContainer sx={{ my: 2 }}>
      <Table aria-label="table">
        <TableHead>
          <TableRow classes={{ hover: c.hover }} className={c.tableRow} hover>
            <TableCell className={c.tableCellHeaderFooter} scope="row">
              #
            </TableCell>
            {header.map((head) => (
              <TableCell
                key={head}
                align="center"
                className={c.tableCellHeaderFooter}
                scope="row"
              >
                {head}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {(rowsPerPage > 0
            ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : data
          ).map((row, index) => (
            <TableRow key={index + page * rowsPerPage + 1} hover>
              <TableCell component="th" scope="row">
                {index + page * rowsPerPage + 1}
              </TableCell>
              {Object.keys(row).map((key, index) => (
                <TableCell
                  key={index}
                  align="center"
                  className={
                    index === 0 && colorful
                      ? row[key] >= 0
                        ? c.tableCellGreen
                        : c.tableCellRed
                      : ""
                  }
                >
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow hover>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { value: -1, label: "Toate" }]}
              colSpan={5}
              count={data.length}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage="Nr. rânduri:"
              labelDisplayedRows={({ from, to, count }) =>
                `${from}-${to} din ${count}`
              }
              page={page}
              SelectProps={{
                inputProps: {
                  "aria-label": "Nr. rânduri",
                },
                native: true,
              }}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}
