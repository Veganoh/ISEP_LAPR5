import { Service, Inject } from 'typedi';
import config from "../../config";
import ICamiaoRepo from '../services/IRepos/ICamiaoRepo';
import { Result } from "../core/logic/Result";
import { CamiaoId } from "../domain/camiao/camiaoId";
import IPlaneamentoService from './IServices/IPlanemanetoService';
import { Rota } from '../domain/planeamento/rota';
import IPlaneamentoRequestDTO from '../dto/IPlanemanetoRequestDTO';
import IPlaneamentoRepo from './IRepos/IPlanemanetoRepo';
import { PlaneamentoMap } from '../mappers/planeamentRequestMap';
import IRotaDTO from '../dto/IRotaDTO';
import { RotaMap } from '../mappers/RotaMap';
import IArmazemRepo from './IRepos/IArmazemRepo';

@Service()
export default class PlaneamentoService implements IPlaneamentoService {
    constructor(
        @Inject(config.repos.camiao.name) private camiaoRepo : ICamiaoRepo,
        @Inject(config.repos.armazem.name) private armazemRepo : IArmazemRepo,
        @Inject(config.repos.planeamento.name) private planeamentoRepo : IPlaneamentoRepo
    ) {}

    private rotaSingularAlgoritmos: number[] = [1,2,3,4];

    private rotaFrotaAlgoritmos: number[] = [5,6];


    public async obterRota(planeamentoRequest: IPlaneamentoRequestDTO): Promise<Result<IRotaDTO>> {
        try{

            if(!this.rotaSingularAlgoritmos.includes(planeamentoRequest.algoritmo))
                return Result.fail<IRotaDTO>("O calculo da rota para um unico camião não suporta este algoritmo")

            const existe = await this.camiaoRepo.existId(new CamiaoId(planeamentoRequest.camiaoId));

            if(!existe)
                return Result.fail<IRotaDTO>("Camiao not found");

            const planeamentoOrError = PlaneamentoMap.toDomain(planeamentoRequest);
            
            if (planeamentoOrError == null) 
                return Result.fail<IRotaDTO>("Data mal formatada");
                
            let rota: Rota = await this.planeamentoRepo.calcularRota(planeamentoOrError);

            if (rota == null) 
                return Result.fail<IRotaDTO>("Um erro aconteceu a calcular a rota");

            return Result.ok<IRotaDTO>( RotaMap.toDTO(rota) )
        } catch (e) {
            return Result.fail<IRotaDTO>(e.error);
        }
    }

    public async obterRotaFrota(planeamentoRequest: IPlaneamentoRequestDTO): Promise<Result<IRotaDTO[]>> {
        try{

            if(!this.rotaFrotaAlgoritmos.includes(planeamentoRequest.algoritmo))
                return Result.fail<IRotaDTO[]>("O calculo da rota para a frota de camiões não suporta este algoritmo")

            const existe = await this.camiaoRepo.existId(new CamiaoId(planeamentoRequest.camiaoId));

            if(!existe)
                return Result.fail<IRotaDTO[]>("Camiao not found");

            const planeamentoOrError = PlaneamentoMap.toDomain(planeamentoRequest);
            
            if (planeamentoOrError == null) 
                return Result.fail<IRotaDTO[]>("Data mal formatada");
                
            let rota: Rota[] = await this.planeamentoRepo.calcularRotaFrota(planeamentoOrError);

            if (rota == null) 
                return Result.fail<IRotaDTO[]>("Um erro aconteceu a calcular a rota");

            return Result.ok<IRotaDTO[]>( RotaMap.toDTOLista(rota) )
        } catch (e) {
            return Result.fail<IRotaDTO[]>(e.error);
        }
    }

    public async persistirRota(rotaDto: IRotaDTO): Promise<Result<IRotaDTO>> {
        try {
            const existe = await this.camiaoRepo.existId(new CamiaoId(rotaDto.camiao));

            if(!existe)
                return Result.fail<IRotaDTO>("Camiao not found");

            let armazemExiste;
            for( let i = 0; i < rotaDto.rota.length; i++ ) {
                armazemExiste = await this.armazemRepo.exists(rotaDto.rota[i]);

                if (!armazemExiste)
                    return Result.fail(`O Armazem ${rotaDto.rota[i]} não existe no sistema!`);
            }

            const rotaOrError = RotaMap.toDomain(rotaDto);
            
            if (rotaOrError == null) 
                return Result.fail<IRotaDTO>("Data mal formatada");
                
            let rota: Rota = await this.planeamentoRepo.criarRota(rotaOrError);

            if (rota == null) 
                return Result.fail<IRotaDTO>("Ocorreu um erro a persistir a rota...");

            return Result.ok<IRotaDTO>( RotaMap.toDTO(rota) )
        } catch (e) {
            return Result.fail<IRotaDTO>(e.error);
        }
    }

    public async obterRotaFixa(): Promise<Result<IRotaDTO[]>> {
        try{
            let rotaList: Rota[] = [];
            rotaList = await this.planeamentoRepo.obterRotaFixa();
            let result: IRotaDTO[] = [];
            for(let camiao of rotaList){
                let camiaoDTOResult = RotaMap.toDTO(camiao) as IRotaDTO;
                result.push(camiaoDTOResult);
            }

            if(result.length != 0){
                return Result.ok<IRotaDTO[]>(result);
            }
        }catch(e){
            throw e;
        }
    }

    public async listarPaginaViagens(pag: number, num: number,sortBy:string): Promise<Result<{ count: number; lista: IRotaDTO[]; }>> {
        try {
            const listaResultadoRotas = await this.planeamentoRepo.findPagina(pag, num,sortBy);

            if (listaResultadoRotas.lista === null || listaResultadoRotas.count === 0) 
                return Result.fail("Não foram encontradas rotas...");
            
            let listaRotasDTO: IRotaDTO[] = [];

            listaResultadoRotas.lista.forEach(percurso => {
                listaRotasDTO.push(RotaMap.toDTO( percurso ));
            });
            
            return Result.ok( { count: listaResultadoRotas.count, lista: listaRotasDTO} );
        } catch ( e ) {
            throw e;
        }
    }
}