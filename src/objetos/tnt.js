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
    
        this.hp -= cantidad; // Resta vida a la TNT
        console.log(`TNT golpeada, HP restante: ${this.hp}`);
    
        if (this.hp <= 0) {
            console.log("💥 TNT explotando...");
            this.scene.time.delayedCall(100, () => this.explotar(), [], this); // Pequeño retardo para la cadena
        }
    }
    
    explotar() {
        const radioExplosion = 32;  // Ajusta el radio según lo necesario
        this.scene.cameras.main.shake(300, 0.02);
    
        // Crear el área de explosión con física
        this.explosionArea = this.scene.add.circle(this.x, this.y, radioExplosion, 0xff0000).setVisible(false);
        this.scene.physics.add.existing(this.explosionArea, false); // `false` para que sea estático
    
        // Asegurar que tenga un cuerpo físico con un radio correcto
        this.explosionArea.body.setCircle(radioExplosion, -radioExplosion / 2, -radioExplosion / 2);
        this.explosionArea.body.setImmovable(true);  // No debe moverse
    
        // 🔹 DEBUG: Verificar si tiene un cuerpo físico
        console.log("Cuerpo físico de explosionArea:", this.explosionArea.body);
    
        // Detectar colisión con objetos destructibles
        this.scene.physics.overlap(this.explosionArea, this.scene.objetosDestructibles, (explosion, objeto) => {
                console.log("KABOOOOOOM", objeto);
    
                if (typeof objeto.onHit === "function") {
                    console.log(`Ejecutando onHit para ${objeto.texture ? objeto.texture.key : "Objeto desconocido"}`);
                    objeto.onHit(20);
                } else {
                    console.error(`onHit no es una función en:`, objeto);
                }
        });
    
        // Animación de explosión
        let kaboom = this.scene.add.sprite(this.x, this.y, "KABOOM");
        kaboom.anims.createFromAseprite("KABOOM");
        kaboom.play("Explosion").on("animationcomplete", function () {
            kaboom.destroy();
        });
    
        // Esperar antes de destruir la explosión
        this.scene.time.delayedCall(100, () => {
            this.explosionArea.destroy();
            this.destruir();
        });
    }
}