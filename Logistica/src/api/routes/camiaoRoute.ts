import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ICamiaoController from '../../controllers/IControllers/ICamiaoController'; 

import config from "../../../config";
import CamiaoController from '../../controllers/camiaoController';
import { authenticateToken } from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
    app.use((req, res, next) => { 
        authenticateToken(req, res, next); 
	});
    
    app.use('/camiao', route);
    
    const ctrl = Container.get(config.controllers.camiao.name) as ICamiaoController;

    route.post('',
    celebrate({
        body: Joi.object({
            id: Joi.string().required(),
            tara: Joi.number().required(),
            capacidadeCargaTotal: Joi.number().required(),
            camiaoBateria: Joi.number().required(),
            autonomiaCamiao: Joi.number().required(),
            carregamentoLento: Joi.number().required(),
            carregamentoRapido: Joi.number().required(),
            ativo: Joi.boolean().required()
        })
    }),
    (req, res, next) => ctrl.createCamiao(req, res, next));

    route.put('',
    celebrate({
        body: Joi.object({
            id: Joi.string().required(),
            tara: Joi.number().required(),
            capacidadeCargaTotal: Joi.number().required(),
            camiaoBateria: Joi.number().required(),
            autonomiaCamiao: Joi.number().required(),
            carregamentoLento: Joi.number().required(),
            carregamentoRapido: Joi.number().required(),
            ativo: Joi.boolean().required()
        }),
    }),
    (req, res, next) => ctrl.updateCamiao(req,res,next));

    route.patch('/inibir',
    celebrate({
        body:Joi.object({
            id: Joi.string().required(),
            tara: Joi.number().required(),
            capacidadeCargaTotal: Joi.number().required(),
            camiaoBateria: Joi.number().required(),
            autonomiaCamiao: Joi.number().required(),
            carregamentoLento: Joi.number().required(),
            carregamentoRapido: Joi.number().required(),
            ativo: Joi.boolean().required()
        }),
    }),
    (req,res,next) => ctrl.colocarCamiaoAtivo(req,res,next));

    route.get('', 
    function(req,res,next){ 
        ctrl.encontraTodosCamioes(req,res,next); 
    });

    route.get('/:id',
    function(req, res, next){ 
        console.log("asd");
        ctrl.getCamiao(req,res,next);  
    });  

    
    route.get('/ativos',
    function(req,res,next){
        ctrl.obterTodosAtivos(req,res,next);
    });
}