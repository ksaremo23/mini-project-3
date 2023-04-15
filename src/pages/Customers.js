import React, { Fragment, useState } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import ViewCustomers from "../components/ViewProducts";

import SnackBar from "../components/SnackBar";

const api_url = "http://127.0.0.1:5000/api/v1/mp-3/products";

const Customers = () => {
  const [snackbar, setSnackbar] = useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const customer = {
      code: data.get("customers"),
      description: data.get("description"),
      unit_price: data.get("price"),
    };
    fetch(api_url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(),
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
    <Fragment>
      <Typography component="h1" variant="h5">
        Customers
      </Typography>
      <Container component="main" maxWidth="md">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, mb: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="first name"
                fullWidth
                id="first name"
                label="First Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="last name"
                fullWidth
                id="last name"
                label="Last Name"
                autoFocus
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="address"
                fullWidth
                id="address"
                label="Address"
                autoFocus
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="zip"
                fullWidth
                id="zip"
                label="Zip"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="city"
                fullWidth
                id="city"
                label="City"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="email"
                fullWidth
                id="email"
                label="Email"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="phone"
                fullWidth
                id="phone"
                label="Phone"
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button
                type="submit"
                startIcon={<AddIcon />}
                variant="contained"
                size="large"
              >
                Add Customers
              </Button>
            </Grid>
          </Grid>
        </Box>
        {!!snackbar && (
          <SnackBar
            onClose={handleCloseSnackbar}
            alertMsg={snackbar}
            alertOnClose={handleCloseSnackbar}
          />
        )}
      <ViewCustomers />
      </Container>
    </Fragment>
  );
};

export default Customers;
