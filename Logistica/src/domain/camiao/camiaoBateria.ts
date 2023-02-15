import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface CamiaoBateriaProps{
    value: number;
}

export class CamiaoBateria extends ValueObject<CamiaoBateriaProps> {
    
    get value (): number {
        return this.props.value;
    }

    private constructor (props: CamiaoBateriaProps) {
        super(props);
    }

    public static create (bateria: number): Result<CamiaoBateria> {
        const guardResult = Guard.againstNullOrUndefined(bateria, 'Bateria');
        if(!guardResult.succeeded || bateria <= 0){
            return Result.fail<CamiaoBateria>("A bateria de um camiao nao pode ser nula ou negativa");
        }else{
            return Result.ok<CamiaoBateria>(new CamiaoBateria({value: bateria}))
        }
    }
}