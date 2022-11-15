const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Organization = require("../../models/organization.model");
const OrganizationJoinRequest = require("../../models/organizationJoinRequest.model");
const User = require("../../models/user.model");
var randomize = require("randomatic");
const { sendEmail } = require("./../../utils/emails");

exports.register = async (req, res, next) => {
  try {
    let { name, email, wallet, password, type, organizationCode } = req.body;
    console.log("req.body", req.body);
    console.log("organizationCode", organizationCode);
    console.log(type);
    if (!name || !email || !password) {
      return res.send({
        status: false,
        message: "Please fill all required fields",
      });
    }

    let playload = req.body;
    let user = await User.findOne({
      $or: [{ email }, { wallet }],
    });
    if (user)
      return res.send({
        status: false,
        data: user,
        message: "A Wallet or Email already associated to some other user",
      });

    console.log("payload", playload);
    user = await User.create(playload);
    const emailVerificationCode = randomize("Aa0", 10);
    user.emailVerificationCode = emailVerificationCode;
    await user.save();

    if (organizationCode !== null) {
      console.log("....................................");
      const validorganizationCode = await Organization.find({
        organizationCode: organizationCode,
      });
      console.log("validorganizationCode", validorganizationCode);
      if (!validorganizationCode) {
        return res.send({
          status: false,
          message: "Organization Code does not match",
        });
      }
      const organizationId = validorganizationCode[0]?._id;
      const userId = user?._id;
      console.log("organizationId", organizationId);
      console.log("userId", userId);
      let payload = {
        organizationId: organizationId,
        userId: userId,
      };

      console.log("payload", payload);
      const requestToJoinOrganization = await OrganizationJoinRequest.create(
        payload
      );
      console.log("requestToJoinOrganization", requestToJoinOrganization);
    }

    const link = `${process.env.BASE_URL}/v1/front/users/verify-email/${user._id}/${emailVerificationCode}`; // change
    sendEmail(
      user.email,
      "verifyEmail",
      { email: user.email, url: link },
      "Email Verification"
    );
    user = user.toObject();
    delete user.emailVerificationCode;
    delete user.password;
    delete user.__v;
    return res.send({
      status: true,
      data: user,
      message: "User Signup successfully.",
    });
  } catch (error) {
    return next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    let { email } = req.body;
    const user = await User.findOne({ email }).lean();
    if (!user)
      return res
        .status(404)
        .send({ success: false, message: "Incorrect email or password" });

    passport.use(
      new localStrategy(
        { usernameField: "email" },
        (username, password, done) => {
          User.findOne(
            { email: username },
            "name email wallet password",
            (err, user) => {
              if (err) {
                return done(err);
              } else if (!user)
                // unregistered email
                return done(null, false, {
                  success: false,
                  message: "Incorrect email or password",
                });
              else if (!user.verifyPassword(password))
                // wrong password
                return done(null, false, {
                  success: false,
                  message: "Incorrect email or password",
                });
              else return done(null, user);
            }
          );
        }
      )
    );
    // call for passport authentication
    passport.authenticate("local", async (err, user, info) => {
      if (err)
        return res.status(400).send({
          err,
          success: false,
          message: "Oops! Something went wrong while authenticating",
        });
      // registered user
      else if (user) {
        var accessToken = await user.token();
        let data = {
          ...user._doc,
          accessToken,
        };
        await User.updateOne(
          { _id: user._id },
          { $set: { accessToken } },
          { upsert: true }
        );
        return res.status(200).send({
          success: true,
          message: "User logged in successfully",
          data,
        });
      }
      // unknown user or wrong password
      else
        return res
          .status(402)
          .send({ success: false, message: "Incorrect email or password" });
    })(req, res);
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.verifyEmail = async (req, res) => {
  console.log("verifyEmail");
  const { id, token } = req.params;
  const user = await User.findOne({
    _id: id,
  });
  if (!user || (user && user.emailVerificationCode !== token)) {
    return res.json({ status: false, message: "Invalid request" });
  }
  user.emailVerified = true;
  user.emailVerificationCode = undefined;
  await user.save();
  return res.status(200).send({
    success: true,
    message: "Account verified successfully!",
  });
};

exports.updateProfile = async (req, res, next) => {
  try {
    let payload = req.body;
    console.log("payload updateProfile", payload);
    if (!payload._id) {
      return res.send({
        success: false,
        message: "User id is required",
      });
    }

    if (req.files) console.log("zainu");
    for (const key in req.files) {
      const image = req.files[key][0];
      payload[`${key}`] = image.filename;
    }
    if (payload.password === "") {
      delete payload.passport;
    }
    const user = await User.findOneAndUpdate({ _id: payload._id }, payload);
    return res.send({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.json({ status: "User Not Exists!!" });
    }
    console.log("email forgotPassword", email);
    const resetPasswordCode = randomize("Aa0", 10);
    user.forgotPasswordCode = resetPasswordCode;
    await user.save();
    const link = `${process.env.BASE_URL}/v1/front/users/reset-password/${user._id}/${resetPasswordCode}`;
    sendEmail(
      user.email,
      "forgotPassword",
      { url: link },
      "Forgot our password"
    );
    return res.status(200).send({
      success: true,
      message: "Password reset link sent to email address",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};

exports.resetPassword = async (req, res, next) => {
  try {
    const { id, token } = req.params;
    console.log("id bhai", id);
    console.log("token bhai", token);
    const { password } = req.body;
    console.log("password bhai", password);
    const user = await User.findOne({ _id: id });
    console.log("user", user);
    // if (user.forgotPasswordCode === token) {
    //   console.log("This is reset Password");
    // }
    if (!user || (user && user.forgotPasswordCode !== token)) {
      return res.json({ status: false, message: "Invalid request" });
    }
    user.password = password;
    user.forgotPasswordCode = undefined;
    await user.save();
    return res.status(200).send({
      success: true,
      message: "Password updated successfully.",
    });
  } catch (error) {
    console.log(error);
    return next(error);
  }
};
