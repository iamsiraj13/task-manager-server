const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");
const OTPmodel = require("../models/OTPmodel");
const SendEmailUtility = require("../utility/SendEmailUtility");

// registration
exports.registration = async (req, res) => {
  const reqBody = req.body;

  UsersModel.create(reqBody, (err, data) => {
    if (err) {
      res.status(200).json({ status: "fail", data: err });
    } else {
      res.status(200).json({ status: "success", data: data });
    }
  });
};

// login
exports.login = (req, res) => {
  let reqBody = req.body;

  UsersModel.aggregate(
    [
      { $match: reqBody },
      {
        $project: {
          _id: 1,
          email: 1,
          firstName: 1,
          lastName: 1,
          mobile: 1,
          photo: 1,
        },
      },
    ],
    (error, data) => {
      if (error) {
        res.status(400).json({ status: "Login Failed", data: error });
      } else {
        if (data.length > 0) {
          let payload = {
            exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
            data: data[0],
          };
          let token = jwt.sign(payload, "sirajul@123");
          res
            .status(200)
            .json({ status: "Login Success", token: token, data: data[0] });
        } else {
          res.status(401).json({ status: "Unauthorized" });
        }
      }
    }
  );
};

// user profile update

exports.profileUpdate = (req, res) => {
  let email = req.headers["email"];

  let reqbody = req.body;
  UsersModel.updateOne({ email: email }, reqbody, (error, data) => {
    if (error) {
      res.status(400).json({ status: "Profile Update Fail", data: error });
    } else {
      res.status(200).json({ status: "Profile Update Success", data: data });
    }
  });
};

// user profile get
exports.getProfile = (req, res) => {
  let email = req.headers["email"];
  let query = { email: email };

  UsersModel.findOne(query, (error, data) => {
    if (error) {
      res.status(400).json({ status: "fail", data: error });
    } else {
      res.status(200).json({ status: "sucess", data: data });
    }
  });
};

// recover user info

exports.recoverVerifyEmail = async (req, res) => {
  // query email

  let email = req.params.email;
  let otpCode = Math.floor(100000 + Math.random() * 900000);

  try {
    let userCount = await UsersModel.aggregate([
      { $match: { email: email } },
      { $count: "total" },
    ]);

    if (userCount.length > 0) {
      let createOTP = await OTPmodel.create({
        email: email,
        otp: otpCode,
      });

      let SendEmail = await SendEmailUtility(
        email,
        "Your PIN Code is= " + otpCode,
        "Task Manager PIN Verification"
      );
      res.status(200).json({ status: "success", data: SendEmail });
    } else {
      res.status(200).json({ status: "fail", data: "No User Found" });
    }
  } catch (err) {
    res.status(400).json({ status: "fail", data: err });
  }

  // send otp
  // insert otp
};

// otp code verify

exports.RecoverVerifyOTP = async (req, res) => {
  let email = req.params.email;
  let otpCode = req.params.otp;

  try {
    let otpCount = await OTPmodel.aggregate([
      {
        $match: {
          email: email,
          otp: otpCode,
          status: 0,
        },
      },
      {
        $count: "total",
      },
    ]);

    if (otpCount.length > 0) {
      let updateOTP = await OTPmodel.updateOne(
        {
          email: email,
          otp: otpCode,
          status: 0,
        },
        {
          email: email,
          otp: otpCode,
          status: 1,
        }
      );

      res.status(200).json({ status: "success", data: updateOTP });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid OTP" });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", data: err });
  }
};

// recover reset password

exports.RecoverResetPass = async (req, res) => {
  let email = req.body["email"];
  let OTP = req.body["OTP"];
  let newPass = req.body["password"];

  try {
    let optUsed = await OTPmodel.aggregate([
      {
        $match: { email: email, otp: OTP, status: 1 },
      },
      {
        $count: "total",
      },
    ]);

    if (optUsed.length > 0) {
      let passUpdate = await UsersModel.updateOne(
        { email: email },
        { password: newPass }
      );
      res.status(200).json({ status: "success", data: passUpdate });
    } else {
      res.status(200).json({ status: "fail", data: "Invalid Request" });
    }
  } catch (error) {
    res.status(400).json({ status: "fail", data: err });
  }
};
