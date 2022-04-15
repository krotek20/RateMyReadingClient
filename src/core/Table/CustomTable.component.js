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
import TablePaginationActions from "./TablePaginationActions.component";

export default function CustomTable({ data, header }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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
          <TableRow>
            <TableCell>#</TableCell>
            {header.map((head) => (
              <TableCell key={head} align="center">
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
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {index + 1}
              </TableCell>
              {Object.keys(row).map((key) => (
                <TableCell key={row[key]} align="center">
                  {row[key]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
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
