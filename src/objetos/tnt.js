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
        this.setInteractive(this.scene.input.makePixelPerfect());
        this.anims.createFromAseprite('KABOOM');
        console.log(this.anims)
    }

    interactuar() {
        console.log("KABOOOOOOM");
        this.explotar()
    }

    onHit(cantidad) {
        if (this.hp <= 0) return; // Evita explotar varias veces
    
        this.hp -= cantidad; // Resta vida al barril
        if (this.hp <= 0) {
            this.explotar();
        }
    }
    
    explotar() {
        const radioExplosion = 50;
        this.scene.cameras.main.shake(300, 0.02);
        this.explosionArea=new Phaser.Geom.Circle(0,0, radioExplosion)
        this.scene.physics.overlap(this.explosionArea, this.y, radioExplosion, objeto => {
            if (objeto !== this && objeto.onHit) {
                objeto.setVelocity((objeto.x - this.x) * 2, (objeto.y - this.y) * 2);
                objeto.onHit(20);
            }
        });
        let kaboom=this.scene.add.sprite(this.x, this.y, "KABOOM")
        kaboom.anims.createFromAseprite('KABOOM');
        kaboom.play("Explosion").on("animationcomplete", function(){
            kaboom.destroy()
        });
    
        this.destruir();
    }
}