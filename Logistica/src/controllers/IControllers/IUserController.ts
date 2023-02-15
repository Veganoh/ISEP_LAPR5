import { Request, Response, NextFunction } from 'express';

export default interface IUserController{
    criarUser(req: Request, res: Response, next: NextFunction);
    encontraUser(req: Request, res: Response, next: NextFunction);
    findAll(req: Request, res: Response, next: NextFunction);
    anonimizarUser(req: Request, res: Response, next: NextFunction);
}