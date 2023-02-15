import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AtivoCamiaoProps{
    value: boolean;
}

export class CamiaoAtivo extends ValueObject<AtivoCamiaoProps>{
    get isAtivo (): boolean{
        return this.props.value;
    }

    private constructor (props: AtivoCamiaoProps){
        super(props);
    }

    public static create (camiaoAtivo: boolean): Result<CamiaoAtivo>{
        const guardResult = Guard.againstNullOrUndefined(camiaoAtivo, 'camiaoAtivo');
        if(!guardResult.succeeded){
            return Result.fail<CamiaoAtivo>("O camiao tem de estar ativo ou inativo");
        }else{
            return Result.ok<CamiaoAtivo>(new CamiaoAtivo({value: camiaoAtivo}))
        }
    }
}