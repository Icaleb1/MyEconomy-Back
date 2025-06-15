import { Request, Response } from "express";
import { Limite } from "../models/DTOs/Limite";
import { LimiteService } from "../service/LimiteService";

const limiteService = new LimiteService();

export const limiteController = async (req: Request, res: Response): Promise<void> => {
     const idUsuarioAutenticado = req.user?.userId;

     if (!idUsuarioAutenticado) {
         res.status(401).json({ error: 'Usuário não autenticado.' });
         return;
     }

    const limiteDto: Limite = req.body;
    
    try {
        const limite = await limiteService.criarLimite(limiteDto, idUsuarioAutenticado);

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


export const buscarLimitePorMesController = async (req: Request, res: Response): Promise<void> => {
    const idUsuarioAutenticado = req.user?.userId;

    if (!idUsuarioAutenticado) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
    }

    const ano = req.query.ano as string;
    const mes = req.query.mes as string;

    if (!ano || !mes) {
        res.status(400).json({ error: 'Ano e mês são obrigatórios' });
        return;
    }

    const anoNum = Number(ano);
    const mesNum = Number(mes);

    if (isNaN(anoNum) || isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
        res.status(400).json({ error: 'Ano ou mês inválidos' });
        return;
    }

    try {
        const limite = await limiteService.buscarLimitePorMes(idUsuarioAutenticado, anoNum, mesNum);

        if (!limite) {
            res.status(404).json({ error: 'Limite não encontrado para o mês/ano informado' });
            return;
        }

        res.status(200).json(limite);
    } catch (error: any) {
        console.error('Erro ao buscar limite:', error);
        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor';
        res.status(status).json({ error: message });
    }
};
