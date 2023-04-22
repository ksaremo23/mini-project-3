const pool = require("../dbConf");
const queries = require("../queries");

const getAll = (req, res) => {
  pool.query(queries.selectAllSales, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const getById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.selectSalesById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const create = (req, res) => {
  const { customer_name, date_of_sale } = req.body;
  pool.query(
    queries.insertSales,
    [customer_name, date_of_sale],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .send(`Successfully added sales data with id: ${results.insertId}`);
    }
  );
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const { customer_name, date_of_sale } = req.body;
  pool.query(
    queries.updateSales,
    [customer_name, date_of_sale, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Successfully updated sales data with id: ${id}`);
    }
  );
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.removeSales, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send(`Successfully deleted sales data with id: ${id}`);
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
