import { Request, Response, NextFunction } from 'express';

export default interface IEnpacotamentoController{
    criarEnpacotamento(req: Request, res: Response, next: NextFunction);
    editarEnpacotamento(req: Request, res: Response, next: NextFunction);
    encontraEnpacotamento(req: Request, res: Response, next: NextFunction);
    encontraTodosEnpacotamentos(req: Request, res: Response, next: NextFunction);
    listarPaginaEnpacotamentos(req: Request, res: Response, next: NextFunction);
}