import Objeto from '../objeto.js';

export default class Llave extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "llave_txt");
        this.interactuable = true;
        this.colision = false;
        this.isParen = false;
        this.setInteractive(this.scene.input.makePixelPerfect());
    }

    interactuar() {
        console.log("Has recogido una llave");
        this.scene.keyFound = true;
        this.destruir();
    }
}
