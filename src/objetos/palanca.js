import Objeto from '../objeto.js';

export default class Palanca extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "palanca_txt");
        this.interactuable = true;
        this.colision = true;
        this.isParen = false;
        this.activado = false;
        this.setInteractive(this.scene.input.makePixelPerfect());
    }


    interactuar() {
        if(!this.activado){
            console.log("Has activado la palanca");
            this.activado = true;
            this.setTexture("palancaOn_txt")
            this.scene.deshabilitarTrampas();
        } else {
            console.log("La palanca ya está activada");
        }
    }
}