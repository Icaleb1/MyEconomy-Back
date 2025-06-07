import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido no ambiente');
}

declare module 'express' {
  interface Request {
    user?: {
      userId: number;
      email: string;
    };
  }
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    res.status(401).json({ error: 'Token de acesso não fornecido' });
    return;
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload | string;

    if (typeof decoded !== 'object' || decoded === null) {
      res.status(403).json({ error: 'Token inválido' });
      return;
    }
    
    req.user = {
      userId: decoded.idUsuario,
      email: decoded.email as string,
    };

    next();
  } catch (error: any) {
    console.error('Erro na verificação do token:', error);

    if (error.name === 'TokenExpiredError') {
      res.status(401).json({ error: 'Token expirado' });
      return;
    }

    res.status(403).json({ error: 'Token inválido' });
  }
};
