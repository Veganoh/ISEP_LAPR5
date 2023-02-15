import { Mapper } from "../core/infra/Mapper";

import { Camiao } from "../domain/camiao/camiao";
import { CamiaoDTO } from "../interfaces/camiaoDto";
import { CamiaoBateria } from "../domain/camiao/camiaoBateria";
import { CamiaoId } from "../domain/camiao/camiaoId";
import { Tara } from "../domain/camiao/camiaoTara";
import { CargaTotal } from "../domain/camiao/camiaoCargaTotal";
import { AutonomiaCamiao } from "../domain/camiao/camiaoAutonomia";
import { CarregamentoLento } from "../domain/camiao/camiaoCarregamentoLento";
import { CarregamentoRapido } from "../domain/camiao/camiaoCarregamentoRapido";
import { CamiaoAtivo } from "../domain/camiao/camiaoAtivo";


export class CamiaoMap extends Mapper<Camiao> {
    
    public static toDTO(camiao: Camiao): CamiaoDTO {
        return {
            id: camiao.id.toString(),
            tara: camiao.tara.value,
            capacidadeCargaTotal: camiao.capacidadeCargaTotal.value,
            camiaoBateria: camiao.camiaoBateria.value,
            autonomiaCamiao: camiao.autonomiaCamiao.value,
            carregamentoLento: camiao.carregamentoLento.value,
            carregamentoRapido: camiao.carregamentoRapido.value,
            ativo: camiao.ativo.isAtivo,
        } as CamiaoDTO;
    }

    public static toDomain(camiao: CamiaoDTO): Camiao{
        const id = new CamiaoId(camiao.id);
        const camiaoOrError = Camiao.create({
            tara: Tara.create(camiao.tara).getValue(),
            capacidadeCargaTotal: CargaTotal.create(camiao.capacidadeCargaTotal).getValue(),
            camiaoBateria: CamiaoBateria.create(camiao.camiaoBateria).getValue(),
            autonomiaCamiao: AutonomiaCamiao.create(camiao.autonomiaCamiao).getValue(),
            carregamentoLento: CarregamentoLento.create(camiao.carregamentoLento).getValue(),
            carregamentoRapido:CarregamentoRapido.create(camiao.carregamentoRapido).getValue(),
            ativo:CamiaoAtivo.create(camiao.ativo).getValue()
        }, id);

        camiaoOrError.isFailure ? console.log(camiaoOrError.error) : '';
    
    return camiaoOrError.isSuccess ? camiaoOrError.getValue() : null!;
    }

    public static toDomainLista( camiaoDTOLista: CamiaoDTO[]): Camiao[] {

        let camiaoLista: Camiao[] = [];

        camiaoDTOLista.forEach(camiao => {
            camiaoLista.push(CamiaoMap.toDomain(camiao));
        });

        return camiaoLista;
    }
}