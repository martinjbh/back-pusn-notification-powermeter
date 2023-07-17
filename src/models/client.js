const { sequelize, DataTypes } = require("../db/db") //siempre importo el mismo sequelize ya creado en db .

const Client = sequelize.define('client', {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
    },
    email: {
        type: DataTypes.STRING,
        // set(value) {
        //     this.setDataValue('email', value.toLowerCase())
        // },
        allowNull: false,
        unique: true,
        isEmail: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    socket_id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
    },
}, {
    // freezeTableName: true
});

//creo la tabla users el 
Client.sync({ alter: true })///alter -->> update table                 (actualiza solo os valores distintos from tabla.   alter:true)
////////////////////////////force -->> drop table + create table    (remueve las tablas q tengo y hace una nueva.      force:true)


module.exports = Client
