const form = document.getElementById("form-pedido");
const btnLimpiar = document.getElementById("btn-limpiar");
const mensaje = document.getElementById("mensaje");

const campos = {
  nombre: document.getElementById("nombre"),
  email: document.getElementById("email"),
  producto: document.getElementById("producto"),
  cantidad: document.getElementById("cantidad"),
};

function mostrarError(nombreCampo, texto) {
  const contenedor = document.getElementById("campo-" + nombreCampo);
  const span = document.getElementById("error-" + nombreCampo);
  contenedor.classList.add("invalid");
  span.textContent = texto;
  campos[nombreCampo].setAttribute("aria-invalid", "true");
}

function limpiarErrores() {
  Object.keys(campos).forEach((nombreCampo) => {
    document.getElementById("campo-" + nombreCampo).classList.remove("invalid");
    document.getElementById("error-" + nombreCampo).textContent = "";
    campos[nombreCampo].removeAttribute("aria-invalid");
  });
}

function mostrarMensaje(texto, tipo) {
  mensaje.textContent = texto;
  mensaje.className = "mensaje " + tipo;
}

function validar() {
  if (campos.nombre.value.trim() === "") {
    return { campo: "nombre", texto: "El nombre es obligatorio." };
  }

  const correo = campos.email.value.trim();
  const formatoCorreo = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (correo !== "" && !formatoCorreo.test(correo)) {
    return { campo: "email", texto: "Escribe un correo válido (ejemplo: nombre@correo.com)." };
  }

  if (campos.producto.value === "") {
    return { campo: "producto", texto: "Selecciona un producto." };
  }

  const cantidad = Number(campos.cantidad.value);
  if (campos.cantidad.value === "" || !Number.isInteger(cantidad) || cantidad < 1) {
    return { campo: "cantidad", texto: "La cantidad debe ser un número entero de 1 o más." };
  }

  return null;
}

// Si el servidor regresó al formulario con ?error=1, se muestra el aviso
const parametros = new URLSearchParams(window.location.search);
if (parametros.get("error") === "1") {
  mostrarMensaje("El servidor no recibió todos los datos. Revisa el formulario.", "fail");
}

form.addEventListener("submit", (evento) => {
  limpiarErrores();
  mostrarMensaje("", "");

  const error = validar();
  if (error) {
    // Hay un dato inválido: se cancela el envío y se muestra el error
    evento.preventDefault();
    mostrarError(error.campo, error.texto);
    mostrarMensaje("Revisa los datos del formulario.", "fail");
    campos[error.campo].focus();
    return;
  }

  // Los datos son válidos: no se cancela el evento, así que el navegador
  // envía el formulario por POST a http://localhost:3000/pedido
});

function reiniciarFormulario() {
  form.reset();
  limpiarErrores();
  mostrarMensaje("", "");
}

btnLimpiar.addEventListener("click", () => {
  reiniciarFormulario();
  campos.nombre.focus();
});

Object.keys(campos).forEach((nombreCampo) => {
  const evento = campos[nombreCampo].tagName === "SELECT" ? "change" : "input";
  campos[nombreCampo].addEventListener(evento, () => {
    document.getElementById("campo-" + nombreCampo).classList.remove("invalid");
    document.getElementById("error-" + nombreCampo).textContent = "";
    campos[nombreCampo].removeAttribute("aria-invalid");
  });
});
