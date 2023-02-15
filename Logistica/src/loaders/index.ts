import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';


export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const camiaoSchema = {
    // compare with the approach followed in repos and services
    name: 'camiaoSchema',
    schema: '../persistence/schemas/camiaoSchema',
  }

  const percursoSchema = {
    name: 'percursoSchema',
    schema: '../persistence/schemas/percursoSchema',
  }

  const enpacotamentoSchema = {
    name: 'enpacotamentoSchema',
    schema: '../persistence/schemas/enpacotamentoSchema',
  }

  const rotaSchema = {
    name: 'rotaSchema',
    schema: '../persistence/schemas/rotaSchema',
  }

  const userController = {
    name: config.controllers.user.name,
    path: config.controllers.user.path
  }

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const CamiaoController = {
    name: config.controllers.camiao.name,
    path: config.controllers.camiao.path
  }

  const percursoController = {
    name: config.controllers.percurso.name,
    path: config.controllers.percurso.path
  }

  const enpacotamentoController = {
    name: config.controllers.enpacotamento.name,
    path: config.controllers.enpacotamento.path
  }

  const planeamentoController = {
    name: config.controllers.planeamento.name,
    path: config.controllers.planeamento.path
  } 

  const authController = {
    name: config.controllers.auth.name,
    path: config.controllers.auth.path
  } 


  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const authRepo = {
    name: config.repos.auth.name,
    path: config.repos.auth.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const camiaoRepo = {
    name: config.repos.camiao.name,
    path: config.repos.camiao.path
  }

  const percursoRepo = {
    name: config.repos.percurso.name,
    path: config.repos.percurso.path
  }

  const enpacotamentoRepo = {
    name: config.repos.enpacotamento.name,
    path: config.repos.enpacotamento.path
  }

  const armazemRepo = {
    name: config.repos.armazem.name,
    path: config.repos.armazem.path
  }

  const entregaRepo = {
    name: config.repos.entrega.name,
    path: config.repos.entrega.path
  }

  const planeamentoRepo = {
    name: config.repos.planeamento.name,
    path: config.repos.planeamento.path
  }


  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const authService = {
    name: config.services.auth.name,
    path: config.services.auth.path
  }

  const userService = {
    name: config.services.user.name,
    path: config.services.user.path
  }

  const camiaoService = {
    name: config.services.camiao.name,
    path: config.services.camiao.path
  }

  const percursoService = {
    name: config.services.percurso.name,
    path: config.services.percurso.path
  }

  const enpacotamentoService = {
    name: config.services.enpacotamento.name,
    path: config.services.enpacotamento.path
  }

  const planeamentoService = {
    name: config.services.planeamento.name,
    path: config.services.planeamento.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      camiaoSchema,
      percursoSchema,
      enpacotamentoSchema,
      rotaSchema
    ],
    controllers: [
      authController,
      roleController,
      CamiaoController,
      percursoController,
      enpacotamentoController,
      planeamentoController,
      userController,
    ],
    repos: [
      authRepo,
      roleRepo,
      userRepo,
      camiaoRepo,
      percursoRepo,
      enpacotamentoRepo,
      armazemRepo,
      entregaRepo,
      planeamentoRepo
    ],
    services: [
      authService,
      userService,
      roleService,
      camiaoService,
      percursoService,
      enpacotamentoService,
      planeamentoService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
