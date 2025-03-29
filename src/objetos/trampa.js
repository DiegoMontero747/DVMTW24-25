import Objeto from '../objeto.js';

export default class Trampa extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "trampaOn_txt");
        this.danoAlJugador = 20; // Daño que hace al jugador
        this.colision = true;
        this.isParen = false;
    }
}