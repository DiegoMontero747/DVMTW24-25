import Objeto from '../objeto.js';

export default class Puerta extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "puerta_txt");
        this.colision = true;
        this.isParen = false;
    }
}
