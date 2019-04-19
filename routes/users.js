const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const middleware = require('../controllers/middleware')

/**
 * once a user is logged in he can obtain all the registered users info
 */
router.get('/users', [middleware.authMiddleWare] ,function (req, res) {
  console.log('get users request');
  userController.getAllUsersInfo(req, res);
});

/**
 * route to login a user
 */
router.post('/login', function (req,res) {
  console.log('login request:', req.body);
  userController.login(req, res);
})

/**
 * route to allow user to register to our service
 */
router.post('/signup', (req,res) =>{
  console.log('signup request received')
  userController.addUser(req,res);
})

module.exports = router;
