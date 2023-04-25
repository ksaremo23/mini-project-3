import React, { Fragment, useState, useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import LoadingLinear from "./LoadingLinear";
import NoRowsOverlay from "./NoRowsOverlay";
import SnackBar from "./SnackBar";

<<<<<<< Updated upstream
const api_url = "http://74.50.87.84/api/v1/mp-3/products";
=======
// const api_url = "http://127.0.0.1:5000/api/v1/mp-3/products";
const api_url = "https://jhenbert.com/api/v1/mp-3/products";
>>>>>>> Stashed changes

const ViewProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const fetchProducts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(api_url);
      if (!response.ok) {
        throw new Error("Something went wrong in server.");
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
      setSnackbar({ children: error.message, severity: "error" });
    }
    setIsLoading(false);
  }, []);

  const updateProduct = useCallback(async (id, product) => {
    setIsLoading(true);
    setError(null);
    try {
      await fetch(`${api_url}/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    } catch (error) {
      setSnackbar({ children: error.message, severity: "error" });
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleDeleteClick = (id) => () => {
    try {
      fetch(`${api_url}/${id}`, {
        method: "DELETE",
        mode: "cors",
      });
      setProducts(products.filter((row) => row.id !== id));
    } catch (error) {
      setSnackbar({ children: error.message, severity: "error" });
    }
    setSnackbar({
      children: "Product successfully deleted",
      severity: "success",
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = products.find((row) => row.id === id);
    if (editedRow.isNew) {
      setProducts(products.filter((row) => row.id !== id));
    }
  };

  const processRowUpdate = useCallback(
    async (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      await updateProduct(updatedRow.id, {
        code: updatedRow.code,
        description: updatedRow.description,
        unit_price: updatedRow.price,
      });
      setProducts(
        products.map((row) => (row.id === newRow.id ? updatedRow : row))
      );
      setSnackbar({
        children: "Product successfully saved",
        severity: "success",
      });
      return updatedRow;
    },
    [updateProduct, products]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", flex: 1, minWidth: 50 },
    { field: "code", headerName: "Product Code", minWidth: 140, editable: true },
    {
      field: "description",
      headerName: "Description",
      minWidth: 280,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      minWidth: 140,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditClick(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  let content = <NoRowsOverlay />;

  if (products.length > 0) {
    content = (
      <Fragment>
        <DataGrid
          rows={products}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStart={handleRowEditStart}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
          onProcessRowUpdateError={handleProcessRowUpdateError}
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
        {!!snackbar && (
          <SnackBar
            onClose={handleCloseSnackbar}
            alertMsg={snackbar}
            alertOnClose={handleCloseSnackbar}
          />
        )}
      </Fragment>
    );
  }

  if (error) {
    content = setSnackbar({ children: error.message, severity: "error" });
  }

  if (isLoading) {
    content = <LoadingLinear />;
  }

  return <Box sx={{ height: 400, width: "100%" }}>{content}</Box>;
};

export default ViewProducts;
