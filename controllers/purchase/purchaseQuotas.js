const axios = require("axios");
const User = require("../../models/User");
const Ticket = require("../../models/Ticket");
const Raffle = require("../../models/Raffle");
const generateQRCode = require("../../utils/generateQrCode");
const pagoparConfig = require("../../config/pagopar");

const purchaseQuota = async (req, res) => {
  const { name, ci, phone, raffleId } = req.body;
  try {
    const raffle = await Raffle.findById(raffleId);
    if (!raffle) {
      return res.status(404).json({ message: "Rifa não encontrada" });
    }

    if (
      !raffle.isActive ||
      raffle.soldQuotas >= raffle.totalQuotas ||
      new Date() > raffle.raffleDate
    ) {
      return res
        .status(400)
        .json({ message: "Vendas encerradas para esta rifa" });
    }

    let user = await User.findOne({ ci, phone });
    if (!user) {
      user = new User({ name, ci, phone });
      await user.save();
    }

    const ticketNumber = raffle.soldQuotas + 1;

    const pagoparResponse = await axios.post(
      "https://api.pagopar.com/api/comercios/1.1/iniciar-transaccion",
      {
        token: pagoparConfig.token,
        comercio: pagoparConfig.comercio,
        tipo_pedido: "VENTA-COM-PRODUCTO",
        productos: [
          {
            nombre: raffle.productName,
            cantidad: 1,
            precio: raffle.quotaPrice,
          },
        ],
        comprador: {
          ruc: ci,
          email: user.email || "sinemail@dominio.com",
          razon_social: name,
          telefono: phone,
        },
        monto_total: raffle.quotaPrice,
        descripcion_resumen: `Compra de cota para ${raffle.productName}`,
        public_key: pagoparConfig.publicKey,
        redireccionar: 1,
        url_cancel: pagoparConfig.urls.cancel,
        url_process: pagoparConfig.urls.process,
        url_successful: pagoparConfig.urls.success,
      }
    );

    if (pagoparResponse.data.estado !== "success") {
      return res.status(400).json({
        message: "Falha na criação do pedido no Pagopar",
        error: pagoparResponse.data,
      });
    }

    const paymentLink = pagoparResponse.data.response.link_de_pago;

    const ticket = new Ticket({
      user: user._id,
      raffle: raffle._id,
      ticketNumber: ticketNumber,
      paymentLink: paymentLink,
      status: "pending",
    });

    await ticket.save();

    raffle.soldQuotas += 1;
    await raffle.save();

    // Gerar o QR code
    const qrCodeDataURL = await generateQRCode(paymentLink);

    res.status(201).json({
      message: "Pedido criado com sucesso",
      paymentLink: paymentLink,
      qrCode: qrCodeDataURL,
    });
  } catch (error) {
    res.status(500).json({ message: "Erro no servidor", error });
  }
};

module.exports = purchaseQuota;
