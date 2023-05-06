const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();

const router = require("./api/route");
const pool = require("./api/dbConf");

//test db connection
pool
  .getConnection()
  .then(async (connection) => {
    try {
      // dynamically create tables if they don't exist
      let createCustomersTable =
        "CREATE TABLE IF NOT EXISTS customers(customer_id INT PRIMARY KEY AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), address VARCHAR(150), city VARCHAR(50), zip VARCHAR(50), email VARCHAR(50), phone VARCHAR(15))";

      let createProductsTable =
        "CREATE TABLE IF NOT EXISTS products(product_id INT PRIMARY KEY AUTO_INCREMENT, code VARCHAR(6), description VARCHAR(255), unit_price VARCHAR(15))";

      let createSalesTable =
        "CREATE TABLE IF NOT EXISTS sales(sale_id INT PRIMARY KEY AUTO_INCREMENT, customer_name VARCHAR(15), date_of_sale DATETIME)";

      let createUsersTable =
        "CREATE TABLE IF NOT EXISTS users(user_id INT PRIMARY KEY AUTO_INCREMENT, username VARCHAR(10) NOT NULL, firstname VARCHAR(20) NOT NULL, lastname VARCHAR(20) NOT NULL, email_add VARCHAR(50) NOT NULL, password CHAR(60) NOT NULL)";

      await Promise.all([
        connection.query(createCustomersTable),
        connection.query(createProductsTable),
        connection.query(createSalesTable),
        connection.query(createUsersTable),
      ]);
      console.log("Successfully connected to MySQL Database");
    } catch (error) {
      console.error("Error creating tables:", error);
    } finally {
      connection.release();
    }
  })
  .catch((error) => {
    console.error("Error connecting to MySQL Database:", error);
  });

//custom route
app.use("/api/v1/mp-3", router);

app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is listening in port: ${process.env.PORT}`);
});
