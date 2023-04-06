//customers table
const selectAll = "SELECT * FROM customers";
const selectById = "SELECT * FROM customers WHERE customer_id=?";
const insert =
  "INSERT INTO customers (firstname,lastname,address,city,zip,email,phone) VALUES (?,?,?,?,?,?,?)";
const update =
  "UPDATE customers SET firstname=?,lastname=?,address=?,city=?,zip=?,email=?,phone=? WHERE customer_id=?";
const remove = "DELETE FROM customers WHERE customer_id=?";

//products table
const selectAllProducts = "SELECT * FROM products";
const selectProductById = "SELECT * FROM products WHERE product_id=?";
const insertProduct =
  "INSERT INTO products (code, description, unit_price) VALUES (?,?,?)";
const updateProduct =
  "UPDATE products SET code=?, description=?, unit_price=? WHERE product_id=?";
const removeProduct = "DELETE FROM products WHERE product_id=?";

module.exports = {
  selectAll,
  selectById,
  insert,
  update,
  remove,
  insertProduct,
  selectAllProducts,
  selectProductById,
  updateProduct,
  removeProduct,
};
