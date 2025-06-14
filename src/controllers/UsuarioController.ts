import { Request, Response } from 'express';
import { UsuarioService } from '../service/UsuarioService';
import { Usuario } from '../models/DTOs/Usuário'; 

const usuarioService = new UsuarioService();

export const cadastroController = async (req: Request, res: Response): Promise<void> => {
    const usuarioDto: Usuario = req.body;

    try {
        if (usuarioDto.senha !== usuarioDto.confirmarSenha) {
            res.status(400).json({ error: 'Senha e confirmação de senha não coincidem.' });
            return;
        }

        const dataNascimento = new Date(usuarioDto.dataNascimento);
        if (isNaN(dataNascimento.getTime())) {
            res.status(400).json({ error: 'Data de nascimento inválida.' });
            return;
        }
        usuarioDto.dataNascimento = dataNascimento;

        const usuario = await usuarioService.cadastrarUsuario(usuarioDto);

        res.status(201).json({
            message: 'Usuário criado com sucesso',
            idUsuario: usuario.id
        });

    } catch (error: any) {
        console.error('Erro no cadastro:', error);

        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor';

        res.status(status).json({ error: message });
    }
};

export const perfilController = async (req: Request, res: Response): Promise<void> => {
    try {
        const idUsuarioAutenticado = req.user?.userId;

        if (!idUsuarioAutenticado) {
            res.status(401).json({ error: 'Usuário não autenticado.' });
            return;
        }

        const usuario = await usuarioService.buscarPerfil(idUsuarioAutenticado);

        res.status(200).json(usuario);

    } catch (error: any) {
        console.error('Erro na busca do perfil:', error);

        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor';

        res.status(status).json({ error: message });
    }
}
