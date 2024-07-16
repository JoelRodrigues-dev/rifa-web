const Ticket = require("../../models/Tickets");
const User = require("../../models/User");
const Raffle = require("../../models/Raffle");

const createTicket = async (req, res) => {
  const { ci, phone, raffleId } = req.body;

  try {
    const raffle = await Raffle.findById(raffleId);

    if (!raffle) {
      return res.status(404).json({ message: "Rifa não encontrada!" });
    }

    if (!raffle.isActive) {
      return res
        .status(400)
        .json({ message: "Vendas encerradas para este item!" });
    }

    const user = await User.findOne({ ci, phone });

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }

    const ticketNumber = raffle.soldQuota + 1;

    const ticket = new Ticket({
      ticketNumber,
      user: user._id,
      raffle: raffle._id,
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports = { createTicket };
