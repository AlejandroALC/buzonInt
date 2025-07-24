import { db, doc, setDoc, getDoc, onSnapshot, collection, addDoc } from './firebase.js';

const claveDocRef = doc(db, 'buzon', 'clave');
const estadoDocRef = doc(db, 'buzon', 'estado');
const historialColRef = collection(db, 'buzon', 'registro', 'historial');

function generarClave() {
  return Math.floor(1000 + Math.random() * 9000).toString();
}

async function guardarClaveNueva() {
  const clave = generarClave();
  await setDoc(claveDocRef, { valor: clave });
}

async function obtenerClave() {
  const docSnap = await getDoc(claveDocRef);
  return docSnap.exists() ? docSnap.data().valor : null;
}

async function obtenerEstado() {
  const docSnap = await getDoc(estadoDocRef);
  return docSnap.exists() ? docSnap.data().valor : 'sin_paquete';
}

async function obtenerHistorial() {
  const snapshot = await getDoc(doc(db, 'buzon', 'registro'));
  if (!snapshot.exists()) return [];
  const historialSnap = await getDocs(historialColRef);
  return historialSnap.docs.map(doc => doc.data());
}

async function agregarPaquete(cantidad, peso) {
  const ahora = new Date().toISOString();
  await addDoc(historialColRef, {
    cantidad,
    peso,
    hora: ahora
  });
  await setDoc(estadoDocRef, { valor: 'tiene_paquete' });
}

function escucharClave(callback) {
  onSnapshot(claveDocRef, (docSnap) => {
    if (docSnap.exists()) callback(docSnap.data().valor);
  });
}

function escucharEstado(callback) {
  onSnapshot(estadoDocRef, (docSnap) => {
    if (docSnap.exists()) callback(docSnap.data().valor);
  });
}

export {
  guardarClaveNueva,
  obtenerClave,
  obtenerEstado,
  obtenerHistorial,
  agregarPaquete,
  escucharClave,
  escucharEstado
};
