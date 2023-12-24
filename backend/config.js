const sql = require("mssql/msnodesqlv8");

// Kết nối đến cơ sở dữ liệu SQL Server
const serverConfig = {
  port: 3000,
  secretKey: "25052000",
  dbConfig: {
    user: "sa",
    password: "Admin@1819",
    server: "115.79.197.51",
    database: "Iswift_Demo00_Log",
  },
};

// Hàm tạo và trả về kết nối cơ sở dữ liệu
const createConnectionPool = async () => {
  const pool = await new sql.ConnectionPool(serverConfig.dbConfig).connect();
  console.log("Connected to SQL Server");
  return pool;
};

// Kết nối cơ sở dữ liệu
const connect = createConnectionPool();

module.exports = {
  connect: connect,
  sql: sql,
  serverConfig: serverConfig
};
