const sequalize = require('../sequalize')
const Sequelize = require('sequelize');
const op = Sequelize.Op;

const getUserTasksForDay = async (emailId , date) => {
    console.log('getUserTasksForDay:',emailId);
    const TaskTable = await sequalize.getTaskTableForUser(emailId);
    const time = new Date(date)
    const startDate = time.setHours(0,0,0);
    const endDate = time.setHours(23,59,59,999)
    const tasks = await TaskTable.findAll({
        where:{start:{[op.between]:[startDate,endDate]}},
        raw:true})
    console.log('found tasks:', tasks)
    return tasks

}

const addTask = async (taskDetails, userEmailId) => {
    const TaskTable = await sequalize.getTaskTableForUser(userEmailId);
    
    const clashedTasks = await TaskTable.findAll({ 
        where:{ 
            [op.or] :{ 
                start:{[op.between]: [taskDetails.start, taskDetails.end]}, 
                end:{[op.between]:[taskDetails.start, taskDetails.end]}
            },
            start: {
                [op.ne]: taskDetails.end
            },
            end:{
                [op.ne]:taskDetails.start
            }
        },
        raw:true
    })
    console.log('chasked tasks:',clashedTasks)
    console.log(clashedTasks.length)
    if(clashedTasks.length > 0){
        throw { message:"time clashes with other task of user please check his schedule for the day" }
    }else{
        await TaskTable.create(taskDetails)
    }
}

module.exports = {
    getUserTasksForDay,
    addTask
}