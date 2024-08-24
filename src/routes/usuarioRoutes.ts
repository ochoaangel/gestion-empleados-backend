import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario, actualizarPerfilEmpleado } from '../controllers/usuarioController.js';
import { iniciarSesion } from '../controllers/autenticacionController.js';

const router = Router();
console.log('Configurando rutas de usuario');

router.post('/login', (req, res, next) => {
    console.log('Recibida solicitud de login');
    next();
  }, iniciarSesion);
router.get('/', obtenerUsuarios);
router.get('/:id', obtenerUsuario);
router.put('/:id', actualizarUsuario);
router.delete('/:id', eliminarUsuario);
router.put('/perfil', actualizarPerfilEmpleado);

export default router;
