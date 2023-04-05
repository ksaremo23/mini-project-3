const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("./controller");

router.use(bodyParser.json());
router.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

router.get("/", db.getAll);
router.get("/:id", db.getById);
router.post("/", db.create);
router.put("/:id", db.update);
router.delete("/:id", db.remove);

module.exports = router;
