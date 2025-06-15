import { Despesa } from "../models/DTOs/Despesa";
import { prisma } from "../Prisma";

export class DespesaService {
    async criarDespesa(despesa: Despesa, idUsuario: number) {
        const data = typeof despesa.mesReferencia === 'string' 
            ? new Date(despesa.mesReferencia) 
            : despesa.mesReferencia;

        // Cria a data UTC com horário zero para evitar problema de fuso
        const mesReferencia = new Date(Date.UTC(data.getUTCFullYear(), data.getUTCMonth(), data.getUTCDate()));

        const despesaCriado = await prisma.despesa.create({
            data: {
                valor: despesa.valor,
                mesReferencia,
                descricao: despesa.descricao,
                usuarioId: idUsuario
            }
        });

        console.log(despesaCriado);
        return despesaCriado;
    }

    async buscarDespesasPorMes(idUsuario: number, ano: number, mes: number) {
        const inicioMes = new Date(Date.UTC(ano, mes - 1, 1, 0, 0, 0)); 
        const fimMes = new Date(Date.UTC(ano, mes, 1, 0, 0, 0));        

        console.log('Buscando despesas entre', inicioMes.toISOString(), 'e', fimMes.toISOString());

        const despesas = await prisma.despesa.findMany({
            where: {
                usuarioId: idUsuario,
                mesReferencia: {
                    gte: inicioMes,
                    lt: fimMes,
                }
            },
            orderBy: {
                mesReferencia: 'asc'
            }
        });

        return despesas;
    }
}
