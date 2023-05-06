const pool = require("../dbConf");
const queries = require("../queries");

const getAll = async (req, res) => {
  try {
    const [rows, fields] = await pool.query(queries.selectAllCustomers);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Unable to retrieve customers. Please try again later.");
  }
};

const getById = async (req, res) => {
  const id = req.params.id;
  try {
    const [rows, fields] = await pool.query(queries.selectCustomersById, [id]);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send("Unable to retrieve customer. Please try again later.");
  }
};

const create = async (req, res) => {
  const { firstname, lastname, address, city, zip, email, phone } = req.body;
  try {
    const [rows, fields] = await pool.query(queries.insertCustomers, [
      firstname,
      lastname,
      address,
      city,
      zip,
      email,
      phone,
    ]);
    res.status(200).json({
      msg: `${rows.affectedRows} customer successfully added with ID: ${rows.insertId}`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Unable to create customer. Please try again later." });
  }
};

const update = async (req, res) => {
  const id = parseInt(req.params.id);
  const { firstname, lastname, address, city, zip, email, phone } = req.body;
  try {
    const [rows, fields] = await pool.query(queries.updateCustomers, [
      firstname,
      lastname,
      address,
      city,
      zip,
      email,
      phone,
      id,
    ]);
    res.status(200).json({
      msg: `${rows.affectedRows} customer succesfully updated its data with ID: ${id}`,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ msg: "Unable to update customer. Please try again later." });
  }
};

const remove = async (req, res) => {
  const id = parseInt(req.params.id);
  try {
    const [rows, fields] = await pool.execute(queries.removeCustomers, [id]);
    res
      .status(200)
      .send(
        `${rows.affectedRows} customer successfully removed with ID: ${id}`
      );
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to remove customer. Please try again later.");
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
