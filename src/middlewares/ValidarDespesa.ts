import { Request, Response, NextFunction } from "express";
import { Despesa } from "../models/DTOs/Despesa";

export const validarDespesa = async (req: Request<{}, {}, Despesa>, res: Response, next: NextFunction): Promise<void> => {
    const { valor, mesReferencia, descricao } = req.body;
    const userId = req.user?.userId;

    if (!valor || !mesReferencia || !descricao) {
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
        res.status(400).json({ error: 'Não é permitido criar despesas para um mês anterior ao atual' });
        return;
    }


    next();
};
