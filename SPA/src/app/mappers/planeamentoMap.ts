import { Mapper } from "../core/infra/Mapper";

import { CamiaoId } from "../domain/camiao/camiaoId";
import { NumeroAlgoritmo } from "../domain/planeamento/numeroAlgoritmo";
import { PlaneamentoRequest } from "../domain/planeamento/planeamentoRequest";
import { Rota } from "../domain/planeamento/rota";
import PlaneamentoDTO from "../interfaces/planeamentoDto";
import RotaDTO from "../interfaces/rotaDto";

export class PlaneamentoMap extends Mapper<PlaneamentoRequest> {

    public static toDTO( req: PlaneamentoRequest): PlaneamentoDTO {
        return {
            camiaoId: req.camiao.toString(),
            data: req.getDateFormated(),
            algoritmo: req.algoritmo.value,
        } as PlaneamentoDTO;
    }
}