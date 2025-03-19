import Objeto from '../objeto.js';

export default class Caja extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "caja_txt");
        this.empujable = true;
        this.atacable = true;
        this.setCollideWorldBounds(true);
        this.colision = true;
        this.isParen = false;
    }
}