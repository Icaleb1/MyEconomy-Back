import bcrypt from 'bcrypt';

export const hashSenha = async (senha: string): Promise<string> => {
    return bcrypt.hash(senha, 10);
};

export const compararSenha = async (senha: string, hash: string): Promise<boolean> => {
    return bcrypt.compare(senha, hash);
};
