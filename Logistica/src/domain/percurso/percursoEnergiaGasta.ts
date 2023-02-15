import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface PercursoEnergiaGastaProps {
    value: number;
}

export class PercursoEnergiaGasta extends ValueObject<PercursoEnergiaGastaProps> {
    get value (): number {
        return this.props.value;
    }
    
    private constructor (props: PercursoEnergiaGastaProps) {
        super(props);
    }

    public static cria (energiaGasta: number): Result<PercursoEnergiaGasta> {
        const guardResult = Guard.againstNullOrUndefined(energiaGasta, 'EnergiaGasta');

        if (!guardResult.succeeded) 
            return Result.fail<PercursoEnergiaGasta>( guardResult.message );
        
        if (energiaGasta <= 0) 
            return Result.fail<PercursoEnergiaGasta>( "A Energia Gasta do percurso deve ser positivo e maior que 0!" );

        return Result.ok<PercursoEnergiaGasta>(new PercursoEnergiaGasta({ value: energiaGasta }))
    }
}