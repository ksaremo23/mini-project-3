import React, { useState, useEffect, useCallback } from "react";

import Box from "@mui/material/Box";
import { DataGrid, GridRowModes, GridActionsCellItem } from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/DeleteOutlined";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Close";

import LoadingLinear from "./UI/LoadingLinear";
import NoRowsOverlay from "./UI/NoRowsOverlay";
import SnackBar from "./UI/SnackBar";
import { BASE_API_URL } from "../variable";

const ViewSales = () => {
  const [sales, setSales] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState(null);
  const [rowModesModel, setRowModesModel] = useState({});

  const api_url = `${BASE_API_URL}/sales`;

  const fetchSales = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`${api_url}`);
      if (!response.ok) {
        throw new Error("Something went wrong in server.");
      }
      const data = await response.json();
      const salesObj = data.map((saleData) => {
        return {
          id: saleData.sale_id,
          customerName: saleData.customer_name,
          dos: saleData.date_of_sale,
        };
      });
      setSales(salesObj);
    } catch (error) {
      setSnackbar({ children: error.message, severity: "error" });
    }
    setIsLoading(false);
  }, [api_url]);

  useEffect(() => {
    fetchSales();
  }, [fetchSales]);

  const updateSale = useCallback(
    async (id, sales) => {
      setIsLoading(true);
      setError(null);
      try {
        await fetch(`${api_url}/${id}`, {
          method: "PUT",
          mode: "cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(sales),
        });
      } catch (error) {
        setSnackbar({ children: error.message, severity: "error" });
      }
      setIsLoading(false);
    },
    [api_url]
  );

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

  const handleDeleteClick = (id) => async () => {
    try {
      await fetch(`${api_url}/${id}`, {
        method: "DELETE",
        mode: "cors",
      });
      setSales(sales.filter((row) => row.id !== id));
    } catch (error) {
      setSnackbar({ children: error.message, severity: "error" });
    }
    setSnackbar({
      children: "Sales data successfully deleted",
      severity: "success",
    });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
    const editedRow = sales.find((row) => row.id === id);
    if (editedRow.isNew) {
      sales.filter((row) => row.id !== id);
    }
  };

  const processRowUpdate = useCallback(
    async (newRow) => {
      const updatedRow = { ...newRow, isNew: false };
      await updateSale(updatedRow.id, {
        customer_name: updatedRow.customerName,
        date_of_sale: updatedRow.dos,
      });
      setSales(sales.map((row) => (row.id === newRow.id ? updatedRow : row)));
      setSnackbar({
        children: "Customer successfully saved",
        severity: "success",
      });
      return updatedRow;
    },
    [updateSale, sales]
  );

  const handleProcessRowUpdateError = useCallback((error) => {
    setSnackbar({ children: error.message, severity: "error" });
  }, []);

  const handleRowModesModelChange = (newRowModesModel) => {
    setRowModesModel(newRowModesModel);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "customerName",
      headerName: "Customer's Name",
      minWidth: 140,
      editable: true,
    },
    {
      field: "dos",
      headerName: "Date of Sale",
      flex: 1,
      minWidth: 180,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 0.4,
      minWidth: 100,
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

  if (sales.length > 0) {
    content = (
      <>
        <DataGrid
          rows={sales}
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

export default ViewSales;
