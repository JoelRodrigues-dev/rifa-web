const QRCode = require("qrcode");

const generateQRCode = async (text) => {
  try {
    const qrCodeDataURL = await QRCode.toDataURL(text);
    return qrCodeDataURL;
  } catch (error) {
    console.error("Erro ao gerar QR Code:", error);
    throw error;
  }
};

module.exports = generateQRCode;
