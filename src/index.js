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
const _ = require('lodash');
////////SERVIDOR////////
let port = process.env.PORT || 8083
app.listen(port, () => {
    console.log('server run por ' + port + ' pa')
    sequelize.sync({ alter: true })
})
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// //////ROUTES////////////
let DB = []

function findObjectInArray(array, object) {
    let res = array.find(item => _.isEqual(item, object))
    return res;
}

function deleteSubscription(suscription, name) {

    let dbAux = DB.map((elem) => {
        if (elem.name === name) {
            let elemAux = elem?.subscriptions?.filter(e => e.endpoint !== suscription)
            elem.subscriptions = elemAux
            return elem
        }
        else {
            elem
        }
    })
    DB = dbAux
}


app.post('/subscription', async (req, res) => {
    log(`/subscription - ${req?.body?.name}`)
    try {
        let msg = ""
        let subscription = req.body.subscription
        let name = req.body.name.toLowerCase()
        let obj = {
            name,
            subscriptions: [subscription]
        }
        let findUserRepeat = DB.find(e => e.name === name)
        if (findUserRepeat) {
            let newDb = DB.map((elem) => {

                if (elem.name === name) {
                    if (!findObjectInArray(elem.subscriptions, subscription)) {
                        elem.subscriptions.push(subscription)
                    }
                    return elem
                }
                else {
                    return elem
                }
            })
            DB = newDb
            msg = "Ya existe usuario con ese nombre se añadio otra suscripcion."
        }
        else {
            DB.push(obj)
            msg = "Se suscribio correctamente por primera vez"
        }
        return res.json({ status: 200, msg: msg })
    }
    catch (error) {
        console.log("Entro a catch '/subscription'")
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


app.post('/delete-suscription', async (req, res) => {
    log('/delete-suscription')
    try {
        let { endpoint, name } = req.body;
        deleteSubscription(endpoint, name)
        return res.json({ suscription_delete: endpoint })
    }
    catch (error) {
        console.log("Entro a catch '/delete-suscription'")
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
        console.log("Entro a catch '/delete-user'")
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
            let resAux = findUser
            await findUser.subscriptions.forEach(async (elem) => {
                let suscripcionBroken = ""
                if (elem) {
                    try {
                        suscripcionBroken = elem
                        await webpush.sendNotification(
                            elem,
                            payload,
                        );
                    }
                    catch (error) {
                        console.log("Entro en catch.")
                        deleteSubscription(suscripcionBroken.endpoint, name)
                        console.log("La suscripcion no existe fue eliminada de la base de datos.")
                    }
                }
            })
            return res.json(resAux)
        }
        else {
            return res.json({ msg: "Nose encontro el usuario" })
        }
    }
    catch (error) {
        console.log("Entro a catch '/send-notification'")
        return res.status(400).send({
            name: error.name,
            msg: error.message
        })
    }
})






