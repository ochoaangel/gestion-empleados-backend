import nodemailer from 'nodemailer';

export const enviarCorreo = async (para: string, asunto: string, contenido: string, adjunto: Buffer): Promise<void> => {
      const transporter = nodemailer.createTransport({
          secure: true,
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT),
          auth: {
              user: process.env.SMTP_USER,
              pass: process.env.SMTP_PASS,
            },
          });
  try {
    await transporter.sendMail({
      from: `"Gestión de Empleados" <${process.env.SMTP_USER}>`,
      to: para,
      subject: asunto,
      html: contenido,
      attachments: [
        {
          filename: 'Carta_de_Contratacion.pdf',
          content: adjunto,
          contentType: 'application/pdf'
        }
      ]
    });
    console.log('Correo enviado exitosamente');
  } catch (error) {
    console.error('Error al enviar correo:', error);
  }
};
