import { Result } from "../../core/logic/Result";
import  IEnpacotamentoDTO  from "../../dto/IEnpacotamentoDTO";

export default interface IEnpacotamentoService {
    criarEnpacotamento(EnpacotamentoDTO: IEnpacotamentoDTO): Promise<Result<IEnpacotamentoDTO>>;
    editarEnpacotamento(EnpacotamentoDTO: IEnpacotamentoDTO): Promise<Result<IEnpacotamentoDTO>>;
    encontraEnpacotamento(id: number): Promise<Result<IEnpacotamentoDTO>>;
    encontraTodosEnpacotamentos(): Promise<Result<IEnpacotamentoDTO[]>>;
    listarPaginaEnpacotamentos(pag: number, num: number): Promise<Result<{count: number, lista: IEnpacotamentoDTO[]}>>;
}