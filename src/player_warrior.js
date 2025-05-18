import Phaser from 'phaser';

/**
 * Clase que representa el jugador del juego. El jugador se mueve por el mundo usando los cursores.
 * También almacena la puntuación o número de estrellas que ha recogido hasta el momento.
 */
export default class Player_warrior extends Phaser.GameObjects.Sprite {

    /**
     * Constructor del jugador
     * @param {Phaser.Scene} scene Escena a la que pertenece el jugador
     * @param {number} x Coordenada X
     * @param {number} y Coordenada Y
     */
    constructor(scene, x, y) {
        super(scene, x, y, 'player_warrior');	
        this.score = 0;
        this.godMode=false;
        //Auxiliares para animaciones
        this.facing="right";
        this.anims.createFromAseprite('player_warrior');
        this.scale=2/3;
        var tileSize=48;
        this.marker = this.scene.add.graphics();
        this.marker.lineStyle(2, 0xFFFFFF, 1);  
        this.marker.strokeRect(0, 0, tileSize, tileSize);
        this.container= this.scene.add.container(0,0)
        this.container.add(this.marker);
        this.playerPreview= this.scene.add.sprite(24,0,"player_warrior");
        this.playerPreview.anims.createFromAseprite('player_warrior');
        this.playerPreview.setAlpha(0.6);
        this.container.add(this.playerPreview);
        this.container.setVisible(false);
        this.container.setScale(this.scale);
        this.hp=10;
        this.maxHp=10;
        this.actionsRemaining=0;
        this.maxActions=2;

        this.freeMove=false;

        this.attackAreaType="directional";
        this.addAttackArea(this.attackAreaType);

        this.moveArea=new Phaser.Geom.Circle(this.x,this.y+14,75);
        this.moveAreaGraphics=this.scene.add.graphics().setVisible(false);
        this.moveAreaGraphics.lineStyle(1, 0x0069ff, 0.50);  
        this.moveAreaGraphics.fillStyle("0x0069ff",0.20);
        this.moveAreaGraphics.fillCircleShape(this.moveArea);
        this.moveAreaGraphics.strokeCircleShape(this.moveArea);

        console.log()
        //this.scene.physics.add(this.attackArea);

        //Auxiliares de movimiento grid con fisicas
        this.isMoving=false;
        this.goal_x=this.x;
        this.goal_y=this.y;
        this.lastGridX=this.x;
        this.lastGridY=this.y;

        this.scene.add.existing(this);
        // Queremos que el jugador no se salga de los límites del mundo
        this.scene.physics.add.existing(this);
        this.body.setCollideWorldBounds(true,false,false,true);
        //console.log(this.body);
        //this.body.setBoundsRectangle(this.moveArea);


        // Esta label es la UI en la que pondremos la puntuación del jugador
        //this.label = this.scene.add.text(10, 10, "", {fontSize: 20});
        this.cursors =  this.scene.input.keyboard.addKeys({ up: 'W', left: 'A', down: 'S', right: 'D' });

        this.play({key:'iddle_right',repeat:-1});
        
        //pixeles que se mueve
        this.moveDist=tileSize;
        
        //re-ajuste de collision box 
        //const cbWidth=32,cbHeight=32,cbOffsetX=16,cbOffsetY=40; //Colision parcial (64x64)
        const cbWidth=32,cbHeight=32,cbOffsetX=64,cbOffsetY=72; //Colision parcial (160x128)
        //const cbWidth=48,cbHeight=48,cbOffsetX=8,cbOffsetY=32; //Cuadrado grid completo
        this.body.setSize(cbWidth,cbHeight,true);
        this.body.setOffset(cbOffsetX,cbOffsetY);

        const shape = new Phaser.Geom.Rectangle(cbOffsetX,cbOffsetY,cbWidth,cbHeight);

        this.setInteractive(this.scene.input.makePixelPerfect());
        this.on('pointerover',function (event)
        {
            this.scene.sound.play("touchUISound");
            this.scene.changeStatsUI("warrior",this.hp,this.maxHp);
            this.scene.showStatsUI();
            //if(this.scene.turn=="enemy" && this.scene.physics.overlap(this.scene.orc.attackArea, this.body)) this.effect=this.postFX.addGlow("0xc4180f");
            /*else*/ this.effect=this.postFX.addGlow();
        });
        this.on('pointerout', function (event)
        {
            this.scene.hideStatsUI();
            this.postFX.remove(this.effect);
        });
        this.on('pointerup', function (event)
        {   
            /* this.x-=this.scene.container.x;this.y-=this.scene.container.y;
            this.scene.container.add(this); */
            /* if(this.scene.turn=="player"){
                this.playerPreview.play({key:this.anims.currentAnim.key,repeat:-1});
                this.container.setVisible(!this.container.visible);
            }
            if(this.scene.turn=="enemy" && this.scene.physics.overlap(this.scene.orc.attackArea, this.body)){ 
                this.onHit(1);
                this.emit("player_hitted");
            }; */
        });

        this.scene.input.on('pointerdown',this.player_tp,this);//listener para tp de player
    }

