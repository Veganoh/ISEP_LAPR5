import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface AtivoProps{
    value: boolean;
}

export class Ativo extends ValueObject<AtivoProps> {
    
    get isAtivo (): boolean {
        return this.props.value;
    }

    private constructor (props: AtivoProps) {
        super(props);
    }

    //Cria um objeto altitude cujo valor não seja negativo
    public static create (ativo: boolean): Result<Ativo> {
        let guardResult = Guard.againstNullOrUndefined( ativo, 'armazemProps' );
        if (!guardResult.succeeded)
            return Result.fail( "A atividade de um armazem tem de ser defenida");

        return Result.ok<Ativo>(new Ativo({value: ativo}))
    }
}