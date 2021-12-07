function MostrarFormulario(idDelFormulario) {
  const formulario = document.querySelector("#" + idDelFormulario);
  formulario.classList.add("aparecer");
  formulario.style = "display: flex;";
  setTimeout(() => formulario.classList.remove("aparecer"), 300);
}
function ocultarFormulario(idDelFormulario) {
  const formulario = document.querySelector("#" + idDelFormulario);
  formulario.classList.add("desaparecer");
  setTimeout(() => {
    formulario.classList.remove("desaparecer");
    formulario.style = "display: none;";
  }, 290);
}
function ocultarOMostrarFormulario(idDelFormulario) {
  const formulario = document.querySelector("#" + idDelFormulario);
  mostrarFormulario(idDelFormulario);
}

const botonParaAgregarLibro = document.querySelector("#botonParaAgregarLibro");
botonParaAgregarLibro.addEventListener("click", () => {
  MostrarFormulario("formularioDeAgregadoDeUnNuevoLibro");
});

const botonCerrarVentanaDeAgregarNuevoLibro = document.getElementById(
  "botonCerrarVentanaDeAgregarNuevoLibro"
);
botonCerrarVentanaDeAgregarNuevoLibro.addEventListener("click", (e) => {
  e.preventDefault();
  ocultarFormulario("formularioDeAgregadoDeUnNuevoLibro");
});

let miBiblioteca = [];

function Libro(id, nombre, autor, paginas, leido) {
  this.id = id;
  this.nombre = nombre;
  this.autor = autor;
  this.paginas = paginas;
  this.leido = leido;
}
function limpiarCamposDeEntrada() {
  document.getElementById("nombre").value = "";
  document.getElementById("autor").value = "";
  document.getElementById("paginas").value = "";
  document.getElementById("leido").checked = false;
}
const obtenerDatosDeNuevoLibro = () => {
  const nombre = document.getElementById("nombre").value;
  const autor = document.getElementById("autor").value;
  const numeroDePaginas = document.getElementById("paginas").value;
  const leido = document.getElementById("leido").checked;
  if (nombre === "" || autor === "" || numeroDePaginas === "") {
    return false;
  }
  ocultarFormulario("formularioDeAgregadoDeUnNuevoLibro");
  limpiarCamposDeEntrada();
  return {
    nombre: nombre,
    autor: autor,
    numeroDePaginas: numeroDePaginas,
    leido: leido,
  };
};
const ObtenerSiguientId = () => {
  if (miBiblioteca.length === 0) {
    return 0;
  }
  let contenedorDeListaDeLibros = document.getElementById(
    "contenedorDeListaDeLibros"
  );
  let posicionUltimoDiv = contenedorDeListaDeLibros.childNodes.length - 1;
  let ultimoLibro = contenedorDeListaDeLibros.childNodes[posicionUltimoDiv];

  let id = Number(ultimoLibro.id.slice(5));
  id += 1;
  return id;
};

function AgregarUnLibroAMiBiblioteca() {
  const Datos = obtenerDatosDeNuevoLibro();
  if (Datos === false) {
    alert("Debes completar todos los campos");
  } else {
    let leido = Datos.leido ? "Ya leido" : "Sin leer";
    let id = ObtenerSiguientId();
    const nuevoLibro = new Libro(
      id,
      Datos.nombre,
      Datos.autor,
      Datos.numeroDePaginas,
      leido
    );
    miBiblioteca.push(nuevoLibro);
    setTimeout(hacerScrollHastaElemento("contenedorDeListaDeLibros"), 300);
  }
}

