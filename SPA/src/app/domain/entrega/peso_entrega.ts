import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PesoEntProps{
    value: number;
}

export class PesoEntrega extends ValueObject<PesoEntProps> {
    
    get value (): number {
        return this.props.value;
    }

    private constructor (props: PesoEntProps) {
        super(props);
    }

    public static create (peso: number): Result<PesoEntrega> {
        if(peso <= 0)
            return Result.fail<PesoEntrega>("O peso da entrega não pode ser zero nem negativo");
        
        return Result.ok<PesoEntrega>(new PesoEntrega({value: peso}))
    }
}