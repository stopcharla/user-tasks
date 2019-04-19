const utils = require('../utils/utils');
const taskService = require('../services/taskService');
const userService = require('../services/userService');

const getUserTasks = async (req, res) => {
    if(utils.validateObject(req.query, ['date','emailId'])){
        try{
            console.log('getting tasks for user:',req.query)
            let emailId = req.query.emailId;
            const assignee = await userService.getUserInfo(emailId)
            if(assignee && Object.keys(assignee.dataValues).length > 0){
                const tasks = await taskService.getUserTasksForDay(emailId, req.query.date)
                res.status(200).send({date:req.query.date, tasks: tasks})
            }else{
                console.log('no user found')
                res.status(400).send({message:'user not found'})
            }
        } catch (error) {
            console.error('error:',error)
            res.status(500).send(error)
        }
    }else{
        res.status(400).send({message:'username or password missing'})
    } 
}

const addTask = async (req, res) => {
    console.log('add task:', req.body)
    if(utils.validateObject(req.body, ['start', 'end', 'description', 'assigneeMailId']) && 
    req.body.start !== req.body.end){
        try{
            const assignee = await userService.getUserInfo(req.body.assigneeMailId)
            if(assignee && Object.keys(assignee.dataValues).length > 0){
                const assigneeEmailId = req.body.assigneeMailId;
                req.body.assignedBy = req.emailId
                delete req.body.assigneeEmailId;
                await taskService.addTask(req.body,assigneeEmailId)
                res.status(200).send({message:'task successfully added for user'})
            }else{
                console.log('no user found')
                res.status(400).send({message:'user not found'})
            }
        } catch (error) {
            console.error('error:',error)
            res.status(400).send(error)
        }
    }else{
        res.status(400).send({message:'required fields missing or error'})
    } 
}

module.exports = {
    getUserTasks,
    addTask
}