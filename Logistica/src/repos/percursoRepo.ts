import { Service, Inject } from 'typedi';

import IPercursoRepo from "../services/IRepos/IPercursoRepo";
import { PercursoMap } from "../mappers/PercursoMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPercursoPersistence } from '../dataschema/IPercursoPersistence';
import { Percurso } from '../domain/percurso/percurso';
import { PercursoId } from '../domain/percurso/percursoId';

@Service()
export default class PercursoRepo implements IPercursoRepo {
    private models: any;

    constructor(
        @Inject('percursoSchema') private PercursoSchema : Model<IPercursoPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
        where: {},
        }
    }

    public async exists(percurso: Percurso): Promise<boolean> {
        
        const idX = percurso.id instanceof PercursoId ? (<PercursoId>percurso.id).toValue() : percurso.id;

        const query = { domainId: idX}; 
        const PercursoDocument = await this.PercursoSchema.findOne( query as FilterQuery<IPercursoPersistence & Document>);

        return !!PercursoDocument === true;
    }

    public async save (percurso: Percurso): Promise<Percurso> {
        const query = { domainId: percurso.id.toValue() }; 

        const percursoDocument = await this.PercursoSchema.findOne( query );

        try {
        if ( percursoDocument === null ) {
            const rawPercurso: any = PercursoMap.toPersistence( percurso );
            
            const PercursoCreated = await this.PercursoSchema.create( rawPercurso );

            return PercursoMap.toDomain(PercursoCreated);
        } else {
            percursoDocument.id = percurso.id.toValue;
            percursoDocument.armazemOrigem = percurso.armazemOrigem.value;
            percursoDocument.armazemDestino = percurso.armazemDestino.value;
            percursoDocument.distancia = percurso.distancia.value;
            percursoDocument.tempoBase = percurso.tempoBase.value;
            percursoDocument.tempoExtra = percurso.tempoExtra.value;
            percursoDocument.energiaGasta = percurso.energiaGasta.value;
            await percursoDocument.save();

            return percurso;
        }
        } catch (err) {
        throw err;
        }
    }

    public async findByDomainId (PercursoId: PercursoId | number): Promise<Percurso> {
        const query = { domainId: PercursoId};
        const percursoRecord = await this.PercursoSchema.findOne( query as FilterQuery<IPercursoPersistence & Document> );

        if( percursoRecord != null ) {
            return PercursoMap.toDomain( percursoRecord );
        }
        else
            return null;
    }

    public async findAll(): Promise<Percurso[]> {
        const percursoRecords = await this.PercursoSchema.find();

        let percursoLista: Percurso[] = [];
        
        percursoRecords.forEach(percurso => {
            percursoLista.push(PercursoMap.toDomain(percurso));
        });

        return percursoLista;
    }

    public async findPagina(pag: number, num: number, orig: string, dest: string): Promise<{count: number, lista: Percurso[]}> {
        let percursoRecords;
        let countQuery;

        if (orig && dest) {
            percursoRecords = this.PercursoSchema.find( { armazemOrigem: orig, armazemDestino: dest });
            countQuery = this.PercursoSchema.find( { armazemOrigem: orig, armazemDestino: dest });
        } else if (orig) {
            percursoRecords = this.PercursoSchema.find( { armazemOrigem: orig });
            countQuery = this.PercursoSchema.find( { armazemOrigem: orig });
        } else if (dest) {
            percursoRecords = this.PercursoSchema.find( { armazemDestino: dest});
            countQuery = this.PercursoSchema.find( { armazemDestino: dest});
        } else {
            percursoRecords = this.PercursoSchema.find();
            countQuery = this.PercursoSchema.find();
        }

        const count = await countQuery.count().exec();
        
        const paginaPercursos = await percursoRecords.skip(pag * num).limit(num).exec();

        let percursoLista: Percurso[] = [];
        
        paginaPercursos.forEach(percurso => {
            percursoLista.push(PercursoMap.toDomain(percurso));
        });

        return { count, lista: percursoLista };
    }

    public async findByArmazens(percursoArmazemOrigem: string, percursoArmazemDestino: string): Promise<Percurso> {
        const query = { armazemOrigem : percursoArmazemOrigem, armazemDestino : percursoArmazemDestino};
        const percursoRecord = await this.PercursoSchema.findOne( query as FilterQuery<IPercursoPersistence & Document>);

        if ( percursoRecord === null )
            return null;

        console.log(percursoRecord.domainId);

        return PercursoMap.toDomain( percursoRecord );
    }
}