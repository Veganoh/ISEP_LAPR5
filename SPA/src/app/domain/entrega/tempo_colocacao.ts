import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface TempoColProps{
    value: number;
}

export class TempoColacacao extends ValueObject<TempoColProps> {
    
    get value (): number {
        return this.props.value;
    }

    private constructor (props: TempoColProps) {
        super(props);
    }

    public static create (peso: number): Result<TempoColacacao> {
        if(peso <= 0)
            return Result.fail<TempoColacacao>("O tempo de colocação da entrega não pode ser zero nem negativo");
        
        return Result.ok<TempoColacacao>(new TempoColacacao({value: peso}))
    }
}