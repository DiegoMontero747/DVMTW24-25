import Objeto from '../objeto.js';

export default class Cerradura extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "cerradura_txt");
        this.interactuable = true;
        this.colision = false;
        this.isParen = false;
        this.setInteractive(this.scene.input.makePixelPerfect());
    }

    /*interactuar() {
        console.log("Intentando abrir la cerradura...");
    }*/
}