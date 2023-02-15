import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PercursoTempoExtraProps {
    value: number;
}

export class PercursoTempoExtra extends ValueObject<PercursoTempoExtraProps> {
    get value (): number {
        return this.props.value;
    }
    
    private constructor (props: PercursoTempoExtraProps) {
        super(props);
    }

    public static cria (tempoExtra: number): Result<PercursoTempoExtra> {
        const guardResult = Guard.againstNullOrUndefined(tempoExtra, 'TempoExtra');

        if (!guardResult.succeeded) 
            return Result.fail<PercursoTempoExtra>(guardResult.message);
        
        if (tempoExtra < 0) 
            return Result.fail<PercursoTempoExtra>("O Tempo Extra do percurso deve ser positivo!");

        if (!Number.isInteger(tempoExtra))
            return Result.fail<PercursoTempoExtra>("O Tempo Extra do percurso não pode ter valores decimais!")

        return Result.ok<PercursoTempoExtra>(new PercursoTempoExtra({ value: tempoExtra }))
    }
}