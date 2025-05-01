import Objeto from '../objeto.js';

export default class Trampa extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "trampaOn_txt");
        this.danoAlJugador = 1; // Daño que hace al jugador
        this.colision = true;   // La colisión está activa inicialmente
        this.isParen = false;
        this.setImmovable(true);

        // Agregar la sobrecarga para activar la trampa
        this.colisionOverlap = this.scene.physics.add.overlap(this, this.scene.player, this.activarTrampa, null, this);
    }

    // Método para activar la trampa
    activarTrampa(objeto) {
        if (!this.colision) return;  // Si la colisión está desactivada, no hacer nada

        console.log(objeto);
        if (objeto.onHit) {
            this.scene.player.onHit(this.danoAlJugador); // Aplica daño al objeto
            this.setTexture("trampaOff_txt");
            this.body.destroy();
        }
    }

}
