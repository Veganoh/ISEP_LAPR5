import { AggregateRoot } from "../../core/domain/AggregateRoot";
import { UniqueEntityID } from "../../core/domain/UniqueEntityID";
import { Guard } from "../../core/logic/Guard";
import { Result } from "../../core/logic/Result";
import { CamiaoId } from "./camiaoId";
import { CamiaoBateria } from "./camiaoBateria";
import { Tara } from "./camiaoTara";
import { CargaTotal } from "./camiaoCargaTotal";
import { AutonomiaCamiao } from "./camiaoAutonomia";
import { CarregamentoLento } from "./camiaoCarregamentoLento";
import { CarregamentoRapido} from "./camiaoCarregamentoRapido";
import { CamiaoAtivo } from "./camiaoAtivo";

interface CamiaoProps {
    tara: Tara;
    capacidadeCargaTotal: CargaTotal;
    camiaoBateria: CamiaoBateria;
    autonomiaCamiao: AutonomiaCamiao;
    carregamentoLento: CarregamentoLento;
    carregamentoRapido: CarregamentoRapido;
    ativo: CamiaoAtivo;
}


export class Camiao extends AggregateRoot<CamiaoProps>{
    get camiaoId (): CamiaoId {
        return new CamiaoId(this.camiaoId.toString());
    }

    get tara (): Tara{
        return this.props.tara;
    }

    get capacidadeCargaTotal (): CargaTotal{
        return this.props.capacidadeCargaTotal;
    }

    get camiaoBateria (): CamiaoBateria{
        return this.props.camiaoBateria;
    }

    get autonomiaCamiao (): AutonomiaCamiao{
        return this.props.autonomiaCamiao;
    }

    get carregamentoLento (): CarregamentoLento{
        return this.props.carregamentoLento;
    }

    get carregamentoRapido (): CarregamentoRapido{
        return this.props.carregamentoRapido;
    }

    get ativo (): CamiaoAtivo{
        return this.props.ativo;
    }

    set tara (value: Tara){
        this.props.tara = value;
    }

    set capacidadeCargaTotal (value: CargaTotal){
        this.props.capacidadeCargaTotal = value;
    }

    set camiaoBateria (value: CamiaoBateria) {
        this.props.camiaoBateria = value;
    }

    set autonomiaCamiao (value: AutonomiaCamiao){
        this.props.autonomiaCamiao = value;
    }

    set carregamentoLento (value: CarregamentoLento){
        this.props.carregamentoLento = value;
    }

    set carregamentoRapido (value : CarregamentoRapido){
        this.props.carregamentoRapido = value;
    }
    
    set ativo (value : CamiaoAtivo){
        this.props.ativo = value;
    }

    private constructor (props: CamiaoProps, id?: UniqueEntityID) {
        super(props, id);
    }

    public static create (props: CamiaoProps, id?: UniqueEntityID): Result<Camiao> {

        const guardedProps = [
            { argument: props.tara, argumentName: 'tara' },
            { argument: props.capacidadeCargaTotal, argumentName: 'capacidadeCargaTotal' },
            { argument: props.camiaoBateria, argumentName: 'camiaoBateria' },
            { argument: props.autonomiaCamiao, argumentName: 'autonomiaCamiao' },
            { argument: props.carregamentoLento, argumentName: 'carregamentoLento'},
            { argument: props.carregamentoRapido, argumentName: 'carregamentoRapido'},
            { argument: props.ativo, argumentName: 'ativo'}
        ];

        const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

        if(!guardResult.succeeded){
            return Result.fail<Camiao>(guardResult.message);
        }else{
            const camiao = new Camiao({
                ...props
            }, id);

            return Result.ok<Camiao>(camiao);
        }
    }
}