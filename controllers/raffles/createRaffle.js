const Raffle = require("../../models/Raffle.js");

const createRaffle = async (req, res) => {
  const { productName, priceQuota, raffleDate, totalQuotas } = req.body;

  try {
    const raffle = new Raffle({
      productName,
      priceQuota,
      raffleDate,
      totalQuota,
    });

    await raffle.save();

    return res.status(201).json({ message: "Rifa criada com sucesso" }, raffle);
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor" });
  }
};

module.exports = { createRaffle };
