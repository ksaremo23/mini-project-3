const express = require("express");
const app = express();
const router = require("./api/route");
const pool = require("./api/dbConf");

const HOST = "127.0.0.1";
const PORT = 5000;

//test db connection
pool.getConnection((err, connection) => {
  if (err) throw err;
  console.log("Succesfully connected to MySQL Database");
  connection.release();
});

app.use("/api/v1/mp-3", router);

app.listen(PORT, HOST, () => {
  console.log(`Server is running at http://${HOST}:${PORT}`);
});
