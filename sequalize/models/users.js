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
            unique: true   
        },
        password:{
            type:type.STRING
        }
        
    })
}