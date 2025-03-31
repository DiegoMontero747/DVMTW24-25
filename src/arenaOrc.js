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

        this.hp=5;
        this.maxHp=5;

        this.score = 0;
        //Auxiliares para animaciones
        let escala=1;
        this.facing="left";
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

        /* this.attackArea=this.scene.add.rectangle(this.x,this.y+5, 128, 128, 0xff0000,0.25).setVisible(false);
        this.attackArea.setStrokeStyle(1, 0xff0000, 1); */

        this.addAttackArea("directional");
        this.moveArea=new Phaser.Geom.Rectangle(0,0, 200, 200)//this.scene.add.rectangle(this.x,this.y+5, 200, 200, 0x0080ff,0.25);
        this.moveAreaGraphics=this.scene.add.graphics().setVisible(false);
        this.moveAreaGraphics.lineStyle(1, 0x0069ff, 1);  
        this.moveAreaGraphics.fillStyle("0x0069ff",0.25);
        Phaser.Geom.Rectangle.CenterOn(this.moveArea,this.x,this.y+5);
        this.moveAreaGraphics.fillRectShape(this.moveArea);
        this.moveAreaGraphics.strokeRectShape(this.moveArea);

        this.scene.add.existing(this);
        // Queremos que el jugador no se salga de los límites del mundo
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true,false,false,true);
        this.body.setBoundsRectangle(this.moveArea);

        // Esta label es la UI en la que pondremos la puntuación del jugador
        //this.label = this.scene.add.text(10, 10, "", {fontSize: 20});
        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.play({key:'iddle_'+this.facing,repeat:-1});
        
        //pixeles que se mueve
        this.moveDist=48;
        
        //re-ajuste de collision box 
        const cbWidth=22.25,cbHeight=22.25,cbOffsetX=21.5,cbOffsetY=27; //Colision parcial (64x64)
        //const cbWidth=32,cbHeight=32,cbOffsetX=64,cbOffsetY=70; //Colision parcial (160x128)
        //const cbWidth=48,cbHeight=48,cbOffsetX=8,cbOffsetY=32; //Cuadrado grid completo
        this.body.setSize(cbWidth,cbHeight,true);
        this.body.setOffset(cbOffsetX,cbOffsetY);

        const shape = new Phaser.Geom.Rectangle(cbOffsetX,cbOffsetY,cbWidth,cbHeight);

        this.setInteractive(this.scene.input.makePixelPerfect());
        this.on('pointerover',function (event){
            this.scene.sound.play("touchUISound");
            this.scene.changeStatsUI("orc",this.hp,this.maxHp);
            this.scene.showStatsUI();
            if(this.scene.turn=="player" /*&& this.scene.physics.overlap(this.scene.player.attackArea, this.body)*/) this.effect=this.postFX.addGlow("0xc4180f");
            else this.effect=this.postFX.addGlow();
        });
        this.on('pointerout', function (event)
        {
            this.postFX.remove(this.effect);
            this.scene.hideStatsUI();
        });
        this.on('pointerup', function (event)
        {   
            /* this.x-=this.scene.container.x;this.y-=this.scene.container.y;
            this.scene.container.add(this); */
            if(this.scene.turn=="enemy"){
                console.log(this.anims.currentAnim.key);
                console.log(this.playerPreview.anims);
                this.playerPreview.play({key:this.anims.currentAnim.key,repeat:-1});
                this.container.setVisible(!this.container.visible);
            }
            if(this.scene.turn=="player" && this.scene.attackArea &&this.scene.physics.overlap(this.scene.attackArea, this.body)){ 
                this.onHit(1);
                this.emit("enemy_hitted");
            };
        });

        this.scene.input.on('pointerdown',this.player_tp,this);//listener para tp de player


    }
    createBlood(){
        let blood= this.scene.add.sprite(this.x,this.y-22,"blood").setDepth(this.depth+1).setScale(0.5);
        blood.anims.createFromAseprite("blood");
        let splatterFade=this.scene.tweens.add({
            targets: [blood],
            alpha: 0,
            ease: 'linear',
            duration: 1000,
            onComplete:(tween, targets, param)=>{
                blood.destroy();
            }
        }).pause();
        blood.play("splatter").on("animationcomplete",()=>{blood.setDepth(blood.depth-1);splatterFade.resume()});
    }

    checkHit(){
        if(this.scene.physics.overlap(this.scene.attackArea, this.body))this.onHit(this.scene.attackEffect.dmg)
    }

    onHit(dmg){
        this.scene.sound.play("hitSound");
        this.scene.cameras.main.shake(300,0.001);
        this.createBlood();
        this.hp-=dmg;
        this.scene.changeStatsUI("orc",this.hp,this.maxHp);
        let offsetY=Math.random()*(15)+5
        let offsetX=Math.random()*(35)-20
        console.log("Done "+dmg+" dmg points, orc has "+this.hp+" hp left");
        let hitText=this.scene.add.text(this.x,this.y-offsetY,"-"+dmg).setDepth(this.depth+1);
        const hitTextAnim=this.scene.tweens.add({
            targets: [hitText],
            scale: 0.2,
            x:this.x+offsetX,
            ease: 'linear',
            duration: 1000,
            delay: this.scene.tweens.stagger(100),
            onComplete:(tween, targets, param)=>{
                hitText.destroy();
            }
        });
        this.setTintFill(0xffffff);
        this.scene.time.addEvent({
            delay:130,
            callbackScope:this,
            callback:()=>{this.clearTint()}
        })
        if(this.hp<=0){ console.log("Ripperoni in peperonni");
            this.scene.sound.play("wilhelm");
            const deadAnim=this.scene.tweens.add({
                targets: [this],
                scale: 0.2,
                angle:-190,
                ease: 'linear',
                duration: 500,
                delay: this.scene.tweens.stagger(100),
                onComplete:(tween, targets, param)=>{
                    this.onDeath();
                }
            });
        }
    }

    onDeath(){
        this.dirAttackArea[this.facing].setVisible(false);
        this.destroy();
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
        else if (this.isMoving==false){
            this.play({key:'iddle_'+this.facing,repeat:-1},true);
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

    addAttackArea(type){
        this.attackAreaOffsetX=0;
        this.attackAreaOffsetY=7;
        switch(type){
            case "circle":
                this.attackAreaType="circle"
                this.attackArea=this.scene.add.circle(this.x+this.attackAreaOffsetX,this.y+this.attackAreaOffsetY, 64, 0xff0000,0.25).setVisible(false);
                this.attackArea.setStrokeStyle(1, 0xff0000, 1);
                this.attackArea.setDepth(this.depth+1);
                this.scene.physics.add.existing(this.attackArea);
                this.attackArea.body.setCircle(64);
            break;
            case "rectangle":
                this.attackAreaType="rectangle"
                this.attackArea=this.scene.add.rectangle(this.x+ this.attackAreaOffsetX,this.y+this.attackAreaOffsetY, 128,128, 0xff0000,0.25).setVisible(false);
                this.attackArea.setStrokeStyle(1, 0xff0000, 1);
                this.attackArea.setDepth(this.depth+1);
                this.scene.physics.add.existing(this.attackArea);
            break;
            case "directional":
                this.attackAreaType="directional"
                const dirs=["up","down","left","right"];
                const offsets=[{x:0,y:-37+this.attackAreaOffsetY},{x:0,y:37+this.attackAreaOffsetY},{x:-37,y:this.attackAreaOffsetY},{x:37,y:this.attackAreaOffsetY}];
                const sizes=[{x:64,y:64},{x:64,y:64},{x:64,y:64},{x:64,y:64}];
                const rotations=[0,Math.PI,(3*Math.PI)/2,Math.PI/2];
                this.dirAttackArea={};
                this.attackAreaContainer=this.scene.add.container(this.x,this.y).setDepth(this.depth+1);
                this.attackCursorContainer=this.scene.add.container(this.x,this.y).setDepth(20);

                for(let i=0;i<dirs.length;i++){
                    this.dirAttackArea[dirs[i]]=this.scene.add.rectangle( offsets[i].x, offsets[i].y, sizes[i].x,sizes[i].y, 0xff0000,0.25).setVisible(false);
                    this.dirAttackArea[dirs[i]].setStrokeStyle(1, 0xff0000, 1);
                    this.dirAttackArea[dirs[i]].setDepth();
                    this.scene.physics.add.existing(this.dirAttackArea[dirs[i]]);
                    let dirSelector=this.scene.add.image(offsets[i].x, offsets[i].y,"dirCursor").setScale(0.8).setRotation(rotations[i]);
                    dirSelector.setInteractive(this.scene.input.makePixelPerfect());
                    dirSelector.on('pointerover', () => {
                        this.scene.sound.play("touchUISound");
                        this.dirAttackArea[dirs[i]].setVisible(true);
                        this.scene.tweens.add({
                            targets: [dirSelector],
                            scale:{from:0.8,to:1.0},
                            ease:'power1',
                            duration: 300,
                        });
                        dirSelector.setTint(0xcccccc);
                    });
                    dirSelector.animationPlaying=false;
                    dirSelector.setVisible(false);
                    dirSelector.on('showSelector', () => {
                        if(!dirSelector.animationPlaying){
                            if(dirSelector.visible){
                                dirSelector.animationPlaying=true;
                                this.attackCursorContainer.setDepth(this.depth-1)
                                this.scene.tweens.add({
                                    targets: [dirSelector],
                                    x:{from:offsets[i].x,to:0},
                                    y:{from:offsets[i].y,to:0},
                                    ease:'power1',
                                    duration: 250,
                                    onComplete:()=>{
                                        dirSelector.setVisible(false);
                                        dirSelector.animationPlaying=false;
                                    }
                                });
                            }
                            else{
                                dirSelector.setVisible(true);
                                dirSelector.animationPlaying=true;
                                this.scene.tweens.add({
                                    targets: [dirSelector],
                                    depth:0,
                                    x:{from:0,to:offsets[i].x},
                                    y:{from:0,to:offsets[i].y},
                                    ease:'power1',
                                    duration: 300,
                                    onComplete:()=>{this.attackCursorContainer.setDepth(20)
                                        dirSelector.animationPlaying=false;
                                    }
                                });
                            }
                        }
                    });
                    dirSelector.on('pointerout', () => {
                        if(this.selectedAttackDir!=dirs[i])
                            this.dirAttackArea[dirs[i]].setVisible(false);
                        this.scene.tweens.add({
                            targets: [dirSelector],
                            scale:{from:1.0,to:0.8},
                            ease:'power1',
                            duration: 300,
                        });
                        dirSelector.clearTint();
                    });
                    dirSelector.on('pointerup', () => {
                        this.selectedAttackDir=dirs[i];
                        this.scene.sound.play("woodButton");
                        this.scene.tweens.add({
                            targets: [dirSelector],
                            scale:{from:1.4,to:1.0},
                            ease:'power1',
                            duration: 200,
                        });
                        this.scene.enemyAttackArea=this.dirAttackArea[dirs[i]];
                        this.facing=dirs[i];
                        //this.playAttack();
                        //this.scene.checkHits();
                        dirSelector.clearTint();
                    });
                    this.attackAreaContainer.add(this.dirAttackArea[dirs[i]]);
                    this.attackCursorContainer.add(dirSelector);
                }
                //this.attackContainer.add(new Phaser.GameObjects.Rectangle(this.scene,this.x+ offsets[i].x,this.y+ offsets[i].y, sizes[i].x,sizes[i].y, 0xff0000,0.2))

            break;
        }
    }

    centerAttackArea(type){
        switch(type){
            case "circle":
                this.attackArea.x= this.x+this.attackAreaOffsetX;
                this.attackArea.y=this.y+this.attackAreaOffsetY;
            break;

            case "rectangle":
                this.attackArea.x= this.x+this.attackAreaOffsetX;
                this.attackArea.y=this.y+this.attackAreaOffsetY;
            break;

            case "directional":
                this.attackAreaContainer.x= this.x;
                this.attackAreaContainer.y=this.y;
                this.attackCursorContainer.x=this.x;
                this.attackCursorContainer.y=this.y;
            break;
        }
    }

    showAttackControls(){
        this.attackCursorContainer.each((cursor)=>{cursor.emit("showSelector")});
    }

    /**
     * Gestiona movimiento de teletransporte
     */
    player_tp(){
        if(this.container.visible && this.scene.activeCharacter){
        const x=this.container.x+24, y =this.container.y+16; 
        this.container.setVisible(false);
        this.x=x;
        this.y=y;
        this.goal_x=x;
        this.lastGridX=x;
        this.goal_y=y;
        this.lastGridY=y;
        this.emit("enemy_End_Turn");
        }
    }

    onTurnStart(){
        //Volver a pintar el area de movimiento
        Phaser.Geom.Rectangle.CenterOn(this.moveArea,this.x,this.y+5);
        this.moveAreaGraphics.clear();
        this.moveAreaGraphics.lineStyle(1, 0x0069ff, 1);  
        this.moveAreaGraphics.fillStyle("0x0069ff",0.25);
        this.moveAreaGraphics.fillRectShape(this.moveArea);
        this.moveAreaGraphics.strokeRectShape(this.moveArea);
        this.setDepth(2);
        this.isMoving=true;
        if(this.gotTurn){
        this.play({key:'attack_'+this.facing},true);
        this.scene.checkPlayerHit();
        this.once("animationcomplete",()=>{
            this.moveToPlayer();
        });
        }else{
            this.gotTurn=true;
            this.moveToPlayer();
        }
        //Animacion personaje activo
        this.scene.tweens.add({
            targets: [this],
            scale:{from:1,to:1.10},
            ease:'linear',
            duration: 220,
            yoyo:true,
        });
    }
    moveToPlayer(){
        this.isMoving=false;
        this.dirAttackArea[this.facing].setVisible(false);
        this.stopped=false;
        this.hasMoved=false;
        this.scene.physics.moveTo(this,this.scene.player.x,this.scene.player.y,100,2000);
    }

    onTurnEnd(){
        this.moveAreaGraphics.fillRectShape(this.moveArea).setVisible(false);
        //this.attackArea.setVisible(false);
        this.setDepth(1);
    }

    playAttack(){
        this.isMoving=true;
        this.play({key:'attack_'+this.facing},true);
        this.once("animationcomplete",()=>{console.log("complete");this.isMoving=false;});
        //this.chain({key:'iddle_'+this.facing,repeat:-1},true);
    }

    setAnim(){
        if(this.isMoving==false){
            if(this.body.velocity.y>0 && Math.abs(this.body.velocity.y)>Math.abs(this.body.velocity.x)){
                this.play({key:'walk_down',repeat:-1},true)
                this.facing="down"
            }else if(this.body.velocity.y<0 && Math.abs(this.body.velocity.y)>Math.abs(this.body.velocity.x)){
                this.play({key:'walk_up',repeat:-1},true)
                this.facing="up"
            }
            else if(this.body.velocity.x>0){
                this.play({key:'walk_right',repeat:-1},true)
                this.facing="right"
            }else if(this.body.velocity.x<0){
                this.play({key:'walk_left',repeat:-1},true)
                this.facing="left"
            }else this.play({key:'iddle_'+this.facing,repeat:-1},true)
        }
    }
    stopNearPlayer(){
        const dist=40;
        if(Phaser.Math.Distance.BetweenPoints(this.scene.player, this)<dist && this.hasMoved){
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            if(!this.stopped) this.scene.events.emit("enemy_turn_end");
            this.stopped=true;
        }else{
            this.hasMoved=true;
        }
    }

    setAttackArea(){
        if(this.facing && this.stopped && this.gotTurn){
            this.dirAttackArea[this.facing].setVisible(true);
            this.scene.enemyAttackArea=this.dirAttackArea[this.facing];
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
        this.container.x=this.scene.pointerGridX;
        this.container.y=this.scene.pointerGridY;
        this.stopNearPlayer();
        this.setAnim();
        this.setAttackArea();
        /* this.attackArea.x= this.x;
        this.attackArea.y=this.y+5; */
        this.centerAttackArea(this.attackAreaType);
    }

}
