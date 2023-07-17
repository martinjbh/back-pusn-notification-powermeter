// const app =require('../index')
// const functsUser = require("../functions/functionsUser")

// //////USER////////////
// app.get('/showAll', async (req, res) => {
//     res.json(await functsUser.findAll())
// })
// app.post('/addUser', async (req, res) => {
//     let { name, password } = req.body
//     let agregado = await functsUser.createUser(name, password)
//     // console.log(agregado)
//     res.json("done")
// })
// app.post('/upgradeUserPass', async (req, res) => {
//     let { name, password } = req.body
//     if (name && password) {
//         let resp = await functsUser.updateUser(name, password)
//         resp == 1 ? res.json("done") : res.status(404).json({ "msg": "error" })
//     } else {
//         res.status(404).json({ "msg": "need name" })
//     }

// })
// app.post('/deleteUser', async (req, res) => {
//     let { name } = req.body
//     if (name) {
//         let borrado = await functsUser.deleteUser(name)
//         if (borrado == 0) {
//             res.status(404).json({ "msg": "user don`t exists" })
//         } else {
//             res.json({ "msg": "succesfull" })
//         }
//     }
//     else {
//         res.status(404).json({ "msg": "error need name" })
//     }
// })