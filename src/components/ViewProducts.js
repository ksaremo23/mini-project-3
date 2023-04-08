import React, { Fragment, useState, useEffect, useCallback } from "react";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import LoadingLinear from "./LoadingLinear";

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/mp-3/products"
      );
      if (!response.ok) {
        throw new Error(
          "Something went wrong! Double check database connection"
        );
      }
      const data = await response.json();
      const productObj = data.map((productData) => {
        return {
          id: productData.product_id,
          code: productData.code,
          description: productData.description,
          price: productData.unit_price,
        };
      });
      setProducts(productObj);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "code", headerName: "Product Code", width: 300 },
    { field: "description", headerName: "Description", width: 300 },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
    },
  ];

  let content = <h2>Found no products</h2>;

  if (products.length > 0) {
    content = (
      <DataGrid
        rows={products}
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
    );
  }

  if (error) {
    content = <h2>{error}</h2>;
  }

  if (isLoading) {
    content = <LoadingLinear />;
  }

  return (
    <Fragment>
      <Box sx={{ height: 400, width: "100%" }}>{content}</Box>
    </Fragment>
  );
};

export default ViewProducts;
