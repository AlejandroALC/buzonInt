import {
  auth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  googleProvider,
  signInWithPopup,
  onAuthStateChanged,
  db,
  doc,
  setDoc,
  getDoc
} from './firebase.js';

const AuthController = {
  init() {
    this.setupGoogleSignIn();
    this.setupLoginForm();
    this.setupRegisterForm();
    this.setupAuthStateListener();
  },

  setupGoogleSignIn() {
    const googleBtn = document.getElementById('googleSignIn');
    if (googleBtn) {
      googleBtn.addEventListener('click', () => this.handleGoogleSignIn());
    }
  },

  setupLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
      loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        await this.handleLogin(email, password);
      });
    }
  },

  setupRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
      registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        const password = document.getElementById('register-password').value;
        const confirmPassword = document.getElementById('register-confirm').value;
        await this.handleRegister(name, email, password, confirmPassword);
      });
    }
  },

  setupAuthStateListener() {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.updateUIForAuthenticatedUser(user);
      } else {
        this.updateUIForGuest();
      }
    });
  },

  async handleLogin(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        await signOut(auth);
        alert('Esta cuenta no está registrada en el sistema.');
        return;
      }

      window.location.href = 'index.html';
    } catch (error) {
      if (error.code === 'auth/user-not-found') {
        alert('Esta cuenta no está registrada.');
      } else {
        alert('Error al iniciar sesión: ' + error.message);
      }
    }
  },

  async handleRegister(name, email, password, confirmPassword) {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData = {
        name: name,
        email: email,
        createdAt: new Date(),
        provider: 'email',
        lastLogin: new Date()
      };

      await setDoc(doc(db, 'users', user.uid), userData);

      alert('Registro exitoso. Ahora puedes iniciar sesión.');
      window.location.href = 'login.html';
    } catch (error) {
      alert('Error al registrarse: ' + error.message);
    }
  },

  async handleGoogleSignIn() {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      const userRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userRef);

      if (!userDoc.exists()) {
        await setDoc(userRef, {
          name: user.displayName || 'Usuario Google',
          email: user.email,
          photoURL: user.photoURL || null,
          createdAt: new Date(),
          provider: 'google',
          lastLogin: new Date()
        });
        alert('Cuenta registrada con Google. Ahora inicia sesión para continuar.');
        await signOut(auth);
        window.location.href = 'login.html';
        return;
      }

      window.location.href = 'index.html';
    } catch (error) {
      alert('Error al autenticar con Google: ' + error.message);
    }
  },

  updateUIForAuthenticatedUser(user) {
    const authButtons = document.getElementById('auth-buttons');
    if (authButtons) {
      authButtons.innerHTML = `<a href="paquetes.html" class="btn-login">Paquetes</a>
        <div class="user-dropdown">
          <button class="btn-login">Mi Cuenta</button>
          <div class="dropdown-content">
            <p>${user.email}</p>
            <button id="btn-cerrar-sesion">Cerrar sesión</button>
          </div>
        </div>`;
      const btnLogout = document.getElementById('btn-cerrar-sesion');
      if (btnLogout) {
        btnLogout.addEventListener('click', async () => {
          await signOut(auth);
          window.location.href = 'index.html';
        });
      }
    }
  },

  updateUIForGuest() {
    const authButtons = document.getElementById('auth-buttons');
    if (authButtons) {
      authButtons.innerHTML = `<a href="login.html" class="btn-login">Iniciar sesión</a>
        <a href="register.html" class="btn-login">Registrarse</a>`;
    }
  }
};

document.addEventListener('DOMContentLoaded', () => {
  AuthController.init();
});