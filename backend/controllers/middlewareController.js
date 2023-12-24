const jwt = require("jsonwebtoken");
const config = require("../config");

// Middleware để xác thực accessToken
const authenticateToken = async (req, res, next) => {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (token) {
    try {
      const accessToken = token.split(" ")[1];
      jwt.verify(
        accessToken,
        config.serverConfig.secretKey,
        (err, user) => {
          if (err) {
            res.status(403).json("Token is not valid");
          }
          req.user = user;
          next();
        }
      );
    } catch (error) {
      console.error("Error during token verification:", error);
      res.status(403).json({ message: "Invalid token" });
    }
  }
};

module.exports = { authenticateToken };
