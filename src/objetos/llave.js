import Objeto from '../objeto.js';

export default class Llave extends Objeto {
    constructor(scene, x, y) {
        super(scene, x, y, "llave_txt");
        this.interactuable = true;
        this.colision = false;
        this.isParen = false;
        this.scene.physics.add.overlap(this, this.scene.player, this.recogerLLave, null, this);
    }

    recogerLLave() {
        console.log("Has recogido una llave");
        this.scene.keyFound = true;
        
        let hitText=this.scene.add.text(this.x,this.y,"LLave recogida").setDepth(this.depth+1);
        const hitTextAnim=this.scene.tweens.add({
            targets: [hitText],
            scale: 0.2,
            x:this.x,
            ease: 'linear',
            duration: 1000,
            delay: this.scene.tweens.stagger(100),
            onComplete:(tween, targets, param)=>{
                hitText.destroy();
            }
        });

        this.destruir();
    }
}
