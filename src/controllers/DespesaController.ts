import { Despesa } from "../models/DTOs/Despesa";
import { DespesaService } from "../service/DespesaService";
import { Request, Response } from "express";

const despesaService = new DespesaService();

export const despesaController = async (req: Request, res: Response): Promise<void> => {
    const idUsuarioAutenticado = req.user?.userId;

    if (!idUsuarioAutenticado) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
    }

    const despesaDto: Despesa = req.body;

    try {
        const despesa = await despesaService.criarDespesa(despesaDto, idUsuarioAutenticado);

        res.status(201).json({
            message: 'Despesa criada com sucesso',
            idDespesa: despesa.id
        });
    } catch (error: any) {
        console.error('Erro ao criar despesa: ', error);

        const status = error.status || 500;
        const message = error.message || 'Erro interno do servidor';

        res.status(status).json({ error: message });
    }
};

export const buscarDespesasPorMesController = async (req: Request, res: Response): Promise<void> => {
    const idUsuarioAutenticado = req.user?.userId;

    if (!idUsuarioAutenticado) {
        res.status(401).json({ error: 'Usuário não autenticado.' });
        return;
    }

    const ano = req.query.ano as string;
    const mes = req.query.mes as string;

    if (!ano || !mes) {
        res.status(400).json({ error: 'Ano e mês são obrigatórios.' });
        return;
    }

    const anoNum = Number(ano);
    const mesNum = Number(mes);

    if (isNaN(anoNum) || isNaN(mesNum) || mesNum < 1 || mesNum > 12) {
        res.status(400).json({ error: 'Ano ou mês inválidos.' });
        return;
    }

    try {
        const despesas: Despesa[] = await despesaService.buscarDespesasPorMes(idUsuarioAutenticado, anoNum, mesNum);

        res.status(200).json(despesas);
    } catch (error) {
        console.error('Erro ao buscar despesas:', error);
        res.status(500).json({ error: 'Erro interno ao buscar despesas.' });
    }
};