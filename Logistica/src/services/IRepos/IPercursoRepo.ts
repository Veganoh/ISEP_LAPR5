import { Repo } from "../../core/infra/Repo";
import { Percurso } from "../../domain/percurso/percurso";
import { PercursoId } from "../../domain/percurso/percursoId";

export default interface IPercursoRepo extends Repo<Percurso> {
  save(Percurso: Percurso): Promise<Percurso>;
  findByDomainId (PercursoId: PercursoId | number): Promise<Percurso>;
  findAll(): Promise<Percurso[]>;
  findPagina( pag: number, num: number, orig: string, dest: string): Promise<{count: number, lista: Percurso[]}>;
  //findByIds (PercursosIds: PercursoId[]): Promise<Percurso[]>;
  findByArmazens( percursoArmazemOrigem : string, percursoArmazemDestino : string) : Promise<Percurso>;
  //saveCollection (Percursos: Percurso[]): Promise<Percurso[]>;
  //removeByPercursoIds (Percursos: PercursoId[]): Promise<any>
}