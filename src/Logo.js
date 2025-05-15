import Phaser from 'phaser';
import bannertxt from '../assets/misc/banner.png';

export default class Logo_scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Logo' });
    }

    preload() {
        // Carga el logo del juego
        this.load.image('banner', bannertxt);
    }

    create() {
        // Agrega el logo al centro de la pantalla
        const logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'banner');

        // Opcional: escalar el logo si es necesario
        // logo.setScale(0.5);

        // Crear el tween de fade out
        this.tweens.add({
            targets: logo,
            alpha: 0, // opacidad a 0 (invisible)
            duration: 2000, // duración de 2 segundos
            ease: 'Power1',
            delay: 1000, // espera 1 segundo antes de empezar
            onComplete: () => {
                // Cambiar a la siguiente escena después del fade out
                this.scene.start('world'); // o el nombre de tu siguiente escena
            }
        });
    }
}