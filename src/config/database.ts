import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const conectarBaseDeDatos = async () => {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error('La URI de conexión a MongoDB no está definida en el archivo .env');
    }
    await mongoose.connect(uri);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error al conectar a MongoDB:', error);
    throw error;
  }
};

export default conectarBaseDeDatos;
