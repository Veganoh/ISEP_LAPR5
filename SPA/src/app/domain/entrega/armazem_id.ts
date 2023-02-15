import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface ArmazemIdProps{
    value: string;
}

export class Armazem_ID extends ValueObject<ArmazemIdProps> {
    
    get value (): string {
        return this.props.value;
    }

    private constructor (props: ArmazemIdProps) {
        super(props);
    }

    public static create (arm_id: string): Result<Armazem_ID> {
        const reg = /^[a-zA-Z0-9]{3}$/;
        
        let result = reg.test(arm_id);
        if(!result)
            return Result.fail<Armazem_ID>("O identificador de um Armazem tem de ter 3 caracteres alfanuméricos");
        
        return Result.ok<Armazem_ID>(new Armazem_ID({value: arm_id}))
    }
}