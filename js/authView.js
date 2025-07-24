const AuthView = {
  initLoginForm(onSubmit) {
    const form = document.getElementById('loginForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      await onSubmit(email, password);
    });
  },

  initRegisterForm(onSubmit) {
    const form = document.getElementById('registerForm');
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm').value;
      await onSubmit(name, email, password, confirmPassword);
    });
  },

  showError(message) {
    alert(message); // Puedes mejorar esto con un sistema de notificaciones
  },

  showSuccess(message) {
    alert(message); // Puedes mejorar esto con un sistema de notificaciones
  },

  redirectTo(path) {
    window.location.href = path;
  }
};

export default AuthView;