import { application, Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPercursoController from '../../controllers/IControllers/IPercursoController'; 

import config from "../../../config";
import { authenticateToken } from '../middlewares/isAuth';

const route = Router();

export default (app: Router) => {
  app.use((req, res, next) => { 
		authenticateToken(req, res, next); 
	});

  app.use('/percursos', route);

  const ctrl = Container.get(config.controllers.percurso.name) as IPercursoController;

  route.post('',
    celebrate({
      body: Joi.object({
        domainId: Joi.number(),
        armazemOrigem: Joi.string().required(),
        armazemDestino: Joi.string().required(),
        distancia: Joi.number().required(),
        tempoBase: Joi.number().required(),
        tempoExtra: Joi.number().required(),
        energiaGasta: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.criarPercurso(req, res, next) );

    route.put('',
    celebrate({
      body: Joi.object({
        domainId: Joi.number(),
        armazemOrigem: Joi.string().required(),
        armazemDestino: Joi.string().required(),
        distancia: Joi.number(),
        tempoBase: Joi.number(),
        tempoExtra: Joi.number(),
        energiaGasta: Joi.number()
      })
    }),
    (req, res, next) => ctrl.editarPercurso(req, res, next) );

    route.get('', (req, res, next) =>
      ctrl.listarTodosPercursos(req, res, next)
    );  

    route.get('/armazens', (req, res, next) =>
      ctrl.listarPercursoPorArmazens(req, res, next)
    );  

    route.get('/pagina', (req, res, next) =>
      ctrl.listarPaginaPercursos(req, res, next)
    );

    route.get('/:id', (req, res, next) =>
      ctrl.listarPercursoPorId(req, res, next)
    ); 
};

