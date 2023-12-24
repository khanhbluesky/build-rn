const express = require("express");
const cookieParser = require("cookie-parser");

const authController = require("./controllers/authController");
const listController = require("./controllers/listController");
const middlewareController = require("./controllers/middlewareController");
const userController = require("./controllers/userController");

const app = express();
app.use(cookieParser());
app.use(express.json());

/**
 * Endpoint để lấy tất cả người dùng
 */
app.get("/sysuserinfo", userController.getAllUsers);

/**
 * Endpoint để lấy người dùng theo ID
 */
app.get("/sysuserinfo/:username", userController.getUserByUsername);





/** ---------------------------------------------
 *              Dropdown List
 * ---------------------------------------------/

/**
 * Endpoint để lấy 
 */
app.get("/dmkhobai", listController.getAllKho);
/**
 * Endpoint để lấy 
 */
app.get("/dmcong", listController.getAllCong);










/** ---------------------------------------------
 *              Authentication
 * ---------------------------------------------/
 * 
// /**
//  * Endpoint để xử lý yêu cầu đăng nhập và trả về access token và refresh token
//  */
app.post("/login", authController.login);

// /**
//  * Endpoint bảo vệ đòi hỏi access token để truy cập
//  */
app.post(
  "/logout",
  middlewareController.authenticateToken,
  authController.logout
);






















/**
 * Khởi động máy chủ
 */
app.listen(3000, () => {
  console.log(`Server is listening on http://localhost:${3000}`);
});
