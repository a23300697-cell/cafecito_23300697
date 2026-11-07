const parametros = new URLSearchParams(window.location.search);

const campos = {
  rNombre: 'nombre',
  rEmail: 'email',
  rProducto: 'producto',
  rCantidad: 'cantidad',
  rTamano: 'tamano',
  rLlevar: 'llevar',
  rObservaciones: 'observaciones'
};

const estado = document.getElementById('estadoRegistro');

function mostrarEstado(texto, tipo) {
  estado.textContent = texto;
  estado.className = 'mensaje ' + tipo;
}

function mostrarId(id) {
  document.getElementById('rId').textContent = id;
  mostrarEstado('Pedido registrado correctamente en la base de datos.', 'ok');
}

// Confirma la recepción de los parámetros y pide al servidor guardar el pedido
async function confirmarRecepcion() {
  // Si la URL ya trae el id, el pedido ya fue guardado (evita duplicados al recargar)
  const idGuardado = parametros.get('id');
  if (idGuardado) {
    mostrarId(idGuardado);
    return;
  }

  mostrarEstado('Datos recibidos. Guardando pedido...', '');

  try {
    const respuesta = await fetch('/pedido/confirmar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(Object.fromEntries(parametros))
    });
    const resultado = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(resultado.error || 'No se pudo registrar el pedido.');
    }

    parametros.set('id', resultado.id);
    history.replaceState(null, '', '?' + parametros.toString());
    mostrarId(resultado.id);
  } catch (error) {
    document.getElementById('rId').textContent = '—';
    mostrarEstado(error.message, 'fail');
  }
}

let hayDatos = false;

for (const [id, clave] of Object.entries(campos)) {
  const valor = parametros.get(clave);
  if (valor) {
    hayDatos = true;
  }
  document.getElementById(id).textContent = valor && valor.trim() ? valor : '—';
}

if (!hayDatos) {
  document.getElementById('sinDatos').hidden = false;
  document.getElementById('rId').textContent = '—';
} else {
  confirmarRecepcion();
}
