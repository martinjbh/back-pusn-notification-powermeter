const { sequelize, DataTypes } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const User = sequelize.define('user', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    socket_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
    token: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },


}, {
    // freezeTableName: true
});

//creo la tabla users el 
// User.sync({ alter: true })///alter -->> update table                 (actualiza solo os valores distintos from tabla.   alter:true)
////////////////////////////force -->> drop table + create table    (remueve las tablas q tengo y hace una nueva.      force:true)


module.exports = User
