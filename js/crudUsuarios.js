// js/crudUsuarios.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, setDoc, getDocs, deleteDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBO--T703GHdsBxPojedzqeHFyCaihPJJ0",
  authDomain: "buzoninteligente-71139.firebaseapp.com",
  projectId: "buzoninteligente-71139",
  storageBucket: "buzoninteligente-71139.appspot.com",
  messagingSenderId: "721834659698",
  appId: "1:721834659698:web:301f3881c27487ef4a97eb"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const tablaUsuarios = document.querySelector('#tabla-usuarios tbody');
const modal = document.getElementById('modal-usuario');
const tituloForm = document.getElementById('titulo-form');

let modoEdicion = false;
let usuarioEditandoId = null;

window.mostrarFormulario = function (id = null, data = null) {
  modal.classList.remove('hidden');
  if (id && data) {
    modoEdicion = true;
    usuarioEditandoId = id;
    tituloForm.textContent = 'Editar Usuario';
    document.getElementById('nombre').value = data.name;
    document.getElementById('correo').value = data.email;
    document.getElementById('clave').value = '';
  } else {
    modoEdicion = false;
    usuarioEditandoId = null;
    tituloForm.textContent = 'Agregar Usuario';
  }
};

window.cerrarFormulario = function () {
  modal.classList.add('hidden');
  document.getElementById('nombre').value = '';
  document.getElementById('correo').value = '';
  document.getElementById('clave').value = '';
  modoEdicion = false;
  usuarioEditandoId = null;
};

window.guardarUsuario = async function () {
  const nombre = document.getElementById('nombre').value;
  const correo = document.getElementById('correo').value;
  const clave = document.getElementById('clave').value;

  if (!nombre || !correo || (!clave && !modoEdicion)) {
    alert('Completa todos los campos');
    return;
  }

  try {
    if (modoEdicion) {
      await updateDoc(doc(db, 'users', usuarioEditandoId), {
        name: nombre,
        email: correo
      });
    } else {
      const cred = await createUserWithEmailAndPassword(auth, correo, clave);
      await setDoc(doc(db, 'users', cred.user.uid), {
        name: nombre,
        email: correo,
        provider: "form",
        createdAt: new Date().toISOString()
      });
    }

    cerrarFormulario();
    cargarUsuarios();
  } catch (error) {
    alert("Error al guardar usuario: " + error.message);
    console.error(error);
  }
};

window.eliminarUsuario = async function (id) {
  try {
    await deleteDoc(doc(db, 'users', id));
    await cargarUsuarios();
  } catch (error) {
    alert("Error al eliminar: " + error.message);
    console.error(error);
  }
};

async function cargarUsuarios() {
  tablaUsuarios.innerHTML = '';
  const snapshot = await getDocs(collection(db, 'users'));
  snapshot.forEach((docu) => {
    const data = docu.data();
    const fila = document.createElement('tr');
    fila.innerHTML = `
      <td>${data.name}</td>
      <td>${data.email}</td>
      <td>
        <button class="btn-auth" onclick='mostrarFormulario("${docu.id}", ${JSON.stringify(data)})'>Editar</button>
        <button class="btn-auth" onclick='eliminarUsuario("${docu.id}")'>Eliminar</button>
      </td>
    `;
    tablaUsuarios.appendChild(fila);
  });
}

window.addEventListener('DOMContentLoaded', cargarUsuarios);
