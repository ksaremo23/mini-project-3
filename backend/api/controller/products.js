const pool = require("../dbConf");
const queries = require("../queries");

const getAll = async (req, res) => {
  try {
    const [rows, fields] = await pool.query(queries.selectAllProducts);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Unable to retrieve products. Please try again later.");
  }
};

const getById = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows, fields] = await pool.query(queries.selectProductsById, [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send(
        `Unable to retrieve product with ID ${id}. Please try again later.`
      );
  }
};

const create = async (req, res) => {
  const { code, description, unit_price } = req.body;
  try {
    const [rows, fields] = await pool.query(queries.insertProducts, [
      code,
      description,
      unit_price,
    ]);
    res.status(200).json({
      msg: `${rows.affectedRows} product successfully added with id: ${rows.insertId}`,
    });
  } catch (error) {
    res
      .status(500)
      .json({ msg: "Unable to add product with ID. Please try again later." });
  }
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const { code, description, unit_price } = req.body;
    const [rows, fields] = await pool.execute(queries.updateProducts, [
      code,
      description,
      unit_price,
      id,
    ]);
    res
      .status(200)
      .send(`${rows.affectedRows} product successfully updated with id: ${id}`);
  } catch (error) {
    res
      .status(500)
      .send(`Unable to update product with ID ${id}. Please try again later.`);
  }
};

const remove = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows, fields] = await pool.execute(queries.removeProducts, [id]);
    res
      .status(200)
      .send(`${rows.affectedRows} product successfully deleted with id: ${id}`);
  } catch (error) {}
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
