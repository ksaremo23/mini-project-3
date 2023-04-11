import React, { Fragment, useState, useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import LoadingLinear from "./LoadingLinear";
import NoRowsOverlay from "./NoRowsOverlay";

const ViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const fetchCustomers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/api/v1/mp-3/products"
      );
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
      setCustomers(productObj);
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchCustomers();
  }, [fetchCustomers]);

  const updateCustomer = useCallback(async (id, product) => {
    setIsLoading(true);
    setError(null);
    try {
      await fetch(`http://127.0.0.1:5000/api/v1/mp-3/customers/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      });
    } catch (error) {
      setError(error.message);
    }
    setIsLoading(false);
  }, []);

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
    customers.filter((row) => row.id !== id);
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = customers.find((row) => row.id === id);
    if (editedRow.isNew) {
      customers.filter((row) => row.id !== id);
    }
  };

  const processRowUpdate = useCallback(
    async (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      await updateCustomer(updatedRow.id, {
        code: updatedRow.code,
        description: updatedRow.description,
        unit_price: updatedRow.price,
      });
      setSnackbar({
        children: "Product successfully saved",
        severity: "success",
      });
      return updatedRow;
    },
    [updateCustomer]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID", width: 70, editable: true },
    { field: "code", headerName: "Product Code", width: 240, editable: true },
    {
      field: "description",
      headerName: "Description",
      width: 280,
      editable: true,
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      width: 100,
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

  if (customers.length > 0) {
    content = (
      <>
        <DataGrid
          rows={customers}
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
          <Snackbar
            open
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={handleCloseSnackbar}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} onClose={handleCloseSnackbar} />
          </Snackbar>
        )}
      </>
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

export default ViewCustomers;
