import { Repo } from "../../core/infra/Repo";
import { Rota } from "../../domain/planeamento/rota";
import { PlaneamentoRequest } from "../../domain/planeamento/planeamentoRequest";

export default interface IPlaneamentoRepo extends Repo<String> {
  calcularRota(planeamentoRequest: PlaneamentoRequest):  Promise<Rota>;
  calcularRotaFrota(planeamentoRequest: PlaneamentoRequest): Promise<Rota[]>;
  criarRota(rota: Rota): Promise<Rota>;
  obterRotaFixa(): Promise<Rota[]>;
  findPagina( pag: number, num: number,sortBy:string): Promise<{count: number, lista: Rota[]}>;
}