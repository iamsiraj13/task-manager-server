const {
  createTasks,
  deleteTask,
  updateTaskStatus,
  taskListByStatus,
  taskCountByStatus,
} = require("../controllers/TasksController");
const {
  registration,
  login,
  profileUpdate,
  getProfile,
  recoverVerifyEmail,
  RecoverVerifyOTP,
  RecoverResetPass,
} = require("../controllers/UserController");
const AuthVerify = require("../middleware/AuthVerify");

const router = require("express").Router();

router.post("/registration", registration);
router.post("/login", login);
router.post("/profileUpdate", AuthVerify, profileUpdate);

router.post("/createTasks", AuthVerify, createTasks);

router.get("/deleteTask/:id", AuthVerify, deleteTask);
router.get("/updateTaskStatus/:id/:status", AuthVerify, updateTaskStatus);

router.get("/taskListByStatus/:status", AuthVerify, taskListByStatus);
router.get("/taskCountByStatus", AuthVerify, taskCountByStatus);
router.get("/profile", AuthVerify, getProfile);

router.get("/recoverVerifyEmail/:email", recoverVerifyEmail);
router.get("/recoverVerifyOTP/:email/:otp", RecoverVerifyOTP);

router.post("/RecoverResetPass", RecoverResetPass);

module.exports = router;
