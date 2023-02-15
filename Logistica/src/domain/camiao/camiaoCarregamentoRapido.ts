import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CarregamentoRapidoProps{
    value: number;
}

export class CarregamentoRapido extends ValueObject<CarregamentoRapidoProps>{

    get value (): number {
        return this.props.value;
    }

    private constructor (props: CarregamentoRapidoProps){
        super(props);
    }

    public static create (carregamentoRapido: number): Result<CarregamentoRapido> {
        const guardResult = Guard.againstNullOrUndefined(carregamentoRapido,'CarregamentoRapido');
        if((!guardResult.succeeded) || carregamentoRapido < 0){
            return Result.fail<CarregamentoRapido>("O carregamento rapido de um camiao nao pode ser nula ou negativa")
        }else{
            return Result.ok<CarregamentoRapido>(new CarregamentoRapido({value: carregamentoRapido}))
        }
    }
}