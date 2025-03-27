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
        this.explosionArea=this.scene.add.circle(this.x,this.y, radioExplosion, 0xff0000).setVisible(true)
        this.scene.physics.add.existing(this.explosionArea);
        this.scene.physics.overlap(this.explosionArea, this.scene.orc.body,()=>{
            /*if (objeto !== this && objeto.onHit) {
                objeto.setVelocity((objeto.x - this.x) * 2, (objeto.y - this.y) * 2);
                objeto.onHit(20);
            }*/
           console.log("KABOOOOOOM")
           console.log(this.scene.orc)
                this.scene.orc.onHit(5);
        });
        let kaboom=this.scene.add.sprite(this.x, this.y, "KABOOM")
        kaboom.anims.createFromAseprite('KABOOM');
        kaboom.play("Explosion").on("animationcomplete", function(){
            kaboom.destroy()
        });
    
        this.destruir();
    }
}