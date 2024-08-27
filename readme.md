# Gestión de Empleados Backend

Este proyecto es una aplicación web para la gestión de empleados

## Características

- Autenticación de usuarios (login/logout) con JWT
- Gestión de perfiles de empleados
- Listado de empleados

## Requisitos previos

- Node.js (versión compatible con Angular 18)

## Instalación

1. Clona el repositorio:git clone https://github.com/tu-usuario/gestion-empleados-backend.git
2. Navega al directorio del proyecto: cd gestion-empleados-backend
3. Copia el archivo .envExample y renombralo a .env
4. Edita las variables de entorno, parecidas a estas:

PORT=3000

MONGODB_URI=mongodb://127.0.0.1:27017/gestion_empleados

LOGIN_ADMIN_USER=ochoaangel@gmail.com
LOGIN_ADMIN_PASS=ochoaangel@gmail.com

JWT_SECRET=mi_secreto_jwt_muy_seguro

SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=ochoaangel@gmail.com
SMTP_PASS=contrasena_de_aplicacion_de_gmail


En la aplicarion para el inicio de sesiòn como administrador se usan las credenciales LOGIN_ADMIN

5. Instala las dependencias:  npm install
6. Asegurate de tener mongoDB funcionando
7. Para guardar el primer usuario admin ejecuta este script: npm run create-admin-user
8. Para iniciar se ejecuta el script: npm start

## Ejecución

Para iniciar el servidor de desarrollo:

Navega a `http://localhost:3000/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Scripts importantes disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm run build`: Compila la aplicación para producción
- `npm run create-admin-user`: almacena en la Base de Datos el primer usuario Admin para iniciar el flujo de la aplicación


## Tecnologías y librerías principales

- jsonwebtoken
- swagger-ui-express
- mongoose
- nodemailer
- pdfkit
- bcrypt

## Herramientas de desarrollo

- ESLint
- Prettier
- Husky
- Lint-staged

El usuario debe iniciar sesión, como administrador, luego puede agregar nuevo empleado, al llenar el formulario se creará una carta de contratación y en el correo se envía la clave de acceso.

La colección de endpoints en Swagger UI estarán disponible en http://localhost:3000/api-docs

Link para importar en Postman: http://localhost:3000/swagger.json


## Flujo de test

- iniciar con endpoint "POST /usuarios/login", con usuario y clave del .env se obtiene el token, luego en swagger se presiona el boton "Autorize" y de registra el token, y ya se tiene acceso a todos los endpoints

## Screenshots

se colocó materiales visuales y de ejemplos en la carpeta screenShot