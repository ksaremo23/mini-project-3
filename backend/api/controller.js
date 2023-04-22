const pool = require("./dbConf");
const queries = require("./queries");

const getAll = (req, res) => {
  pool.query(queries.selectAll, (error, results) => {
    if (error) throw error;
    res.status(200).json(results); 
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  pool.query(queries.selectById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const create = (req, res) => {
  const { firstname, lastname, address, city, zip, email, phone } = req.body;
  pool.query(
    queries.insert,
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
    queries.update,
    [firstname, lastname, address, city, zip, email, phone, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Succesfully updated the data with ID: ${id}`);
    }
  );
};

const remove = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.remove, [id], (error, results) => {
    if (error) throw error;
    res.status(200).send(`Successfully deleted data with ID: ${id}`);
  });
};

const getAllProducts = (req, res) => {
  pool.query(queries.selectAllProducts, (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const getProductById = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.selectProductById, [id], (error, results) => {
    if (error) throw error;
    res.status(200).json(results);
  });
};

const addProduct = (req, res) => {
  const { code, description, unit_price } = req.body;
  pool.query(
    queries.insertProduct,
    [code, description, unit_price],
    (error, results) => {
      if (error) throw error;
      res
        .status(200)
        .send(`Successfully added product with id: ${results.insertId}`);
    }
  );
};

const updateProduct = (req, res) => {
  const id = parseInt(req.params.id);
  const { code, description, unit_price } = req.body;
  pool.query(
    queries.updateProduct,
    [code, description, unit_price, id],
    (error, results) => {
      if (error) throw error;
      res.status(200).send(`Successfully updated products with id: ${id}`);
    }
  );
};

const deleteProduct = (req, res) => {
  const id = parseInt(req.params.id);
  pool.query(queries.removeProduct, [id], (error, results) => {
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
  addProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};

const fetchTotalCustomers = () => {
  const query = 'SELECT COUNT(*) as total_customers FROM customers';
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else resolve(results[0].total_customers);
    });
  });
};

const fetchTotalSales = () => {
  const query = 'SELECT SUM(price) as total_sales FROM products_sold';
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else resolve(results[0].total_sales);
    });
  });
};

const fetchTotalProducts = () => {
  const query = 'SELECT COUNT(*) as total_products FROM products';
  return new Promise((resolve, reject) => {
    connection.query(query, (error, results) => {
      if (error) reject(error);
      else resolve(results[0].total_products);
    });
  });
};
