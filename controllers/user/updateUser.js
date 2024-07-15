const User = require("../../models/User.js");

const updateUser = async (req, res) => {
  const { name, ci, birthDate, email, phone } = req.body;
  const id = req.params.id;

  try {
    const user = await User.findByIdAndUpdate(
      { _id: id },
      { name, ci, birthDate, email, phone },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }

    res.status(200).json(user);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Erro interno do servidor!" }, error);
  }
};

module.exports = { updateUser };
