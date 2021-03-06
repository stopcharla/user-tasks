const Sequelize = require('sequelize')
const UserModel = require('./models/users')
const userTasksModel = require('./models/userTasks')

const sequelize = new Sequelize(process.env.MYSQL_DATABASE, process.env.MYSQL_USER, process.env.MYSQL_PASSWORD, {
  host:process.env.DATABASE_HOST,
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
}).catch((err) => {
  console.error("error occurred:",err)
  process.exit(22)
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