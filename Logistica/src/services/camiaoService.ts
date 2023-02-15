import { Service, Inject } from 'typedi';
import config from "../../config";
import {ICamiaoDTO} from '../dto/ICamiaoDTO';
import { Camiao } from "../domain/camiao/camiao";
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import ICamiaoService from './IServices/ICamiaoService';
import { Result } from "../core/logic/Result";
import { CamiaoMap } from "../mappers/CamiaoMap";
import { CamiaoId } from "../domain/camiao/camiaoId";
import { CamiaoBateria } from "../domain/camiao/camiaoBateria";
import { Tara } from "../domain/camiao/camiaoTara";
import { CargaTotal } from "../domain/camiao/camiaoCargaTotal";
import { AutonomiaCamiao } from "../domain/camiao/camiaoAutonomia";
import { CarregamentoLento } from "../domain/camiao/camiaoCarregamentoLento";
import { CarregamentoRapido } from "../domain/camiao/camiaoCarregamentoRapido";
import { CamiaoAtivo } from '../domain/camiao/camiaoAtivo';
import { ReadableStreamDefaultReader } from 'node:stream/web';

@Service()
export default class CamiaoService implements ICamiaoService {
    constructor(
        @Inject(config.repos.camiao.name) private camiaoRepo : ICamiaoRepo
    ) {}

    public async getCamiao( camiaoId: string): Promise<Result<ICamiaoDTO>>{
        try{
            const camiao = await this.camiaoRepo.findByDomainId(camiaoId);

            if(camiao === null) {
                return Result.fail<ICamiaoDTO>("Camiao not found");
            } else {
                const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>( camiaoDTOResult )
            }
        } catch (e) {
            throw e;
        }
    }

    public async encontraTodosCamioes(): Promise<Result<ICamiaoDTO[]>> {
        try{
            let camiaoList: Camiao[] = [];
            camiaoList = await this.camiaoRepo.encontraTodosCamioes();
            let result: ICamiaoDTO[] = [];
            for(let camiao of camiaoList){
                let camiaoDTOResult = CamiaoMap.toDTO(camiao) as ICamiaoDTO;
                result.push(camiaoDTOResult);
            }

            if(result.length != 0){
                return Result.ok<ICamiaoDTO[]>(result);
            }
        }catch(e){
            throw e;
        }
    }

    public async obterTodosAtivos(): Promise<Result<ICamiaoDTO[]>> {
        try{
            let camiaoList: Camiao[] = [];
            camiaoList = await this.camiaoRepo.obterTodosAtivos();
            let result: ICamiaoDTO[] = [];
            for(let camiao of camiaoList){
                if(camiao.ativo.isAtivo){
                    let camiaoDTOResult = CamiaoMap.toDTO(camiao) as ICamiaoDTO;
                    result.push(camiaoDTOResult);
                }
            }

            if(result.length != 0){
                return Result.ok<ICamiaoDTO[]>(result);
            }
        }catch(e){
            throw e;
        }
    }

    public async createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
        
        try{
            const tara = Tara.create(camiaoDTO.tara).getValue();
            const capacidadeCargaTotal = CargaTotal.create(camiaoDTO.capacidadeCargaTotal).getValue();
            const camiaoBateria = CamiaoBateria.create(camiaoDTO.camiaoBateria).getValue();
            const autonomiaCamiao = AutonomiaCamiao.create(camiaoDTO.autonomiaCamiao).getValue();
            const carregamentoLento = CarregamentoLento.create(camiaoDTO.carregamentoLento).getValue();
            const carregamentoRapido = CarregamentoRapido.create(camiaoDTO.carregamentoRapido).getValue();
            const ativo = CamiaoAtivo.create(camiaoDTO.ativo).getValue();
            const id = new CamiaoId(camiaoDTO.id);

            const camiaoOrError = await Camiao.create({ 
                tara: tara,
                capacidadeCargaTotal: capacidadeCargaTotal,
                camiaoBateria: camiaoBateria,
                autonomiaCamiao: autonomiaCamiao,
                carregamentoLento: carregamentoLento,
                carregamentoRapido: carregamentoRapido,
                ativo: ativo,
            }, id);

            if(camiaoOrError.isFailure){
                return Result.fail<ICamiaoDTO>(camiaoOrError.errorValue());
            }

            const camiaoResult = camiaoOrError.getValue();

            await this.camiaoRepo.save(camiaoResult);

            const camiaoDTOResult = CamiaoMap.toDTO( camiaoResult ) as ICamiaoDTO;
            return Result.ok<ICamiaoDTO>( camiaoDTOResult );
        }catch(e){
            throw e;
        }
    }

    public async updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
        try{
            const camiao = await this.camiaoRepo.findByDomainId(camiaoDTO.id);

            if(camiao === null) {
                return Result.fail<ICamiaoDTO>("Camiao not found");
            }else{
                const tara = Tara.create(camiaoDTO.tara).getValue();
                const capacidadeCargaTotal = CargaTotal.create(camiaoDTO.capacidadeCargaTotal).getValue();
                const camiaoBateria = CamiaoBateria.create(camiaoDTO.camiaoBateria).getValue();
                const autonomiaCamiao = AutonomiaCamiao.create(camiaoDTO.autonomiaCamiao).getValue();
                const carregamentoLento = CarregamentoLento.create(camiaoDTO.carregamentoLento).getValue();
                const carregamentoRapido = CarregamentoRapido.create(camiaoDTO.carregamentoRapido).getValue();
                const ativo = CamiaoAtivo.create(camiaoDTO.ativo).getValue();

                camiao.tara = tara;
                camiao.capacidadeCargaTotal = capacidadeCargaTotal;
                camiao.camiaoBateria = camiaoBateria;
                camiao.autonomiaCamiao = autonomiaCamiao;
                camiao.carregamentoLento = carregamentoLento;
                camiao.carregamentoRapido = carregamentoRapido;
                camiao.ativo = ativo;
                await this.camiaoRepo.save(camiao);

                const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>( camiaoDTOResult );
            }
        } catch(e) {
            throw e;
        }
    }

    public async colocarCamiaoAtivo(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>> {
        try{
            const camiao = await this.camiaoRepo.findByDomainId(camiaoDTO.id);

            if(camiao === null){
                return Result.fail<ICamiaoDTO>("Camiao not found");
            }else if(camiao.ativo.isAtivo){
                const ativo = CamiaoAtivo.create(false).getValue();

                camiao.ativo = ativo;
                await this.camiaoRepo.save(camiao);

                const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>( camiaoDTOResult );
            }else{
                const ativo = CamiaoAtivo.create(true).getValue();

                camiao.ativo = ativo;
                await this.camiaoRepo.save(camiao);

                const camiaoDTOResult = CamiaoMap.toDTO( camiao ) as ICamiaoDTO;
                return Result.ok<ICamiaoDTO>( camiaoDTOResult );
            }
        }catch(e){
            throw e;
        }
    }
}