const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log('[AUTH] authHeader recebido:', authHeader);

  // Rejeita se o cabeçalho Authorization não existir
  if (!authHeader) {
    console.log('[AUTH] Falha: cabeçalho Authorization ausente');
    return res.status(400).json({ message: 'Token não fornecido ou formato inválido' });
  }

  const parts = authHeader.split(' ');
  console.log('[AUTH] parts após split:', parts);

  // Deve conter exatamente 2 partes: "Bearer" e o token
  if (parts.length !== 2 || parts[0] !== 'Bearer') {
    console.log('[AUTH] Falha: formato inválido (esperado "Bearer <token>")');
    return res.status(400).json({ message: 'Token não fornecido ou formato inválido' });
  }

  const token = parts[1];
  console.log('[AUTH] token extraído:', token);
  console.log('[AUTH] JWT_SECRET definido?', Boolean(process.env.JWT_SECRET));

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error('[AUTH] Erro no jwt.verify:', err.name, '-', err.message);
      return res.status(400).json({ message: 'Token inválido ou expirado' });
    }

    console.log('[AUTH] Token válido! decoded:', decoded);
    req.userId = decoded.id;
    return next();
  });
};