module.exports = (sequelize, type, tableName) => {
    const userTaskTable = sequelize.define(tableName, {
        id: {
            type: type.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        description: type.STRING,
        start:{
            type: type.DATE,
        },
        end:{
            type:type.DATE
        }
        // assignedBy: type.STRING
    },{
        tableName:tableName
    });
    
    return userTaskTable;
}