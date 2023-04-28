const bcrypt = require("bcrypt");
const pool = require("../dbConf");
const queries = require("../queries");

const getAll = async (req, res) => {
  try {
    const [rows, fields] = await pool.query(queries.selectAllUsers);
    res.status(200).json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to retrieve users. Please try again later.");
  }
};

const create = async (req, res) => {
  const { username, firstname, lastname, email_add, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [rows, fields] = await pool.execute(queries.insertUsers, [
      username,
      firstname,
      lastname,
      email_add,
      hashedPassword,
    ]);
    res
      .status(200)
      .send(`Successfully created new user with ID: ${rows.insertId}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Unable to create new user. Please try again later.");
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const [rows, fields] = await pool.query(queries.selectAllUsers);
    const user = rows.find((user) => user.username === username);

    if (user == null) {
      return res.status(400).send("Username not found");
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (passwordMatch) {
      req.session.user = { username };
      res.send("Login successfully");
    } else {
      res.status(401).send("Invalid password");
    }
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal server error");
  }
};

module.exports = { getAll, create, login };
