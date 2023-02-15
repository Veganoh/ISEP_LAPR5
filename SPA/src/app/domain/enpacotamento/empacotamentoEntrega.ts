import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EnpacotamentoEntregaProps {
    value: string;
}

export class EnpacotamentoEntrega extends ValueObject<EnpacotamentoEntregaProps>{
    get value (): string {
        return this.props.value;
    }

    private constructor (props: EnpacotamentoEntregaProps){
        super(props);
    }

    public static cria(Entrega: string): Result<EnpacotamentoEntrega>{
        const guardResult = Guard.againstNullOrUndefined(Entrega, 'Entrega');

        if(!guardResult.succeeded)
            return Result.fail<EnpacotamentoEntrega>(guardResult.message);

        return Result.ok<EnpacotamentoEntrega>(new EnpacotamentoEntrega({ value: Entrega}))
    }

}