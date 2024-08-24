import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export const enviarCorreo = async (para: string, asunto: string, contenido: string): Promise<void> => {
    try {
      await transporter.sendMail({
        from: `"Gestión de Empleados" <${process.env.SMTP_USER}>`,
        to: para,
        subject: asunto,
        text: contenido,
      });
      console.log('Correo enviado exitosamente');
    } catch (error) {
      console.error('Error al enviar correo:', error);
    }
  };