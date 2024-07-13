const mongoose = require('mongoose')


async function main(){

    try {
        await mongoose.connect("mongodb+srv://joelprodrigues25:Asdqwe00*@db-rifa-web.kgwnxxp.mongodb.net/?retryWrites=true&w=majority&appName=DB-RIFA-WEB")
    } catch (error) {
        console.log(`Erro: ${error}`)
    }

}

module.exports = main;