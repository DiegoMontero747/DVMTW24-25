import Platform from './platform.js';
import Player from './player_warrior.js';
import Mage from './player_mage.js';
import Orc from './arenaOrc.js';
import Phaser from 'phaser';
import GameShaderCRT from "./shaders/crtShader.js"; 
import GameShaderRetro from "./shaders/retroShader.js"; 
import GameShaderGBA from "./shaders/gbaShader.js"; 
import GameShaderPixel from "./shaders/pixelShader.js"; 


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level3 extends Phaser.Scene {
    marker;
    activeCharacter; // Para testing de personajes
    turn;
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'combatScene' });
    }
    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        var scene=this;
        /*Crear layers json*/

        this.map= this.make.tilemap({key:'arena'});  
        const tileset = this.map.addTilesetImage('TilesDungeon','TilesDungeon');
        const props=this.map.addTilesetImage('PropsA','PropsA');
        const propsA=this.map.addTilesetImage('Props','Objetos');
        //const floor_layer = this.map.createLayer("floor", tileset, 0, 0);
        //this.wall_layer = this.map.createLayer("walls", tileset, 0, 0);
        //this.wall_layer.setCollisionByProperty({collides:true});
        this.floor_layer = this.map.createLayer("Suelo", tileset, 0, 0);
        this.wall_layer = this.map.createLayer("Paredes", tileset, 0, 0);
        this.doors_layer = this.map.getObjectLayer("Puertas", tileset);
        this.objects_layer = this.map.getObjectLayer("Objetos", tileset)

        if (this.wall_layer.layer.properties.find(prop => prop.name === "Collide" && prop.value === true)) {
            this.wall_layer.setCollisionByExclusion([-1]);
        }
        this.map.createLayer("Puertas", tileset, 0, 0);
        this.map.createLayer("Decorado", [props,propsA], 0, 0);

        this.wall_layer.setDepth(1);

        this.initUI()

        /* this.wall_layer.renderDebug(this.add.graphics(),
        {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 50), // Colliding tiles
            faceColor: new Phaser.Display.Color(255, 255, 255, 100) // Colliding face edges
        }); */
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);


        //const tag=this.anims.createFromAseprite('player_warrior');
        this.player = new Player(this, 128, 200).setDepth(3);
        //this.player2 = new Mage(this, 72, 176);
        this.orc = new Orc(this, 240, 190).setDepth(2);

        this.activeCharacter="warrior";
        var cam=this.cameras.main;
        this.showTurnMsg();
        cam.startFollow(this.player);
        cam.setBounds(0,0);
        cam.setZoom(3);
        this.physics.add.collider(this.player.body, this.wall_layer,()=>{this.playCollideEffect()});
        this.physics.add.collider(this.orc.body, this.wall_layer);
        
        this.initShaders();
        this.initKeyCombos();

        this.player.on("player_End_Turn",function(){
            console.log("player end turn");
        });

        this.player.on("player_attack",() =>{
            console.log("player ataca");
            this.orc.onHit(1);
        });

        this.orc.on("enemy_End_Turn",function(){
            console.log("enemy end turn");
        })

        this.orc.on("enemy_hitted",()=>{
            console.log("orc hitted");
            this.events.emit("enemy_turn_start");            
            this.player.playAttack();
        })
        this.player.on("player_hitted",()=>{
            console.log("player hitted");
            //this.events.emit("player_turn_start");         
           // this.orc.playAttack();
        })
        this.turn="player";
        this.player.onTurnStart();

        this.initMusic()
    }

    playCollideEffect(){
        if(this.boundLimitSoundTimeOut===undefined)this.boundLimitSoundTimeOut=false;
            if(!this.boundLimitSound.isPlaying && !this.boundLimitSoundTimeOut){
                this.cameras.main.shake(500,0.0002);
                this.boundLimitSound.play({volume:0.7});
                this.boundLimitSoundTimeOut=true;
                this.time.addEvent({delay:800,callback:()=>{this.boundLimitSoundTimeOut=false;}});
            } 
    }

    initShaders(){
        let cam = this.cameras.main;
        this.setCrtShader();
    }

    initKeyCombos(){
                //gestion de combos de teclado
                this.input.keyboard.createCombo('crt',{resetOnMatch:true}).comboName='crt';
                this.input.keyboard.createCombo('reset',{resetOnMatch:true}).comboName='reset';
                this.input.keyboard.createCombo('retro',{resetOnMatch:true}).comboName='retro';
                this.input.keyboard.createCombo('gba',{resetOnMatch:true}).comboName='gba';
                this.input.keyboard.createCombo('pixel',{resetOnMatch:true}).comboName='pixel';
        
                this.input.keyboard.createCombo('warrior',{resetOnMatch:true}).comboName='warrior';
                this.input.keyboard.createCombo('mage',{resetOnMatch:true}).comboName='mage';
                this.input.keyboard.createCombo('orc',{resetOnMatch:true}).comboName='orc';
                this.input.keyboard.createCombo('mute',{resetOnMatch:true}).comboName='mute';
                this.input.keyboard.createCombo('restart',{resetOnMatch:true}).comboName='restart';
                this.input.keyboard.createCombo('music',{resetOnMatch:true}).comboName='music';
                this.input.keyboard.createCombo('lights',{resetOnMatch:true}).comboName='lights';
        
                this.input.keyboard.on('keycombomatch', (combo) => {
                    switch(combo.comboName){
                        case 'reset':
                            this.cameras.main.resetPostPipeline();
                        break;
                        case 'crt':
                            this.setCrtShader();
                        break;
                        case 'gba':
                            this.setGBAShader();
                        break;
                        case 'retro':
                            this.setRetroShader();
                        break;
                        case 'pixel':
                            this.setPixelShader();
                        break;
                        case 'mute':
                            this.sound.setMute(!scene.sound.mute);
                        break;
                        case 'restart':
                            this.scene.restart();
                        break;
                        case 'lights':
                            this.setLights();
                        break;
                    }
        
                });
    }

    initMusic(){
        if(!this.sceneMusic) this.sceneMusic=this.sound.play("combatMusic",{loop:true,volume:0.5});
        this.boundLimitSound= this.sound.add("boundLimits")
        this.physics.world.on('worldbounds', (body, up, down, left, right) =>
        {   
            this.playCollideEffect();
        });
    }

    initUI(){
        let botonNextTurn = this.add.image(600, 500, 'NextTurn')
        .setInteractive();
        botonNextTurn.setScrollFactor(0);
        botonNextTurn.setScale(0.8);
        //BOTON PASO DE TURNO
        botonNextTurn.setDepth(20);
        botonNextTurn.on('pointerdown', () => {
            this.sound.play("woodButton");
            this.tweens.add({
                targets: [botonNextTurn],
                scale:{from:1,to:0.8},
                ease:'power1',
                duration: 1000,
            });
            console.log('Botón presionado');
            if(this.turn=="player"){
                this.events.emit("enemy_turn_start");
                //this.time.delayedCall(3000,()=>{this.events.emit("player_turn_start");},[],this);
            } 
            //else if(this.turn=="enemy"){this.events.emit("player_turn_start");} 
        });
        botonNextTurn.on('pointerover', () => {
            this.sound.play("touchUISound");
            botonNextTurn.setTint(0xcccccc);
        });
        botonNextTurn.on('pointerout', () => {
            botonNextTurn.clearTint();
        });
        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.turnBanner=this.add.image(screenCenterX,100,"turnBanner").setOrigin(0.5).setScrollFactor(0).setDepth(20).setScale(1.2);
        this.textDisplay=this.add.text(screenCenterX,200,"Combat Start",{strokeThickness:3,stroke:"rgb(65, 32, 5)",color:"rgb(164, 193, 212)"}).setOrigin(0.5).setScrollFactor(0).setDepth(20);
        var displayTween=this.tweens.add({
            targets: [this.textDisplay,this.turnBanner],
            y:{from:200,to:300},
            ease:'expo.out',
            duration: 600,
            hold:600,
            yoyo:true,
            persist:true
        })
        this.events.on("enemy_turn_start",()=>{
            this.textDisplay.setText("Enemy Turn");
            if(displayTween.isActive)displayTween.restart();
            else displayTween.play();
            this.turn="enemy";
            this.orc.onTurnStart();
            this.player.onTurnEnd();
        });
        this.events.on("enemy_turn_end",()=>{
            this.time.delayedCall(300,()=>{this.events.emit("player_turn_start");},[],this);
        });
        this.events.on("player_turn_start",()=>{
            this.textDisplay.setText("Player Turn");
            if(displayTween.isActive)displayTween.restart();
            else displayTween.play();            
            this.turn="player"; 
            this.player.onTurnStart();
            this.orc.onTurnEnd();
        });
        //BOTON MOVE
        let botonMove = this.add.image(500, 500, 'Move')
        .setInteractive();
        botonMove.setScrollFactor(0);
        botonMove.setScale(0.8);
        botonMove.setDepth(20);
        botonMove.on('pointerdown', () => {
            this.sound.play("woodButton");
            this.tweens.add({
                targets: [botonMove],
                scale:{from:1,to:0.8},
                ease:'power1',
                duration: 1000,
            });
            if(this.turn=="player"){this.player.moveAreaGraphics.setVisible(!this.player.moveAreaGraphics.visible)} 
            //else if(this.turn=="enemy"){this.orc.moveAreaGraphics.setVisible(!this.orc.moveAreaGraphics.visible)} 
        });
        botonMove.on('pointerover', () => {
            this.sound.play("touchUISound");
            botonMove.setTint(0xcccccc);
        });
        botonMove.on('pointerout', () => {
            botonMove.clearTint();
        });

        //BOTON ATTACK
        let botonAttack = this.add.image(550, 500, 'Attack')
        .setInteractive();
        botonAttack.setScrollFactor(0);
        botonAttack.setScale(0.8);
        botonAttack.setDepth(20);
        botonAttack.on('pointerdown', () => {
            this.sound.play("woodButton");
            this.tweens.add({
                targets: [botonAttack],
                scale:{from:1,to:0.8},
                ease:'power1',
                duration: 1000,
            });
            if(this.turn=="player"){
                if(this.player.attackAreaType=="directional")
                    this.player.showAttackControls();
                else
                this.player.attackArea.setVisible(!this.player.attackArea.visible)
            } 
            /* else if(this.turn=="enemy"){
                if(this.orc.attackAreaType=="directional")
                    this.orc.showAttackControls();
                else
                this.orc.attackArea.setVisible(!this.orc.attackArea.visible)
            }  */
        });
        botonAttack.on('pointerover', () => {
            this.sound.play("touchUISound");
            botonAttack.setTint(0xcccccc);
        });
        botonAttack.on('pointerout', () => {
            botonAttack.clearTint();
        });

        //BOTON MENU
        let botonMenu = this.add.image(640, 500, 'Menu')
        .setInteractive();
        botonMenu.setScrollFactor(0);
        botonMenu.setScale(0.8);
        botonMenu.setDepth(20);
        botonMenu.on('pointerdown', () => {
            //botonAttack.setVisible(!botonAttack.visible);
            //botonMove.setVisible(!botonMove.visible);
            //botonNextTurn.setVisible(!botonNextTurn.visible);
            this.sound.play("woodButton");
            this.tweens.add({
                targets: [botonMenu],
                scale:{from:1,to:0.8},
                ease:'power1',
                duration: 1000,
            });
            if(this.menuOpen===undefined) this.menuOpen=true;
            if(this.menuOpen){
            this.tweens.add({
                targets: [botonMove,botonAttack,botonNextTurn],
                y:550,
                ease:'expo.inout',
                duration: 1000,
                delay:function(target, key, value, targetIndex, totalTargets, tween) { return targetIndex*150; }
            });
            }else{
                this.tweens.add({
                    targets: [botonMove,botonAttack,botonNextTurn],
                    y:500,
                    ease:'expo.inout',
                    duration: 1000,
                    delay:function(target, key, value, targetIndex, totalTargets, tween) { return targetIndex*150; }
                });
            }this.menuOpen=!this.menuOpen;
        });
        botonMenu.on('pointerover', () => {
            this.sound.play("touchUISound");
            botonMenu.setTint(0xcccccc);
        });
        botonMenu.on('pointerout', () => {
            botonMenu.clearTint();
        });

        this.statsUI={
            UIbg:this.add.image(410, 550, 'StatsBar').setScrollFactor(0).setDepth(20),
            hpDisplay:this.add.text(390,550,"HP: ?/?",{fontSize:11,strokeThickness:4,stroke:'rgb(49, 0, 0)'}).setScrollFactor(0).setDepth(20),
            portrait:this.add.image(367, 550, 'warriorPortrait').setScrollFactor(0).setDepth(20)
        };
    }

    setCrtShader(){
        let cam = this.cameras.main;
        cam.setPostPipeline(GameShaderCRT);
        var effect = cam.postFX.addVignette(0.5, 0.5, 0.95, 0.40);
    }
    setRetroShader(){
        let cam = this.cameras.main;
        cam.setPostPipeline(GameShaderRetro);
    }
    setGBAShader(){
        let cam = this.cameras.main;
        cam.setPostPipeline(GameShaderGBA);
    }
    setPixelShader(){
        let cam = this.cameras.main;
        cam.setPostPipeline(GameShaderPixel);
    }
    changeStatsUI(portrait,currentHP,maxHP){
        this.statsUI.hpDisplay.setText("HP: "+currentHP+"/"+maxHP);
        this.statsUI.portrait.setTexture(portrait+'Portrait');
    }
    setLights(){
        this.wall_layer.setPipeline("Light2D")
        this.floor_layer.setPipeline("Light2D")
        this.orc.setPipeline("Light2D")
        this.player.setPipeline("Light2D")
        this.lights.enable().setAmbientColor(0x000000);
        this.playerLight = this.lights.addLight(240, 190, 200).setColor(0xffffff).setIntensity(1.2);
    }

    showStatsUI(){
        this.tweens.add({
            targets: [this.statsUI.hpDisplay, this.statsUI.portrait,this.statsUI.UIbg],
            y:function(target, key, value, targetIndex, totalTargets, tween) { let values=[492,500,500];return values[targetIndex]; },
            ease:'expo.inout',
            duration: 1000,
        })
    }
    hideStatsUI(){
        this.tweens.add({
            targets: [this.statsUI.hpDisplay, this.statsUI.portrait,this.statsUI.UIbg],
            y:550,
            ease:'expo.inout',
            duration: 1000
        })
    }

    async checkEnemyHit(){
        this.orc.checkHit();
    }
    async checkPlayerHit(){
        this.player.checkHit();
    }

    showTurnMsg(){
        console.log(this.cameras.main);
        //a.setScrollFactor(0);
    }

    update(time, delta)
    {
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        //Movimiento del cuadro marcador siguiendo al raton
        /* condenada centrada en el raton
        const pointerTileX = this.map.worldToTileX(worldPoint.x)-1;
        const pointerTileY = this.map.worldToTileY(worldPoint.y)-1;
        */  
        // Movimiento del cuadro marcador siguiendo la coordenada por grid del ratón
            const gridOffsetX=0, gridOffsetY=-1, mouseOffsetX=-1,mouseOffsetY=0, snapInterval=3;
            const pointerTileX = Phaser.Math.Snap.To(this.map.worldToTileX(worldPoint.x)+mouseOffsetX, snapInterval)+gridOffsetX;
            const pointerTileY = Phaser.Math.Snap.To(this.map.worldToTileY(worldPoint.y)+mouseOffsetY, snapInterval)+gridOffsetY;
            //Mueve a cordenada
            /*
            this.pointerGridX= this.map.tileToWorldX(pointerTileX);
            this.pointerGridY = this.map.tileToWorldY(pointerTileY);*/
            this.pointerGridX= worldPoint.x;
            this.pointerGridY = worldPoint.y;

            if(this.turn=="player"){
                this.activeCharacter="warrior";
                this.cameras.main.startFollow(this.player);                
            }/* else if(this.turn=="enemy"){   
                this.activeCharacter="orc";
                this.cameras.main.startFollow(this.orc);
            } */
            if(this.playerLight){
                this.playerLight.x=this.player.x;
                this.playerLight.y=this.player.y;
            }
    }
}
