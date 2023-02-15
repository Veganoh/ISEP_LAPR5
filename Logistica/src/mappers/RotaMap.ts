import { Mapper } from "../core/infra/Mapper";
import { Rota } from "../domain/planeamento/rota";
import IRotaDTO from "../dto/IRotaDTO";
import { CamiaoId } from "../domain/camiao/camiaoId";

export class RotaMap extends Mapper<Rota> {
  
  public static toDTO( rota: Rota): IRotaDTO {
    return {
      camiao: rota.camiao.toString(),
      data: rota.getDateFormated(),
      rota: rota.rota
    } as IRotaDTO;
  }

  public static toDTOLista( rota: Rota[]): IRotaDTO[] {
    let rotas: IRotaDTO[] = [];

    rota.forEach(element => {
      rotas.push(this.toDTO(element));
    });

    return rotas;
  }

  public static toDomain (rota: IRotaDTO ): Rota {
    const rotaOrError = Rota.cria({
      camiao: new CamiaoId(rota.camiao),
      data: new Date(rota.data.replace("///g", "-")),
      rota: rota.rota
    });

    rotaOrError.isFailure ? console.log(rotaOrError.error) : '';

    return rotaOrError.isSuccess ? rotaOrError.getValue() : null;
  }

  public static toPersistence (rota: Rota): any {
    return {
        camiao: rota.camiao.toString(),
        data: rota.getDateFormated(),
        rota: rota.rota
    }
  }
}