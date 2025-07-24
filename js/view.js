const View = {
  mostrarEstado(estado) {
    const estadoElem = document.getElementById('estado');
    estadoElem.textContent = estado === 'tiene_paquete' ? '📦 ¡Paquete recibido!' : '📭 Sin paquete';
    estadoElem.style.color = estado === 'tiene_paquete' ? '#28a745' : '#6c757d';
  },

  mostrarClave(clave) {
    const claveElem = document.getElementById('clave');
    claveElem.textContent = clave ? `🔑 Clave de acceso: ${clave}` : '🔒 No se ha generado una clave';
  },

  mostrarHistorial(historial) {
    const lista = document.getElementById('historial');
    lista.innerHTML = '';

    if (historial && historial.length > 0) {
      historial.forEach(item => {
        const li = document.createElement('li');
        li.textContent = `Cantidad: ${item.cantidad}, Peso: ${item.peso}kg, Hora: ${new Date(item.hora).toLocaleString()}`;
        lista.appendChild(li);
      });
    } else {
      const li = document.createElement('li');
      li.textContent = 'Sin historial disponible.';
      lista.appendChild(li);
    }
  },

  reproducirVoz(mensaje) {
    const texto = mensaje === 'tiene_paquete' ? '¡Ha llegado un paquete!' : 'El buzón está vacío';
    const utter = new SpeechSynthesisUtterance(texto);
    utter.lang = 'es-MX';
    speechSynthesis.speak(utter);
  }
};

export default View;