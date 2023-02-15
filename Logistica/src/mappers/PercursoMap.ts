import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';

import { IPercursoPersistence } from "../dataschema/IPercursoPersistence";
import { Percurso } from "../domain/percurso/percurso";
import IPercursoDTO from "../dto/IPercursoDTO";
import { percursoFactory } from "../factories/percursoFactory";

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

  public static toDomain (percurso: any | Model<IPercursoPersistence & Document> ): Percurso {
    const percursoOrError = percursoFactory.criarPercursoComDTO(percurso);

    percursoOrError.isFailure ? console.log(percursoOrError.error) : '';

    return percursoOrError.isSuccess ? percursoOrError.getValue() : null;
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