import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PercursoDistanciaProps {
    value: number;
}

export class PercursoDistancia extends ValueObject<PercursoDistanciaProps> {
    get value (): number {
        return this.props.value;
    }
    
    private constructor (props: PercursoDistanciaProps) {
        super(props);
    }

    public static cria (distancia: number): Result<PercursoDistancia> {
        const validacao = this.verificaDados(distancia);
        if (validacao.isFailure)
            return Result.fail( validacao.error );

        return Result.ok(new PercursoDistancia({ value: distancia }))
    }

    public static verificaDados(distancia: number): Result<boolean> {
        const guardResult = Guard.againstNullOrUndefined(distancia, 'distancia');

        if (!guardResult.succeeded) 
            return Result.fail("A Distância não pode ser nula");
        
        if (distancia <= 0) 
            return Result.fail("A Distância do percurso deve ser positiva e maior que 0!");

        return Result.ok(true);
    }
}