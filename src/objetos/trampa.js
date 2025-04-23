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
        console.log(objeto)
        if (objeto.onHit) {
            objeto.onHit(this.danoAlJugador); // Aplica daño al objeto
        }

        let empujeX = 0; // Lo aleja en la dirección contraria
        let empujeY = 0;
        // Calcula la dirección en la que se empujará al objeto
        if(this.scene.player.x < this.x){
            empujeX = -20;
        } else {
            empujeX = 20;
        }

        if(this.scene.player.y < this.y){
            empujeY = -16;
        } else {
            empujeY = 16;
        }

        let difX = Math.abs(this.scene.player.x - this.x)
        let dify = Math.abs(this.scene.player.y - this.y)

        if(difX>dify){
            empujeY = 0;
        } else if(difX==dify){
            //nada
        } else {
            empujeX = 0;
        }
        

        // Aplica la fuerza de empuje
        this.scene.player.x = this.scene.player.x + empujeX;
        this.scene.player.y = this.scene.player.y + empujeY;
    }
}