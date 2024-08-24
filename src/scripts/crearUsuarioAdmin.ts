import dotenv from 'dotenv';
import conectarBaseDeDatos from '../config/database.js';
import Usuario from '../models/Usuario.js';

dotenv.config();

const crearUsuarioAdmin = async () => {
  try {
    await conectarBaseDeDatos();
    
    const usuarioAdmin = await Usuario.findOne({ email: process.env.LOGIN_ADMIN_USER });
    
    if (!usuarioAdmin) {
      const nuevoAdmin = new Usuario({
        email: process.env.LOGIN_ADMIN_USER,
        clave: process.env.LOGIN_ADMIN_PASS, 
        nombre: 'Admin',
        apellido: 'Usuario',
        fechaNacimiento: new Date('1983-10-23'),
        puestoTrabajo: 'product manager',
        tipoContrato: 'Tiempo completo',
        fechaInicioContrato: new Date(),
        rol: 'usuario'
      });

      await nuevoAdmin.save();
      console.log('Usuario administrador creado exitosamente');
    } else {
      console.log('El usuario administrador ya existe');
    }

    process.exit(0);
  } catch (error) {
    console.error('Error al crear usuario administrador:', error);
    process.exit(1);
  }
};

crearUsuarioAdmin();