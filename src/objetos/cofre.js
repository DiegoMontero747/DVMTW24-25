import Objeto from '../objeto.js';

export default class Cofre extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "cofre_txt");
        this.interactuable = true;
        this.empujable = true;
        this.colision = true;
        this.isParen = false;
        this.setInteractive(this.scene.input.makePixelPerfect());
    }

    interactuar() {
        console.log("Has abierto un cofre");
        this.setTexture("openCofre_txt");
    
        this.scene.tweens.add({
            targets: this,
            alpha: 0, // Hace que la puerta desaparezca gradualmente
            duration: 1500,
            ease: "Power2",
            onComplete: () => {
                this.body.enable = false;
                this.setVisible(false); // Oculta la puerta completamente
            }
        });
    }
}