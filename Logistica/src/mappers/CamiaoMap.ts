import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';

import {ICamiaoDTO} from "../dto/ICamiaoDTO";
import { Camiao } from "../domain/camiao/camiao";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { CamiaoBateria } from "../domain/camiao/camiaoBateria";
import { CamiaoId } from "../domain/camiao/camiaoId";
import { Tara } from "../domain/camiao/camiaoTara";
import { CargaTotal } from "../domain/camiao/camiaoCargaTotal";
import { AutonomiaCamiao } from "../domain/camiao/camiaoAutonomia";
import { CarregamentoLento } from "../domain/camiao/camiaoCarregamentoLento";
import { CarregamentoRapido } from "../domain/camiao/camiaoCarregamentoRapido";
import { CamiaoAtivo } from "../domain/camiao/camiaoAtivo";


export class CamiaoMap extends Mapper<Camiao>{

    public static toDTO(camiao: Camiao): ICamiaoDTO {
        return {
            id: camiao.id.toString(),
            tara: camiao.tara.value,
            capacidadeCargaTotal: camiao.capacidadeCargaTotal.value,
            camiaoBateria: camiao.camiaoBateria.value,
            autonomiaCamiao: camiao.autonomiaCamiao.value,
            carregamentoLento: camiao.carregamentoLento.value,
            carregamentoRapido: camiao.carregamentoRapido.value,
            ativo: camiao.ativo.isAtivo
        } as ICamiaoDTO;
    }

    public static toDomain(camiao: any | Model<ICamiaoPersistence & Document> ): Camiao {
        const tara = Tara.create(camiao.tara).getValue();
        const capacidadeCargaTotal = CargaTotal.create(camiao.capacidadeCargaTotal).getValue();
        const camiaoBateria = CamiaoBateria.create(camiao.camiaoBateria).getValue();
        const autonomiaCamiao = AutonomiaCamiao.create(camiao.autonomiaCamiao).getValue();
        const carregamentoLento = CarregamentoLento.create(camiao.carregamentoLento).getValue();
        const carregamentoRapido = CarregamentoRapido.create(camiao.carregamentoRapido).getValue();
        const ativo = CamiaoAtivo.create(camiao.ativo).getValue();
        const id = new CamiaoId(camiao.domainId);
        const camiaoOrError = Camiao.create({ 
            tara: tara,
            capacidadeCargaTotal: capacidadeCargaTotal,
            camiaoBateria: camiaoBateria,
            autonomiaCamiao: autonomiaCamiao,
            carregamentoLento: carregamentoLento,
            carregamentoRapido: carregamentoRapido,
            ativo: ativo
        }, id);


        camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';
        return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null;
    }

    public static toPersistence(camiao: Camiao): any {
        return{
            domainId: camiao.id.toString(),
            tara: camiao.tara.value,
            capacidadeCargaTotal: camiao.capacidadeCargaTotal.value,
            camiaoBateria: camiao.camiaoBateria.value,
            autonomiaCamiao: camiao.autonomiaCamiao.value,
            carregamentoLento: camiao.carregamentoLento.value,
            carregamentoRapido: camiao.carregamentoRapido.value,
            ativo: camiao.ativo.isAtivo
        }
    }
}