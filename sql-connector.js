const config = require('./config')
const mysql = require('mysql2/promise')

const connect = () => {
    return new Promise((resolve, reject) => {
        mysql.createConnection({
            user     : config.dbConfig.username,
            password : config.dbConfig.password
        }).then((connection) => {
            return connection.query(`CREATE DATABASE IF NOT EXISTS ${config.dbConfig.dbName};`);
        }).then(() => {
            resolve();
        }).catch((err) => {
            reject(err)
        })
    })
    
}

module.exports = {
    connect
}



