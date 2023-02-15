import { Mapper } from "../core/infra/Mapper";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Rota } from "../domain/planeamento/rota";
import RotaDTO from "../interfaces/rotaDto";
import { CamiaoId } from "../domain/camiao/camiaoId";

export class RotaMap extends Mapper<Rota> {
  
  public static toDTO( rota: Rota): RotaDTO {
    return {
      camiao: rota.camiao.toString(),
      data: rota.getDateFormated(),
      rota: rota.rota
    } as RotaDTO;
  }

  public static toDomain (rota: RotaDTO ): Rota {
    const rotaOrError = Rota.cria({
      camiao: new CamiaoId(rota.camiao),
      data: new Date(rota.data.replace("///g", "-")),
      rota: rota.rota
    });

    rotaOrError.isFailure ? console.log(rotaOrError.error) : '';

    return rotaOrError.isSuccess ? rotaOrError.getValue() : null!;
  }
}