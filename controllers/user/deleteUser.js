const User = require("../../models/User.js");

const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const user = await User.findByIdAndDelete({ _id: id });
    if (!user) {
      return res.status(404).json({ message: "Usuario não encontrado!" });
    }

    return res.status(200).json({ message: "Usuario deletado com sucesso!" });
  } catch (error) {
    return res.status(500).json({ message: "Erro interno do servidor!" });
  }
};

module.exports = { deleteUser };
