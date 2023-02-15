import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";

import { ArmazemID } from "./armazemId";
import { Designacao } from "./designacao";
import { Endereco } from "./endereco";
import { Coordenadas } from "./coordenadas";
import { Altitude } from "./altitude";
import { Guard } from "../../core/logic/Guard";
import { Ativo } from "./ativo";

interface ArmazemProps {
    designacao: Designacao;
    endereco: Endereco;
    coordenadas: Coordenadas;
    altitude: Altitude;
    ativo: Ativo;
}

export class Armazem extends AggregateRoot<ArmazemProps> {

    get designacao (): Designacao {
        return this.props.designacao;
    }

    set designacao (designacao: Designacao) {
        this.props.designacao = designacao;
    }

    get endereco (): Endereco {
        return this.props.endereco;
    }

    set endereco (endereco: Endereco) {
        this.props.endereco = endereco;
    }


    get coordenadas (): Coordenadas {
        return this.props.coordenadas;
    }

    set coordenadas (coordenadas: Coordenadas) {
        this.props.coordenadas = coordenadas;
    }

    get altitude (): Altitude {
        return this.props.altitude;
    }

    set altitude (altitude: Altitude) {
        this.props.altitude = altitude;
    }

    get isAtivo (): boolean{
        return this.props.ativo.isAtivo;
    }
    
    private constructor (props: ArmazemProps, id: UniqueEntityID) {
        super(props, id);
    }

    public static cria (armazemProps: ArmazemProps, id: UniqueEntityID): Result<Armazem> {
        let guardResult = Guard.againstNullOrUndefined( armazemProps, 'armazemProps' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar um armazem!");

        guardResult = Guard.againstNullOrUndefined( armazemProps.designacao, 'designacao' );
        if (!guardResult.succeeded)
            return Result.fail( "Designacão de um armazem não pode ser nula");
            
        guardResult = Guard.againstNullOrUndefined( armazemProps.endereco, 'endereco' );
        if (!guardResult.succeeded)
            return Result.fail( "Endereço do armazem não pode ser nulo");

        guardResult = Guard.againstNullOrUndefined( armazemProps.coordenadas, 'coordenadas' );
        if (!guardResult.succeeded)
            return Result.fail( "Coordenadas tem de ser preenchidas");

        guardResult = Guard.againstNullOrUndefined( armazemProps.altitude, 'altitude' );
        if (!guardResult.succeeded)
            return Result.fail( "A altitude de um armazem não pode ser nula");

        guardResult = Guard.againstNullOrUndefined( armazemProps.ativo, 'ativo' );
        if (!guardResult.succeeded)
            return Result.fail( "Um armazem necessita de estar ou ativo ou desativo");
    

        guardResult = Guard.againstNullOrUndefined( id, 'id' );
        if (!guardResult.succeeded)
            return Result.fail( "O id do armazem não pode ser nulo");    

        const armazem = new Armazem(armazemProps, id);

        return Result.ok<Armazem>( armazem )
    }
}
