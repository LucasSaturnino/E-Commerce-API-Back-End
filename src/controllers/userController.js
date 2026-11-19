const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { firstname, surname, email, password, confirmPassword } = req.body;

    if (!firstname || !surname || !email || !password || password !== confirmPassword) {
      return res.status(400).json({ message: 'Dados inválidos ou senhas não coincidem' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname,
      surname,
      email,
      password: hashedPassword
    });

    return res.status(201).json({
      id: newUser.id,
      firstname: newUser.firstname,
      surname: newUser.surname,
      email: newUser.email
    });
  } catch (error) {
    return res.status(400).json({ message: 'Erro ao cadastrar usuário' });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id, {
      attributes: ['id', 'firstname', 'surname', 'email']
    });

    if (!user) {
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }

    return res.status(200).json(user);
  } catch (error) {
    return res.status(400).json({ message: 'Erro na requisição' });
  }
};