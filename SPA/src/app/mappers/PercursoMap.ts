import { Mapper } from "../core/infra/Mapper";

import { Percurso } from "../domain/percurso/percurso";
import IPercursoDTO from "../interfaces/IPercursoDTO";
import { percursoFactory } from "../factories/percursoFactory";
import { Result } from "../core/logic/Result";

export class PercursoMap extends Mapper<Percurso> {
  
  public static toDTO( percurso: Percurso): IPercursoDTO {

    return {
        domainId: percurso.id.toValue(),
        armazemOrigem: percurso.armazemOrigem.value,
        armazemDestino: percurso.armazemDestino.value,
        distancia: percurso.distancia.value,
        tempoBase: percurso.tempoBase.value,
        tempoExtra: percurso.tempoExtra.value,
        energiaGasta: percurso.energiaGasta.value
    } as IPercursoDTO;
  }

  public static toDomain ( percurso: any ): Result<Percurso> {
    const percursoOrError = percursoFactory.criarPercursoComDTO(percurso);

    return percursoOrError.isSuccess ? Result.ok(percursoOrError.getValue()) : Result.fail(percursoOrError.error);
  }

  public static toPersistence (percurso: Percurso): any {
    return {
        id: percurso.id.toString(),
        domainId: percurso.id.toValue(),
        armazemOrigem: percurso.armazemOrigem.value,
        armazemDestino: percurso.armazemDestino.value,
        distancia: percurso.distancia.value,
        tempoBase: percurso.tempoBase.value,
        tempoExtra: percurso.tempoExtra.value,
        energiaGasta: percurso.energiaGasta.value
    }
  }
}