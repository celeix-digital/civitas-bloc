const jwt = require("jsonwebtoken");
const verifyAccessToken = async (req, res, next) => {
  if (req.headers["authorizarion"] === undefined) {
    return res
      .status(403)
      .send({ status: false, message: "Please login to access the data" });
  }
  const authHeader = req.headers["authorizarion"];
  console.log("authHeader", authHeader);
  const bearerToken = authHeader.split(" ");
  const token = bearerToken[1];
  console.log("token", token);
  const JWT_SECRET = process.env.JWT_SECRET;
  console.log("JWT_SECRET", JWT_SECRET);
  await jwt.verify(token, JWT_SECRET, (err, payload) => {
    if (err) {
      return res.status(500).json({
        status: false,
        message: "Failed to authenticate token.",
      });
    } else {
      next();
    }
  });
};
exports.verifyAccessToken = verifyAccessToken;
