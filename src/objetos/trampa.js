import Objeto from '../objeto.js';

export default class Trampa extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "trampaOn_txt");
        this.danoAlJugador =1; // Daño que hace al jugador
        this.colision = false;
        this.isParen = false;

        this.scene.physics.add.overlap(this, this.scene.player, this.activarTrampa, null, this);
    }

    activarTrampa(objeto) {
        if (objeto.onHit) {
            objeto.onHit(this.danoAlJugador); // Aplica daño al objeto
        }

        // Calcula la dirección en la que se empujará al objeto
        const empujeX = (objeto.x - this.x) * 2; // Lo aleja en la dirección contraria
        const empujeY = (objeto.y - this.y) * 2;

        // Aplica la fuerza de empuje
        objeto.setVelocity(empujeX, empujeY);
    }
}