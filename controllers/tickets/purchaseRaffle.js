const Ticket = require("../../models/Tickets");
const User = require("../../models/User");
const Raffle = require("../../models/Raffle");

const purchaseRaffle = async (req, res) => {
  const { name, ci, phone, raffleId } = req.body;

  try {
    const raffle = await Raffle.findById(raffleId);

    if (!raffle) {
      return res.status(404).json({ message: "Rifa não encontrada!" });
    }

    if (
      !raffle.isActive ||
      raffle.soldQuota >= raffle.totalQuota ||
      new Date() > raffle.raffleDate
    ) {
      return res
        .status(400)
        .json({ message: "Vendas encerradas para esta rifa!" });
    }

    const user = await User.findOne({ ci, phone });

    if (!user) {
      user = new User({ name, ci, phone });
      await user.save();
    }

    const ticketNumber = raffle.soldQuota + 1;

    const ticket = new Ticket({
      ticketNumber,
      user: user._id,
      raffle: raffle._id,
    });

    await ticket.save();

    user.tickets.push(ticket);
    raffle.soldQuota += 1;

    if (
      raffle.soldQuota >= raffle.totalQuota ||
      new Date() >= raffle.raffleDate
    ) {
      raffle.isActive = false;
    }

    await user.save();
    await raffle.save();

    res.status(201).json({ message: "Cotas compradas com sucesso!", ticket });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports = { purchaseRaffle };
