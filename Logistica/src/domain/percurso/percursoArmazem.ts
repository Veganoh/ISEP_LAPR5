import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PercursoArmazemProps {
    value: string;
}

export class PercursoArmazem extends ValueObject<PercursoArmazemProps> {
    get value (): string {
        return this.props.value;
    }
    
    private constructor (props: PercursoArmazemProps) {
        super(props);
    }

    public static cria (armazem: string): Result<PercursoArmazem> {
        const guardResult = Guard.againstNullOrUndefined(armazem, 'armazem');

        if (!guardResult.succeeded) 
            return Result.fail(guardResult.message);

        const res = /^[a-zA-Z0-9]{3}$/;

        if (!res.test(armazem))
            return Result.fail( "O Identificador do Armazem é constituido por 3 caracteres alfanúmericos!");

        return Result.ok<PercursoArmazem>(new PercursoArmazem({ value: armazem }))
    }
}