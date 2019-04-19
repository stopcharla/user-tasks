// const config = require('../config');
const User = require('../sequalize/index').User;
const Sequelize = require('sequelize');
const op = Sequelize.Op;

/**
* Fetches all valid users for the specifed filters provided in the arguments
* Initally the method gets all the filters appended to the baseurl followed by 
* requesting a http get call to obtain the users meta data for the search query
* @param {string} username 
* @param {string} language 
* @param {number} count 
* @param {number} pageIndex 
*/
const getAllUsers = async (currentUserEmail ,page, per_page) => {
    const users = await User.findAll({where:{emailId:{[op.notIn]:[currentUserEmail]}},offset:(page*per_page),limit:per_page, attributes:["id", "emailId", "name"]})
    return users
}

/**
* Adding new user to the db, fails if emailId already exists in the db else returs success
* @param {*} userInfo 
*/
const addUser = async (userInfo) => {
    await User.create(userInfo);
    return;
}

/**
* Fetches the userinfo for the provided emailID. Its not expected to have mutiple users. 
* @param {*} emailId 
*/
const getUserInfo = async (emailId) => {
    console.log('get user info:', emailId)
    const res = await User.findOne({where:{emailId : emailId}});
    return res;
}

module.exports = {
    getAllUsers,
    addUser,
    getUserInfo,
};

