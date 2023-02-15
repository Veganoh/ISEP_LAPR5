import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AltitudeProps{
    value: number;
}

export class Altitude extends ValueObject<AltitudeProps> {
    
    get value (): number {
        return this.props.value;
    }

    private constructor (props: AltitudeProps) {
        super(props);
    }

    //Cria um objeto altitude cujo valor não seja negativo
    public static create (altitude: number): Result<Altitude> {
        if(altitude < 0)
            return Result.fail<Altitude>("A altitude de um armazem não pode ser negativa");
        
        return Result.ok<Altitude>(new Altitude({value: altitude}))
    }
}