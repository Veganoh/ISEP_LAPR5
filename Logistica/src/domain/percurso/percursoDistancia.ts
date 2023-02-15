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
        const guardResult = Guard.againstNullOrUndefined(distancia, 'distancia');

        if (!guardResult.succeeded) 
            return Result.fail<PercursoDistancia>(guardResult.message);
        
        if (distancia <= 0) 
            return Result.fail<PercursoDistancia>("A Distancia do percurso deve ser positiva e maior que 0!");

        return Result.ok<PercursoDistancia>(new PercursoDistancia({ value: distancia }))
    }
}