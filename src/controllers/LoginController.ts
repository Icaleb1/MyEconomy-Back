import { Request, Response } from 'express';
import { prisma } from '../Prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('JWT_SECRET não está definido no ambiente');
}

import { Login } from '../models/DTOs/Login';

export const loginController = async (
  req: Request<{}, {}, Login>, 
  res: Response
): Promise<void> => {
  const { email, senha } = req.body;

  try {
    const usuarioRegistrado = await prisma.usuario.findUnique({ where: { email } });

    if (!usuarioRegistrado) {
      res.status(404).json({ error: 'Usuário não encontrado' });
      return;
    }

    const senhaEhValida = await bcrypt.compare(senha, usuarioRegistrado.senha);

    if (!senhaEhValida) {
      res.status(400).json({ error: 'E-mail ou senha inválido' });
      return;
    }

    const token = jwt.sign(
      {
        idUsuario: usuarioRegistrado.id,
        email: usuarioRegistrado.email,
      },
      JWT_SECRET,
      { expiresIn: 10080 } 
    );

    res.status(200).json({
      message: 'Usuário logado com sucesso!',
      userId: usuarioRegistrado.id,
      token,
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
};
