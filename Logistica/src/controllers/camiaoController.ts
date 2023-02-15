import { Request, Response, NextFunction } from 'express';
import { Inject, Service } from 'typedi';
import config from "../../config";

import ICamiaoController from './IControllers/ICamiaoController';
import ICamiaoService from '../services/IServices/ICamiaoService';
import { ICamiaoDTO } from '../dto/ICamiaoDTO';

import { Result } from "../core/logic/Result";
import { BaseController } from '../core/infra/BaseController';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

@Service()
export default class CamiaoController implements ICamiaoController /*extends BaseController*/ {
    constructor(
        @Inject(config.services.camiao.name) private camiaoServiceInstance : ICamiaoService
    ) {}

    public async createCamiao(req: Request, res: Response, next: NextFunction) {
        try{
            const camiaoOrError = await this.camiaoServiceInstance.createCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

            if(camiaoOrError.isFailure){
                return res.status(402).send(camiaoOrError.error);
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.json( camiaoDTO ).status(201);
        }catch(e){
            return next(e);
        }
    };

    public async updateCamiao(req: Request, res: Response, next: NextFunction) {
        try{
            const camiaoOrError = await this.camiaoServiceInstance.updateCamiao(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

            if (camiaoOrError.isFailure){
                return res.status(404).send(camiaoOrError.error);
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.json( camiaoDTO ).status(201);
        }catch(e){
            return next(e);
        }
    };

    public async colocarCamiaoAtivo(req: Request, res: Response, next: NextFunction) {
        try{
            const camiaoOrError = await this.camiaoServiceInstance.colocarCamiaoAtivo(req.body as ICamiaoDTO) as Result<ICamiaoDTO>;

            if(camiaoOrError.isFailure){
                return res.status(404).send(camiaoOrError.error);
            }

            const camiaoDTO = camiaoOrError.getValue();
            return res.json( camiaoDTO ).status(201);
        }catch(e){
            return next(e);
        }
    }

    public async getCamiao(req: Request, res: Response, next: NextFunction) {
        try{
            const camiaoOrError = await this.camiaoServiceInstance.getCamiao(req.params.id as string) as Result<ICamiaoDTO>;
            
            
            if(camiaoOrError.isFailure){
                return res.status(404).send(camiaoOrError.error.toString());
            }
            
            const camiaoDTO = camiaoOrError.getValue();
            res.json(camiaoDTO).status(202);
        }catch(e){
            return next(e);
        }
    }

    public async encontraTodosCamioes(req: Request, res: Response, next: NextFunction) {
        try{
            let camiaoOrError = await this.camiaoServiceInstance.encontraTodosCamioes() as Result<ICamiaoDTO[]>;

            if(camiaoOrError.isFailure){
                return res.status(404).send(camiaoOrError.error.toString());
            }

            const camiaoDTO = camiaoOrError.getValue();
            res.json(camiaoDTO).status(202);

        }catch(e){
            return next(e);
        }
    }

    public async obterTodosAtivos(req: Request, res: Response, next: NextFunction) {
        try{
            let camiaoOrError = await this.camiaoServiceInstance.obterTodosAtivos() as Result<ICamiaoDTO[]>;

            if(camiaoOrError.isFailure){
                return res.status(404).send(camiaoOrError.error.toString());
            }

            const camiaoDTO = camiaoOrError.getValue();
            res.json(camiaoDTO).status(202);

        }catch(e){
            return next(e);
        }
    }
}