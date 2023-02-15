import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PercursoTempoBaseProps {
    value: number;
}

export class PercursoTempoBase extends ValueObject<PercursoTempoBaseProps> {
    get value (): number {
        return this.props.value;
    }
    
    private constructor (props: PercursoTempoBaseProps) {
        super(props);
    }

    public static cria (tempoBase: number): Result<PercursoTempoBase> {
        const guardResult = Guard.againstNullOrUndefined(tempoBase, 'TempoBase');

        if (!guardResult.succeeded) 
            return Result.fail<PercursoTempoBase>(guardResult.message);
        
        if (tempoBase < 0) 
            return Result.fail<PercursoTempoBase>("O Tempo Base do percurso deve ser positivo e maior que 0!");

        if (!Number.isInteger(tempoBase))
            return Result.fail<PercursoTempoBase>("O Tempo Base do percurso não pode ter valores decimais!")

        return Result.ok<PercursoTempoBase>(new PercursoTempoBase({ value: tempoBase }))
    }
}