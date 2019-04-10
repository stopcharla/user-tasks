const Sequelize = require('sequelize')
const UserModel = require('./models/users')
const userTasksModel = require('./models/userTasks')
const config = require('../config')

const sequelize = new Sequelize(config.dbConfig.dbName, config.dbConfig.username, config.dbConfig.password, {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
})
const User = UserModel(sequelize, Sequelize)

sequelize.sync({ force: false }).then((res) => {
  console.log(`Database & tables created:`, res)
  // User.bulkCreate(Data)
})


const getTaskTableForUser = async (tableName) => {
  const userTaskTable = userTasksModel(sequelize, Sequelize, tableName);
  await sequelize.sync({force: false})
  return userTaskTable
} 



module.exports = {
  User,
  getTaskTableForUser
}