const User = require("../../models/User.js");

const loginUser = async (req, res) => {
  const { ci, phone } = req.body;

  try {
    const user = User.findOne({ ci, phone }).populate("tickets");
    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }

    return res.json({
      message: "Login bem sucedido!",
      user: {
        name: user.name,
        ci: user.ci,
        email: user.email,
        phone: user.phone,
        tickets: user.tickets,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports = { loginUser };
