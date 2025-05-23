// Verificar autenticación antes de cargar el chat
if (!localStorage.getItem('token')) {
  window.location.href = 'login.html';
}

const socket = io('http://135.119.192.98:5000');
const username = localStorage.getItem('username');
document.getElementById('user-name').innerText = username;

// Notifica conexión
socket.emit('user_connected', username);

// Chat global
document.getElementById('send-global').onclick = () => {
  const msg = document.getElementById('global-input').value;
  socket.emit('global_message', { user: username, msg });
  document.getElementById('global-input').value = '';
};

socket.on('global_message', (data) => {
  const div = document.createElement('div');
  div.innerText = `${data.user}: ${data.msg}`;
  document.getElementById('global-messages').appendChild(div);
});

// Usuarios conectados
socket.on('online_users', (users) => {
  const ul = document.getElementById('online-users');
  ul.innerHTML = '';
  users.forEach(user => {
    if (user !== username) {
      const li = document.createElement('li');
      li.innerText = user;
      li.onclick = () => openPrivateChat(user);
      ul.appendChild(li);
    }
  });
});

// Chat privado
function openPrivateChat(user) {
  let chatDiv = document.getElementById(`private-${user}`);
  if (!chatDiv) {
    chatDiv = document.createElement('div');
    chatDiv.id = `private-${user}`;
    chatDiv.innerHTML = `
      <h4>Chat privado con ${user} <button onclick="this.parentNode.parentNode.remove()">Cerrar</button></h4>
      <div class="private-messages" id="private-messages-${user}"></div>
      <input type="text" id="private-input-${user}" placeholder="Mensaje...">
      <button onclick="sendPrivate('${user}')">Enviar</button>
    `;
    document.getElementById('private-chats').appendChild(chatDiv);
  }
}

window.sendPrivate = function(user) {
  const input = document.getElementById(`private-input-${user}`);
  const msg = input.value;
  socket.emit('private_message', { to: user, message: { from: username, msg } });
  const div = document.createElement('div');
  div.innerText = `Tú: ${msg}`;
  document.getElementById(`private-messages-${user}`).appendChild(div);
  input.value = '';
};

socket.on('private_message', (data) => {
  openPrivateChat(data.from);
  const div = document.createElement('div');
  div.innerText = `${data.from}: ${data.msg}`;
  document.getElementById(`private-messages-${data.from}`).appendChild(div);
});