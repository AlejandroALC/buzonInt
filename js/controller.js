import * as model from './model.js';
import view from './view.js';

document.addEventListener('DOMContentLoaded', async () => {
  const estado = await model.obtenerEstado();
  const clave = await model.obtenerClave();
  const historial = await model.obtenerHistorial();

  view.mostrarEstado(estado);
  view.mostrarClave(clave);
  view.mostrarHistorial(historial);

  document.getElementById('probar-voz').addEventListener('click', () => {
    view.reproducirVoz(estado);
  });

  document.getElementById('btn-generar-clave').addEventListener('click', async () => {
    await model.guardarClaveNueva();
  });

  model.escucharEstado(nuevoEstado => {
    view.mostrarEstado(nuevoEstado);
    view.reproducirVoz(nuevoEstado);
  });

  model.escucharClave(nuevaClave => {
    view.mostrarClave(nuevaClave);
  });
});
