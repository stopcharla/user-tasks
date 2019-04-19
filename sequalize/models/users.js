const validateEmail = (email) => {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

module.exports = (sequelize, type) => {
  return sequelize.define('Users', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: type.STRING,
    emailId:{
      type: type.STRING,
      unique: true,
      validate: {
        isEmailOrEmpty(val, next) {
          if (!val || val === '' || validateEmail(val)) {
            return next()
          }
          else {
            return next('email is invalid')
          }
        }
      }  
    },
    password:{
      type:type.STRING
    } 
  })
}