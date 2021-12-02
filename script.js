let myLibrary = []

function Book(title, author, pages, read) {
  this.title = title
  this.author = author
  this.pages = pages
  this.read = read
  this.info = function () {
    
}

Book.prototype.info = function(){
  let isRead = (this.read) ? "read" : "not read yet"
  return this.title + " by " + this.author + ", " + this.pages + 
  " pages, " + isRead
}

}
function AgregarLibroALaBiblioteca(titulo, autor, paginas, leido){
  let nuevoLibro = new Book(titulo, autor, paginas, leido)
  myLibrary.push(nuevoLibro)
}
function recorrerElArrayDeLibros(){
  
}