const API_URL = 'http://localhost:3000/api/mensajes';

function getAvatar(nombre) {
  if (!nombre) return '👤';
  return nombre.trim().charAt(0).toUpperCase();
}

async function cargarMensajes() {
  const res = await fetch(API_URL);
  const mensajes = await res.json();
  const contenedor = document.getElementById('mensajes');
  contenedor.innerHTML = '';
  mensajes.forEach(m => {
    const div = document.createElement('div');
    div.className = 'mensaje';
    div.innerHTML = `
      <div class="avatar">${getAvatar(m.nombre)}</div>
      <div class="mensaje-contenido">
        <div>
          <span class="mensaje-nombre">${m.nombre}</span>
          <span class="fecha">${new Date(m.fecha).toLocaleString()}</span>
        </div>
        <div class="mensaje-texto">${m.mensaje}</div>
      </div>
    `;
    contenedor.appendChild(div);
  });
}

document.getElementById('formulario').addEventListener('submit', async e => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const mensaje = document.getElementById('mensaje').value;
  await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, mensaje })
  });
  document.getElementById('formulario').reset();
  cargarMensajes();
});

cargarMensajes();