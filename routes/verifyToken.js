const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  //Check Header
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).send("You are not authenticated.");

  //Check if token is valid
  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SEC, (err, user) => {
    if (err) return res.status(403).send("Token is not valid.");
    req.user = user;
    next();
  });
};

const isAuthorize = (req, res, next) => {
  //Check if Authorize
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You are not authorize.");
    }
  });
};

const isAdmin = (req, res, next) => {
  //Check if Authorize
  verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).send("You are not admin.");
    }
  });
};

module.exports = { verifyToken, isAuthorize, isAdmin };
