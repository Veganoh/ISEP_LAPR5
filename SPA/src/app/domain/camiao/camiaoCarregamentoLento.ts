import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CarregamentoLentoProps{
    value: number;
}

export class CarregamentoLento extends ValueObject<CarregamentoLentoProps>{

    get value (): number {
        return this.props.value;
    }

    private constructor (props: CarregamentoLentoProps){
        super(props);
    }

    public static create (carregamentoLento: number): Result<CarregamentoLento> {
        const guardResult = Guard.againstNullOrUndefined(carregamentoLento,'CarregamentoLento');
        if((!guardResult.succeeded) || carregamentoLento<0){
            return Result.fail<CarregamentoLento>("O carregamento lento de um camiao nao pode ser nula ou negativa");
        }else{
            return Result.ok<CarregamentoLento>(new CarregamentoLento({value: carregamentoLento}))
        }
    }
}