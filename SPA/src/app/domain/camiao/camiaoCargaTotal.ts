import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CargaTotalProps{
    value: number;
}

export class CargaTotal extends ValueObject<CargaTotalProps>{

    get value (): number {
        return this.props.value;
    }

    private constructor (props: CargaTotalProps) {
        super(props);
    }

    public static create (cargaTotal: number): Result<CargaTotal> {
        const guardResult = Guard.againstNullOrUndefined(cargaTotal, 'cargaTotal');
        if(!guardResult.succeeded || cargaTotal <= 0){
            return Result.fail<CargaTotal>("A carga total de um camiao nao pode ser nula ou negativa")
        }else{
            return Result.ok<CargaTotal>(new CargaTotal({value: cargaTotal}))
        }
    }
}