import { Result } from "../../core/logic/Result";

import { Guard } from "../../core/logic/Guard";
import { ValueObject } from "../../core/domain/ValueObject";
import { CamiaoId } from "../camiao/camiaoId";
import { NumeroAlgoritmo } from "./numeroAlgoritmo";

interface PlaneamentoProps {
    camiao: CamiaoId;
    data : Date;
    algoritmo: NumeroAlgoritmo
}

export class PlaneamentoRequest extends ValueObject<PlaneamentoProps> {

    get camiao (): CamiaoId {
        return this.props.camiao ;
    }

    get data (): Date {
        return this.props.data;
        
    }

    get algoritmo (): NumeroAlgoritmo {
        return this.props.algoritmo;
    }


    public getDateFormated(): string{
        var month: string = '' + (this.data.getMonth() + 1);
        var day: string = '' + this.data.getDate();
        var year: string = '' + this.data.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('/');
    }


    private constructor (props: PlaneamentoProps) {
        super(props);
    }

    public static cria (planeamentoProps: PlaneamentoProps): Result<PlaneamentoRequest> {

        let guardResult = Guard.againstNullOrUndefined( planeamentoProps, 'planeamentoProps' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar uma request ao planeamento!");

        guardResult = Guard.againstNullOrUndefined( planeamentoProps.camiao, 'camiao' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar uma request ao planeamento! (camiao)");

        guardResult = Guard.againstNullOrUndefined( planeamentoProps.data, 'data' );
        if (!guardResult.succeeded || planeamentoProps.data.toString() === "Invalid Date")
            return Result.fail( "Não podem existir campos indefinidos ou null para criar uma request ao planeamento! (data)");

        guardResult = Guard.againstNullOrUndefined( planeamentoProps.algoritmo, 'algoritmo' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar uma request ao planeamento! (algoritmo)");
            
        const planeamento = new PlaneamentoRequest(planeamentoProps);

        return Result.ok<PlaneamentoRequest>( planeamento )
    }
}