import { Result } from "../../core/logic/Result";
import { ICamiaoDTO } from "../../dto/ICamiaoDTO";

export default interface ICamiaoService  {
    createCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    updateCamiao(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    obterTodosAtivos(): Promise<Result<ICamiaoDTO[]>>;
    encontraTodosCamioes(): Promise<Result<ICamiaoDTO[]>>;
    colocarCamiaoAtivo(camiaoDTO: ICamiaoDTO): Promise<Result<ICamiaoDTO>>;
    getCamiao (camiaoId: string): Promise<Result<ICamiaoDTO>>;
  }