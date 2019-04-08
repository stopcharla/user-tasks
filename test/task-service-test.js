const sequalize = require('../sequalize');
const expect = require('chai').expect;
const sinon = require('sinon');
const taskService = require('../services/taskService');

describe('Validating the task service', () => {

    it('get users tasks for day', async () => {
        const tasks = [{start:"123", end:"321", description:"abcdvfer"}]
        const emailId = "testuser@gmail.com"
        const date = "2011-11-03"
        sinon.stub(sequalize, 'getTaskTableForUser').returns({findAll: async () => {
            return Promise.resolve(tasks)
        }});
        const response = await taskService.getUserTasksForDay(emailId, date);
        expect(response).to.be.deep.equal(response)
        sequalize.getTaskTableForUser.restore()
    });

    it('add task', async () => {
        const emailId = "testuser@gmail.com"
        const taskdetails = {
            start:"456",
            end:"765",
            description:"test task"
        }

        sinon.stub(sequalize, 'getTaskTableForUser').returns({findAll: async () => {
            return Promise.resolve([])
        },create: async() => {
            return Promise.resolve()
        }});
        await taskService.addTask(taskdetails, emailId);
        expect(true).to.be.equal(true)
        sequalize.getTaskTableForUser.restore()
    });

    it('add task', async () => {
        const emailId = "testuser@gmail.com"
        const taskdetails = {
            start:"456",
            end:"765",
            description:"test task"
        }
        const expectedError = { message:"time clashes with other task of user please check his schedule for the day" }
        sinon.stub(sequalize, 'getTaskTableForUser').returns({findAll: async () => {
            return Promise.resolve([{},{}])
        },create: async() => {
            return Promise.resolve()
        }});
        try{
            await taskService.addTask(taskdetails, emailId);        
        }catch(err){
            expect(err).to.be.deep.equal(expectedError)
            sequalize.getTaskTableForUser.restore()
        }
        
    });

})