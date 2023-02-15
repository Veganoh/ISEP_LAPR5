import { Service, Inject } from 'typedi';
import config from "../../config";
import { Result } from "../core/logic/Result";
import IEnpacotamentoDTO from '../dto/IEnpacotamentoDTO';
import IEnpacotamentoRepo from './IRepos/IEnpacotamentoRepo';
import IEnpacotamentoService from './IServices/IEnpacotamentoService';
import { EnpacotamentoMap } from '../mappers/EnpacotamentoMap';
import { EnpacotamentoFactory } from '../factories/EnpacotamentoFactory';
import IEntregaRepo from './IRepos/IEntregaRepo';
import ICamiaoRepo from './IRepos/ICamiaoRepo';

@Service()
export default class EnpacotamentoService implements IEnpacotamentoService{
    constructor(
        @Inject(config.repos.enpacotamento.name) private enpacotamentoRepo : IEnpacotamentoRepo,
        @Inject(config.repos.entrega.name) private entregaRepo : IEntregaRepo,
        @Inject(config.repos.camiao.name) private camiaoRepo : ICamiaoRepo
    ){}

    public async criarEnpacotamento(enpacotamentoDTO: IEnpacotamentoDTO): Promise<Result<IEnpacotamentoDTO>> {
        try{
            const entregaExiste = await this.entregaRepo.exists(enpacotamentoDTO.entrega);

            if( !entregaExiste )
                return Result.fail<IEnpacotamentoDTO>("A entrega " + enpacotamentoDTO.entrega + " não existe...");


            const EnpacotamentoOrError = await EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);

            if (EnpacotamentoOrError.isFailure){
                return Result.fail<IEnpacotamentoDTO>(EnpacotamentoOrError.errorValue());
            }
            const enpacotamentoResult = EnpacotamentoOrError.getValue();

            const camiao = await this.camiaoRepo.findByDomainId(enpacotamentoDTO.matricula);

            if( camiao === null )
                return Result.fail<IEnpacotamentoDTO>("O camião com a matricula  " + enpacotamentoDTO.matricula + " não existe...");

            const enpacotamentoExiste = await this.enpacotamentoRepo.exists(enpacotamentoResult)

            if( enpacotamentoExiste)
                return Result.fail<IEnpacotamentoDTO>("O empacotamento com ID " + enpacotamentoDTO.enpacotamentoId + " já existe..." );

            await this.enpacotamentoRepo.save(enpacotamentoResult);

            const EnpacotamentoDTOResult = EnpacotamentoMap.toDTO(enpacotamentoResult) as IEnpacotamentoDTO;
            
            return Result.ok<IEnpacotamentoDTO>( EnpacotamentoDTOResult)
        }catch (e) {
            throw e;
        }
        
    }

    public async editarEnpacotamento(enpacotamentoDTO: IEnpacotamentoDTO): Promise<Result<IEnpacotamentoDTO>> {
        try{
            const enpacotamento = await this.enpacotamentoRepo.findByDomainId(enpacotamentoDTO.enpacotamentoId);

            if(enpacotamento === null){
                return Result.fail("Não foi encontrado nenhum enpacotamento!");
            }
            
            if(enpacotamentoDTO.entrega === null || enpacotamentoDTO.entrega === undefined)
                enpacotamentoDTO.entrega = enpacotamento.entrega.value;
            
            const enpacotamentoNovo = EnpacotamentoFactory.criarEnpacotamentoComDTO(enpacotamentoDTO);
           
            if(enpacotamentoNovo.isFailure)
                return Result.fail(enpacotamentoNovo.error)
               
            await this.enpacotamentoRepo.save(enpacotamentoNovo.getValue());
                
            const enpacotamentoDTOResult = EnpacotamentoMap.toDTO(enpacotamentoNovo.getValue() ) as IEnpacotamentoDTO;
            
            return Result.ok<IEnpacotamentoDTO>(enpacotamentoDTOResult);
            
        }catch(e){
            throw e;
        }
    }
    
    public async encontraEnpacotamento(id: number): Promise<Result<IEnpacotamentoDTO>>{
        try{
            
            const enpacotamento = await this.enpacotamentoRepo.findByDomainId(id);

            if (enpacotamento === null){
                return Result.fail<IEnpacotamentoDTO>("Enpacotamento não encontrado");
            }
            else{
                const enpacotamentoDTOResult = EnpacotamentoMap.toDTO(enpacotamento) as IEnpacotamentoDTO;
                return Result.ok<IEnpacotamentoDTO>(enpacotamentoDTOResult)
            }

        }catch (e){
            throw e;
        }
    }

    public async encontraTodosEnpacotamentos(): Promise<Result<IEnpacotamentoDTO[]>> {
            try{
                const listaResultadoEnpacotamentos = await this.enpacotamentoRepo.encontraTodosEnpacotamentos();

                if (listaResultadoEnpacotamentos === null || listaResultadoEnpacotamentos.length === 0) 
                    return Result.fail("Não foram encontrados enpacotamentos...");

                let listaEnpacotamentoDTO: IEnpacotamentoDTO[] = [];

                listaResultadoEnpacotamentos.forEach(enpacotamento => {
                    const enpacotamentoDTO = EnpacotamentoMap.toDTO(enpacotamento);
                    listaEnpacotamentoDTO.push(enpacotamentoDTO);
                })


                return Result.ok<IEnpacotamentoDTO[]> ( listaEnpacotamentoDTO );
            }catch (e){
                throw e;
            }
    }

    public async listarPaginaEnpacotamentos(pag: number, num: number): Promise<Result<{ count: number; lista: IEnpacotamentoDTO[]}>> {
        try{
            const listaResultadoEnpacotamentos = await this.enpacotamentoRepo.findPagina(pag,num);
        
            if(listaResultadoEnpacotamentos.lista === null || listaResultadoEnpacotamentos.count === 0)
                return Result.fail("Não foram encontrados enpacotamentos...");

            let listaEnpacotamentoDTO : IEnpacotamentoDTO[] = [];

            listaResultadoEnpacotamentos.lista.forEach(enpacotamento => {
                listaEnpacotamentoDTO.push(EnpacotamentoMap.toDTO(enpacotamento));
            })
            
            return Result.ok( {count: listaResultadoEnpacotamentos.count, lista : listaEnpacotamentoDTO})
        } catch (e){
            throw e;
        }
    }
}