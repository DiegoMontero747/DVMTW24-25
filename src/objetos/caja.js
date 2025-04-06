import Objeto from '../objeto.js';

export default class Caja extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "caja_txt");
        this.empujable = true;
        this.setCollideWorldBounds(true);
        this.colision = true;
        this.isParen = false;
        this.hp = 1;
    }

    onHit(cantidad) {
        console.log("mhan dao")
        this.hp -= cantidad; // Resta vida al barril
        if (this.hp <= 0) {
            this.destroy();
        }
    }
}