import { prisma } from '../Prisma';
import { hashSenha } from '../utils/HashUtils';
import { Usuario } from '../models/DTOs/Usuário'; // seu DTO separado

export class UsuarioService {
    async cadastrarUsuario(usuario: Usuario) {
        const dataNascimento = typeof usuario.dataNascimento === 'string' 
            ? new Date(usuario.dataNascimento) 
            : usuario.dataNascimento;

        const usuarioExistente = await prisma.usuario.findUnique({ where: { email: usuario.email } });
        if (usuarioExistente) {
            throw { status: 409, message: 'E-mail já cadastrado' };
        }

        const senhaCriptografada = await hashSenha(usuario.senha);

        const usuarioCriado = await prisma.usuario.create({
            data: {
                nome: usuario.nome,
                email: usuario.email,
                dataNascimento,
                senha: senhaCriptografada,
            }
        });

        const { senha, ...usuarioSemSenha } = usuarioCriado;

        return usuarioSemSenha;
    }
}
