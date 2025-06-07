import { Request, Response } from "express";
import { Limite } from "../models/DTOs/Limite";
import { LimiteService } from "../service/LimiteService";

const limiteService = new LimiteService();

export const limiteController = async (req: Request, res: Response): Promise<void> => {
    const limiteDto: Limite = req.body;
    const userId = Number(req.user?.userId);

    if (!userId) {
        res.status(401).json({ error: 'Usuário não autenticado' });
        return;
    }

    try {
        const limite = await limiteService.criarLimite(limiteDto, userId);

        res.status(201).json({
            message: 'Limite criado com sucesso',
            idLimite: limite.id
        });

    } catch (error: any) {
        console.error('Erro ao criar limite:', error);

        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor';

        res.status(status).json({ error: message });
    }
};
