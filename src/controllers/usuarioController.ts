import type { Request, Response } from 'express';
import Usuario from '../models/Usuario.js';


export const obtenerUsuarios = async (req: Request, res: Response) => {
  try {
    const { pagina = 1, limite = 10, busqueda, sortField = 'fechaRegistro', sortOrder = 'desc', ...filtros } = req.query;
    const opciones = {
      page: Number(pagina),
      limit: Number(limite),
      sort: { [sortField as string]: sortOrder === 'asc' ? 1 : -1 }
    };

    let query: any = {};

    if (busqueda) {
      query.$or = [
        { nombre: { $regex: busqueda, $options: 'i' } },
        { apellido: { $regex: busqueda, $options: 'i' } },
        { email: { $regex: busqueda, $options: 'i' } }
      ];
    }

    Object.keys(filtros).forEach(key => {
      query[key] = filtros[key]; 
    });

    const usuarios = await Usuario.paginate(query, opciones);
    res.json(usuarios);
  } catch (error) {
    console.log('Error: '+error)
    res.status(500).json({ mensaje: 'Error al obtener usuarios' });
  }
};

export const obtenerUsuario = async (req: Request, res: Response) => {
  try {
    const usuario = await Usuario.findById(req.params.id);
    if (!usuario) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuario);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al obtener usuario', error });
  }
};

export const actualizarUsuario = async (req: Request, res: Response) => {
  try {
    const usuarioActualizado = await Usuario.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar usuario', error });
  }
};

export const eliminarUsuario = async (req: Request, res: Response) => {
  try {
    if (req.usuario?.rol === 'empleado' || req.usuario?.rol === 'usuario') {
      const usuarioActualizado = await Usuario.findByIdAndUpdate(
        req.params.id,
        { status: 'baja' },
        { new: true }
      );
      if (!usuarioActualizado) {
        return res.status(404).json({ mensaje: 'Usuario no encontrado' });
      }
      return res.json({ mensaje: 'Usuario dado de baja exitosamente' });
    }
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al dar de baja al usuario', error });
  }
};

export const actualizarPerfilEmpleado = async (req: Request, res: Response) => {
  try {
    const { puestoTrabajo, status } = req.body;
    const userId = req.usuario?.rol === 'empleado' ? req.usuario.id : req.params.id;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(
      userId,
      { puestoTrabajo, status },
      { new: true }
    );

    if (!usuarioActualizado) {
      return res.status(404).json({ mensaje: 'Usuario no encontrado' });
    }
    res.json(usuarioActualizado);
  } catch (error) {
    res.status(500).json({ mensaje: 'Error al actualizar perfil', error });
  }
};