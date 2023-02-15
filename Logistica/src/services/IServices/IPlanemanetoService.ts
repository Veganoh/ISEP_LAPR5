import { Result } from "../../core/logic/Result";
import IPlaneamentoRequestDTO from "../../dto/IPlanemanetoRequestDTO";
import IRotaDTO from "../../dto/IRotaDTO";

export default interface IPlaneamentoService  {
  obterRota( planeamentoRequest: IPlaneamentoRequestDTO ): Promise<Result<IRotaDTO>>;
  obterRotaFrota(planeamentoRequest: IPlaneamentoRequestDTO): Promise<Result<IRotaDTO[]>>
  persistirRota( planeamentoRequest: IRotaDTO ): Promise<Result<IRotaDTO>>;
  obterRotaFixa(): Promise<Result<IRotaDTO[]>>;
  listarPaginaViagens ( pag: number, num: number,sortBy:string): Promise<Result<{count: number, lista: IRotaDTO[]}>>; 
}
