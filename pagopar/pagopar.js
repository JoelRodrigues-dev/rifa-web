module.exports = {
  token: process.env.PAGOPAR_TOKEN,
  comercio: process.env.PAGOPAR_COMERCIO,
  publicKey: process.env.PAGOPAR_PUBLIC_KEY,
  urls: {
    cancel: process.env.PAGOPAR_URL_CANCEL,
    process: process.env.PAGOPAR_URL_PROCESS,
    success: process.env.PAGOPAR_URL_SUCCESS,
  },
};
