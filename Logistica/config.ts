import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb://mongoadmin:dfb6be522bcc185b1a763b10@vs649.dei.isep.ipp.pt:27017/?authMechanism=DEFAULT",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my EletricGO sakdfho2390asjod$%jl)!sdjas0i secret",

  google_client_id: "564915164450-16lj57fujl12a5sk4u1fejd0hj2mki00.apps.googleusercontent.com",
  
  jwtToken: process.env.JWT_TOKEN || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjUsInByaW1laXJvTm9tZSI6IkNyaXN0w7N2w6NvIiwidWx0aW1vTm9tZSI6IlNhbXBhaW8iLCJlbWFpbCI6ImNyaXN0b3Zhb2dtc2FtcGFpbzBAZ21haWwuY29tIiwidGVsZW1vdmVsIjoiOTMzNzk2MzI2Iiwicm9sZSI6IkFkbWluaXN0cmFkb3IiLCJpYXQiOjE2NzMxMTQxNzksImV4cCI6MTY3MzcxODk3OX0.Vp-axlJWHrxlK8QoZbOE9vXHLwXpanyX1QrDuKoTgok",
  
  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  gestao_armazens_url: "https://localhost:5001",
  planeamento_url: "http://vs556.dei.isep.ipp.pt:7000",

  controllers: {
    auth: {
      name: "AuthController",
      path: "../controllers/authController"
    },
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    camiao: {
      name: "CamiaoController",
      path: "../controllers/camiaoController"
    },
    percurso: {
      name: "PercursoController",
      path: "../controllers/percursoController"
    },
    enpacotamento: {
      name: "EnpacotamentoController",
      path: "../controllers/enpacotamentoController"
    },
    planeamento: {
      name: "PlaneamentoController",
      path: "../controllers/planeamentoController"
    },
    user: {
      name: "UserController",
      path: "../controllers/userController"
    },
  },

  repos: {
    auth: {
      name: "AuthRepo",
      path: "../repos/authRepo"
    },
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    },
    camiao: {
      name: "CamiaoRepo",
      path: "../repos/camiaoRepo"
    },
    percurso: {
      name: "PercursoRepo",
      path: "../repos/percursoRepo"
    },
    enpacotamento: {
      name: "EnpacotamentoRepo",
      path: "../repos/enpacotamentoRepo"
    },
    armazem: {
      name: "ArmazemRepo",
      path: "../repos/armazemRepo"
    },
    entrega: {
      name: "EntregaRepo",
      path: "../repos/entregaRepo"
    },
    planeamento : {
      name: "PlaneamentoRepo",
      path: "../repos/planeamentoRepo"
    }
  },

  services: {
    auth: {
      name: "AuthService",
      path: "../services/authService"
    },
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    camiao: {
      name: "CamiaoService",
      path: "../services/camiaoService"
    },
    percurso: {
      name: "PercursoService",
      path: "../services/percursoService"
    },
    enpacotamento: {
      name: "EnpacotamentoService",
      path: "../services/enpacotamentoService"
    },
    planeamento: {
      name: "PlaneamentoService",
      path: "../services/planeamentoService"
    },
    user: {
      name: "UserService",
      path: "../services/userService"
    },
  },
};
