const mongoose = require("mongoose");

const OTPSchema = mongoose.Schema(
  {
    email: {
      type: String,
    },
    otp: {
      type: String,
    },
    status: {
      type: Number,
      default: 0,
    },
    createdDate: {
      type: Date,
      default: Date.now(),
    },
  },
  { versionkey: false }
);

const OTPmodel = mongoose.model("otps", OTPSchema);

module.exports = OTPmodel;
