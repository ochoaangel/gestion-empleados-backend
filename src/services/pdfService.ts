import PDFDocument from 'pdfkit';
import { format } from 'date-fns';

interface DatosContrato {
  email: string;
  nombre: string;
  apellido: string;
  fechaNacimiento: string;
  puestoTrabajo: string;
  tipoContrato: string;
  fechaInicioContrato: string;
}


export const generarPDF = (datos: DatosContrato): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    let buffers: Buffer[] = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // Formatear fechas
    const fechaActual = format(new Date(), 'dd/MM/yyyy');
    const fechaNacimiento = format(new Date(datos.fechaNacimiento), 'dd/MM/yyyy');
    const fechaInicioContrato = format(new Date(datos.fechaInicioContrato), 'dd/MM/yyyy');

    // Crear contenido del PDF con estilo moderno
    doc.moveDown(2);
    doc.fontSize(12).font('Helvetica').text(fechaActual, { align: 'right' });
    doc.moveDown(2);
    doc.fontSize(18).font('Helvetica-Bold').text('Carta de Contratación', { align: 'center' });
    doc.moveDown(2);
    doc.fontSize(12).font('Helvetica').text(`Estimado/a ${datos.nombre} ${datos.apellido},`);
    doc.moveDown();
    doc.text(`   Nos complace informarle que ha sido seleccionado/a para el puesto de ${datos.puestoTrabajo} en nuestra empresa.`, { align: 'justify' });
    doc.moveDown();
    doc.text(`   A continuación, se detallan los términos de su contrato:`, { align: 'justify' });
    doc.moveDown();
    doc.text(`      Fecha de Nacimiento: ${fechaNacimiento}`);
    doc.text(`      Tipo de Contrato: ${datos.tipoContrato}`);
    doc.text(`      Fecha de Inicio del Contrato: ${fechaInicioContrato}`);
    doc.moveDown();
    doc.text(`   Podrá iniciar sesión en nuestro sistema utilizando su correo electrónico (${datos.email}) y la clave proporcionada.`, { align: 'justify' });
    doc.moveDown();
    doc.text(`   Le damos la bienvenida a nuestro equipo y esperamos tener una colaboración exitosa.`, { align: 'justify' });
    doc.moveDown();
    doc.text(`Atentamente,`);
    doc.text(`El equipo de Recursos Humanos`);
    doc.moveDown(5);

    // Líneas para firmas
    doc.text('    Empresa.com                                                           ', { align: 'center' });
    doc.text('________________________                      ________________________', { align: 'center' });
    doc.text(`    Empresa                                     ${datos.nombre} ${datos.apellido}      `, { align: 'center' });

    doc.end();
  });
};