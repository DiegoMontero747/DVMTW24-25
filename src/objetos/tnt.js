import Objeto from '../objeto.js';

export default class TNT extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "tnt_txt");
        this.empujable = true;
        this.setCollideWorldBounds(true);
        this.colision = true;
        this.isParen = false;
        this.scale = 0.75;
        this.hp = 1;
    }

    onHit(cantidad){
        //kaboooooooom
    }
}