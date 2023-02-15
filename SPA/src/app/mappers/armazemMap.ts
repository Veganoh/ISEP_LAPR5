import { Mapper } from "../core/infra/Mapper";

import { Armazem } from "../domain/armazem/armazem";
import { Coordenadas } from "../domain/armazem/coordenadas";
import { Designacao } from "../domain/armazem/designacao";
import { Endereco } from "../domain/armazem/endereco";
import { Altitude } from "../domain/armazem/altitude";
import { ArmazemDTO } from "../interfaces/armazemDto";
import { ArmazemID } from "../domain/armazem/armazemId";
import { Ativo } from "../domain/armazem/ativo";

export class ArmazemMap extends Mapper<Armazem> {
  
  //transforma um objeto de armazem num  armazemDTO
  public static toDTO( armazem: Armazem): ArmazemDTO {

    return {
        identificador: armazem.id.toString(),
        designacao: armazem.designacao.value,
        endereco: armazem.endereco.value,
        latitude: armazem.coordenadas.latitude,
        longitude: armazem.coordenadas.longitude,
        altitude: armazem.altitude.value,
        ativo: armazem.isAtivo
    } as ArmazemDTO;
  }

  //transforma uma lista Dto de armazem numa lista de objetos armazem
  public static toDomainLista( armazemDTOLista: ArmazemDTO[]): Armazem[] {

    let armazemlista: Armazem[] = [];
        
    armazemDTOLista.forEach(armazem => {
      armazemlista.push(ArmazemMap.toDomain(armazem));
    });

    return armazemlista;
  }

  //transforma um Dto de armazem num objeto armazem
  public static toDomain (armazem: ArmazemDTO): Armazem{
    const armazemOrError = 
        Armazem.cria({
            designacao: Designacao.create(armazem.designacao).getValue(),
            endereco: Endereco.create(armazem.endereco).getValue(),
            coordenadas: Coordenadas.create(armazem.latitude, armazem.longitude).getValue(),
            altitude: Altitude.create(armazem.altitude).getValue(),
            ativo: Ativo.create(armazem.ativo).getValue(),
        },  new ArmazemID(armazem.identificador));
        
    armazemOrError.isFailure ? console.log(armazemOrError.error) : '';
    
    return armazemOrError.isSuccess ? armazemOrError.getValue() : null!;
  }
}