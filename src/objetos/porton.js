import Objeto from '../objeto.js';

export default class Porton extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "porton_txt");
        this.colision = true;
        this.isParen = false;
    }
}