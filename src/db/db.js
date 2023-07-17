const { Sequelize, DataTypes, Op } = require('sequelize');
require('dotenv').config();

let userNamePostgress = process.env.USER_NAME_POSTGRES
let passwordPostgress = process.env.PASSWORD_POSTGRES
let hostPostgress = process.env.HOST_POSTGRES
let nameDataBase = process.env.NAME_DATA_BASE

const sequelize = new Sequelize({
  database: nameDataBase,
  username: userNamePostgress,
  password: passwordPostgress,
  host: hostPostgress,
  port: 5432,
  dialect: "postgres",
  logging: false,
  // dialectOptions: {
  //   ssl: {
  //     require: true, // This will help you. But you will see nwe error
  //     rejectUnauthorized: false // This line will fix new error
  //   }
  // },
},);

/////////////////////////////////////// si ponemos el logging en false no me muestra todo el sql de sequelize
module.exports = { sequelize, DataTypes, Op }

sequelize.authenticate()
  .then(() => console.log('conectados, postgress DB ok'))
  .catch(err => console.log('algo fallo postgress DB' + err))  //para ver si esta conetado sequelize con db