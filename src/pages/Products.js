import React, { Fragment } from "react";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import ViewProducts from "../components/ViewProducts";

const api_url = "http://127.0.0.1:5000/api/v1/mp-3/products";

const Products = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const product = {
      code: data.get("products"),
      description: data.get("description"),
      unit_price: data.get("price"),
    };
    fetch(api_url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(product),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(() => {
        console.log(product);
        alert("Succesfully submitted");
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <Fragment>
      <Typography component="h1" variant="h5">
        Products
      </Typography>
      <Container component="main" maxWidth="md">
        <Box
          component="form"
          noValidate
          onSubmit={handleSubmit}
          sx={{ mt: 3, mb: 3 }}
        >
          <Grid container spacing={2}>
            <Grid item xs={6} sm={6}>
              <TextField
                autoComplete="given-name"
                name="products"
                fullWidth
                id="products"
                label="Products"
                autoFocus
              />
            </Grid>
            <Grid item xs={6} sm={6}>
              <Button type="submit" variant="contained" size="large">
                Add Products
              </Button>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="description"
                fullWidth
                id="description"
                label="Description"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="given-name"
                name="price"
                fullWidth
                id="price"
                label="Price"
              />
            </Grid>
          </Grid>
        </Box>
        <ViewProducts />
      </Container>
    </Fragment>
  );
};

export default Products;
