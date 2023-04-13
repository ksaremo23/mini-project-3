import React, { Fragment } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import ViewCustomers from "../components/ViewCustomers";

const columns = [
  { field: "customer_id", headerName: "Customer_ID", width: 120 },
  {
    field: "firstName",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "lastName",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "Address",
    headerName: "Address",
    type: "number",
    width: 110,
    editable: true,
  },

  {
    field: "City",
    headerName: "City",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "Zip",
    headerName: "Zip",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "Email",
    headerName: "Email",
    type: "number",
    width: 110,
    editable: true,
  },
  {
    field: "Phone",
    headerName: "Phone",
    type: "number",
    width: 110,
    editable: true,
  },
];

const rows = [
  { id: 1, lastName: "Snow", firstName: "Jon", age: 35 },
  {
    id: 2,
    lastName: "Lannister",
    firstName: "Cersei",
    address: "Manila",
    city: "Taguig",
    zip: "4511",
    email: "sample@email.com",
    phone: "123456789",
  },
  {
    id: 3,
    lastName: "Lannister",
    firstName: "Jaime",
    address: "Manila",
    city: "Taguig",
    zip: "4511",
    email: "sample@email.com",
    phone: "123456789",
  },
  {
    id: 4,
    lastName: "Stark",
    firstName: "Arya",
    address: "Manila",
    city: "Taguig",
    zip: "4511",
    email: "sample@email.com",
    phone: "123456789",
  },
  {
    id: 5,
    lastName: "Targaryen",
    firstName: "Daenerys",
    address: "Manila",
    city: "Taguig",
    zip: "4511",
    email: "sample@email.com",
    phone: "123456789",
  },
  {
    id: 6,
    lastName: "Melisandre",
    firstName: "Dennis",
    address: "Manila",
    city: "Taguig",
    zip: "4511",
    email: "sample@email.com",
    phone: "123456789",
  },
  {
    id: 7,
    lastName: "Clifford",
    firstName: "Ferrara",
    address: "Manila",
    city: "Taguig",
    zip: "4511",
    email: "sample@email.com",
    phone: "123456789",
  },
  {
    id: 8,
    lastName: "Frances",
    firstName: "Rossini",
    address: "Manila",
    city: "Taguig",
    zip: "4511",
    email: "sample@email.com",
    phone: "123456789",
  },
  {
    id: 9,
    lastName: "Roxie",
    firstName: "Harvey",
    address: "Manila",
    city: "Taguig",
    zip: "4511",
    email: "sample@email.com",
    phone: "123456789",
  },
];

export default function DataGridDemo() {
  return (
    <Fragment>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 5,
              },
            },
          }}
          pageSizeOptions={[5]}
          checkboxSelection
          disableRowSelectionOnClick
        />
      </Box>
      {/**render ViewCustomer component here */}
    </Fragment>
  );
}
