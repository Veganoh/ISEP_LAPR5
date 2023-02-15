import { Mapper } from "../core/infra/Mapper";

import { EnpacotamentoDto } from "../interfaces/enpacotamentoDto";
import { Enpacotamento } from "../domain/enpacotamento/enpacotamento";
import { EnpacotamentoCoordenadas } from "../domain/enpacotamento/enpacotamentoCoordenadas";
import { EnpacotamentoEntrega } from "../domain/enpacotamento/empacotamentoEntrega";
import { EnpacotamentoTempos } from "../domain/enpacotamento/enpacotamentoTempos";
import { EnpacotamentoId } from "../domain/enpacotamento/enpacotamentoId";
import { CamiaoId } from "../domain/camiao/camiaoId";

export class EnpacotamentoMap extends Mapper<Enpacotamento>{

    public static toDTO( enpacotamento: Enpacotamento): EnpacotamentoDto {

        return{
            domainId : enpacotamento.id.toValue(),
            entrega : enpacotamento.entrega.value,
            matricula : enpacotamento.matricula.toString(),
            tempoColocacao : enpacotamento.tempos.colocacao,
            tempoRetirada : enpacotamento.tempos.retirada,
            coordenadaX : enpacotamento.coordenadas.valueX,
            coordenadaY : enpacotamento.coordenadas.valueY,
            coordenadaZ : enpacotamento.coordenadas.valueZ,
        }as EnpacotamentoDto;
    }

    public static toDomain( enpacotamento: EnpacotamentoDto): Enpacotamento{
        const enpacotamentoOrError =
            Enpacotamento.cria({
                entrega : EnpacotamentoEntrega.cria(enpacotamento.entrega).getValue(),
                matricula : new CamiaoId(enpacotamento.matricula),
                tempos: EnpacotamentoTempos.cria(enpacotamento.tempoColocacao,enpacotamento.tempoRetirada).getValue(),
                coordenadas : EnpacotamentoCoordenadas.cria(enpacotamento.coordenadaX,enpacotamento.coordenadaY,enpacotamento.coordenadaZ).getValue()
            }, new EnpacotamentoId(enpacotamento.domainId));

        enpacotamentoOrError.isFailure ? console.log(enpacotamentoOrError.error): '';

        return enpacotamentoOrError.isSuccess ? enpacotamentoOrError.getValue() : null!;
    }

    public static toDomainLista( enpacotamentoDTOLista: EnpacotamentoDto[]): Enpacotamento[] {

        let enpacotamentoLista: Enpacotamento[] = [];
            
        enpacotamentoDTOLista.forEach(enpacotamento => {
            enpacotamentoLista.push(EnpacotamentoMap.toDomain(enpacotamento));
        });
    
        return enpacotamentoLista;
    }


}