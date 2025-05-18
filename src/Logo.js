import Phaser from 'phaser';
import bannertxt from '../assets/misc/banner.png';

export default class Logo_scene extends Phaser.Scene {
    constructor() {
        super({ key: 'Logo' });
    }

    preload() {
        this.load.image('banner', bannertxt);
    }

    create() {
        // Centrar el logo en pantalla
        const logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY, 'banner');

        // Establecer opacidad inicial en 0 (invisible)
        logo.setAlpha(0);

        // Tween de fade in
        this.tweens.add({
            targets: logo,
            alpha: 1, // visibilidad completa
            duration: 1000,
            ease: 'Power1',
            onComplete: () => {
                // Esperar un poco y hacer fade out
                this.time.delayedCall(1000, () => {
                    this.tweens.add({
                        targets: logo,
                        alpha: 0,
                        duration: 1000,
                        ease: 'Power1',
                        onComplete: () => {
                            this.scene.start('world');
                        }
                    });
                });
            }
        });
    }
}
