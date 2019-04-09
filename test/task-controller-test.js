const expect = require('chai').expect;
const sinon = require('sinon');
const userService = require('../services/userService');
const taskService = require('../services/taskService');
const taskController = require('../controllers/taskController')
const utils = require('../utils/utils');

describe('Testing the signup function in user controller', () => {

    afterEach(function () {
        // completely restore all fakes created through the sandbox
        utils.validateObject.restore();
    });
    
    it('sending email id of user not in the service', async () => {
        const req = {
            body: {
                assigneeMailId:"firstuser@shyftplan.com",
                start: "123",
                end: "345",
                description: "test task"
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        // console.log('response:', response);
                        expect(status).to.be.equals(400);
                    }
                };
            }
        }
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(userService, 'getUserInfo').returns(null)
        await taskController.addTask(req, res);
        userService.getUserInfo.restore()
    });

    it('not sending all required details in the request body', async () => {
        const req = {
            body: {
                assigneeMailId:"firstuser@shyftplan.com",
                end: "345",
                description: "test task"
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        // console.log('response:', response);
                        expect(status).to.be.equals(400);
                    }
                };
            }
        }
        sinon.stub(utils, 'validateObject').returns(false);
        await taskController.addTask(req, res);
    });

    it('sending email id of user not in the service', async () => {
        const req = {
            body: {
                assigneeMailId:"firstuser@shyftplan.com",
                start: "123",
                end: "345",
                description: "test task"
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        // console.log('response:', response);
                        expect(status).to.be.equals(200);
                    }
                };
            }
        }
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(userService, 'getUserInfo').returns({dataValues:{emailId:"samplemailId@gmail.com"}})
        sinon.stub(taskService, 'addTask').returns(Promise.resolve({}))
        await taskController.addTask(req, res);
        userService.getUserInfo.restore()
        taskService.addTask.restore()
    });

    it('sending all required details to add task', async () => {
        const req = {
            body: {
                assigneeMailId:"firstuser@shyftplan.com",
                start: "123",
                end: "345",
                description: "test task"
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        // console.log('response:', response);
                        expect(status).to.be.equals(200);
                    }
                };
            }
        }
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(userService, 'getUserInfo').returns({dataValues:{emailId:"samplemailId@gmail.com"}})
        sinon.stub(taskService, 'addTask').returns(Promise.resolve({}))
        await taskController.addTask(req, res);
        userService.getUserInfo.restore()
        taskService.addTask.restore()
    });

    it('sending all required details to get user tasks', async () => {
        const expectedResponse = {
            date:"2017-11-3",
            tasks:[{start:"123",end:"321", description:"test task"}]
        }
        const req = {
            query: {
                date:expectedResponse.date
            }
        }


        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        // console.log('response:', response);
                        expect(response).to.be.deep.equal(expectedResponse)
                        expect(status).to.be.equals(200);
                    }
                };
            }
        }
        sinon.stub(userService, 'getUserInfo').returns({dataValues:{emailId:"samplemailId@gmail.com"}})
        sinon.stub(utils, 'validateObject').returns(true);
        sinon.stub(taskService, 'getUserTasksForDay').returns(Promise.resolve(expectedResponse.tasks))
        await taskController.getUserTasks(req, res);
        taskService.getUserTasksForDay.restore()
        userService.getUserInfo.restore()
    });


    
});