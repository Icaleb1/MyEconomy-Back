
import { Despesa } from "../models/DTOs/Despesa";
import { prisma } from "../Prisma";

export class DespesaService {
    async criarDespesa(despesa: Despesa, idUsuario: number){

        const mesReferencia = typeof despesa.mesReferencia === 'string' 
            ? new Date(despesa.mesReferencia) 
            : despesa.mesReferencia;

        const despesaCriado = await prisma.despesa.create({
            data: {
                valor: despesa.valor,
                mesReferencia,
                descricao: despesa.descricao,
                usuarioId: idUsuario
            }
        });
        return despesaCriado;

    }

    async buscarDespesasPorMes(idUsuario: number, ano: number, mes: number) {
        const inicioMes = new Date(ano, mes - 1, 1);
        const fimMes = new Date(ano, mes, 1);
    
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