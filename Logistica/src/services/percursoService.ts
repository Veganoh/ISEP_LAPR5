import { Service, Inject } from 'typedi';
import config from "../../config";
import IPercursoDTO from '../dto/IPercursoDTO';
import IPercursoRepo from '../services/IRepos/IPercursoRepo';
import IPercursoService from './IServices/IPercursoService';
import { Result } from "../core/logic/Result";
import { PercursoMap } from "../mappers/PercursoMap";
import { percursoFactory } from '../factories/percursoFactory';
import IArmazemRepo from './IRepos/IArmazemRepo';

@Service()
export default class PercursoService implements IPercursoService {
    constructor(
        @Inject(config.repos.percurso.name) private percursoRepo : IPercursoRepo,
        @Inject(config.repos.armazem.name) private armazemRepo : IArmazemRepo
    ) {}

    public async criarPercurso(PercursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>> {
        try {
            const armazemOrigemExiste = await this.armazemRepo.exists(PercursoDTO.armazemOrigem);

            if ( !armazemOrigemExiste ) 
                return Result.fail<IPercursoDTO>( "O Armazem de Origem " + PercursoDTO.armazemOrigem + " não existe..." );

            const armazemDestinoExiste = await this.armazemRepo.exists(PercursoDTO.armazemDestino);

            if ( armazemDestinoExiste === false ) 
                return Result.fail<IPercursoDTO>( "O Armazem de Destino " + PercursoDTO.armazemDestino + " não existe..." );

            const PercursoOrError = await percursoFactory.criarPercursoComDTO( PercursoDTO );

            if (PercursoOrError.isFailure) 
                return Result.fail<IPercursoDTO>(PercursoOrError.errorValue());
            
            const PercursoResult = PercursoOrError.getValue();
            await this.percursoRepo.save(PercursoResult);
                
            const PercursoDTOResult = PercursoMap.toDTO( PercursoResult ) as IPercursoDTO;
            return Result.ok<IPercursoDTO>( PercursoDTOResult )
        } catch (e) {
            throw e;
        }
    }
  
    public async editarPercurso(percursoDTO: IPercursoDTO): Promise<Result<IPercursoDTO>> {
        try {
            const percurso = await this.percursoRepo.findByArmazens(percursoDTO.armazemOrigem, percursoDTO.armazemDestino);
    
            if (percurso === null) 
                return Result.fail("Não foi encontrado nenhum Percurso entre os armazens " + percursoDTO.armazemOrigem + " e " + percursoDTO.armazemOrigem + "...");

            if ( percursoDTO.domainId === null || percursoDTO.domainId === undefined) 
                percursoDTO.domainId = percurso.id.toValue() as number;

            if ( percursoDTO.distancia === null || percursoDTO.distancia === undefined) 
                percursoDTO.distancia = percurso.distancia.value;

            if ( percursoDTO.energiaGasta === null || percursoDTO.energiaGasta === undefined) 
                percursoDTO.energiaGasta = percurso.energiaGasta.value;

            if ( percursoDTO.tempoBase === null || percursoDTO.tempoBase === undefined) 
                percursoDTO.tempoBase = percurso.tempoBase.value;

            if ( percursoDTO.tempoExtra === null || percursoDTO.tempoExtra === undefined) 
                percursoDTO.tempoExtra = percurso.tempoExtra.value;

            const percursoNovoResultado = percursoFactory.criarPercursoComDTO(percursoDTO);
            if (percursoNovoResultado.isFailure) 
                return Result.fail(percursoNovoResultado.error);

            await this.percursoRepo.save(percursoNovoResultado.getValue());

            const percursoDTOResult = PercursoMap.toDTO( percursoNovoResultado.getValue() ) as IPercursoDTO;

            return Result.ok<IPercursoDTO>( percursoDTOResult )
            
        } catch (e) {
            throw e;
        }
    }
  
    public async listarTodosPercursos(): Promise<Result<IPercursoDTO[]>> {
        try {
            const listaResultadoPercursos = await this.percursoRepo.findAll();

            if (listaResultadoPercursos === null || listaResultadoPercursos.length === 0) 
                return Result.fail("Não foram encontrados percursos...");
            
            let listaPercursosDTO: IPercursoDTO[] = [];

            listaResultadoPercursos.forEach(percurso => {
                listaPercursosDTO.push(PercursoMap.toDTO( percurso ));
            });

            return Result.ok<IPercursoDTO[]> ( listaPercursosDTO );
        } catch (e) {
            throw e;
        }
    }

    public async listarPercursoPorId( percursoId: number): Promise<Result<IPercursoDTO>> {
        try {
            const percurso = await this.percursoRepo.findByDomainId(percursoId);

            if ( percurso === null ) 
                return Result.fail("Não foi encontrado nenhum percurso com o id " + percursoId + "..."); 

            const percursoDTO = PercursoMap.toDTO( percurso );
            
            return Result.ok<IPercursoDTO> ( percursoDTO );
        } catch ( e ) {
            throw e;
        }
    }

    public async listarPercursoPorArmazens(armazemOrigem: string, armazemDestino: string): Promise<Result<IPercursoDTO>> {
        try {
            const percurso = await this.percursoRepo.findByArmazens( armazemOrigem, armazemDestino );

            if ( percurso === null )
                return Result.fail( "Não foi encontrado nenhum percurso entre os armazens " + armazemOrigem + ", " + armazemDestino + "..." );

            const percursoDTO = PercursoMap.toDTO( percurso );
            
            return Result.ok<IPercursoDTO> ( percursoDTO );
        } catch ( e ) {
            throw e;
        }
    }

    public async listarPaginaPercursos(pag: number, num: number, orig: string, dest: string): Promise<Result<{count: number, lista: IPercursoDTO[]}>> {
        try {
            const listaResultadoPercursos = await this.percursoRepo.findPagina(pag, num, orig, dest);

            if (listaResultadoPercursos.lista === null || listaResultadoPercursos.count === 0) 
                return Result.fail("Não foram encontrados percursos...");
            
            let listaPercursosDTO: IPercursoDTO[] = [];

            listaResultadoPercursos.lista.forEach(percurso => {
                listaPercursosDTO.push(PercursoMap.toDTO( percurso ));
            });
            
            return Result.ok( { count: listaResultadoPercursos.count, lista: listaPercursosDTO} );
        } catch ( e ) {
            throw e;
        }
    }
}
