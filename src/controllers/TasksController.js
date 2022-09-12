const TasksModel = require("../models/TasksModel");

// New Task Create
exports.createTasks = (req, res) => {
  let reqBody = req.body;
  reqBody.email = req.headers["email"];

  TasksModel.create(reqBody, (error, data) => {
    if (error) {
      res.status(400).json({ status: "Task Create Fail", data: error });
    } else {
      res.status(200).json({ status: "Task Create Success", data: data });
    }
  });
};

//   Task delete
exports.deleteTask = (req, res) => {
  let id = req.params.id;
  TasksModel.deleteOne({ _id: id }, (error, data) => {
    if (error) {
      res.status(400).json({ status: "Task Delete Fail", data: error });
    } else {
      res.status(200).json({ status: "Task Delete Success", data: data });
    }
  });
};
//   Update task status
exports.updateTaskStatus = (req, res) => {
  let id = req.params.id;

  let status = req.params.status;

  let query = { _id: id };

  let reqbody = { status: status };

  TasksModel.updateOne(query, reqbody, (error, data) => {
    if (error) {
      res.status(400).json({ status: "Task status update Fail", data: error });
    } else {
      res
        .status(200)
        .json({ status: "Task status update Success", data: data });
    }
  });
};
//   get task by status
exports.taskListByStatus = (req, res) => {
  let status = req.params.status;
  let email = req.headers["email"];

  TasksModel.aggregate(
    [
      { $match: { email: email, status: status } },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          status: 1,
          createdDate: {
            $dateToString: {
              date: "$createdDate",
              format: "%d-%m-%Y",
            },
          },
        },
      },
    ],
    (error, data) => {
      if (error) {
        res.status(400).json({ status: "Fail", data: error });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    }
  );
};
//   task count by status
exports.taskCountByStatus = (req, res) => {
  let email = req.headers["email"];

  TasksModel.aggregate(
    [
      { $match: { email: email } },
      { $group: { _id: "$status", sum: { $count: {} } } },
    ],
    (error, data) => {
      if (error) {
        res.status(400).json({ status: "Fail", data: error });
      } else {
        res.status(200).json({ status: "Success", data: data });
      }
    }
  );
};
