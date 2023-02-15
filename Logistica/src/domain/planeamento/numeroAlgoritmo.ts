import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

//algoritmos disponiveis, em futuras mudanças este enum e responsavel por mudar os resultados possiveis
enum algoritmo {
    todos = 1,
    peso = 2,
    tempo = 3,
    peso_tempo = 4,
    genetico = 5,
    simulado = 6,
}

interface NumeroAlgoritmoProps {
    value: number;
}

export class NumeroAlgoritmo extends ValueObject<NumeroAlgoritmoProps> {
    get value (): number {
        return this.props.value;
    }
    
    private constructor (props: NumeroAlgoritmoProps) {
        super(props);
    }

    public static cria (numeroAlgoritmo: number): Result<NumeroAlgoritmo> {
        const guardResult = Guard.againstNullOrUndefined(numeroAlgoritmo, 'algoritmo');

        if (!guardResult.succeeded) 
            return Result.fail<NumeroAlgoritmo>( guardResult.message );
        
        if (!Object.values(algoritmo).includes(numeroAlgoritmo)) 
            return Result.fail<NumeroAlgoritmo>( "Nenhum algoritmo possui este numero" );

        return Result.ok<NumeroAlgoritmo>(new NumeroAlgoritmo({ value: numeroAlgoritmo }))
    }
}