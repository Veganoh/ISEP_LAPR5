import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";

import {EnpacotamentoId} from "./enpacotamentoId";
import {EnpacotamentoCoordenadas} from "./enpacotamentoCoordenadas";
import {EnpacotamentoEntrega} from "./empacotamentoEntrega";
import { Guard } from "../../core/logic/Guard";
import { EnpacotamentoTempos } from "./enpacotamentoTempos";
import { CamiaoId } from "../camiao/camiaoId";



interface EnpacotamentoProps {
    entrega : EnpacotamentoEntrega;
    matricula : CamiaoId;
    tempos : EnpacotamentoTempos;
    coordenadas : EnpacotamentoCoordenadas;
}

export class Enpacotamento extends AggregateRoot<EnpacotamentoProps> {
    
    get coordenadas (): EnpacotamentoCoordenadas{
        return this.props.coordenadas;
    }

    set coordenadas(coordenadas: EnpacotamentoCoordenadas){
        this.props.coordenadas  = coordenadas;
    }

    get entrega (): EnpacotamentoEntrega{
        return this.props.entrega;
    }

    set entrega(entrega: EnpacotamentoEntrega){
        this.props.entrega  = entrega;
    }

    get tempos () : EnpacotamentoTempos{
        return this.props.tempos;
    }

    set tempos(tempos : EnpacotamentoTempos){
        this.props.tempos = tempos;
    }

    get matricula () : CamiaoId{
        return this.props.matricula
    }

    set matricula(matricula : CamiaoId){
        this.props.matricula = matricula;
    }

    private constructor (props: EnpacotamentoProps, id?: UniqueEntityID){
        super(props,id);
    }

    public static cria(enpacotamentoProps: EnpacotamentoProps, id?:UniqueEntityID): Result<Enpacotamento>{
        let guardResult = Guard.againstNullOrUndefined( enpacotamentoProps, 'enpacotamentoProps' );
        if (!guardResult.succeeded)
            return Result.fail("Não podem existir campos indefinidos ou null para criar um enpacotamento!");
        
        guardResult = Guard.againstNullOrUndefined( enpacotamentoProps.entrega, 'entrega');
        if (!guardResult.succeeded)
            return Result.fail("Não podem existir campos indefinidos ou null para criar um enpacotamento! (Entrega)");

        guardResult = Guard.againstNullOrUndefined( enpacotamentoProps.coordenadas, 'coordenadas');
        if (!guardResult.succeeded)
            return Result.fail("Não podem existir campos indefinidos ou null para criar um enpacotamento! (Coordenadas)");

        guardResult = Guard.againstNullOrUndefined( enpacotamentoProps.tempos, 'tempos');
        if (!guardResult.succeeded)
             return Result.fail("Não podem existir campos indefinidos ou null para criar um enpacotamento! (Tempos)");

    
        const enpacotamento = new Enpacotamento(enpacotamentoProps, id);

        return Result.ok<Enpacotamento>(enpacotamento)
    }

}
