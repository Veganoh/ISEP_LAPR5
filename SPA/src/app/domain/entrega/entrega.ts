import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";

import { EntregaID } from "./entregaId";
import { Data } from "./data";
import { PesoEntrega } from "./peso_entrega";
import { Armazem_ID } from "./armazem_id";
import {TempoColacacao} from "./tempo_colocacao";
import {TempoRetirada} from "./tempo_retirada";
import { Guard } from "../../core/logic/Guard";

interface EntregaProps {
    data : Data;
    peso : PesoEntrega;
    arm_id : Armazem_ID
    tempo_col: TempoColacacao;
    tempo_ret: TempoRetirada;
}

export class Entrega extends AggregateRoot<EntregaProps> {

    get data (): Data {
        return this.props.data;
    }

    set data (data:Data) {
        this.props.data = data;
    }

    get peso (): PesoEntrega {
        return this.props.peso;
    }

    set peso (peso: PesoEntrega) {
        this.props.peso = peso;
    }


    get arm_id (): Armazem_ID {
        return this.props.arm_id;
    }

    set arm_id (arm_id: Armazem_ID) {
        this.props.arm_id = arm_id;
    }

    get tempo_col (): TempoColacacao {
        return this.props.tempo_col;
    }

    set tempo_col (tempo: TempoColacacao ) {
        this.props.tempo_col = tempo;
    }

    get tempo_ret (): TempoRetirada {
        return this.props.tempo_ret;
    }

    set tempo_ret (tempo: TempoRetirada) {
        this.props.tempo_ret = tempo;
    }
    
    private constructor (props: EntregaProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static cria (entregaProps: EntregaProps, id?: UniqueEntityID): Result<Entrega> {
        let guardResult = Guard.againstNullOrUndefined(entregaProps, 'entregaProps' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar uma entrega!");

        guardResult = Guard.againstNullOrUndefined(entregaProps.data, 'data' );
        if (!guardResult.succeeded)
            return Result.fail( "A Data de uma entrega não pode ser nula");
            
        guardResult = Guard.againstNullOrUndefined( entregaProps.peso, 'peso' );
        if (!guardResult.succeeded)
            return Result.fail( "O Peso da entrega não pode ser nulo");

        guardResult = Guard.againstNullOrUndefined( entregaProps.arm_id, 'arm_id' );
        if (!guardResult.succeeded)
            return Result.fail( "O id do armazém onde vai ser feita a entrega tem de ser preenchida");

        guardResult = Guard.againstNullOrUndefined( entregaProps.tempo_col, 'tempo_col' );
        if (!guardResult.succeeded)
            return Result.fail( "O tempo de colocação de uma entrega não pode ser nulo");

        guardResult = Guard.againstNullOrUndefined( entregaProps.tempo_ret, 'tempo_ret' );
        if (!guardResult.succeeded)
            return Result.fail( "O tempo de retirada de uma entrega não pode ser nulo");

        const entrega = new Entrega(entregaProps, id);

        return Result.ok<Entrega>( entrega );
    }
}
