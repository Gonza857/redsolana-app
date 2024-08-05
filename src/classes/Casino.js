export default class Casino {
  constructor() {
    this._image = new Image(); // objeto
    this._name = null;
    this._link = null;
    this._id = null;
  }

  // Getter y Setter para image
  get image() {
    return this._image;
  }
  set image(newImage) {
    // if (newImage && typeof newImage === 'object' && 'url' in newImage && 'id' in newImage) {
    //   this._image = newImage;
    // } else {
    //   console.error('El nuevo valor de image debe ser un objeto con propiedades url e id.');
    // }

    this._image = newImage;
  }

  // Getter y Setter para name
  get name() {
    return this._name;
  }

  set name(newName) {
    this._name = newName;
  }

  // Getter y Setter para link
  get link() {
    return this._link;
  }

  set link(newLink) {
    // if (typeof newLink === 'string') {
    //   this._link = newLink;
    // } else {
    //   console.error('El nuevo valor de link debe ser una cadena de texto.');
    // }
    this._link = newLink;
  }

  // Getter y Setter para id
  get id() {
    return this._id;
  }

  set id(newId) {
    // if (newId === null || typeof newId === 'number') {
    //   this._id = newId;
    // } else {
    //   console.error('El nuevo valor de id debe ser un número o null.');
    // }
    this._id = newId;
  }
}
