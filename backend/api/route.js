const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

const dbCustomers = require("./controller/customers");
const dbProducts = require("./controller/products");

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

module.exports = router;
