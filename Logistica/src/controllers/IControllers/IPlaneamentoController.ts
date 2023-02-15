import { Request, Response, NextFunction } from 'express';

export default interface IPlaneamentoController  {
  obterPlaneamento(req: Request, res: Response, next: NextFunction);
  obterPlaneamentoFrota(req: Request, res: Response, next: NextFunction);
  persistirPlaneamento(req: Request, res: Response, next: NextFunction);
  obterRotaFixa(req: Request, res: Response, next: NextFunction);
  listarPaginaRotas(req: Request, res: Response, next: NextFunction);
}