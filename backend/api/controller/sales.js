const pool = require("../dbConf");
const queries = require("../queries");

const getAll = (req, res) => {
  pool.query(queries.selectAllProducts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.selectProductsById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const create = (req, res) => {
  const { code, description, unit_price } = req.body;
  pool.query(
    queries.insertProducts,
    [code, description, unit_price],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .send(`Successfully added product with id: ${results.insertId}`);
    }
  );
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const { code, description, unit_price } = req.body;
  pool.query(
    queries.updateProducts,
    [code, description, unit_price, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Successfully updated products with id: ${id}`);
    }
  );
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.removeProducts, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send(`Successfully deleted product with id: ${id}`);
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
