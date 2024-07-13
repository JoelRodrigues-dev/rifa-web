const express = require('express');
const cors = require('cors')
const connect = require('./db/connect')
const {createUser} = require('./controllers/user/createUser');
const { getAllUser } = require('./controllers/user/getAllUser');
const { getUserId } = require('./controllers/user/getUserId');


const app = express();
app.use(cors())
app.use(express.json())



app.get("/usuario", getAllUser);
app.get("/usuario/:id", getUserId )
app.post("/usuario", createUser);


connect().then( () => app.listen(3000, () => console.log('banco de dados conectado e servidor rodando da porta 3000'))).catch((error) => console.log(error))

