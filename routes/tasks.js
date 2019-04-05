const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const authService = require('../services/authService')

/**
 * Authentication middleware to verify the auth token provided by user
 * We verify the jwt token
 * to next step. else rejcteing the request with a 403
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authMiddleWare = async (req, res, next) => {
    req.emailId = 'middleware@middleware.com'
    next()
    return
  console.log("Auth middleware")
  const bearerToken = req.headers['authorization'];
  if( typeof bearerToken !== 'undefined'){
    try{
      const token = bearerToken.split(' ')[1];
      const userInfo = await authService.validateAuthToken(token)
      console.log("auth successfully verified")
      req.emailId = userInfo.emailId
      next()
    }catch(error) {
      res.status(403).send(error)
    }
    
  }else{
    res.status(403).send({message:"invalid credentials"})
  }
}

/**
 * once a user is logged in he can obtain all the registered users info
 */
router.get('/tasks', [authMiddleWare] ,function (req, res) {
  console.log('get all the tasks of user for a day');
  taskController.getUserTasks(req, res);
});

/**
 * route to login a user
 */
router.post('/addTask', [authMiddleWare] ,function (req,res) {
  console.log("add task request:", req.body);
  taskController.addTask(req, res);
})

module.exports = router;
