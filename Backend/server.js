require('dotenv').config();
const express = require('express');
const http = require('http');
const cors = require('cors');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth'); // <-- ESTA LÍNEA ES CLAVE

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/auth', authRoutes); // <-- ESTA LÍNEA ES CLAVE

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));