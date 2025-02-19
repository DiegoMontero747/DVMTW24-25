import Phaser from 'phaser';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class orc2 extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'orc2');	
        this.score = 0;
        //Auxiliares para animaciones
        let escala=1.5;
        this.facing="right";
        this.anims.createFromAseprite('orc2');
        this.scale=escala;
        var tileSize=48;
        this.marker = this.scene.add.graphics();
        this.marker.lineStyle(2, 0xFFFFFF, 1);  
        this.marker.strokeRect(0, 0, tileSize, tileSize);
        this.container= this.scene.add.container(0,0)
        this.container.add(this.marker);
        this.playerPreview= this.scene.add.sprite(24,16,"orc2");
        this.playerPreview.setScale(escala);
        this.playerPreview.anims.createFromAseprite('orc2');
        this.playerPreview.setAlpha(0.6);
        this.container.add(this.playerPreview);
        this.container.setVisible(false);
        //let color=this.postFX.addColorMatrix();
        //color.hue(45*5,true);
        //Auxiliares de movimiento grid con fisicas
        this.isMoving=false;
        this.goal_x=this.x;
        this.goal_y=this.y;
        this.lastGridX=this.x;
        this.lastGridY=this.y;

        this.scene.add.existing(this);
        // Queremos que el jugador no se salga de los límites del mundo
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds();
        // Esta label es la UI en la que pondremos la puntuación del jugador
        //this.label = this.scene.add.text(10, 10, "", {fontSize: 20});
        this.cursors = this.scene.input.keyboard.createCursorKeys();
        this.updateScore();


        this.play({key:'iddle_right',repeat:-1});
        
        //pixeles que se mueve
        this.moveDist=48;
        
        //re-ajuste de collision box 
        const cbWidth=32/escala,cbHeight=32/escala,cbOffsetX=21.5,cbOffsetY=27; //Colision parcial (64x64)
        //const cbWidth=32,cbHeight=32,cbOffsetX=64,cbOffsetY=70; //Colision parcial (160x128)
        //const cbWidth=48,cbHeight=48,cbOffsetX=8,cbOffsetY=32; //Cuadrado grid completo
        this.body.setSize(cbWidth,cbHeight,true);
        this.body.setOffset(cbOffsetX,cbOffsetY);

        const shape = new Phaser.Geom.Rectangle(cbOffsetX,cbOffsetY,cbWidth,cbHeight);

        this.setInteractive(this.scene.input.makePixelPerfect());
        this.on('pointerover',function (event)
        {
            this.effect=this.postFX.addGlow();
        });
        this.on('pointerout', function (event)
        {
            this.postFX.remove(this.effect);
        });
        this.on('pointerup', function (event)
        {   
            /* this.x-=this.scene.container.x;this.y-=this.scene.container.y;
            this.scene.container.add(this); */
            console.log(this.anims.currentAnim.key);
            console.log(this.playerPreview.anims);
            this.playerPreview.play({key:this.anims.currentAnim.key,repeat:-1});
            this.container.setVisible(!this.container.visible);
        });

        this.scene.input.on('pointerdown',this.player_tp,this);//listener para tp de player


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
        //this.label.text = 'Score: ' + this.score;
    }



    /**
     * Gestiona el movimiento grid cambiando las coordenadas 
     * del jugador a la posicion correspondiente directamente
    */
    teleport_grid_movement(){
        if (this.scene.input.keyboard.checkDown(this.cursors.up,100)) {
            this.y-=this.moveDist;
            this.play({key:'iddle_up',repeat:-1});
        } 
        else if (this.scene.input.keyboard.checkDown(this.cursors.down,100)) {
            this.y+=this.moveDist;
            this.play({key:'iddle_down',repeat:-1});

        } 
        else if (this.scene.input.keyboard.checkDown(this.cursors.left,100)) {
            this.x-=this.moveDist;
            this.play({key:'iddle_left',repeat:-1});
        }
        else if (this.scene.input.keyboard.checkDown(this.cursors.right,100)) {
            this.x+=this.moveDist;
            this.play({key:'iddle_right',repeat:-1});
        }
    }

    /**
     *Gestiona movimiento 4-direccional mediante fisica
     */
    physics_4way_movement(){
        const velocity=200;
        if (this.cursors.up.isDown) {
            this.body.setVelocityY(-velocity);
            this.body.setVelocityX(0);
            this.play({key:'walk_up'},true);
            this.facing="up";
        }
        else if (this.cursors.down.isDown) {
            this.body.setVelocityY(velocity);
            this.body.setVelocityX(0);
            this.play({key:'walk_down'},true);
            this.facing="down";
        } 
        else if (this.cursors.right.isDown) {
            this.body.setVelocityX(velocity);
            this.body.setVelocityY(0);
            this.play({key:'walk_right'},true);
            this.facing="right";
        }
        else if (this.cursors.left.isDown) {
            this.body.setVelocityX(-velocity);
            this.body.setVelocityY(0);
            this.play({key:'walk_left'},true);
            this.facing="left";
        }
        else {
            this.play({key:'iddle_'+this.facing},true);
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
        }
    }

    /**
     * Gestiona movimiento grid mediante fisica
     */
    physics_grid_movement(dt){
        const velocity=200;
        if(this.isMoving==false){
            if (this.cursors.up.isDown) {
                this.body.setVelocityY(-velocity);
                this.goal_y=this.lastGridY-this.moveDist;
                this.play({key:'walk_up'},true);
                this.facing="up";
                this.isMoving=true;
                this.lastMoveDt=dt;
            }
            else if (this.cursors.down.isDown) {
                this.body.setVelocityY(velocity);
                this.goal_y=this.lastGridY+this.moveDist;
                this.play({key:'walk_down'},true);
                this.facing="down";
                this.isMoving=true;
                this.lastMoveDt=dt;
            } 
            else if (this.cursors.right.isDown) {
                this.body.setVelocityX(velocity);
                this.goal_x=this.lastGridX+this.moveDist;
                this.play({key:'walk_right'},true);
                this.facing="right";
                this.isMoving=true;
                this.lastMoveDt=dt;
            }
            else if (this.cursors.left.isDown) {
                this.body.setVelocityX(-velocity);
                this.goal_x=this.lastGridX-this.moveDist;
                this.play({key:'walk_left'},true);
                this.facing="left";
                this.isMoving=true;
                this.lastMoveDt=dt;
            }
            else if (this.cursors.space.isDown) {
                this.play({key:'attack_'+this.facing},true);
                this.isMoving=true;
                this.lastMoveDt=dt;
            }
            else {
                this.isMoving==false;
                this.play({key:'iddle_'+this.facing,repeat:-1},true);
                this.body.setVelocityX(0);
                this.body.setVelocityY(0);
            }
        }
        else if(this.checkMoveTimeLimit(dt)){
            /*this.x=this.lastGridX;
            this.y=this.lastGridY;*/
            this.goal_x=this.lastGridX;
            this.goal_y=this.lastGridY;
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.isMoving=false;
        }else if(this.checkInGoalPositionProximity()){
            this.lastGridX=this.goal_x;
            this.lastGridY=this.goal_y;
            /*this.x=this.goal_x;
            this.y=this.goal_y;*/
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.isMoving=false;
        }
        //console.log(this.goal_x +" "+this.goal_y);
    }

    /**
     * Comprueba si ha pasado mas tiempo del permitido para un movimiento
     */
    checkMoveTimeLimit(dt){
        const timeLimit=360,delta_ellapsed=dt-this.lastMoveDt;
        //console.log(delta_ellapsed);
        return delta_ellapsed> timeLimit;
    }
    /**
     * Comprueba si estamos proximos a la posicion objetivo del movimiento
     *  en el eje de coordenadas significativo para este.
     */
    checkInGoalPositionProximity(){
        const error=2, deltaX=Math.abs(this.x-this.goal_x) ,deltaY=Math.abs(this.y-this.goal_y);
        if(this.facing=="up" || this.facing=="down") return deltaY<error;
        else if(this.facing=="right" || this.facing=="left")return deltaX<error;
        else return false;
    }

    /**
     * Gestiona movimiento de teletransporte
     */
    player_tp(){
        if(this.container.visible){
        const x=this.container.x+24, y =this.container.y+16; 
        this.container.setVisible(false);
        this.x=x;
        this.y=y;
        this.goal_x=x;
        this.lastGridX=x;
        this.goal_y=y;
        this.lastGridY=y;
        }
    }
    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
        if(this.scene.activeCharacter=="orc")this.physics_grid_movement(t);
        this.container.x=this.scene.pointerGridX;
        this.container.y=this.scene.pointerGridY;
    }

}
