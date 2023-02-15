import { Service, Inject } from 'typedi';
import IEnpacotamentoRepo from '../services/IRepos/IEnpacotamentoRepo';
import { EnpacotamentoMap } from '../mappers/EnpacotamentoMap';
import { Document, FilterQuery, Model } from 'mongoose';
import { IEnpacotamentoPersistence } from '../dataschema/IEnpacotamentoPersistence';
import { Enpacotamento } from '../domain/enpacotamento/enpacotamento';
import { EnpacotamentoId } from '../domain/enpacotamento/enpacotamentoId';

@Service()
export default class EnpacotamentoRepo implements IEnpacotamentoRepo{

    constructor(
        @Inject('enpacotamentoSchema') private EnpacotamentoSchema : Model<IEnpacotamentoPersistence & Document>,
    ){}

    public async exists(Enpacotamento: Enpacotamento): Promise<boolean> {
        
        const idX = Enpacotamento.id instanceof EnpacotamentoId ? (<EnpacotamentoId>Enpacotamento.id).toValue() : Enpacotamento.id;

        const query = { enpacotamentoId: idX}; 
        const EnpacotamentoDocument = await this.EnpacotamentoSchema.findOne( query as FilterQuery<IEnpacotamentoPersistence & Document>);

        return !!EnpacotamentoDocument === true;
    }

    public async findByDomainId (EnpacotamentoId: EnpacotamentoId | number): Promise<Enpacotamento> {
        const query = { enpacotamentoId: EnpacotamentoId};
        const EnpacotamentoRecord = await this.EnpacotamentoSchema.findOne( query as FilterQuery<IEnpacotamentoPersistence & Document> );

        if( EnpacotamentoRecord != null) {
        return EnpacotamentoMap.toDomain(EnpacotamentoRecord);
        }
        else
        return null;
    }

    public async encontraTodosEnpacotamentos(): Promise<Enpacotamento[]> {
        const enpacotamentoRecords = await this.EnpacotamentoSchema.find();

        let listaEnpacotamentos: Enpacotamento[] = [];
        
        enpacotamentoRecords.forEach(enpacotamento => {
            listaEnpacotamentos.push(EnpacotamentoMap.toDomain(enpacotamento));
        })
        return listaEnpacotamentos;
    }

    public async save (enpacotamento: Enpacotamento): Promise<Enpacotamento> {
        const query = { enpacotamentoId: enpacotamento.id.toValue()}; 

        const EnpacotamentoDocument = await this.EnpacotamentoSchema.findOne( query );

        try {
        if (EnpacotamentoDocument === null ) {
            const rawEnpacotamento: any = EnpacotamentoMap.toPersistence(enpacotamento);

            const EnpacotamentoCreated = await this.EnpacotamentoSchema.create(rawEnpacotamento);


            return EnpacotamentoMap.toDomain(EnpacotamentoCreated);
        } else {
            EnpacotamentoDocument.id = enpacotamento.id.toValue;
            EnpacotamentoDocument.entrega = enpacotamento.entrega.value;
            EnpacotamentoDocument.matricula = enpacotamento.matricula.toString();
            EnpacotamentoDocument.tempoColocacao = enpacotamento.tempos.colocacao;
            EnpacotamentoDocument.tempoRetirada = enpacotamento.tempos.retirada;
            EnpacotamentoDocument.coordenadaX = enpacotamento.coordenadas.valueX;
            EnpacotamentoDocument.coordenadaY = enpacotamento.coordenadas.valueY;
            EnpacotamentoDocument.coordenadaZ = enpacotamento.coordenadas.valueZ;

            await EnpacotamentoDocument.save();

            return enpacotamento;
        }
        } catch (err) {
        throw err;
        }
    }

    public async findPagina(pag: number, num: number): Promise<{ count: number; lista: Enpacotamento[]; }> {
        let enpacotamentoRecords;
        let countQuery;

        enpacotamentoRecords = this.EnpacotamentoSchema.find();
        countQuery = this.EnpacotamentoSchema.find();

        const count = await countQuery.count().exec();

        const paginaEnpacotamentos = await enpacotamentoRecords.skip(pag * num).limit(num).exec();

        let enpacotamentoLista: Enpacotamento[] = [];

        paginaEnpacotamentos.forEach(enpacotamento => {
            enpacotamentoLista.push(EnpacotamentoMap.toDomain(enpacotamento));
        })

        return {count,lista : enpacotamentoLista};
    }
}