function eliminarLibroDeMiBiblioteca(id) {
  let miBibliotecaSinElLibro = [];
  for (let libro of miBiblioteca) {
    if (libro.id !== id) {
      miBibliotecaSinElLibro.push(libro);
    }
  }
  miBiblioteca = miBibliotecaSinElLibro;
  ActualizarLibrosMostrados();
}
function limpiarContenedorDeElementoConId(id) {
  const contenedorDeListaDeLibros = document.getElementById(id);
  let listaDeDivs = contenedorDeListaDeLibros.childNodes;

  listaDeDivs = Array.from(listaDeDivs);
  listaDeDivs.map((div) => {
    contenedorDeListaDeLibros.removeChild(div);
  });
}
function AnimarEliminadoDeLibro(id) {
  const libro = document.getElementById(id);
  libro.classList.add("desaparecer");
}
function EliminarElementoConId(id) {
  AnimarEliminadoDeLibro(id);
  setTimeout(() => {
    id = id.slice(5);
    id = Number(id);
    eliminarLibroDeMiBiblioteca(id);
    mostrarNotificacion("Eliminado exitosamente");
  }, 300);
}
const creacionDeElemento = (libro, conBotonCerrar) => {
  let div = document.createElement("div");
  div.classList.add("book");
  div.id = "libro" + libro.id;
  let botonParaEliminar = document.createElement("button");
  if (conBotonCerrar) {
    botonParaEliminar.classList.add("botonEliminarLibro");
    botonParaEliminar.id = libro.id;
    botonParaEliminar.innerHTML =
      '<svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#000000"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"/></svg>';

    botonParaEliminar.addEventListener("click", (e) => {
      let idDelElementoAEliminar = e.path[2].id;
      EliminarElementoConId(idDelElementoAEliminar);
    });
  }
  let titulo = document.createElement("p");
  titulo.classList.add("tituloDelLibro");
  titulo.innerText = libro.nombre;
  let autor = document.createElement("p");
  autor.classList.add("nombreDelAutor");
  autor.innerText = libro.autor;
  let numeroDePaginas = document.createElement("p");
  numeroDePaginas.classList.add("numeroDePaginas");
  numeroDePaginas.innerText = libro.paginas + " paginas";
  let yaLoLei = document.createElement("p");
  yaLoLei.classList.add("yaLoLei");
  yaLoLei.innerText = libro.leido;
  if (conBotonCerrar) {
    div.appendChild(botonParaEliminar);
  }
  div.appendChild(titulo);
  div.appendChild(autor);
  div.appendChild(numeroDePaginas);
  div.appendChild(yaLoLei);
  return div;
};
function ActualizarLibrosMostrados() {
  limpiarContenedorDeElementoConId("contenedorDeListaDeLibros");
  const contenedorDeListaDeLibros = document.getElementById(
    "contenedorDeListaDeLibros"
  );
  if (miBiblioteca.length === 0) {
    contenedorDeListaDeLibros.innerHTML =
      '<div><p class="textoDeFondo">No has agregado ningun libro aun. </p></div>';
  }
  miBiblioteca.map((libro) => {
    let div = creacionDeElemento(libro, true);
    contenedorDeListaDeLibros.appendChild(div);
  });
}
function hacerScrollHastaElemento(id) {
  const elemento = document.getElementById(id);
  let { x, y } = elemento.getBoundingClientRect();
  window.scroll(x, y);
}
const textoDeNotificacion = document.getElementById("textoDeNotificacion");
const notificacion = document.getElementById("notificacion");
function mostrarNotificacion(texto) {
  textoDeNotificacion.innerText = texto;
  notificacion.style = "display: flex";
  setTimeout(() => {
    notificacion.style = "";
  }, 2000);
}
const submitAgregar = document.getElementById("submitAgregar");
submitAgregar.addEventListener("click", (e) => {
  e.preventDefault();
  AgregarUnLibroAMiBiblioteca();
  ActualizarLibrosMostrados();
  mostrarNotificacion("Agregado exitosamente");
});
const formulario = document.getElementById(
  "formularioDeAgregadoDeUnNuevoLibro"
);
formulario.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    AgregarUnLibroAMiBiblioteca();
    ActualizarLibrosMostrados();
    mostrarNotificacion("Agregado exitosamente");
  }
});

const botonBuscar = document.getElementById("botonBuscar");
const inputBuscar = document.getElementById("inputBuscar");
let estaEscribiendo = true
inputBuscar.addEventListener("focusin", () => {
  if (inputBuscar.value === "") {
    console.log(inputBuscar)
    botonBuscar.style = "display: inline-flex;";
    botonBuscar.classList.add("aparecer");
    setTimeout(() => {
      botonBuscar.classList.remove("aparecer");
    }, 300);
  }
  estaEscribiendo= true
});
inputBuscar.addEventListener("focusout", (e) => {
  estaEscribiendo = false
  setTimeout(() => {
    if (inputBuscar.value === "" && !estaEscribiendo) {
      botonBuscar.style = "display: inline-flex;";
      botonBuscar.classList.add("desaparecer");
      setTimeout(() => {
        botonBuscar.style = "display: none;";
        botonBuscar.classList.remove("desaparecer");
      }, 290);
    }
  }, 2000);
});

const encontrarLibroEnLaBiblioteca = (nombre) => {
  let librosEncontrados = [];
  miBiblioteca.map((libro) => {
    if (libro.nombre.includes(nombre)) {
      librosEncontrados.push(libro);
    }
  });
  return librosEncontrados;
};
const contenedorDeLibrosEncontrados = document.getElementById(
  "contenedorDeLibrosEncontrados"
);
function AgregarLibrosEncontrados(librosEncontrados) {
  if (librosEncontrados.length !== 0) {
    busquedaDeLibrosEncontrados.style = "display: block;";
    librosEncontrados.map((libro) => {
      let div = creacionDeElemento(libro, false);
      contenedorDeLibrosEncontrados.appendChild(div);
    });
  } else {
    mostrarNotificacion("No se encontraron resultados");
  }
}

const busquedaDeLibrosEncontrados = document.getElementById(
  "busquedaDeLibrosEncontrados"
);
function mostrarLibrosEncontrados(nombre) {
  const librosEncontrados = encontrarLibroEnLaBiblioteca(nombre);
  AgregarLibrosEncontrados(librosEncontrados);
}

function validarBusqueda(busqueda) {
  if (busqueda === "") {
    mostrarNotificacion("No se puede buscar eso");
  } else {
    mostrarLibrosEncontrados(busqueda);
    inputBuscar.value = "";
  }
}

botonBuscar.addEventListener("click", (e) => {
  e.preventDefault();
  limpiarContenedorDeElementoConId("contenedorDeLibrosEncontrados");
  validarBusqueda(inputBuscar.value);
});

const botonCerrarBusquedas = document.getElementById("botonCerrarBusquedas");
botonCerrarBusquedas.addEventListener("click", () => {
  busquedaDeLibrosEncontrados.style = "";
  limpiarContenedorDeElementoConId("contenedorDeLibrosEncontrados");
});
