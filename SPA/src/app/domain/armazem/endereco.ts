import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EnderecoProps{
    value: string;
}

export class Endereco extends ValueObject<EnderecoProps> {
    
    get value (): string {
        return this.props.value;
    }

    private constructor (props: EnderecoProps) {
        super(props);
    }

    //cria um objeto com o valor do Endereço de um armazem
    public static create (endereco: string): Result<Endereco> {
        const guardResult = Guard.againstNullOrUndefined(endereco, 'Designacao');
        
        const reg = /^([a-zA-Z ]+,){2}( *[0-9]{4}-)[0-9]{3}$/;
        
        let result = reg.test(endereco);
    
        if(!guardResult.succeeded || !reg.test(endereco))
            return Result.fail<Endereco>("Este formato de endeço não é suportado");
        
        return Result.ok<Endereco>(new Endereco({value: endereco}))
    }
}