import { Enpacotamento } from "../domain/enpacotamento/enpacotamento";
import { EnpacotamentoCoordenadas } from "../domain/enpacotamento/enpacotamentoCoordenadas";
import { EnpacotamentoEntrega } from "../domain/enpacotamento/empacotamentoEntrega";
import { EnpacotamentoTempos } from "../domain/enpacotamento/enpacotamentoTempos";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import  IEnpacotamentoDTO  from "../dto/IEnpacotamentoDTO";

export class EnpacotamentoFactory {
    public static criarEnpacotamentoComDTO(enpacotamentoDTO : IEnpacotamentoDTO): Result<Enpacotamento>{
        const entrega = EnpacotamentoEntrega.cria(enpacotamentoDTO.entrega);
        if (entrega.isFailure)
            return Result.fail(entrega.error);

        const coordenadas = EnpacotamentoCoordenadas.cria(enpacotamentoDTO.coordenadaX,enpacotamentoDTO.coordenadaY,enpacotamentoDTO.coordenadaZ);
        if (coordenadas.isFailure)
            return Result.fail(coordenadas.error);
        
        const tempos = EnpacotamentoTempos.cria(enpacotamentoDTO.tempoColocacao,enpacotamentoDTO.tempoRetirada);
        if (tempos.isFailure)
            return Result.fail(tempos.error);
        

        if (enpacotamentoDTO.enpacotamentoId === undefined || enpacotamentoDTO.enpacotamentoId === null) 
        enpacotamentoDTO.enpacotamentoId = -1;    

        const enpacotamento = Enpacotamento.cria({
            entrega: entrega.getValue(),
            tempos : tempos.getValue(),
            coordenadas: coordenadas.getValue(),
            matricula: new UniqueEntityID(enpacotamentoDTO.matricula),
        }, new UniqueEntityID(enpacotamentoDTO.enpacotamentoId));

        return enpacotamento;
    }
}