const User = require('../../models/User.js')


const getAllUser = async (req, res) => {
    const users = await User.find()
    res.status(200).json(users)
}

module.exports = {getAllUser};