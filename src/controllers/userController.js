const User = require('../models/User');
const bcrypt = require('bcrypt');

exports.createUser = async (req, res) => {
  try {
    const { firstname, surname, email, password, confirmPassword } = req.body;

    if (
      typeof firstname !== 'string' ||
      typeof surname !== 'string' ||
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      typeof confirmPassword !== 'string' ||
      !firstname.trim() ||
      !surname.trim() ||
      !email.trim() ||
      !password ||
      password !== confirmPassword
    ) {
      return res.status(400).json({ message: 'Dados inválidos ou senhas não coincidem' });
    }

    const normalizedEmail = email.trim().toLowerCase();
    const existingUser = await User.findOne({ where: { email: normalizedEmail } });
    if (existingUser) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstname: firstname.trim(),
      surname: surname.trim(),
      email: normalizedEmail,
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
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id <= 0) {
      return res.status(400).json({ message: 'ID inválido' });
    }

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