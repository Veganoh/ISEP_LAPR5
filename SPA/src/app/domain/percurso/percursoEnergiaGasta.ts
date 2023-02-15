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
        const validacao = this.verificaDados(energiaGasta);
        if (validacao.isFailure)
            return Result.fail( validacao.error );

        return Result.ok(new PercursoEnergiaGasta({ value: energiaGasta }))
    }

    public static verificaDados(energiaGasta: number): Result<boolean> {
        const guardResult = Guard.againstNullOrUndefined(energiaGasta, 'EnergiaGasta');

        if (!guardResult.succeeded) 
            return Result.fail("A Energia Gasta não pode ser nula");
        
        if (energiaGasta <= 0) 
            return Result.fail( "A Energia Gasta do percurso deve ser positivo e maior que 0!" );

        return Result.ok();
    }
}