const API_URL = 'http://135.119.192.98:5000/api/auth';

document.addEventListener('DOMContentLoaded', () => {
  // Login
  const loginForm = document.getElementById('login-form');
  if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.user.username);
        window.location.href = 'index.html';
      } else {
        document.getElementById('login-error').innerText = data.msg;
      }
    });
  }

  // Registro
  const registerForm = document.getElementById('register-form');
  if (registerForm) {
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('username').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const res = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();
      if (data.msg === 'Usuario registrado correctamente') {
        window.location.href = 'login.html';
      } else {
        document.getElementById('register-error').innerText = data.msg;
      }
    });
  }
});