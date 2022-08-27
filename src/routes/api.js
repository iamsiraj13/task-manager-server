const { createTasks, updateTask, deleteTask, updateTaskStatus, taskListByStatus, taskCountByStatus } = require("../controllers/TasksController");
const { registration, login, profileUpdate } = require("../controllers/UserController");
const AuthVerify = require("../middleware/AuthVerify");

const router = require("express").Router();


router.post("/registration", registration);
router.post("/login", login);
router.post("/profileUpdate",AuthVerify, profileUpdate);


router.post("/createTasks",AuthVerify, createTasks);

router.post("/updateTask/:id",AuthVerify, updateTask);
router.post("/deleteTask/:id",AuthVerify, deleteTask);
router.get("/updateTaskStatus/:id/:status",AuthVerify, updateTaskStatus);

router.get("/taskListByStatus/:status",AuthVerify, taskListByStatus);
router.get("/taskCountByStatus",AuthVerify, taskCountByStatus);

module.exports = router