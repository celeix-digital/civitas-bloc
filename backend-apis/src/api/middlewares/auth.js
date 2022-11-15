const byPassedRoutes = [
  "/v1/front/users/register",
  "/v1/front/users/login",
  "/v1/front/users/verify-email",
  "v1/front/grants/create",
  "/v1/front/grant-application/create",
  "/v1/front/users/update-profile",
  "/v1/front/users/forgot-password",
  "/v1/front/users/reset-password",
  "/v1/front/grants/get",
  "/v1/front/grants/list",
  "/v1/front/organizations/send-invitation-to-user",
  "/v1/front/organizations/invitation-to-join-organization",
  "/v1/front/organizations/take-requests-to-join-organization",
  "/v1/front/organizations/accept-user-join-request",
  "/v1/front/grants/get-draft-grants",
  "/v1/front/grants/publish-grants",
  // "/v1/admin/staff/create",
  // "/v1/front/test",
  // "/v1/front/auth/login",
  // "/v1/admin/staff/login",
  // "/v1/front/auth/register",
  // "/v1/front/auth/login",
  // "/v1/front/auth/forgot-password",
  // "/v1/front/auth/reset-password",
  // "/v1/mobile/auth/sigin",
  // "/v1/mobile/auth/signup",
  // "/v1/mobile/auth/forgotPassword",
  // "/v1/front/games/get-games",
];
const jwt = require("jsonwebtoken");
const verifyAccessToken = async (req, res, next) => {
  console.log("byPassedRoutes", byPassedRoutes);
  console.log("req.originalUrl", req.originalUrl);
  const urll = byPassedRoutes.indexOf(req.originalUrl) > -1;
  console.log("urll", urll);
  if (req.originalUrl.indexOf("/v1/") > -1) {
    if (
      byPassedRoutes.indexOf(req.originalUrl) > -1 ||
      req.originalUrl.indexOf("/v1/front/grants/create") > -1 ||
      req.originalUrl.indexOf("/v1/front/grant-application/create") > -1 ||
      req.originalUrl.indexOf("/v1/front/users/update-profile") > -1 ||
      req.originalUrl.indexOf("/v1/front/users/verify-email") > -1 ||
      req.originalUrl.indexOf("/v1/front/users/forgot-password") > -1 ||
      req.originalUrl.indexOf("/v1/front/users/reset-password") > -1 ||
      req.originalUrl.indexOf("/v1/front/grants/get") > -1 ||
      req.originalUrl.indexOf("/v1/front/grants/list") > -1 ||
      req.originalUrl.indexOf(
        "/v1/front/organizations/send-invitation-to-user"
      ) > -1 ||
      req.originalUrl.indexOf(
        "/v1/front/organizations/invitation-to-join-organization"
      ) > -1 ||
      req.originalUrl.indexOf(
        "/v1/front/organizations/take-requests-to-join-organization"
      ) > -1 ||
      req.originalUrl.indexOf(
        "/v1/front/organizations/accept-user-join-request"
      ) > -1 ||
      req.originalUrl.indexOf("/v1/front/grants/get-draft-grants") > -1 ||
      req.originalUrl.indexOf("/v1/front/grants/publish-grants") > -1
    ) {
      next();
    } else {
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
    }
  }
};
exports.verifyAccessToken = verifyAccessToken;
