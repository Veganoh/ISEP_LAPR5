import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";
import IEnpacotamentoController from './IControllers/IEnpacotamentoController';
import IEnpacotamentoService from '../services/IServices/IEnpacotamentoService';
import IEnpacotamentoDTO  from '../dto/IEnpacotamentoDTO';
import { Result } from "../core/logic/Result";



@Service()
export default class EnpacotamentoController implements IEnpacotamentoController /* TODO: extends ../core/infra/BaseController */ {
  constructor(
      @Inject(config.services.enpacotamento.name) private enpacotamentoServiceInstance : IEnpacotamentoService
  ) {}

  public async criarEnpacotamento(req: Request, res: Response, next: NextFunction) {
    try {
      const EnpactoamentoOrError = await this.enpacotamentoServiceInstance.criarEnpacotamento(req.body as IEnpacotamentoDTO) as Result<IEnpacotamentoDTO>;
  
      if (EnpactoamentoOrError.isFailure) {
        return res.status(402).send(EnpactoamentoOrError.error);
      }

      const EnpacotamentoDTO = EnpactoamentoOrError.getValue();
      return res.json( EnpacotamentoDTO ).status(201);
    }
    catch (e) {
      return next(e);
    }
  };
  
  public async editarEnpacotamento(req: Request, res: Response, next: NextFunction){
    try{
      const EnpacotamementoOrError = await this.enpacotamentoServiceInstance.editarEnpacotamento(req.body as IEnpacotamentoDTO) as Result<IEnpacotamentoDTO>;

      if(EnpacotamementoOrError.isFailure){
        return res.status(404).send(EnpacotamementoOrError.error);
      }

      const EnpacotamentoDTO = EnpacotamementoOrError.getValue();
      return res.json( EnpacotamentoDTO ).status(201);
    }catch(e){
      return next(e);
    }
  }

  public async encontraEnpacotamento(req: Request, res: Response, next: NextFunction){
    try{
        const EnpacotamementoOrError = await this.enpacotamentoServiceInstance.encontraEnpacotamento(req.params.domainId as unknown as number) as Result<IEnpacotamentoDTO>;
     
        if(EnpacotamementoOrError.isFailure){
          return res.status(404).send(EnpacotamementoOrError.error);
      }
      
      const enpacotamentoDTO = EnpacotamementoOrError.getValue();
      
      return res.json( enpacotamentoDTO).status(202);
    } catch(e){
      return next(e);
    }
  }

  public async encontraTodosEnpacotamentos(req: Request, res: Response, next: NextFunction){
    try{
      const enpacotamentoOrError = await this.enpacotamentoServiceInstance.encontraTodosEnpacotamentos() as Result<IEnpacotamentoDTO[]>;

      if(enpacotamentoOrError.isFailure){
          return res.status(404).send(enpacotamentoOrError.error);
      }

      const enpacotamentoDTO = enpacotamentoOrError.getValue();
      return res.json(enpacotamentoDTO).status(202);
    } catch(e){
      return next(e);
    }
 
  }

  public async listarPaginaEnpacotamentos(req: Request, res: Response, next: NextFunction) {
    try{
      const enpacotamentoOrError = await this.enpacotamentoServiceInstance.listarPaginaEnpacotamentos(Number(req.query.pag)  , Number(req.query.num)) as Result<{count:number, lista: IEnpacotamentoDTO[]}>;

      if(enpacotamentoOrError.isFailure)
        return res.status(404).send(enpacotamentoOrError.error);

      const enpacotamentoDTO = enpacotamentoOrError.getValue();
      return res.json(enpacotamentoDTO).status(202);
    } catch(e){
      return next(e);
    }
  }
}