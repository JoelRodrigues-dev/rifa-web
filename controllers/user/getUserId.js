const User = require('../../models/User.js')

const getUserId = async (req, res) => {

    const id = req.params.id
    const userId = await User.findById({_id: id})

    if(!userId){
        return res.status(400).json({message: 'Usuario não encontrado'})
    }

    return res.status(200).json(userId)
    
}


module.exports = {getUserId}