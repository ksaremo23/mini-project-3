import React, { Fragment } from "react";

import { DataGrid } from "@mui/x-data-grid";



const ViewProducts = () => {
  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "products", headerName: "Products", width: 240 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
    },
  ];

  const rows = [
    {
      id: 1,
      products: "test product",
      description: "product for test",
      price: 35,
    },
  ];
  return (
    <Fragment>
      {" "}
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
        />
      </div>
    </Fragment>
  );
};

export default ViewProducts;
