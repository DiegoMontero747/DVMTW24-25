import Phaser from 'phaser';

export default class Objeto extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);

        scene.add.existing(this);
        scene.physics.add.existing(this);

        this.hp = 100; // Salud por defecto
        this.interactuable = false;
        this.empujable = false;
        this.colision = true;
        this.danoAlJugador = 1; // Daño que causa al jugador (si aplica)
        this.setImmovable(true);
        this.setMass(1000);
        this.setPushable(false);

        //this.setInteractive();
        this.on("pointerdown", () => this.interactuar());
        if(this.atacable){

        }
    }

    interactuar() {
        console.log(`Interacción con ${this.texture.key}`);
    }

    onHit(cantidad) {
        
    }

    destruir() {
        console.log(`${this.texture.key} destruido`);
        this.destroy();
    }
}
