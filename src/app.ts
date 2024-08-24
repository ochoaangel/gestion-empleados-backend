import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import usuarioRoutes from './routes/usuarioRoutes.js';
import { getDirname } from './utils/getDirname.js';
import swaggerRoutes from './routes/swaggerRoutes.js';


const app = express();

// Middleware
app.use(cors());
app.use(helmet());
app.use(express.json());

console.log('Configurando rutas principales');

// Rutas
app.use('/api/usuarios', usuarioRoutes);
app.use('/', swaggerRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(YAML.load(path.join(getDirname(import.meta.url), '../swagger.yaml'))));


export default app;
