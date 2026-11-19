const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(400).json({ message: 'Token não fornecido ou formato inválido' });
  }

  const token = authHeader.split(' ')[6];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    return next();
  } catch (err) {
    return res.status(400).json({ message: 'Token inválido ou expirado' });
  }
};