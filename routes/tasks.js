const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const middleware = require('../controllers/middleware');

/**
 * once a user is logged in he can obtain all the registered users info
 */
router.get('/tasks', [middleware.authMiddleWare] ,function (req, res) {
  console.log('get all the tasks of user for a day');
  taskController.getUserTasks(req, res);
});

/**
 * route to login a user
 */
router.post('/addTask', [middleware.authMiddleWare] ,function (req,res) {
  console.log('add task request:', req.body);
  taskController.addTask(req, res);
});

module.exports = router;
