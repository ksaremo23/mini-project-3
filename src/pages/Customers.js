import React, { Fragment } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import ViewCustomers from '../components/ViewCustomers';


function createData(customer_id, firstname, lastname, address, city, zip, email, phone) {
  return { customer_id, firstname, lastname, address, city, zip, email, phone};
}

const rows = [
  createData(),
  createData(),
  createData(),
  createData(),
  createData(),
];

export default function BasicTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>customer-id</TableCell>
            <TableCell align="right">firstname</TableCell>
            <TableCell align="right">lastname</TableCell>
            <TableCell align="right">address</TableCell>
            <TableCell align="right">city</TableCell>
            <TableCell align="right">zip</TableCell>
            <TableCell align="right">email</TableCell>
            <TableCell align="right">phone</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.customer_id}</TableCell>
              <TableCell align="right">{row.firstame}</TableCell>
              <TableCell align="right">{row.lastname}</TableCell>
              <TableCell align="right">{row.address}</TableCell>
              <TableCell align="right">{row.city}</TableCell>
              <TableCell align="right">{row.zip}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

