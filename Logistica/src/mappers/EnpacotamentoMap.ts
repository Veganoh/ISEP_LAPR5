import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';

import { IEnpacotamentoPersistence } from "../dataschema/IEnpacotamentoPersistence";
import { Enpacotamento } from "../domain/enpacotamento/enpacotamento";
import  IEnpacotamentoDTO  from "../dto/IEnpacotamentoDTO";
import { EnpacotamentoFactory } from "../factories/EnpacotamentoFactory";

export class EnpacotamentoMap extends Mapper<Enpacotamento> {

    public static toDTO( enpacotamento: Enpacotamento): IEnpacotamentoDTO{

        return {
            enpacotamentoId : enpacotamento.id.toValue(),
            entrega: enpacotamento.entrega.value,
            matricula: enpacotamento.matricula.toString(),
            tempoColocacao : enpacotamento.tempos.colocacao,
            tempoRetirada : enpacotamento.tempos.retirada,
            coordenadaX: enpacotamento.coordenadas.valueX,
            coordenadaY: enpacotamento.coordenadas.valueY,
            coordenadaZ: enpacotamento.coordenadas.valueZ,
        } as IEnpacotamentoDTO;
    }

    public static toDomain( enpacotamento: any | Model<IEnpacotamentoPersistence & Document> ): Enpacotamento {
        const enpacotamentoOrError = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamento);

        enpacotamentoOrError.isFailure ? console.log(enpacotamentoOrError.error): '';

        return enpacotamentoOrError.isSuccess ? enpacotamentoOrError.getValue() : null;
    }

    public static toPersistence( enpacotamento: Enpacotamento): any {
        return{
            id: enpacotamento.id.toString(),
            enpacotamentoId: enpacotamento.id.toValue(),
            entrega: enpacotamento.entrega.value,
            matricula: enpacotamento.matricula.toString(),
            tempoColocacao : enpacotamento.tempos.colocacao,
            tempoRetirada : enpacotamento.tempos.retirada,
            coordenadaX: enpacotamento.coordenadas.valueX,
            coordenadaY: enpacotamento.coordenadas.valueY,
            coordenadaZ: enpacotamento.coordenadas.valueZ,
        }
    }
}