const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const router = require("./api/route");
const pool = require("./api/dbConf");

//test db connection
pool.getConnection((error, connection) => {
  if (error) throw error;

  /**dynamicall create tables if table not exists in DB  */
  let createCustomersTable =
    "create table if not exists customers(customer_id INT PRIMARY KEY AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), address VARCHAR(150), city VARCHAR(50), zip VARCHAR(50), email VARCHAR(50), phone VARCHAR(15))";

  let createProductsTable = "create table if not exists products(product_id INT PRIMARY KEY AUTO_INCREMENT, code VARCHAR(6), description VARCHAR(255), unit_price VARCHAR(15))";

  let createSalesTable = "create table if not exists sales(sale_id INT PRIMARY KEY AUTO_INCREMENT, customer_name VARCHAR(15), date_of_sale DATETIME)";

  pool.query(createCustomersTable, (error, results) => {
    if (error) throw error;
  });

  pool.query(createProductsTable, (error, results) => {
    if (error) throw error;
  });

  pool.query(createSalesTable, (error, results) => {
    if (error) throw error;
  });

  console.log("Succesfully connected to MySQL Database");

  connection.release();
});

//custom route
app.use("/v1/mp-3", router);

app.listen(process.env.PORT, () => {
  console.log(
    `Server listening in port: ${process.env.PORT}`
  );
});
