const jwt = require("jsonwebtoken");
const config = require("../config");
const crypto = require('crypto');

/**
 * Hàm thực hiện đăng nhập và trả về access token và refresh token nếu thành công
 */
let refreshTokens = [];

const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Kết nối với SQL Server
    const pool = await config.connect;

    // Mật khẩu đã được mã hóa MD5 trước khi lưu vào cơ sở dữ liệu
    const hashedPassword = crypto
      .createHash("md5")
      .update(password)
      .digest("hex");

    // Thực hiện truy vấn
    const result =
      await pool.query`SELECT * FROM sysuserinfo WHERE username = ${username} AND password = ${hashedPassword}`;

    // Kiểm tra xem có người dùng không
    if (result.recordset.length === 0) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // So sánh mật khẩu đã hash với mật khẩu người dùng nhập vào
    // const match = await bcrypt.compare(password, result.recordset[0].password);

    // if (!match) {
    //   return res.status(401).json({ message: "Invalid credentials Password" });
    // }

    // Kiểm tra kết quả truy vấn
    if (result.recordset.length > 0) {
      // Tạo access token
      const accessToken = jwt.sign(
        { username },
        config.serverConfig.secretKey,
        {
          expiresIn: "15m",
        }
      );
      // Tạo refresh token (lưu ý rằng refresh token nên được lưu trữ an toàn)
      const refreshToken = jwt.sign(
        { username },
        config.serverConfig.secretKey
      );
      refreshTokens.push(refreshToken);
      res.cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: false,
        path: "/",
        sameSite: "strict",
      });
      // Nếu thông tin đăng nhập hợp lệ, trả về thông tin người dùng
      const userInfo = result.recordset[0];
      return res
        .status(200)
        .json({ message: "Login successful", user: userInfo, accessToken });
    } else {
      return res.status(401).json({ message: "Invalid credentials" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Đóng kết nối pool
    await config.sql.close();
  }
};

//LOG OUT
const logout = (req, res) => {
  // Xóa refreshToken khỏi danh sách
  const refreshToken = res.clearCookie("refreshToken");
  const index = refreshTokens.indexOf(refreshToken);
  if (index !== -1) {
    refreshTokens.splice(index, 1);
  }

  // Xóa cookie refreshToken
  res.clearCookie("refreshToken", { path: "/" });

  res.status(200).json({ message: "Logout successful" });
};

module.exports = { login, logout };
