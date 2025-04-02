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
     * @param {string} spriteKey Clave correspondiente al sprite
     */
    constructor(scene, x, y, spriteKey,baseHP=10,maxHP=10,facing="right",attackAreaType="directional",scale=1) {
        super(scene, x, y, spriteKey);	
        //Auxiliares para animaciones
        this.facing=facing;
        this.anims.createFromAseprite(spriteKey);
        this.scale=scale;
        this.hp=baseHP;
        this.maxHp=maxHP;

        this.attackAreaType=attackAreaType;
        this.addAttackArea(this.attackAreaType);

        this.moveArea=new Phaser.Geom.Circle(this.x,this.y+14,100);
        this.moveAreaGraphics=this.scene.add.graphics().setVisible(false);
        this.moveAreaGraphics.lineStyle(1, 0x0069ff, 0.50);  
        this.moveAreaGraphics.fillStyle("0x0069ff",0.20);
        this.moveAreaGraphics.fillCircleShape(this.moveArea);
        this.moveAreaGraphics.strokeCircleShape(this.moveArea);

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
        //this.body.setBoundsRectangle(this.moveArea);

        this.cursors = this.scene.input.keyboard.createCursorKeys();

        this.play({key:'iddle_right',repeat:-1});
        
        
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
            this.effect=this.postFX.addGlow();
        });
        this.on('pointerout', function (event)
        {
            this.postFX.remove(this.effect);
        });
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
                    this.destroy();
                }
            });
        }
    }

    physics_combat_movement(){
        const velocity=200;
        this.body.setVelocityX(0);
        this.body.setVelocityY(0);

        if (this.cursors.up.isDown && !this.cursors.down.isDown) {
            this.facing="up";
            if(this.moveArea.contains(this.body.center.x,this.body.top)){
                this.body.setVelocityY(-1);
                if(!this.cursors.right.isDown && !this.cursors.left.isDown)this.play({key:'walk_up'},true);
            }else{
                this.scene.playCollideEffect();
            }
        }
        else if (this.cursors.down.isDown && !this.cursors.up.isDown) {
            this.facing="down";
            if(this.moveArea.contains(this.body.center.x,this.body.bottom)){
                this.body.setVelocityY(1);
                if(!this.cursors.right.isDown && !this.cursors.left.isDown)this.play({key:'walk_down'},true);
            }else{
                this.scene.playCollideEffect();
            }
        } 
        if (this.cursors.right.isDown && !this.cursors.left.isDown) {
            this.facing="right";
            if(this.moveArea.contains(this.body.right,this.body.center.y)){
                this.body.setVelocityX(1);
                this.play({key:'walk_right'},true);
            }else{
                this.scene.playCollideEffect();
            }
        }
        if (this.cursors.left.isDown && !this.cursors.right.isDown) {
            this.facing="left";
            if(this.moveArea.contains(this.body.left,this.body.center.y)){
                this.body.setVelocityX(-1);
                this.play({key:'walk_left'},true);
            }else{
                this.scene.playCollideEffect();
            }
        }
        if(this.body.velocity.x==0 && this.body.velocity.y==0 && this.isMoving==false){
            this.play({key:'iddle_'+this.facing,repeat:-1},true);
        }else{
            this.body.velocity.setLength(velocity);
        }

    }
 
    playAttack(){
        this.isMoving=true;
        this.play({key:'attack_'+this.facing},true);
        this.once("animationcomplete",()=>{console.log("complete");this.isMoving=false;});
        this.chain({key:'iddle_'+this.facing,repeat:-1},true);
    }

    onTurnStart(){
        //Volver a pintar el area de movimiento
        this.scene.attackArea=this.attackArea;
        this.attackEffect={dmg:2,push:{x:15,y:0}}
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
    }

    onTurnEnd(){
        this.moveAreaGraphics.fillRectShape(this.moveArea).setVisible(false);
        //this.attackArea.setVisible(false);
        this.setDepth(this.depth-1);
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
                const offsets=[{x:0,y:-37+this.attackAreaOffsetY},{x:0,y:37+this.attackAreaOffsetY},{x:-37,y:this.attackAreaOffsetY},{x:37,y:this.attackAreaOffsetY}];
                const sizes=[{x:64,y:64},{x:64,y:64},{x:64,y:-64},{x:64,y:64}];
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
                        this.scene.attackArea=this.dirAttackArea[dirs[i]];
                        this.facing=dirs[i];
                        this.playAttack();
                        this.scene.checkHits();
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

    checkHit(){       
    }
    /**
     * Métodos preUpdate de Phaser. En este caso solo se encarga del movimiento del jugador.
     * Como se puede ver, no se tratan las colisiones con las estrellas, ya que estas colisiones 
     * ya son gestionadas por la estrella (no gestionar las colisiones dos veces)
     * @override
     */
    preUpdate(t, dt) {
        super.preUpdate(t, dt);
    }

}
