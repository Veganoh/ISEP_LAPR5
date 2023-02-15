import { Inject, Service } from 'typedi';

import * as rm from "typed-rest-client/RestClient";
import IPlaneamentoRepo from '../services/IRepos/IPlanemanetoRepo';
import { Rota } from '../domain/planeamento/rota';
import { PlaneamentoRequest } from '../domain/planeamento/planeamentoRequest';
import config from '../../config';
import { RotaMap } from '../mappers/RotaMap';
import { Model } from 'mongoose';
import { IRotaPersistence } from '../dataschema/IRotaPersistence';
import { Document } from 'mongodb';

@Service()
export default class PlaneamentoRepo implements IPlaneamentoRepo {

    constructor(
        @Inject('rotaSchema') private RotaSchema : Model<IRotaPersistence & Document>,
    ) {}

    public async calcularRota(planeamentoRequest: PlaneamentoRequest): Promise<Rota> {
        try {

            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; 

            let rest : rm.RestClient = new rm.RestClient('rota', config.planeamento_url);

            let res : rm.IRestResponse<string[]> = await rest.get<string[]>( `/rota/${planeamentoRequest.algoritmo.value}?camiao=${planeamentoRequest.camiao.toString()}&data=${planeamentoRequest.getDateFormated()}`);

            if ( res.statusCode != 200 ) 
                return null;
                
            return Rota.cria({camiao: planeamentoRequest.camiao, data: planeamentoRequest.data, rota: res.result}).getValue();
        } catch ( e ) {
            throw e;
        }
    }


    private obterRotasEstaticas(planeamentoRequest: PlaneamentoRequest): Rota[]{

        let rota1 = ["005", "001", "002", "003", "004", "006", "005"];
        let rota2 = ["005", "007", "008", "009", "010", "011", "005"];
        let rota3 = ["005", "012", "013", "014", "015", "016", "017", "005"];


        let rotas: Rota[] = [
            Rota.cria({camiao: planeamentoRequest.camiao, data: planeamentoRequest.data, rota: rota1}).getValue(),
            Rota.cria({camiao: planeamentoRequest.camiao, data: planeamentoRequest.data, rota: rota2}).getValue(),
            Rota.cria({camiao: planeamentoRequest.camiao, data: planeamentoRequest.data, rota: rota3}).getValue()
        ];

        return rotas;
    }

    public async calcularRotaFrota(planeamentoRequest: PlaneamentoRequest): Promise<Rota[]> {
        try {

            
            if(planeamentoRequest.algoritmo.value == 6)
                return this.obterRotasEstaticas(planeamentoRequest);

            process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0'; 

            let rest : rm.RestClient = new rm.RestClient('rota', config.planeamento_url);

            let res : rm.IRestResponse<string[][]> = await rest.get<string[][]>( `/rota/${planeamentoRequest.algoritmo.value}?camiao=${planeamentoRequest.camiao.toString()}&data=${planeamentoRequest.getDateFormated()}`);

            if ( res.statusCode != 200 ) 
                return null;

            let rotas: Rota[] = [];
            res.result.forEach(element => {
                rotas.push(Rota.cria({camiao: planeamentoRequest.camiao, data: planeamentoRequest.data, rota: element}).getValue())
            });

            return rotas;
        } catch ( e ) {
            throw e;
        }
    }

    public async criarRota(rota: Rota): Promise<Rota> {
        const query = { camiao: rota.camiao.toString(), data: rota.getDateFormated() }; 

        const rotaDocument = await this.RotaSchema.findOne( query );



        try {
            if ( rotaDocument === null ) {
                const rawRota: any = RotaMap.toPersistence( rota );
                
                const rotaCreated = await this.RotaSchema.create( rawRota );

                return RotaMap.toDomain(rotaCreated);
            } else {
                rotaDocument.camiao = rota.camiao.toString();
                rotaDocument.data = rota.getDateFormated();
                rotaDocument.rota = rota.rota;
                await rotaDocument.save();

                return rota;
            }
        } catch (err) {
        throw err;
        }
    }

    public async obterRotaFixa(): Promise<Rota[]> {
        const rotaRecord = await this.RotaSchema.find();

        let rotaList: Rota[] = [];
        for(let rota of rotaRecord){
            rotaList.push(RotaMap.toDomain(rota));
        }
        return rotaList;
    }

    public async findPagina(pag: number, num: number,sortBy:string): Promise<{ count: number; lista: Rota[]; }> {
        let rotaRecords;
        let countQuery;

        rotaRecords = this.RotaSchema.find();
        if(sortBy === "data"){
            rotaRecords = this.RotaSchema.find().sort({data:-1});
        }else if(sortBy === "matricula"){
            rotaRecords = this.RotaSchema.find().sort({camiao:1});
        }

        countQuery = this.RotaSchema.find();
        const count = await countQuery.count().exec();
        
        const paginaPercursos = await rotaRecords.skip(pag * num).limit(num).exec();

        let rotaLista: Rota[] = [];
        
        paginaPercursos.forEach(rota => {
            rotaLista.push(RotaMap.toDomain(rota));
        });

        return { count, lista: rotaLista };
    }

    exists(t: String): Promise<boolean> {
        throw new Error('Method not implemented.');
    }

    save(t: String): Promise<String> {
        throw new Error('Method not implemented.');
    }

}