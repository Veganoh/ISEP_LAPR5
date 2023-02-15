import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface TempoRetProps{
    value: number;
}

export class TempoRetirada extends ValueObject<TempoRetProps> {
    
    get value (): number {
        return this.props.value;
    }

    private constructor (props: TempoRetProps) {
        super(props);
    }

    public static create (peso: number): Result<TempoRetirada> {
        if(peso <= 0)
            return Result.fail<TempoRetirada>("O tempo de retirada da entrega não pode ser zero nem negativo");
        
        return Result.ok<TempoRetirada>(new TempoRetirada({value: peso}))
    }
}