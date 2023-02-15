import { Mapper } from "../core/infra/Mapper";
import { CamiaoId } from "../domain/camiao/camiaoId";
import { NumeroAlgoritmo } from "../domain/planeamento/numeroAlgoritmo";
import { PlaneamentoRequest } from "../domain/planeamento/planeamentoRequest";

import { Rota } from "../domain/planeamento/rota";
import IPlaneamentoRequestDTO from "../dto/IPlanemanetoRequestDTO";
import IRotaDTO from "../dto/IRotaDTO";

export class PlaneamentoMap extends Mapper<PlaneamentoRequest> {
  
  public static toDTO( req: PlaneamentoRequest): IPlaneamentoRequestDTO {
    return {
      camiaoId: req.camiao.toString(),
      data: req.getDateFormated(),
      algoritmo: req.algoritmo.value,
    } as IPlaneamentoRequestDTO;
  }

  public static toDomain (req: IPlaneamentoRequestDTO ): PlaneamentoRequest {
    const reqOrError = PlaneamentoRequest.cria({
        camiao: new CamiaoId(req.camiaoId),
        data: new Date(req.data.replace("///g", "-")),
        algoritmo: NumeroAlgoritmo.cria(req.algoritmo).getValue()
    });

    reqOrError.isFailure ? console.log(reqOrError.error) : '';

    return reqOrError.isSuccess ? reqOrError.getValue() : null;
  }
}