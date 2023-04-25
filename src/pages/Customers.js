import React, { useState } from "react";

import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  DialogActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

import ViewCustomers from "../components/ViewCustomers";
import SnackBar from "../components/UI/SnackBar";
import ModalDialog from "../components/UI/ModalDialog";
import { BASE_API_URL } from "../variable";

const api_url = `${BASE_API_URL}/customers`;

const Customers = () => {
  const [snackbar, setSnackbar] = useState(null);
  const [openModal, setOpenModal] = useState(false);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleOpenModal = () => setOpenModal(true);

  const handleCloseModal = () => setOpenModal(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customer = {
      firstname: data.get("firstName"),
      lastname: data.get("lastName"),
      address: data.get("address"),
      city: data.get("city"),
      zip: data.get("zip"),
      email: data.get("email"),
      phone: data.get("phone"),
    };
    fetch(api_url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(customer),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        setSnackbar({
          children: "Customer successfully added",
          severity: "success",
        });
      })
      .catch((error) =>
        setSnackbar({ children: error.message, severity: "error" })
      );
  };
  return (
    <Container component="main" maxWidth="md">
      <Grid item xs={6} sm={6}>
        <Button
          onClick={handleOpenModal}
          startIcon={<AddIcon />}
          variant="contained"
          size="large"
        >
          Add Customers
        </Button>
      </Grid>

      <Grid mt={3}>
        <ViewCustomers />
      </Grid>

      <ModalDialog
        title="Customers"
        btnLabel="Submit"
        open={openModal}
        onClose={handleCloseModal}
      >
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, mb: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="firstName"
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="lastName"
                fullWidth
                id="lastName"
                label="Last Name"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="address"
                fullWidth
                id="address"
                label="Address"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="city"
                fullWidth
                id="city"
                label="City"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="zip"
                fullWidth
                id="zip"
                label="Zip"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="email"
                fullWidth
                id="email"
                label="Email"
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                name="phone"
                fullWidth
                id="phone"
                label="Phone"
              />
            </Grid>
          </Grid>
          <DialogActions>
            <Button type="submit" onClick={handleCloseModal} autoFocus>
              Submit
            </Button>
            <Button onClick={handleCloseModal}>Cancel</Button>
          </DialogActions>
        </Box>
      </ModalDialog>
      {!!snackbar && (
        <SnackBar
          onClose={handleCloseSnackbar}
          alertMsg={snackbar}
          alertOnClose={handleCloseSnackbar}
        />
      )}
    </Container>
  );
};

export default Customers;
