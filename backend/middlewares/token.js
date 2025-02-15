const jwt = require("jsonwebtoken");

const verifyUserAndToken = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  try {
    if (!token) {
      res.status(401).json({ message: "Invalid token" });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Unauthorized action" });
  }
};

const verifyAdminAndToken = async (req, res, next) => {
  const token = req.headers["x-auth-token"];
  try {
    if (!token) {
      res.status(401).json({ message: "Invalid token" });
    }
    const decoded = jwt.verify(token, process.env.TOKEN_KEY);
    if (decoded.role === "admin") {
      req.user = decoded;
      next();
    } else {
      res.status(401).json({ message: "Unauthorized action" });
    }
  } catch (err) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

module.exports = { verifyUserAndToken, verifyAdminAndToken };
