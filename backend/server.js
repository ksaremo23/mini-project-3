const express = require("express");
const app = express();
const router = require("./api/route");
const pool = require("./api/dbConf");

const HOST = "127.0.0.1";
const PORT = 5000;

//test db connection
pool.getConnection((error, connection) => {
  if (error) throw error;

  let createCustomersTable =
    "create table if not exists customers(customer_id INT PRIMARY KEY AUTO_INCREMENT, firstname VARCHAR(50), lastname VARCHAR(50), address VARCHAR(150), city VARCHAR(50), zip VARCHAR(50), email VARCHAR(50), phone VARCHAR(15))";

  pool.query(createCustomersTable, (error, results) => {
    if (error) throw error;
  });

  console.log("Succesfully connected to MySQL Database");

  connection.release();
});

app.use("/api/v1/mp-3", router);

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
