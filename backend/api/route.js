const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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

//authentication middleware 
const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (!token) {
    res.status(401).send("You need a token to verify your identity");
  } else {
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.json({ auth: false, msg: "Failed to authenticate" });
      } else {
        req.name = decoded.name;
        next();
      }
    });
  }
};

//customer
router.get("/customers", verifyToken, dbCustomers.getAll);
router.get("/customers/:id", verifyToken, dbCustomers.getById);
router.post("/customers", verifyToken, dbCustomers.create);
router.put("/customers/:id", verifyToken, dbCustomers.update);
router.delete("/customers/:id", verifyToken, dbCustomers.remove);

//products
router.get("/products", verifyToken, dbProducts.getAll);
router.get("/products/:id", verifyToken, dbProducts.getById);
router.post("/products", verifyToken, dbProducts.create);
router.put("/products/:id", verifyToken, dbProducts.update);
router.delete("/products/:id", verifyToken, dbProducts.remove);

//sales
router.get("/sales", verifyToken, dbSales.getAll);
router.get("/sales/:id", verifyToken, dbSales.getById);
router.post("/sales", verifyToken, dbSales.create);
router.put("/sales/:id", verifyToken, dbSales.update);
router.delete("/sales/:id", verifyToken, dbSales.remove);

//users
router.get("/users", dbUsers.getAll);
router.post("/users/register", dbUsers.create);
router.post("/users/login", dbUsers.login);

module.exports = router;
