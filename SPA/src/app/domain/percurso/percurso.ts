import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";

import { Result } from "../../core/logic/Result";

import { PercursoId } from "./percursoId";
import { PercursoTempoBase } from "./percursoTempoBase";
import { PercursoTempoExtra } from "./percursoTempoExtra";
import { PercursoDistancia } from "./percursoDistancia";
import { PercursoEnergiaGasta } from "./percursoEnergiaGasta";
import { PercursoArmazem } from "./percursoArmazem";
import { Guard } from "../../core/logic/Guard";

interface PercursoProps {
    armazemOrigem: PercursoArmazem;
    armazemDestino: PercursoArmazem;
    distancia: PercursoDistancia;
    tempoBase: PercursoTempoBase;
    tempoExtra: PercursoTempoExtra;
    energiaGasta: PercursoEnergiaGasta;
}

export class Percurso extends AggregateRoot<PercursoProps> {
    get percursoId (): PercursoId {
        return new PercursoId(this.percursoId.toValue());
    }

    get armazemOrigem (): PercursoArmazem {
        return this.props.armazemOrigem;
    }

    set armazemOrigem (armazemOrigem: PercursoArmazem) {
        this.props.armazemOrigem = armazemOrigem;
    }

    get armazemDestino (): PercursoArmazem {
        return this.props.armazemDestino;
    }

    set armazemDestino (armazemDestino: PercursoArmazem) {
        this.props.armazemDestino = armazemDestino;
    }

    get distancia (): PercursoDistancia {
        return this.props.distancia;
    }

    set distancia (distancia: PercursoDistancia) {
        this.props.distancia = distancia;
    }

    get tempoBase (): PercursoTempoBase {
        return this.props.tempoBase;
    }

    set tempoBase (tempoBase: PercursoTempoBase) {
        this.props.tempoBase = tempoBase;
    }

    get tempoExtra (): PercursoTempoExtra {
        return this.props.tempoExtra;
    }

    set tempoExtra (tempoExtra: PercursoTempoExtra) {
        this.props.tempoExtra = tempoExtra;
    }

    get energiaGasta (): PercursoEnergiaGasta {
        return this.props.energiaGasta;
    }

    set energiaGasta (energiaGasta: PercursoEnergiaGasta) {
        this.props.energiaGasta = energiaGasta;
    }

    private constructor (props: PercursoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static cria (percursoProps: PercursoProps, id?: UniqueEntityID): Result<Percurso> {
        let guardResult = Guard.againstNullOrUndefined( percursoProps, 'percursoProps' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar um percurso!");

        if ( percursoProps.armazemOrigem === percursoProps.armazemDestino )
            return Result.fail( "O Armazem de Origem e o Armazem de Destino devem ser diferentes!");

        guardResult = Guard.againstNullOrUndefined( percursoProps.armazemOrigem, 'amazemOrigem' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar um percurso! (Armazem de Origem)");
            
        guardResult = Guard.againstNullOrUndefined( percursoProps.armazemDestino, 'amazemDestino' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar um percurso! (Armazem de Destino)");

        guardResult = Guard.againstNullOrUndefined( percursoProps.distancia, 'distancia' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar um percurso! (Distancia)");

        guardResult = Guard.againstNullOrUndefined( percursoProps.tempoBase, 'tempoBase' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar um percurso! (Tempo Base)");

        guardResult = Guard.againstNullOrUndefined( percursoProps.tempoExtra, 'tempoExtra' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar um percurso! (Tempo Extra)");

        guardResult = Guard.againstNullOrUndefined( percursoProps.energiaGasta, 'energiaGasta' );
        if (!guardResult.succeeded)
            return Result.fail( "Não podem existir campos indefinidos ou null para criar um percurso! (Energia Gasta)");

        const percurso = new Percurso(percursoProps, id);

        return Result.ok<Percurso>( percurso )
    }
}
