import { Request, Response, NextFunction } from "express";
import { Limite } from "../models/DTOs/Limite";
import { prisma } from "../Prisma";

export const validarLimite = async (req: Request<{}, {}, Limite>, res: Response, next: NextFunction): Promise<void> => {
    const { valor, mesReferencia } = req.body;
    const userId = req.user?.userId;

    if (!valor || !mesReferencia) {
        res.status(400).json({ error: 'Todos os campos são obrigatórios' });
        return;
    }

    if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
    }

    const data = new Date(mesReferencia);

    if (isNaN(data.getTime())) {
        res.status(400).json({ error: 'Data inválida para mesReferencia' });
        return;
    }

    const hoje = new Date();
    const mesAtual = hoje.getMonth();
    const anoAtual = hoje.getFullYear();

    if (
        data.getFullYear() < anoAtual ||
        (data.getFullYear() === anoAtual && data.getMonth() < mesAtual)
    ) {
        res.status(400).json({ error: 'Não é permitido criar limite para um mês anterior ao atual' });
        return;
    }

    const limiteExistente = await prisma.limite.findFirst({
        where: {
            usuarioId: Number(userId),
            mesReferencia: {
                gte: new Date(data.getFullYear(), data.getMonth(), 1),
                lt: new Date(data.getFullYear(), data.getMonth() + 1, 1),
            },
        },
    });

    if (limiteExistente) {
        res.status(400).json({ error: 'Já existe um limite cadastrado para este mês' });
        return;
    }

    next();
};
