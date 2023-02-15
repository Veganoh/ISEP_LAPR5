import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EnpacotamentoTemposProps{
    colocacao: number;
    retirada: number;
}

export class EnpacotamentoTempos extends ValueObject<EnpacotamentoTemposProps>{

    get colocacao(): number{
        return this.props.colocacao;
    }
    
    get retirada(): number{
        return this.props.retirada;
    }

    private constructor (props: EnpacotamentoTemposProps){
        super(props);
    }

    public static cria(colocacao: number, retirada:number): Result<EnpacotamentoTempos>{
        
        const guardedProps = [
            { argument: colocacao, argumentName: 'tempoColocacao'},
            { argument: retirada, argumentName:  'tempoRetirada'}
        ];

        
        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);
        
        if(!guardResult.succeeded)
            return Result.fail<EnpacotamentoTempos>("O tempo não pode ser nulo!");
       
        if(colocacao < 0)
            return Result.fail<EnpacotamentoTempos>("O tempo de colocação não pode ser negativo!");

        if(retirada < 0)
            return Result.fail<EnpacotamentoTempos>("O tempo de retirada não pode ser negativo!");
    
        return Result.ok<EnpacotamentoTempos>(new EnpacotamentoTempos({colocacao: colocacao, retirada: retirada}))
    }

}
