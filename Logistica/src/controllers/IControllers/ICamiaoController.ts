import { Request, Response, NextFunction } from 'express';

export default interface ICamiaoController {
    createCamiao(req: Request, res: Response, next: NextFunction);
    updateCamiao(req: Request, res: Response, next: NextFunction);
    encontraTodosCamioes(req: Request, res: Response, next: NextFunction);
    obterTodosAtivos(req: Request, res: Response, next: NextFunction);
    getCamiao(req: Request, res: Response, next: NextFunction);
    colocarCamiaoAtivo(req: Request, res: Response, next: NextFunction);
}