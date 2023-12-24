const config = require("../config");

/**
 * Hàm lấy tất cả người dùng từ cơ sở dữ liệu
 */
const getAllUsers = async (req, res) => {
  try {
    const pool = await config.connect;
    const result = await pool.query`SELECT * FROM sysuserinfo`;
    res.send({ result: result.recordset });
  } catch (error) {
    console.error("Get all users error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching all users" });
  } finally {
    await config.sql.close();
  }
};

/**
 * Hàm lấy thông tin người dùng theo ID từ cơ sở dữ liệu
 */
const getUserByUsername = async (req, res) => {
  try {
    const username = req.params.username;
    const pool = await config.connect;
    const result = await pool.query(
      "select * from sysuserinfo where username = '" + username + "'"
    );
    res.send({ result: result.recordset });
  } catch (error) {
    console.error("Get user by username error:", error);
    res
      .status(500)
      .json({ error: "An error occurred while fetching user by username" });
  } finally {
    await config.sql.close();
  }
};
module.exports = { getAllUsers, getUserByUsername };
