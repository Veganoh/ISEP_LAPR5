import { Service, Inject } from 'typedi';

import  ICamiaoRepo  from "../services/IRepos/ICamiaoRepo";
import { Camiao } from "../domain/camiao/camiao";
import { CamiaoId } from "../domain/camiao/camiaoId";
import { CamiaoMap } from "../mappers/CamiaoMap";


import { Document, FilterQuery, Model } from 'mongoose';
import { ICamiaoPersistence } from '../dataschema/ICamiaoPersistence';

@Service()
export default class CamiaoRepo implements ICamiaoRepo{
    private models: any;

    constructor(
        @Inject('camiaoSchema') private camiaoSchema : Model<ICamiaoPersistence & Document>,
    ) {}

    private createBaseQuery(): any {
        return {
            where: {},
        }
    }

    public async exists(camiao: Camiao): Promise<boolean> {

        const idX = camiao.id instanceof CamiaoId ? (<CamiaoId>camiao.id).toValue() : camiao.id;

        const query = {domainId: idX};
        const camiaoDocument = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document>);

        return !!camiaoDocument === true;
    }

    public async existId(camiaoId: CamiaoId): Promise<boolean> {
        const idX = camiaoId instanceof CamiaoId ? (<CamiaoId>camiaoId).toValue() : camiaoId;

        const query = {domainId: idX};
        const camiaoDocument = await this.camiaoSchema.findOne( query as FilterQuery<ICamiaoPersistence & Document>);

        return !!camiaoDocument === true;
    }

    public async save(camiao: Camiao): Promise<Camiao> {
        const query = {domainId: camiao.id.toString()};

        const camiaoDocument = await this.camiaoSchema.findOne( query );

        try{
            if(camiaoDocument === null){
                
                const rawModel: any = CamiaoMap.toPersistence(camiao);
                const camiaoCreated = await this.camiaoSchema.create(rawModel);
                return CamiaoMap.toDomain(camiaoCreated);
            } else {
                camiaoDocument.tara = camiao.tara.value;
                camiaoDocument.capacidadeCargaTotal = camiao.capacidadeCargaTotal.value;
                camiaoDocument.camiaoBateria = camiao.camiaoBateria.value;
                camiaoDocument.autonomiaCamiao = camiao.autonomiaCamiao.value;
                camiaoDocument.carregamentoLento = camiao.carregamentoLento.value;
                camiaoDocument.carregamentoRapido = camiao.carregamentoRapido.value;
                camiaoDocument.ativo = camiao.ativo.isAtivo;
                await camiaoDocument.save();
                return camiao;

            }
        } catch (err) {
            throw err;
        } 
    }

    /*public async mudarAtividade(camiao: Camiao): Promise<Camiao> {
        const query = {domainId: camiao.id.toString()};

        const camiaoDocument = await this.camiaoSchema.findOne( query );

        try{
            if(camiaoDocument === null){
                const rawModel: any = CamiaoMap.toPersistence(camiao);
                const camiaoCreated = await this.camiaoSchema.create(rawModel);
                return CamiaoMap.toDomain(camiaoCreated);
            } else {
                camiaoDocument.ativo = camiao.ativo.isAtivo;
                await camiaoDocument.save();
                return camiao;
            }

        } catch(err){
            throw err;
        }
    }*/

    public async findByDomainId (camiaoId: CamiaoId | string): Promise<Camiao> {
        const idX = camiaoId instanceof CamiaoId ? (<CamiaoId>camiaoId).toString() : camiaoId;

        const query = { domainId: idX }; 
        const userRecord = await this.camiaoSchema.findOne( query );
        const test = await this.camiaoSchema.find();

        if( userRecord != null) {
            return CamiaoMap.toDomain(userRecord);
        }
        else
            return null;
    }

    public async encontraTodosCamioes(): Promise<Camiao[]>{
        const camiaoRecord = await this.camiaoSchema.find();

        let camiaoList: Camiao[] = [];
        for(let camiao of camiaoRecord){
            camiaoList.push(CamiaoMap.toDomain(camiao));
        }
        return camiaoList;
    }

    public async obterTodosAtivos(): Promise<Camiao[]> {
        const camiaoRecord = await this.camiaoSchema.find();

        let camiaoList: Camiao[] = [];
        for(let camiao of camiaoRecord){
            if(camiao.ativo.valueOf()){
                camiaoList.push(CamiaoMap.toDomain(camiao));
            }
        }
        return camiaoList;
    }

}

