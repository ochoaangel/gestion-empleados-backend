import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface DecodedToken {
  id: string;
  rol: string;
}

declare global {
  namespace Express {
    interface Request {
      usuario?: DecodedToken;
    }
  }
}

export const autenticar = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ mensaje: 'No se proporcionó token de autenticación' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
    (req as any).usuario = decoded;
    next();
  } catch (error) {
    console.error(error);
    res.status(401).json({ mensaje: 'Token inválido' });
  }
};
