import { Request, Response, NextFunction } from 'express';
import { Usuario } from '../models/DTOs/Usuário'; 

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validarCadastro = (req: Request<{}, {}, Usuario>, res: Response, next: NextFunction): void => {
  const { nome, email, dataNascimento, senha, confirmarSenha } = req.body;

  if (!nome || !email || !dataNascimento || !senha || !confirmarSenha) {
    res.status(400).json({ error: 'Todos os campos são obrigatórios' });
    return;
  }

  if (!emailRegex.test(email)) {
    res.status(400).json({ error: 'E-mail inválido' });
    return;
  }

  const data = new Date(dataNascimento);
  if (isNaN(data.getTime())) {
    res.status(400).json({ error: 'Data de nascimento inválida' });
    return;
  }

  if (senha !== confirmarSenha) {
    res.status(400).json({ error: 'As senhas não coincidem' });
    return;
  }

  next();
};
