const config = require("../config");

const getAllKho = async (req, res) => {
  try {
    const pool = await config.connect;
    const result = await pool.query(
      "SELECT ma_kho, ten_kho FROM dmkhobai"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    await config.sql.close();
  }
};


const getAllCong = async (req, res) => {
  try {
    const pool = await config.connect;
    const result = await pool.query(
      "SELECT ma_cong, ten_cong FROM dmcong"
    );
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  } finally {
    await config.sql.close();
  }
};

module.exports = { getAllKho, getAllCong };
