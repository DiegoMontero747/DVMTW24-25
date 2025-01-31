import Phaser from 'phaser';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player');	
        this.score = 0;
	
        this.scene.add.existing(this);
        // Queremos que el jugador no se salga de los límites del mundo
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        // Esta label es la UI en la que pondremos la puntuación del jugador
        this.label = this.scene.add.text(10, 10, "", {fontSize: 20});
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.updateScore();


        this.play({key:'iddle',repeat:-1});
        
        //pixeles que se mueve
        this.moveDist=48;
        
        //re-ajuste de collision box
        this.body.setSize(48,16,true);
        this.body.setOffset(8,40);
    }

    /**
     * El jugador ha recogido una estrella por lo que este método añade un punto y
     * actualiza la UI con la puntuación actual.
     */
    point() {
        this.score++;
        this.updateScore();
        this.play('attack');
        this.chain({key:'iddle',repeat:-1});
    }

    /**
     * Actualiza la UI con la puntuación actual
     */
    updateScore() {
        this.label.text = 'Score: ' + this.score;
    }



    
    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if (this.scene.input.keyboard.checkDown(this.cursors.up,100)) {
            this.y-=this.moveDist;
        } 
        else if (this.scene.input.keyboard.checkDown(this.cursors.down,100)) {
            this.y+=this.moveDist;
        } 
        else if (this.scene.input.keyboard.checkDown(this.cursors.left,100)) {
            this.x-=this.moveDist;
        }
        else if (this.scene.input.keyboard.checkDown(this.cursors.right,100)) {
            this.x+=this.moveDist;
        }
    }

}
