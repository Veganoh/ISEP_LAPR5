import { Percurso } from "../domain/percurso/percurso";
import { PercursoDistancia } from "../domain/percurso/percursoDistancia";
import { PercursoEnergiaGasta } from "../domain/percurso/percursoEnergiaGasta";
import { PercursoTempoBase } from "../domain/percurso/percursoTempoBase";
import { PercursoTempoExtra } from "../domain/percurso/percursoTempoExtra";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import IPercursoDTO from "../interfaces/IPercursoDTO";
import { Result } from "../core/logic/Result";
import { PercursoArmazem } from "../domain/percurso/percursoArmazem";

export class percursoFactory {
    public static criarPercursoComDTO(percursoDTO: IPercursoDTO): Result<Percurso> {
        const armazemOrigem = PercursoArmazem.cria(percursoDTO.armazemOrigem);
        if (armazemOrigem.isFailure)
            return Result.fail(armazemOrigem.error);
           
        const armazemDestino = PercursoArmazem.cria(percursoDTO.armazemDestino);
        if (armazemDestino.isFailure)
                return Result.fail(armazemDestino.error);
            
        const distancia = PercursoDistancia.cria(percursoDTO.distancia);
        if (distancia.isFailure)
            return Result.fail(distancia.error);

        const tempoBase = PercursoTempoBase.cria(percursoDTO.tempoBase);
        if (tempoBase.isFailure)
            return Result.fail(tempoBase.error);

        const tempoExtra = PercursoTempoExtra.cria(percursoDTO.tempoExtra);
        if (tempoExtra.isFailure)
            return Result.fail(tempoExtra.error);

        const energiaGasta = PercursoEnergiaGasta.cria(percursoDTO.energiaGasta);
        if (energiaGasta.isFailure)
            return Result.fail(energiaGasta.error);

        const percurso = Percurso.cria({ 
            armazemOrigem: armazemOrigem.getValue(),
            armazemDestino: armazemDestino.getValue(),
            distancia: distancia.getValue(),
            tempoBase: tempoBase.getValue(), 
            tempoExtra: tempoExtra.getValue(),
            energiaGasta: energiaGasta.getValue() 
        }, new UniqueEntityID(percursoDTO.domainId));

        return percurso;
    }
}