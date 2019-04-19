const authService = require('../services/authService')
const config = require('../config')
/**
 * Authentication middleware to verify the auth token provided by user
 * We verify the jwt token
 * to next step. else rejcteing the request with a 403
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
const authMiddleWare = async (req, res, next) => {
  console.log('Auth middleware')
  const bearerToken = req.headers['authorization'];
  if( typeof bearerToken !== 'undefined'){
    try{
      const authToken = bearerToken.split(' ');
      const bearerString = authToken[0].toLowerCase();
      const token  = authToken[1]
      if(bearerString !== config.bearerString){
        throw Error(config.invalidCredentials)
      }
      const userInfo = await authService.validateAuthToken(token)
      console.log('auth successfully verified')
      req.emailId = userInfo.emailId
      next()
    }catch(error) {
      res.status(403).send(error)
    } 
  }else{
    res.status(403).send({message:config.invalidCredentials})
  }
}

module.exports = {
    authMiddleWare
}