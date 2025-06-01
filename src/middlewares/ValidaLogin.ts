import { Request, Response, NextFunction } from 'express';
import { Login } from '../models/DTOs/Login';
import validator from 'validator';

export const validarLogin = (
  req: Request<{}, {}, Login>,
  res: Response,
  next: NextFunction
) => {
  const { email, senha } = req.body;
  const errors: string[] = [];

  if (!email) errors.push('E-mail é obrigatório');
  else if (!validator.isEmail(email)) errors.push('E-mail inválido');

  if (!senha) errors.push('Senha é obrigatória');
  else if (typeof senha !== 'string' || !senha.trim() || senha.length < 6)
    errors.push('Senha deve ter pelo menos 6 caracteres');

  if (errors.length > 0) {
    res.status(400).json({ errors }); 
    return; 
  }

  next();
};
