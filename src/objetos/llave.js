import Objeto from '../objeto.js';

export default class Llave extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "portal_txt");
        this.interactuable = true;
        this.colision = false;
        this.isParen = false;
        this.distanciaInteraccion = 32
        this.teclaE = scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }

    interactuar() {
        this.scene.datosPlayer.hp = this.scene.player.hp;
        //this.scene.datosPlayer.mazmorras= this.scene.mazmorras;
        this.scene.stopMusic();
        this.scene.scene.start('world', this.scene.datosPlayer)
    }

    preUpdate(time, delta) {
        super.preUpdate(time, delta);

        if (Phaser.Input.Keyboard.JustDown(this.teclaE)) {
            const distancia = Phaser.Math.Distance.Between(
                this.x, this.y,
                this.scene.player.x, this.scene.player.y
            );

            if (distancia <= this.distanciaInteraccion) {
                this.interactuar();
            }
        }
    }
}
