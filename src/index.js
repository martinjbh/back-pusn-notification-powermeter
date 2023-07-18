require('dotenv').config();
const express = require('express');
const app = express()
const cors = require("cors")
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors())
const webpush = require('./webpush');
const { sequelize } = require('./db/db')
// const functionsUser = require("./functions/functionsUser")
const { log } = require("./functions/helpers")

////////SERVIDOR////////
let port = process.env.PORT || 8081
app.listen(port, () => {
    console.log('server run por ' + port + ' pa')
    sequelize.sync({ alter: true })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////ROUTES////////////
let DB = []

app.post('/subscription', async (req, res) => {
    log('/subscription')

    try {
        console.log(req.body)
        let msg = ""
        let subscription = req.body.subscription
        let name = req.body.name.toLowerCase()
        let obj = {
            name,
            subscription,
        }
        let findUserRepeat = DB.find(e => e.name === name)

        if (findUserRepeat) {
            msg = "Ya existe usuario con ese nombre"
        }
        else {
            DB.push(obj)
            msg = "Se suscribio correctamente"
        }
        return res.json({ status: 200, msg: msg, subscription: subscription })
    }
    catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

app.get('/db', async (req, res) => {
    log('/db')
    try {
        return res.json({ db: DB })
    }
    catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

app.post('/add-db', async (req, res) => {
    log('/add-db')
    try {
        DB = req.body.db
        return res.json({ db: DB })
    }
    catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

app.post('/delete-user', async (req, res) => {
    log('/delete-user')
    try {
        let name = req.body.name
        let userDelete = DB.find(e => e.name === name)
        let arryFilter = DB.filter(e => e.name !== name)
        DB = arryFilter
        return res.json({ user_delete: userDelete })
    }
    catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})

app.post('/send-notification', async (req, res) => {
    log('/send-notification')
    try {
        let now = new Date()
        let { msg, name } = req.body;
        let payload = JSON.stringify({
            title: 'Powermate',
            message: `${msg}  ${now}`
        })
        let findUser = DB.find(e => e.name === name)
        
        if (findUser) {
            await webpush.sendNotification(
                findUser.subscription,
                payload,
            );
            return res.json(findUser)
        }
        else {
            return res.json({ msg: "Nose encontro el usuario" })
        }
    }
    catch (error) {
        console.log(error)
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})
















