import { ValueObject } from "../../core/domain/ValueObject";
import { Result } from "../../core/logic/Result";
import { Guard } from "../../core/logic/Guard";

interface EnpacotamentoCoordenadasProps {
    valueX: number;
    valueY: number;
    valueZ: number;
}

export class EnpacotamentoCoordenadas extends ValueObject<EnpacotamentoCoordenadasProps> {

    get  valueX (): number{
        return this.props.valueX;
    }

    get  valueY (): number{
        return this.props.valueY;
    }

    get  valueZ (): number{
        return this.props.valueZ;
    }

    private constructor (props: EnpacotamentoCoordenadasProps){
        super(props);
    }

    public static cria(coordenadaX : number, coordenadaY : number, coordenadaZ : number): Result<EnpacotamentoCoordenadas> {
       
        const guardedProps = [
            { argument: coordenadaX, argumentName: 'coordenadaX'},
            { argument: coordenadaY, argumentName: 'coordenadaY'},
            { argument: coordenadaZ, argumentName: 'coordenadaZ'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!guardResult.succeeded) {
            return Result.fail<EnpacotamentoCoordenadas>(guardResult.message);
        }

        if (coordenadaX <= 0 || coordenadaX >= 10)
            return Result.fail<EnpacotamentoCoordenadas>("A coordenada X têm de estar compreendida entre os valores 1 e 9!");

        if (coordenadaY <= 0 || coordenadaY >= 20)
            return Result.fail<EnpacotamentoCoordenadas>("A coordenada Y têm de estar compreendida entre os valores 1 e 19!");
       
        if (coordenadaZ <= 0 || coordenadaZ >= 8)
            return Result.fail<EnpacotamentoCoordenadas>("A coordenada Z têm de estar compreendida entre os valores 1 e 7!");

        return Result.ok<EnpacotamentoCoordenadas>(new EnpacotamentoCoordenadas({valueX: coordenadaX, valueY:coordenadaY, valueZ:coordenadaZ}))
    }
}