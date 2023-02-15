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
        const validacao = this.verificaDados(tempoExtra);

        if (validacao.isFailure)
            return Result.fail( validacao.error );

        return Result.ok(new PercursoTempoExtra({ value: tempoExtra }))
    }

    public static verificaDados(tempoExtra: number): Result<boolean> {
        const guardResult = Guard.againstNullOrUndefined(tempoExtra, 'TempoExtra');

        if (!guardResult.succeeded) 
            return Result.fail("O Tempo Extra não pode ser nulo");
        
        if (tempoExtra < 0) 
            return Result.fail("O Tempo Extra do percurso deve ser positivo!");

        if (!Number.isInteger(tempoExtra))
            return Result.fail("O Tempo Extra do percurso não pode ter valores decimais!");

        return Result.ok(true);
    }
}