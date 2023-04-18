//customers
const selectAllCustomers = "SELECT * FROM customers";
const selectCustomersById = "SELECT * FROM customers WHERE customer_id=?";
const insertCustomers =
  "INSERT INTO customers (firstname,lastname,address,city,zip,email,phone) VALUES (?,?,?,?,?,?,?)";
const updateCustomers =
  "UPDATE customers SET firstname=?,lastname=?,address=?,city=?,zip=?,email=?,phone=? WHERE customer_id=?";
const removeCustomers = "DELETE FROM customers WHERE customer_id=?";

//products
const selectAllProducts = "SELECT * FROM products";
const selectProductsById = "SELECT * FROM products WHERE product_id=?";
const insertProducts =
  "INSERT INTO products (code, description, unit_price) VALUES (?,?,?)";
const updateProducts =
  "UPDATE products SET code=?, description=?, unit_price=? WHERE product_id=?";
const removeProducts = "DELETE FROM products WHERE product_id=?";

//sales
// const selectAllSales = "SELECT * FROM sales";
// const selectSalesById = "SELECT * FROM sales WHERE sale_id=? ";
// const insertSales = "INSERT INTO sales () VALUES()";
// const updateSales = "UPDATE sales SET WHERE sales_id=?";
// const removeSales = "DELETE FROM sales WHERE sale_id=?";

module.exports = {
  selectAllCustomers,
  selectCustomersById,
  insertCustomers,
  updateCustomers,
  removeCustomers,
  selectAllProducts,
  selectProductsById,
  insertProducts,
  updateProducts,
  removeProducts,
  // selectAllSales,
  // selectSalesById,
  // insertSales,
  // updateSales,
  // removeSales,
};
