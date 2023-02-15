import { Mapper } from "../core/infra/Mapper";
import { EntregaID } from "../domain/entrega/entregaId";
import { Data } from "../domain/entrega/data";
import { PesoEntrega } from "../domain/entrega/peso_entrega";
import { Armazem_ID } from "../domain/entrega/armazem_id";
import {TempoColacacao} from "../domain/entrega/tempo_colocacao";
import {TempoRetirada} from "../domain/entrega/tempo_retirada";
import { Entrega } from "../domain/entrega/entrega";
import { EntregaDTO } from "../interfaces/entregaDTO";

export class EntregaMap extends Mapper<Entrega> {
  
  public static toDTO( entrega: Entrega): EntregaDTO {

    return {
        identificador: entrega.id.toString(),
        data: entrega.data.getDateFormated(),
        peso_entrega: entrega.peso.value,
        id_armazem: entrega.arm_id.value,
        tempo_retirada: entrega.tempo_ret.value,
        tempo_colocacao: entrega.tempo_col.value
    } as EntregaDTO;
  }

  public static toDomainLista( entregaDTOLista: EntregaDTO[]): Entrega[] {

    let entregalista: Entrega[] = [];
        
    entregaDTOLista.forEach(entrega => {
      entregalista.push(EntregaMap.toDomain(entrega));
    });

    return entregalista;
  }

  public static toDomain (entrega: EntregaDTO): Entrega{
    const entregaOrError = 
        Entrega.cria({
            data: Data.create(entrega.data).getValue(),
            peso: PesoEntrega.create(entrega.peso_entrega).getValue(),
            arm_id: Armazem_ID.create(entrega.id_armazem).getValue(),
            tempo_col: TempoColacacao.create(entrega.tempo_colocacao).getValue(),
            tempo_ret: TempoRetirada.create(entrega.tempo_retirada).getValue()
        },  new EntregaID(entrega.identificador));
        
    entregaOrError.isFailure ? console.log(entregaOrError.error) : '';
    
    return entregaOrError.isSuccess ? entregaOrError.getValue() : null!;
  }
}