    createBlood(){
        let blood= this.scene.add.sprite(this.x,this.y-12,"blood").setDepth(this.depth+1).setScale(0.5);
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


    onHit(dmg){
        if(this.godMode)
            return
        this.scene.sound.play("hitSound");
        this.scene.cameras.main.shake(300,0.001);
        this.createBlood();
        this.hp-=dmg;
        this.scene.changeStatsUI("warrior",this.hp,this.maxHp);
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
            this.scene.sound.play("wilhelm").vol;
            const deadAnim=this.scene.tweens.add({
                targets: [this],
                scale: 0.2,
                angle:-190,
                ease: 'linear',
                duration: 500,
                delay: this.scene.tweens.stagger(100),
                onComplete:(tween, targets, param)=>{
                    this.onDeath();
                    //this.destroy();
                }
            });
        }
    }

    onDeath(){
        this.scene.events.emit("gameOver");
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



    physics_combat_movement(){
        const velocity=200;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);

        if (this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.facing="up";
            if((this.moveArea.contains(this.body.center.x,this.body.top) && this.moveAreaGraphics.visible) || this.freeMove){
                this.body.setVelocityY(-1);
                if(!this.cursors.right.isDown && !this.cursors.left.isDown)this.play({key:'walk_up'},true);
            }else{
                if(typeof this.scene.playCollideEffect=='function'){//TODO puede ser mejor pasar ha gestionar con emit event
                    this.scene.playCollideEffect();
                }
            }
        }
        else if (this.cursors.down.isDown && !this.cursors.up.isDown) {
            this.facing="down";
            if((this.moveArea.contains(this.body.center.x,this.body.bottom) && this.moveAreaGraphics.visible) || this.freeMove){
                this.body.setVelocityY(1);
                if(!this.cursors.right.isDown && !this.cursors.left.isDown)this.play({key:'walk_down'},true);
            }else{
                if(typeof this.scene.playCollideEffect=='function'){//TODO puede ser mejor pasar ha gestionar con emit event
                    this.scene.playCollideEffect();
                }            
            }
        } 
        if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            this.facing="right";
            if((this.moveArea.contains(this.body.right,this.body.center.y) && this.moveAreaGraphics.visible) || this.freeMove){
                this.body.setVelocityX(1);
                this.play({key:'walk_right'},true);
            }else{
                if(typeof this.scene.playCollideEffect=='function'){//TODO puede ser mejor pasar ha gestionar con emit event
                    this.scene.playCollideEffect();
                }
            }
        }
        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.facing="left";
            if((this.moveArea.contains(this.body.left,this.body.center.y) && this.moveAreaGraphics.visible) || this.freeMove){
                this.body.setVelocityX(-1);
                this.play({key:'walk_left'},true);
            }else{
                if(typeof this.scene.playCollideEffect=='function'){//TODO puede ser mejor pasar ha gestionar con emit event
                    this.scene.playCollideEffect();
                }
            }
        }
        if(this.body.velocity.x==0 && this.body.velocity.y==0 && this.isMoving==false){
            this.play({key:'iddle_'+this.facing,repeat:-1},true);
        }else{
            this.body.velocity.setLength(velocity);
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
            if (this.cursors.up.isDown ) {
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

    playAttack(){
        this.isMoving=true;
        this.play({key:'attack_'+this.facing},true);
        this.scene.sound.play("swingSound");
        this.once("animationcomplete",()=>{
            if(this.freeMove==false){
                this.actionsRemaining--;
            }
            if(this.actionsRemaining<=0)                        
                this.scene.events.emit("enemy_turn_start");
            this.isMoving=false;
        });
        this.chain({key:'iddle_'+this.facing,repeat:-1},true);
    }

    onTurnStart(){

        this.actionsRemaining=this.maxActions;
        //Volver a pintar el area de movimiento
        this.scene.attackArea=this.attackArea;
        this.attackEffect={dmg:2*this.scene.datosPlayer.level,push:{x:15,y:0}}
        this.scene.attackEffect=this.attackEffect;
        this.setDepth(this.depth+1);
        this.moveArea.setPosition(this.x,this.y+14);
        this.moveAreaGraphics.clear();
        this.moveAreaGraphics.lineStyle(1, 0x0069ff, 1);  
        this.moveAreaGraphics.fillStyle("0x0069ff",0.25);
        this.moveAreaGraphics.fillCircleShape(this.moveArea);
        this.moveAreaGraphics.strokeCircleShape(this.moveArea);
        //Animacion personaje activo
        this.scene.tweens.add({
            targets: [this],
            scale:{from:2/3,to:6/8},
            ease:'linear',
            duration: 220,
            yoyo:true,
        });
        this.checkedHit=false;
        /* if(this.freeMove==false){
            this.moveAreaGraphics.setVisible(true);
        } */
        this.scene.changeStatsUI("warrior",this.hp,this.maxHp);
        this.scene.showStatsUI();
    }
    onTurnEnd(){
        this.stopMoving();
        this.moveAreaGraphics.fillRectShape(this.moveArea).setVisible(false);
        //this.attackArea.setVisible(false);
        this.setDepth(this.depth-1);
        this.scene.checkPlayerOutCombatArea();
    }

    setFreeMovement(bool){
        this.freeMove=bool;
    }
    resetMoveArea(){
        if(this.actionsRemaining>0){
            this.actionsRemaining--;
            this.moveArea.setPosition(this.x,this.y+14);
            this.moveAreaGraphics.clear();
            this.moveAreaGraphics.lineStyle(1, 0x0069ff, 1);  
            this.moveAreaGraphics.fillStyle("0x0069ff",0.25);
            this.moveAreaGraphics.fillCircleShape(this.moveArea);
            this.moveAreaGraphics.strokeCircleShape(this.moveArea);
            this.moveAreaGraphics.setVisible(true);
        }  
    }


    addAttackArea(type){
        this.attackAreaOffsetX=0;
        this.attackAreaOffsetY=14;
        switch(type){
            case "circle":
                this.attackArea=this.scene.add.circle(this.x+this.attackAreaOffsetX,this.y+this.attackAreaOffsetY, 64, 0xff0000,0.25).setVisible(false);
                this.attackArea.setStrokeStyle(1, 0xff0000, 1);
                this.attackArea.setDepth(this.depth+1);
                this.scene.physics.add.existing(this.attackArea);
                this.attackArea.body.setCircle(64);
            break;
            case "rectangle":
                this.attackArea=this.scene.add.rectangle(this.x+ this.attackAreaOffsetX,this.y+this.attackAreaOffsetY, 128,128, 0xff0000,0.25).setVisible(false);
                this.attackArea.setStrokeStyle(1, 0xff0000, 1);
                this.attackArea.setDepth(this.depth+1);
                this.scene.physics.add.existing(this.attackArea);
            break;
            case "directional":
                const dirs=["up","down","left","right"];
                //const offsetsAreas=[{x:6,y:-30},{x:6,y:37+this.attackAreaOffsetY},{x:-44,y:this.attackAreaOffsetY+6},{x:37,y:this.attackAreaOffsetY+6}];
                const offsetsAreas=[{x:0,y:-7},{x:0,y:20},{x:-7,y:this.attackAreaOffsetY},{x:7,y:this.attackAreaOffsetY}];
                const offsets=[{x:0,y:-37+this.attackAreaOffsetY},{x:0,y:37+this.attackAreaOffsetY},{x:-37,y:this.attackAreaOffsetY},{x:37,y:this.attackAreaOffsetY}];
                const sizes=[{x:64,y:64},{x:64,y:64},{x:64,y:64},{x:64,y:64}];
                const rotations=[0,Math.PI,(3*Math.PI)/2,Math.PI/2];
                this.dirAttackArea={};
                this.attackAreaContainer=this.scene.add.container(this.x,this.y).setDepth(this.depth+1);
                this.attackCursorContainer=this.scene.add.container(this.x,this.y).setDepth(20);

                for(let i=0;i<dirs.length;i++){
                    //this.dirAttackArea[dirs[i]]=this.scene.add.rectangle( offsets[i].x, offsets[i].y, sizes[i].x,sizes[i].y, 0xff0000,0.25).setVisible(false);
                    const shapeDisps=[
                    [{x:16,y:10},{x:-6,y:0},{x:6,y:0},{x:-16,y:10}],
                    [{x:-6,y:0},{x:16,y:-10},{x:-16,y:-10},{x:6,y:0}]
                    ,[{x:10,y:16},{x:10,y:-16},{x:0,y:6},{x:0,y:-6}]
                    ,[{x:0,y:-6},{x:0,y:6},{x:-10,y:-16},{x:-10,y:16}]];
                    /* this.dirAttackArea[dirs[i]]=this.scene.add.polygon( offsetsAreas[i].x, offsetsAreas[i].y, 
                        [[0+shapeDisps[i][0].x,0+shapeDisps[i][0].y],
                        [0+shapeDisps[i][1].x,sizes[i].y+shapeDisps[i][1].y],
                        [sizes[i].x+shapeDisps[i][2].x,sizes[i].y+shapeDisps[i][2].y],
                        [sizes[i].x+shapeDisps[i][3].x,0+shapeDisps[i][3].y]],
                         0xff0000,0.25).setVisible(false); */
                    const angles=[{start:180,end:0},{start:0,end:180},{start:90,end:270},{start:270,end:90}];
                    this.dirAttackArea[dirs[i]]=this.scene.add.arc(offsetsAreas[i].x, offsetsAreas[i].y,50,angles[i].start,angles[i].end,false,0xff0000,0.25).setVisible(false);
                    this.dirAttackArea[dirs[i]].setStrokeStyle(1, 0xff0000, 1);
                    this.dirAttackArea[dirs[i]].setDepth();
                    this.scene.physics.add.existing(this.dirAttackArea[dirs[i]]);
                    let dirSelector=this.scene.add.image(offsets[i].x, offsets[i].y,"dirCursor").setScale(0.8).setRotation(rotations[i]);
                    dirSelector.setVisible(false);
                    dirSelector.setInteractive(this.scene.input.makePixelPerfect());
                    dirSelector.on('pointerover', () => {
                        this.scene.sound.play("touchUISound");
                        this.dirAttackArea[dirs[i]].setVisible(true);
                        this.scene.attackArea=this.dirAttackArea[dirs[i]];
                        this.scene.tweens.add({
                            targets: [dirSelector],
                            scale:{from:0.8,to:1.0},
                            ease:'power1',
                            duration: 300,
                        });
                        dirSelector.setTint(0xcccccc);
                    });
                    dirSelector.animationPlaying=false;
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
                            else if(this.actionsRemaining>0){
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
                        
                            this.scene.sound.play("woodButton");
                            this.scene.tweens.add({
                                targets: [dirSelector],
                                scale:{from:1.4,to:1.0},
                                ease:'power1',
                                duration: 200,
                            });
                        if(this.actionsRemaining>0){
                            this.scene.attackArea=this.dirAttackArea[dirs[i]];
                            this.facing=dirs[i];
                            this.playAttack();
                            this.scene.checkEnemyHit();
                            dirSelector.clearTint();
                        }else {
                            this.scene.sound.play("boundLimits");
                        }
                        this.attackCursorContainer.each((cursor)=>{cursor.emit("showSelector")});
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
    stopMoving(){
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);
        if(this.isMoving==false) this.play({key:'iddle_'+this.facing,repeat:-1},true);
    }
    checkHit(area){
       /*  if(this.scene.enemyAttackArea && !this.checkedHit){
            if(this.scene.physics.overlap(this.scene.enemyAttackArea, this.body))this.onHit(this.scene.attackEffect.dmg)
            this.checkedHit=true;
        } */
        if(area){
            if(this.scene.physics.overlap(area, this.body)){
                if(area.type=="Arc"){
                    if(this.scene.isPointInArc(this.x,this.y,area)) this.onHit(this.scene.attackEffect.dmg)
                }
                 else this.onHit(this.scene.attackEffect.dmg)
            }
            //this.checkedHit=true;
        }
    }
    checkInDangerZone(){
        this.isInDanger=false;
        if(this.scene.enemies){
            this.scene.enemies.forEach(enemy => {
                let area=enemy.selectedAttackArea;
                if(area && this.isInDanger==false && this.scene.physics.overlap(area, this.body) ){
                    this.isInDanger=true;
                }
            });
        }
        if(this.isInDanger==true && !this.dangerEffectActive){
            this.dangerEffectActive=true;
            this.dangerEffect=this.postFX.addGlow("0xc4180f");
        }
        else if(this.isInDanger==false){
            if(this.dangerEffect){
                this.postFX.remove(this.dangerEffect);
                this.dangerEffectActive=false;
            }

        }
    }

    /**
     * Gestiona movimiento de teletransporte
     */
    player_tp(){
        if(this.container.visible && this.scene.activeCharacter=="warrior"){
        const x=this.container.x+24, y =this.container.y; 
        this.container.setVisible(false);
        this.x=x;
        this.y=y;
        this.goal_x=x;
        this.lastGridX=x;
        this.goal_y=y;
        this.lastGridY=y;
        this.emit("player_End_Turn");
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
        if(this.scene.turn=="player"){
            this.physics_combat_movement(t);
            //this.checkInDangerZone()
        }
        this.container.x=this.scene.pointerGridX;
        this.container.y=this.scene.pointerGridY;
        this.centerAttackArea(this.attackAreaType);
    }

}
