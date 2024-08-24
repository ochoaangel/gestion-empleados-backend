import type { Document, PaginateModel } from 'mongoose';
import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import mongoosePaginate from 'mongoose-paginate-v2';

export interface IUsuario extends Document {
  email: string;
  clave: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  puestoTrabajo: string;
  status: 'activo' | 'baja';
  tipoContrato: string;
  fechaInicioContrato: Date;
  fechaFinContrato?: Date;
  fechaRegistro: Date;
  rol: 'usuario' | 'empleado';
  compararClave(clave: string): Promise<boolean>;
}

const usuarioSchema = new Schema<IUsuario>({
  email: { type: String, required: true, unique: true },
  clave: { type: String, required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  puestoTrabajo: { type: String, required: true },
  status: { type: String, enum: ['activo', 'baja'], default: 'activo' },
  tipoContrato: { type: String, required: true },
  fechaInicioContrato: { type: Date, required: true },
  fechaFinContrato: { type: Date },
  fechaRegistro: { type: Date, default: Date.now },
  rol: { type: String, enum: ['usuario', 'empleado'], default: 'empleado' }
});

usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('clave')) return next();
  const salt = await bcrypt.genSalt(10);
  this.clave = await bcrypt.hash(this.clave, salt);
  next();
});

usuarioSchema.methods.compararClave = async function(clave: string): Promise<boolean> {
  return bcrypt.compare(clave, this.clave);
};

// Se aplica el plugin de paginación
usuarioSchema.plugin(mongoosePaginate);

const Usuario = mongoose.model<IUsuario, PaginateModel<IUsuario>>('Usuario', usuarioSchema);

export default Usuario;
