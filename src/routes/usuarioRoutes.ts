import { Router } from 'express';
import { obtenerUsuarios, obtenerUsuario, actualizarUsuario, eliminarUsuario, actualizarPerfilEmpleado } from '../controllers/usuarioController.js';
import { iniciarSesion, registrar } from '../controllers/autenticacionController.js';
import { autenticar } from '../middlewares/auth.js';
import { autorizar, autorizarEmpleadoPropio } from '../middlewares/autorizacion.js';
import { validarRegistro } from '../middlewares/validadores.js';

const router = Router();

router.post('/login', iniciarSesion);
router.post('/registro', validarRegistro, autenticar, autorizar(['usuario']), registrar);
router.get('/', autenticar, autorizar(['usuario']), obtenerUsuarios);
router.get('/:id', autenticar, autorizarEmpleadoPropio, obtenerUsuario);
router.put('/:id', autenticar, autorizar(['usuario']), actualizarUsuario);
router.delete('/:id', autenticar, autorizarEmpleadoPropio, eliminarUsuario);
router.put('/perfil/empleado', autenticar, autorizarEmpleadoPropio, actualizarPerfilEmpleado);

export default router;