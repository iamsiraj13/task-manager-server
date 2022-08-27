const { registration, login, profileUpdate } = require("../controllers/UserController");
const AuthVerify = require("../middleware/AuthVerify");

const router = require("express").Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/profileUpdate",AuthVerify, profileUpdate);

module.exports = router