const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

const dbCustomers = require("./controller/customers");
const dbProducts = require("./controller/products");
const dbSales = require("./controller/sales");
const dbUsers = require("./controller/users");

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.use(
  cors({
    origin: "*",
  })
);

//customer
router.get("/customers", dbCustomers.getAll);
router.get("/customers/:id", dbCustomers.getById);
router.post("/customers", dbCustomers.create);
router.put("/customers/:id", dbCustomers.update);
router.delete("/customers/:id", dbCustomers.remove);

//products
router.get("/products", dbProducts.getAll);
router.get("/products/:id", dbProducts.getById);
router.post("/products", dbProducts.create);
router.put("/products/:id", dbProducts.update);
router.delete("/products/:id", dbProducts.remove);

//sales
router.get("/sales", dbSales.getAll);
router.get("/sales/:id", dbSales.getById);
router.post("/sales", dbSales.create);
router.put("/sales/:id", dbSales.update);
router.delete("/sales/:id", dbSales.remove);

//users
router.get("/users", dbUsers.getAll);
router.post("/users/register", dbUsers.create);
router.post("/users/login", dbUsers.login);

module.exports = router;
