import type { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import Usuario from '../models/Usuario.js';
import { enviarCorreo } from '../services/emailService.js';
import { generarClaveAleatoria } from '../utils/generadores.js';
import { generarPDF } from '../services/pdfService.js';


export const registrar = async (req: Request, res: Response) => {
  try {
    const { email, nombre, apellido, fechaNacimiento, puestoTrabajo, tipoContrato, fechaInicioContrato } = req.body;

    // Verificar si el usuario ya existe
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) {
      return res.status(400).json({ mensaje: 'El usuario ya existe' });
    }

    const claveGenerada = generarClaveAleatoria();

    const nuevoUsuario = new Usuario({
      email,
      clave: claveGenerada,
      nombre,
      apellido,
      fechaNacimiento,
      puestoTrabajo,
      tipoContrato,
      fechaInicioContrato,
      rol: 'empleado'
    });

    await nuevoUsuario.save();

    // Generar PDF
    const pdfData = await generarPDF({ email, nombre, apellido, fechaNacimiento, puestoTrabajo, tipoContrato, fechaInicioContrato });

    // Contenido del correo
    const contenidoCorreo = `
      <p>Estimado/a ${nombre} ${apellido},</p>
      <p>Nos complace darle la bienvenida a nuestra empresa. A continuación, encontrará las credenciales para iniciar sesión en su nueva cuenta en nuestra empresa:</p>
      <ul>
        <li><strong>Usuario:</strong> ${email}</li>
        <li><strong>Clave inicial:</strong> ${claveGenerada}</li>
      </ul>
      <p>Adjunto encontrará su carta de contratación con más detalles.</p>
      <p>Atentamente,</p>
      <p><strong>El equipo de Recursos Humanos</strong></p>
    `;

    // Enviar correo con PDF adjunto
    await enviarCorreo(email, 'Bienvenido a la empresa', contenidoCorreo, pdfData);

    res.status(201).json({ mensaje: 'Usuario registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al registrar usuario' });
  }
};

export const iniciarSesion = async (req: Request, res: Response) => {
  //   console.log('Iniciando proceso de login');
  try {
    const { email, clave } = req.body;
    //   console.log(`Intento de login para el email: ${email}`);

    const usuario = await Usuario.findOne({ email });
    if (!usuario) {
      //   console.log(`Usuario no encontrado para el email: ${email}`);
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }
    if (usuario.status === 'baja') {
      //   console.log(`Usuario con estado de baja, no puede iniciar sesiòn`);
      return res.status(401).json({ mensaje: 'Usuario de baja' });
    }

    //   console.log('Usuario encontrado, verificando clave');
    const claveValida = await usuario.compararClave(clave);
    if (!claveValida) {
      //   console.log('Clave incorrecta');
      return res.status(401).json({ mensaje: 'Credenciales inválidas' });
    }

    //   console.log('Clave correcta, generando token');
    const token = jwt.sign(
      { 
        id: usuario._id, 
        email: usuario.email, 
        rol: usuario.rol 
      },
      process.env.JWT_SECRET as string,
      { expiresIn: '1h' }
    );

    //   console.log('Login exitoso');
    res.json({ token, rol: usuario.rol });
  } catch (error) {
    console.error('Error en el proceso de login:', error);
    res.status(500).json({ mensaje: 'Error al iniciar sesión', error });
  }
};