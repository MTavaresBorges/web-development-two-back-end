import jwt from 'jsonwebtoken';

export default function authenticated(req, res, next) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not provided.' });
  }

  const parts = authorization.split(' ');

  if (parts.length !== 2) {
    return res.status(401).json({ message: 'Token error.' });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).json({ message: 'Token malformatted.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token invalid.' });
    }

    req.userId = decoded.userId;

    return next();
  });
}