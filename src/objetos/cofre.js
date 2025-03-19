import Objeto from '../objeto.js';

export default class Cofre extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "cofre_txt");
        this.interactuable = true;
        this.empujable = true;
        this.colision = true;
        this.isParen = false;
        this.setInteractive(this.scene.input.makePixelPerfect());
    }

    /*interactuar() {
        console.log("Has abierto un cofre");
    }*/
}