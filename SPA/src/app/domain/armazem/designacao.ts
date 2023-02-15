import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface DesignacaoProps{
    value: string;
}

export class Designacao extends ValueObject<DesignacaoProps> {
    
    get value (): string {
        return this.props.value;
    }

    private constructor (props: DesignacaoProps) {
        super(props);
    }

    //cria um objeto com o valor da designação de um armazem
    public static create (designacao: string): Result<Designacao> {
        const guardResult = Guard.againstNullOrUndefined(designacao, 'Designacao');
        
        if(!guardResult.succeeded || designacao.length <= 0 || designacao.length > 50)
            return Result.fail<Designacao>("A designação de um armazem não pode ser vazia nem maior que 50 caracteres");
        
        return Result.ok<Designacao>(new Designacao({value: designacao}))
    }
}