class Cajero {
  constructor(state, link, image, name, numero, pos, network) {
    this.enlace = link;
    this.estado = state;
    this.imagen = image;
    this.nombre = name;
    this.numero = numero;
    this.pos = pos;
    this.red = network;
  }

  // Getter y Setter para enlace
  get enlace() {
    return this._enlace;
  }

  set enlace(value) {
    this._enlace = value;
  }

  // Getter y Setter para estado
  get estado() {
    return this._estado;
  }

  set estado(value) {
    this._estado = value;
  }

  // Getter y Setter para imagen
  get imagen() {
    return this._imagen;
  }

  set imagen(value) {
    this._imagen = value;
  }

  // Getter y Setter para nombre
  get nombre() {
    return this._nombre;
  }

  set nombre(value) {
    this._nombre = value;
  }

  // Getter y Setter para numero
  get numero() {
    return this._numero;
  }

  set numero(value) {
    this._numero = value;
  }

  // Getter y Setter para pos
  get pos() {
    return this._pos;
  }

  set pos(value) {
    this._pos = value;
  }

  // Getter y Setter para red
  get red() {
    return this._red;
  }

  set red(value) {
    this._red = value;
  }
}
