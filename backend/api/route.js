const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require("cors");

const db = require("./controller");

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

//customer table
router.get("/", db.getAll);
router.get("/:id", db.getById);
router.post("/", db.create);
router.put("/:id", db.update);
router.delete("/:id", db.remove);

//products table
router.get("/products", db.getAllProducts);
router.get("/products/:id", db.getProductById);
router.post("/products", db.addProduct);
router.put("/products/:id", db.updateProduct);
router.delete("/products/:id", db.deleteProduct);

module.exports = router;
