import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AutonomiaCamiaoProps{
    value: number;
}

export class AutonomiaCamiao extends ValueObject<AutonomiaCamiaoProps>{

    get value (): number {
        return this.props.value;
    }

    private constructor (props: AutonomiaCamiaoProps) {
        super(props);
    }

    public static create (autonomiaCamiao: number): Result<AutonomiaCamiao> {
        const guardResult = Guard.againstNullOrUndefined(autonomiaCamiao, 'autonomiaCamiao');
        if(!guardResult.succeeded || autonomiaCamiao <= 0){
            return Result.fail<AutonomiaCamiao>("A autonomia de um camiao nao pode ser nula ou negativa");
        }else{
            return Result.ok<AutonomiaCamiao>(new AutonomiaCamiao({value: autonomiaCamiao}))
        }
    }
}
