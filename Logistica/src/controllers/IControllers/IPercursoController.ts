import { Request, Response, NextFunction } from 'express';

export default interface IPercursoController  {
  criarPercurso(req: Request, res: Response, next: NextFunction);
  editarPercurso(req: Request, res: Response, next: NextFunction);
  listarTodosPercursos(req: Request, res: Response, next: NextFunction);
  listarPercursoPorId(req: Request, res: Response, next: NextFunction);
  listarPercursoPorArmazens(req: Request, res: Response, next: NextFunction);
  listarPaginaPercursos(req: Request, res: Response, next: NextFunction)
}