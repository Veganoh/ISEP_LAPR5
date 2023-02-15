import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import { Result } from "../core/logic/Result";
import IPlaneamentoController from './IControllers/IPlaneamentoController';
import IPlaneamentoService from '../services/IServices/IPlanemanetoService';
import IPlaneamentoRequestDTO from '../dto/IPlanemanetoRequestDTO';
import IRotaDTO from '../dto/IRotaDTO';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class PlaneamentoController implements IPlaneamentoController /* TODO: extends ../core/infra/BaseController */ {
    constructor(
      @Inject(config.services.planeamento.name) private planeamentoServiceInstance : IPlaneamentoService
    ) {}
    
  
  
    public async obterPlaneamento(req: Request, res: Response, next: NextFunction) {
        try {
            const percursoOrError = await this.planeamentoServiceInstance.obterRota(req.body as IPlaneamentoRequestDTO) as Result<IRotaDTO>;
              
            if (percursoOrError.isFailure) {
              return res.status(402).send( percursoOrError.error );
            }
      
            const percursoDTO = percursoOrError.getValue();
            return res.json( percursoDTO ).status(201);
          }
          catch (e) {
            return next(e);
          }
    }

    public async obterPlaneamentoFrota(req: Request, res: Response, next: NextFunction) {
      try {
          const percursoOrError = await this.planeamentoServiceInstance.obterRotaFrota(req.body as IPlaneamentoRequestDTO) as Result<IRotaDTO[]>;
            
          if (percursoOrError.isFailure) {
            return res.status(402).send( percursoOrError.error );
          }
    
          const percursoDTO = percursoOrError.getValue();
          return res.json( percursoDTO ).status(201);
        }
        catch (e) {
          return next(e);
        }
  }

  public async persistirPlaneamento(req: Request, res: Response, next: NextFunction) {
    try {
        const rotaOrError = await this.planeamentoServiceInstance.persistirRota(req.body as IRotaDTO) as Result<IRotaDTO>;
          
        if (rotaOrError.isFailure) {
          console.log(  rotaOrError.error );
          return res.status(402).send( rotaOrError.error );
        }
  
        const rotaDTO = rotaOrError.getValue();
        return res.json( rotaDTO ).status(201);
      }
      catch (e) {
        return next(e);
      }
  }

  public async obterRotaFixa(req: Request, res: Response, next: NextFunction) {
    try{
      let rotaOrError = await this.planeamentoServiceInstance.obterRotaFixa() as Result<IRotaDTO[]>;

      if(rotaOrError.isFailure){
          return res.status(404).send(rotaOrError.error.toString());
      }

      const camiaoDTO = rotaOrError.getValue();
      res.json(camiaoDTO).status(202);

      }catch(e){
          return next(e);
      }
  }

  public async listarPaginaRotas(req: Request, res: Response, next: NextFunction) {
    try {
      const rotaOrError = await this.planeamentoServiceInstance.listarPaginaViagens(Number(req.query.pag), Number(req.query.num),req.query.ord as string) as Result<{count: number, lista: IRotaDTO[]}>;

      if ( rotaOrError.isFailure )
        return res.status( 404 ).send( rotaOrError.error );
        
      const percursoDTO = rotaOrError.getValue();
      return res.json( percursoDTO ).status( 202 ); 
    } catch ( e ) {
      return next( e );
    }
  }
}