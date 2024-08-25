import type { Request, Response, NextFunction } from 'express';

export const autorizar = (rolesPermitidos: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.usuario) {
      return res.status(401).json({ mensaje: 'No autorizado' });
    }

    if (rolesPermitidos.includes(req.usuario.rol)) {
      return next();
    }

    res.status(403).json({ mensaje: 'No tienes permiso para realizar esta acción' });
  };
};

export const autorizarEmpleadoPropio = (req: Request, res: Response, next: NextFunction) => {
  if (!req.usuario) {
    return res.status(401).json({ mensaje: 'No autorizado' });
  }

  if (req.usuario.rol === 'usuario' || (req.usuario.rol === 'empleado' && req.usuario.id === req.params.id)) {
    return next();
  }

  res.status(403).json({ mensaje: 'No tienes permiso para realizar esta acción' });
};