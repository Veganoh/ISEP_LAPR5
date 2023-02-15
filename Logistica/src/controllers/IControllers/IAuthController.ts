import { Request, Response, NextFunction } from 'express';

export default interface IAuthController  {
  autenticarUtilizador(req: Request, res: Response, next: NextFunction);
}