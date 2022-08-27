const { registration, login } = require("../controllers/UserController");

const router = require("express").Router();

router.post("/registration", registration);
router.post("/login", login);

module.exports = router