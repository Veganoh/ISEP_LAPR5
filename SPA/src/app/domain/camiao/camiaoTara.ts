import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface TaraProps{
    value: number;
}

export class Tara extends ValueObject<TaraProps>{

    get value (): number {
        return this.props.value;
    }

    private constructor (props: TaraProps) {
        super(props);
    }

    public static create (tara: number): Result<Tara> {
        const guardResult = Guard.againstNullOrUndefined(tara, 'Tara');
        if((!guardResult.succeeded) || tara <=0){
            return Result.fail<Tara>("A tara de um camiao nao pode ser nula ou negativa")
        }else{
            return Result.ok<Tara>(new Tara({value: tara}))
        }
    }
}