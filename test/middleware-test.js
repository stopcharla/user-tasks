const sinon = require('sinon');
const expect = require('chai').expect;
const middleware = require('../controllers/middleware')
const authService = require('../services/authService')

describe('validating the middleware functions', () => {
    
    it('not sending valid bearer string', async () => {
        const req = {
            headers: {
                authorization:'earer token123456'
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        // console.log('response:', response);
                        expect(status).to.be.equals(403);
                    }
                };
            }
        }
        const next = () => {}
        await middleware.authMiddleWare(req, res, next);
    })
    
    it('sending valid bearer string but token is not valid', async () => {
        const req = {
            headers: {
                authorization:'bearer token123456'
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        // console.log('response:', response);
                        expect(status).to.be.equals(403);
                    }
                };
            }
        }
        const next = () => {}
        
        sinon.stub(authService, 'validateAuthToken').returns(Promise.reject());
        // sinon.stub(userService, 'getUserInfo').returns(null)
        await middleware.authMiddleWare(req, res, next);
        await authService.validateAuthToken.restore()
    })
    
    it('sending valid bearer string and token valid', async () => {
        const expectedMailId = "shyftplan@shyftplan.com"
        const req = {
            headers: {
                authorization:'bearer token123456'
            }
        }
        const res = {
            status: (status) => {
                return {
                    send: (response) => {
                        console.log('response:', response);
                        console.log(status)
                        // expect(status).to.be.equals(403);
                    }
                };
            }
        }
        const next = sinon.spy()
        
        sinon.stub(authService, 'validateAuthToken').returns(Promise.resolve({emailId:expectedMailId}));
        await middleware.authMiddleWare(req, res, next);
        sinon.assert.calledOnce(next);
        await authService.validateAuthToken.restore()   
    })
})