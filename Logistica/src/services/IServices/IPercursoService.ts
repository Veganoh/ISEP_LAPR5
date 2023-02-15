import { Result } from "../../core/logic/Result";
import IPercursoDTO from "../../dto/IPercursoDTO";

export default interface IPercursoService  {
  criarPercurso( percursoDTO: IPercursoDTO ): Promise<Result<IPercursoDTO>>;
  editarPercurso( percursoDTO: IPercursoDTO ): Promise<Result<IPercursoDTO>>;
  listarTodosPercursos (): Promise<Result<IPercursoDTO[]>>;
  listarPercursoPorId ( percursoId: number ): Promise<Result<IPercursoDTO>>;
  listarPercursoPorArmazens ( armazemOrigem : string, armazemDestino : string): Promise<Result<IPercursoDTO>>;
  listarPaginaPercursos ( pag: number, num: number, orig: string, dest: string): Promise<Result<{count: number, lista: IPercursoDTO[]}>>; 
}
