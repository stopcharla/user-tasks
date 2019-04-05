const utils = require('../utils/utils');
const taskService = require('../services/taskService');

const getUserTasks = async (req, res) => {
    if(utils.validateObject(req.query, ['date', "email"])){
        try{
            console.log('getting tasks for user')
            const tasks = await taskService.getUserTasksForDay(req.query.email, req.query.date)
            res.status(200).send({date:req.query.date, tasks: tasks})
        } catch (error) {
            console.error("error:",error)
            res.status(500).send(error)
        }
    }else{
        res.status(400).send({message:"username or password missing"})
    } 
}

const addTask = async (req, res) => {
    console.log('add task:', req.body)
    if(utils.validateObject(req.body, ['start', 'end', 'description', 'assigneeEmailId'])){
        try{
            const assigneeEmailId = req.body.assigneeEmailId;
            req.body.assignedBy = req.emailId
            delete req.body.assigneeEmailId;
            await taskService.addTask(req.body,assigneeEmailId)
            res.status(200).send({message:"task successfully added for user"})
        } catch (error) {
            console.error("error:",error)
            res.status(400).send(error)
        }
    }else{
        res.status(400).send({message:"username or password missing"})
    } 
}

module.exports = {
    getUserTasks,
    addTask
}