const jwt = require('jsonwebtoken');

const SECRET = process.env.JWT_SECRET || 'spendwise_jwt_secret_2026';

/**
 * Express middleware that validates the JWT sent in the
 * Authorization: Bearer <token> header.
 * On success, attaches the decoded payload to req.user.
 */
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // "Bearer <token>"

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  try {
    req.user = jwt.verify(token, SECRET);
    next();
  } catch {
    res.status(403).json({ error: 'Invalid or expired token' });
  }
}

module.exports = authenticateToken;
