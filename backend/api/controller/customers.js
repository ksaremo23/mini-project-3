const pool = require("../dbConf");
const queries = require("../queries");

const getAll = (req, res) => {
  pool.query(queries.selectAllCustomers, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.selectCustomersById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const create = (req, res) => {
  const { firstname, lastname, address, city, zip, email, phone } = req.body;
  pool.query(
    queries.insertCustomers,
    [firstname, lastname, address, city, zip, email, phone],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .send(`Successfully inserted data with ID: ${results.insertId}`);
    }
  );
};

const update = (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, address, city, zip, email, phone } = req.body;
  pool.query(
    queries.updateCustomers,
    [firstname, lastname, address, city, zip, email, phone, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Succesfully updated the data with ID: ${id}`);
    }
  );
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.removeCustomers, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send(`Successfully deleted data with ID: ${id}`);
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
