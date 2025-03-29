import Objeto from '../objeto.js';

export default class Cerradura extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "cerradura_txt");
        this.interactuable = true;
        this.colision = false;
        this.isParen = false;
        this.setInteractive(this.scene.input.makePixelPerfect());
        this.activo = false;
    }

    interactuar() {
        if(!this.activo && this.scene.keyFound){
            console.log("abriendo puertas");
            this.setTexture("cerraduraConLlave_txt");
            this.scene.abrirPuertas();
        } else {
            console.log("El jugador no ha conseguido la llave");
        }
    }
}