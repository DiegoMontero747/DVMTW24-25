import Objeto from '../objeto.js';

export default class Trampa extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "trampaOn_txt");
        this.danoAlJugador =1; // Daño que hace al jugador
        this.colision = false;
        this.isParen = false;
        this.setImmovable(true);

        this.scene.physics.add.overlap(this, this.scene.player, this.activarTrampa, null, this);
    }

    activarTrampa(objeto) {
        if (objeto.onHit) {
            objeto.onHit(this.danoAlJugador); // Aplica daño al objeto
        }

        let empujeX = 0; // Lo aleja en la dirección contraria
        let empujeY = 0;
        // Calcula la dirección en la que se empujará al objeto
        if(objeto.x < this.x){
            empujeX = -2;
        } else {
            empujeX = 2;
        }

        if(objeto.y < this.y){
            empujeY = -2;
        } else {
            empujeY = 2;
        }

        let difX = Math.abs(objeto.x < this.x)
        let dify = Math.abs(objeto.y < this.y)

        if(difX>dify){
            empujeY = 0;
        } else {
            empujeX = 0;
        }
        

        // Aplica la fuerza de empuje
        objeto.setVelocity(empujeX, empujeY);
    }
}