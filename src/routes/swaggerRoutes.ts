import express from 'express';
import YAML from 'yamljs';
import path from 'path';
import { getDirname } from '../utils/getDirname.js';

const router = express.Router();
const __dirname = getDirname(import.meta.url);

// Ruta para servir el archivo JSON
router.get('/swagger.json', (req, res) => {
  const swaggerJsonPath = path.join(__dirname, '../../swagger.yaml');
  const swaggerJson = YAML.load(swaggerJsonPath);
  res.json(swaggerJson);
});

export default router;
