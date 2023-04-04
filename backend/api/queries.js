const selectAll = "SELECT * FROM customers";
const selectById = "SELECT * FROM customers WHERE customer_id=?";
const insert =
  "INSERT INTO customers (firstname,lastname,address,city,zip,email,phone) VALUES (?,?,?,?,?,?,?)";

const update =
  "UPDATE customers SET firstname=?,lastname=?,address=?,city=?,zip=?,email=?,phone=? WHERE customer_id=?";

const remove = "DELETE FROM customers WHERE customer_id=?";

module.exports = { selectAll, selectById, insert, update, remove };
