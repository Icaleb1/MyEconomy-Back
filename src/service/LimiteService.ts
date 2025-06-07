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

}