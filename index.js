let miBiblioteca = [];

function mostrarFormulario(idDelFormulario) {
  const formulario = document.querySelector("#" + idDelFormulario);
  formulario.classList.add("aparecer");
  formulario.style = "display: flex;";
  setTimeout(() => formulario.classList.remove("aparecer"), 400);
}
function ocultarFormulario(idDelFormulario) {
  const formulario = document.querySelector("#" + idDelFormulario);
  formulario.classList.add("desaparecer");
  formulario.style = "display: none;";
  setTimeout(() => formulario.classList.remove("desaparecer"), 400);
}
function ocultarOMostrarFormulario(idDelFormulario) {
  const formulario = document.querySelector("#" + idDelFormulario);
  let idDelOtroFormulario;
  if (idDelFormulario === "formularioDeAgregadoDeUnNuevoLibro") {
    idDelOtroFormulario = "formularioParaBuscarUnLibroEnLaLista";
  } 
  else {
    idDelOtroFormulario = "formularioDeAgregadoDeUnNuevoLibro";
  }
  const otroFormulario = document.querySelector("#" + idDelOtroFormulario);
  if (otroFormulario.style.display === "flex") {
    ocultarFormulario(idDelOtroFormulario);
  }
  if (formulario.style.display === "flex") {
    ocultarFormulario(idDelFormulario);
  } else {
    mostrarFormulario(idDelFormulario);

  }
}

const botonParaAgregarLibro = document.querySelector("#botonParaAgregarLibro");
botonParaAgregarLibro.addEventListener("click", () =>
  ocultarOMostrarFormulario("formularioDeAgregadoDeUnNuevoLibro")
);

const botonParaBuscarLibro = document.querySelector("#botonParaBuscarLibro");
botonParaBuscarLibro.addEventListener("click", () =>
  ocultarOMostrarFormulario("formularioParaBuscarUnLibroEnLaLista")
);

function Libro(id, nombre, autor, paginas, leido) {
  this.id = id;
  this.nombre = nombre;
  this.autor = autor;
  this.paginas = paginas;
  this.leido = leido;
}
function obtenerDatosDeNuevoLibro() {}
function AgregarUnLibroAMiBiblioteca() {}
