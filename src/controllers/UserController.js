const UsersModel = require("../models/UsersModel");
const jwt = require("jsonwebtoken");

// registration
exports.registration = (req, res) => {
  let reqBody = req.body;

  UsersModel.create(reqBody, (error, data) => {
    if (error) {
      res.status(400).json({ status: "Registration Fail", data: error });
    } else {
      res.status(200).json({ status: "Registration Success", data: data });
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
          const payload = {
            exp: Math.floor(Date.now() / 1000 + 24 * 60 * 60),
            data: data[0],
          };
          const token = jwt.sign(payload, "sirajul@123");
          res
            .status(200)
            .json({ status: "Login Success", token, data: data[0] });
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
