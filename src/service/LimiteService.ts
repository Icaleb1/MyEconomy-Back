import { Limite } from "../models/DTOs/Limite";
import { prisma } from "../Prisma";

export class LimiteService {
    async criarLimite(limite: Limite, idUsuario: number){

        const mesReferencia = typeof limite.mesReferencia === 'string' 
            ? new Date(limite.mesReferencia) 
            : limite.mesReferencia;

        const limiteCriado = await prisma.limite.create({
            data: {
                valor: limite.valor,
                mesReferencia,
                usuarioId: idUsuario
            }
        });
        return limiteCriado;

    }

    async buscarLimitePorMes(idUsuario: number, ano: number, mes: number) {
        const inicioMes = new Date(ano, mes - 1, 1);
        const fimMes = new Date(ano, mes, 1); 

        const limite = await prisma.limite.findFirst({
            where: {
                usuarioId: idUsuario,
                mesReferencia: {
                    gte: inicioMes,
                    lt: fimMes,
                }
            }
        });

        return limite;
    }



}