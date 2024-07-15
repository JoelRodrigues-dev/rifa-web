const Raffle = require("../../models/Raffle.js");

const getRaffles = async (req, res) => {
  try {
    const raffles = await Raffle.find();

    return res.json({ raffles });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports = { getRaffles };
