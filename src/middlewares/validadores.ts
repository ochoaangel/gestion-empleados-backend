import type { Request, Response, NextFunction } from 'express';
import { check, validationResult } from 'express-validator';

export const validarRegistro = [
  check('email').isEmail().withMessage('El email no es válido'),
  check('nombre').notEmpty().withMessage('El nombre es requerido'),
  check('apellido').notEmpty().withMessage('El apellido es requerido'),
  check('fechaNacimiento').isISO8601().toDate().withMessage('La fecha de nacimiento debe ser una fecha válida'),
  check('puestoTrabajo').notEmpty().withMessage('El puesto de trabajo es requerido'),
  check('tipoContrato').notEmpty().withMessage('El tipo de contrato es requerido'),
  check('fechaInicioContrato').isISO8601().toDate().withMessage('La fecha de inicio del contrato debe ser una fecha válida'),
  (req: Request, res: Response, next: NextFunction) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];

export const validarActualizacion = [
  check('email').optional().isEmail().withMessage('El email no es válido'),
  check('nombre').optional().notEmpty().withMessage('El nombre no puede estar vacío'),
  check('apellido').optional().notEmpty().withMessage('El apellido no puede estar vacío'),
  check('fechaNacimiento').optional().isISO8601().toDate().withMessage('La fecha de nacimiento debe ser una fecha válida'),
  check('puestoTrabajo').optional().notEmpty().withMessage('El puesto de trabajo no puede estar vacío'),
  check('status').optional().isIn(['activo', 'baja']).withMessage('El status debe ser "activo" o "baja"'),
  check('tipoContrato').optional().notEmpty().withMessage('El tipo de contrato no puede estar vacío'),
  check('fechaInicioContrato').optional().isISO8601().toDate().withMessage('La fecha de inicio del contrato debe ser una fecha válida'),
  check('fechaFinContrato').optional().isISO8601().toDate().withMessage('La fecha de fin del contrato debe ser una fecha válida'),
  (req: Request, res: Response, next: NextFunction) => {
    const errores = validationResult(req);
    if (!errores.isEmpty()) {
      return res.status(400).json({ errores: errores.array() });
    }
    next();
  },
];
