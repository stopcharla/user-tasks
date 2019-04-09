const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app')

describe('testing all the rest apis', () => {
    
    it('signup api should return 400',  async () => {
        const now = (new Date()).getTime()
        const userDetails = {
            name:"shyftplan",
            emailId: `shyftplantest-${now}gmail.com`,
            password: 'shyftplan123'
        }
        const response = await request(app).post("/v1/signup").send(userDetails);
        console.log('*******************:',response.status)
        expect(response.status).to.be.equal(400)
    })

    it('signup api should return 200 and verifying login and get users as well', async () => {
        const now = (new Date()).getTime()
        const userDetails = {
            name:"shyftplan",
            emailId: `shyftplantest-${now}@gmail.com`,
            password: 'shyftplan123'
        }
        const response = await request(app).post("/v1/signup").send(userDetails);
        console.log(response.status)
        expect(response.status).to.be.equal(200)

        console.log('successfully signed up')

        const loginresponse = await request(app).post("/v1/login").send({emailId:userDetails.emailId, password: userDetails.password})
        expect(loginresponse.status).to.be.equal(200)
        const authtoken = loginresponse.body.tokenId
        console.log(authtoken)
        console.log('successfully logged in')

        const usersresponse = await request(app).get("/v1/users").set('Authorization', `bearer ${authtoken}`).send()
        expect(usersresponse.status).to.be.equal(200)

        const secondUserDetails = {
            name:"shyftplan2",
            emailId: `shyftplantest-${now}2@gmail.com`,
            password: 'shyftplan123'
        }
        const secondUserResponse = await request(app).post("/v1/signup").send(secondUserDetails);
        console.log(secondUserResponse.status)
        expect(secondUserResponse.status).to.be.equal(200)

        const dateString = "2017-11-01"
        const taskDetails = {
            "start":`${dateString} 13:00:00.000 +00:00`,
            "end":`${dateString} 14:00:00.000 +00:00`,
            "description":"Adding a sales task to new user again and again",
            "assigneeMailId":secondUserDetails.emailId
        }
        const addTaskResponse = await request(app).post("/v1/user/addTask").set('Authorization', `bearer ${authtoken}`).send(taskDetails)
        expect(addTaskResponse.status).to.be.equal(200)

        const sameTaskResponse = await request(app).post("/v1/user/addTask").set('Authorization', `bearer ${authtoken}`).send(taskDetails)
        expect(sameTaskResponse.status).to.be.equal(400)


        const getTaskResponse = await request(app).get("/v1/user/tasks").set('Authorization', `bearer ${authtoken}`).query({emailId:secondUserDetails.emailId,date:dateString})
        expect(getTaskResponse.status).to.be.equal(200)
    })



})