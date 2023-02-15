import { Result } from "../../core/logic/Result";

import { Guard } from "../../core/logic/Guard";
import { ValueObject } from "../../core/domain/ValueObject";
import { CamiaoId } from "../camiao/camiaoId";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { RotaId } from "./rotaID";

interface RotaProps {
    camiao: CamiaoId;
    data : Date;
    rota: string[];
}

export class Rota extends AggregateRoot<RotaProps> {

    get camiao (): CamiaoId {
        return this.props.camiao ;
    }

    get data (): Date {
        return this.props.data;
        
    }

    get rota (): string[] {
        return this.props.rota;
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

    private constructor (props: RotaProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static cria (rotaProps: RotaProps, id?: UniqueEntityID): Result<Rota> {

        let guardResult = Guard.againstNullOrUndefined( rotaProps, 'rotaProps' );
        if (!guardResult.succeeded )
            return Result.fail( "Não podem existir campos indefinidos ou null para criar uma rota!");

        guardResult = Guard.againstNullOrUndefined( rotaProps.camiao, 'camiao' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar uma rota! (camiao)");

        guardResult = Guard.againstNullOrUndefined( rotaProps.data, 'data' );
        if (!guardResult.succeeded || rotaProps.data.toString() === "Invalid Date")
            return Result.fail( "Não podem existir campos indefinidos ou null para criar uma rota! (data)");

        guardResult = Guard.againstNullOrUndefined( rotaProps.rota, 'rota' );
        if (!guardResult.succeeded )
            return Result.fail( "Não podem existir campos indefinidos ou null para criar uma rota!");

        const percurso = new Rota(rotaProps, id);

        return Result.ok<Rota>( percurso )
    }
}
