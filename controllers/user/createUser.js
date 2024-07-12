const User = require('../../models/User.js');

const createUser = async (req, res) => {
    const {name, ci, birthDate, email, phone} = req.body;

    try {
        const newUser = new User({name, ci, birthDate, email, phone});
        await newUser.save();
        return res.status(201).json(newUser)
        
    } catch (error) {
        return res.status(500).json({message: 'Erro interno do servidor', error})
    }
}


module.exports = {createUser}