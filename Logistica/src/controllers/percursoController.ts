import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import IPercursoController from "./IControllers/IPercursoController";
import IPercursoService from '../services/IServices/IPercursoService';
import IPercursoDTO from '../dto/IPercursoDTO';

import { Result } from "../core/logic/Result";

@Service()
export default class PercursoController implements IPercursoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.percurso.name) private percursoServiceInstance : IPercursoService
  ) {}

  public async criarPercurso(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.criarPercurso(req.body as IPercursoDTO) as Result<IPercursoDTO>;
        
      if (percursoOrError.isFailure) {
        return res.status(402).send( percursoOrError.error );
      }

      const percursoDTO = percursoOrError.getValue();
      return res.json( percursoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };

  public async editarPercurso(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.editarPercurso(req.body as IPercursoDTO) as Result<IPercursoDTO>;

      if (percursoOrError.isFailure) {
        return res.status(404).send( percursoOrError.error );
      }

      const percursoDTO = percursoOrError.getValue();
      return res.json( percursoDTO ).status(201);
    }
    catch (e) {
      console.log(e);
      return next(e);
    }
  }
  
  public async listarTodosPercursos(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.listarTodosPercursos() as Result<IPercursoDTO[]>;

      if ( percursoOrError.isFailure )
        return res.status( 404 ).send( percursoOrError.error.toString() );
        
      const percursoDTOList = percursoOrError.getValue();
      return res.json( percursoDTOList ).status( 202 ); 
    } catch ( e ) {
      return next( e );
    }
  }

  public async listarPercursoPorId(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.listarPercursoPorId(req.params.id as unknown as number) as Result<IPercursoDTO>;

      if ( percursoOrError.isFailure )
        return res.status( 404 ).send( percursoOrError.error );
        
      const percursoDTO = percursoOrError.getValue();

      return res.json( percursoDTO ).status( 202 );
    } catch ( e ) {
      return next( e );
    }
  }

  public async listarPercursoPorArmazens(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.listarPercursoPorArmazens(req.query.origem as string, req.query.destino as string) as Result<IPercursoDTO>;

      if ( percursoOrError.isFailure )
        return res.status( 404 ).send( percursoOrError.error );
        
      const percursoDTO = percursoOrError.getValue();
      return res.json( percursoDTO ).status( 202 ); 
    } catch ( e ) {
      return next( e );
    }
  }

  public async listarPaginaPercursos(req: Request, res: Response, next: NextFunction) {
    try {
      const percursoOrError = await this.percursoServiceInstance.listarPaginaPercursos(Number(req.query.pag), Number(req.query.num), req.query.orig as string, req.query.dest as string) as Result<{count: number, lista: IPercursoDTO[]}>;

      if ( percursoOrError.isFailure )
        return res.status( 404 ).send( percursoOrError.error );
        
      const percursoDTO = percursoOrError.getValue();
      return res.json( percursoDTO ).status( 202 ); 
    } catch ( e ) {
      return next( e );
    }
  }
}