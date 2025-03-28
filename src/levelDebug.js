import Platform from './platform.js';
import Player from './player_warrior.js';
import Mage from './player_mage.js';
import Orc from './orc.js';
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

const pared=true;
const suelo=false;
const puerta=false;
const objeto=false;
const decorado=false;
const colision=false;



export default class LevelDebug extends Phaser.Scene {
    marker;
    activeCharacter; // Para testing de personajes
    turn;
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'levelDebug' });
    }
    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        var scene=this;
        
        /*Crear layers json*/
        this.map= this.make.tilemap({key:'map'});  
        
        
        //carga de atlas de recursos
        const tileset = this.map.addTilesetImage('TilesDungeon','TilesDungeon');
        const props=this.map.addTilesetImage('PropsA','PropsA');
        const propsA=this.map.addTilesetImage('Props','Objetos');
        //generamos las diferentes capas
        
        
        if(suelo){
            this.floor_layer = this.map.createLayer("Suelo", tileset, 0, 0);
        }
        
        if(pared){
            this.wall_layer = this.map.createLayer("Paredes", tileset, 0, 0);
            if(colision){
                if (this.wall_layer.layer.properties.find(prop => prop.name === "Collide" && prop.value === true)) {
                    this.wall_layer.setCollisionByExclusion([-1]);
                }
            }
        }
        
        
        if(decorado){
            this.map.createLayer("Decorado", [props,propsA], 0, 0);
        }
        
        
        
        //----Boton de paso de turno
        let botonNextTurn = this.add.image(600, 300, 'NextTurn')
        .setInteractive();
        botonNextTurn.setScrollFactor(0);
        botonNextTurn.setScale(0.8);
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
            if(this.turn=="player"){this.events.emit("enemy_turn_start");} 
            else if(this.turn=="enemy"){this.events.emit("player_turn_start");} 
        });
        botonNextTurn.on('pointerover', () => {
            this.sound.play("touchUISound");
            botonNextTurn.setTint(0xcccccc);
        });
        botonNextTurn.on('pointerout', () => {
            botonNextTurn.clearTint();
        });
        //----Boton de paso de turno

        const screenCenterX = this.cameras.main.worldView.x + this.cameras.main.width / 2;
        this.turnBanner=this.add.image(screenCenterX,100,"turnBanner").setOrigin(0.5).setScrollFactor(0).setDepth(20).setScale(1.2);
        this.textDisplay=this.add.text(screenCenterX,200,"Combat Start",{strokeThickness:3,stroke:"rgb(65, 32, 5)",color:"rgb(164, 193, 212)"}).setOrigin(0.5).setScrollFactor(0).setDepth(20);
        var displayTween=this.tweens.add({
            targets: [this.textDisplay,this.turnBanner],
            y:{from:100,to:200},
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
        this.events.on("player_turn_start",()=>{
            this.textDisplay.setText("Player Turn");
            if(displayTween.isActive)displayTween.restart();
            else displayTween.play();            
            this.turn="player"; 
            this.player.onTurnStart();
            this.orc.onTurnEnd();
        });
        
        let botonMove = this.add.image(500, 300, 'Move')
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
            else if(this.turn=="enemy"){this.orc.moveAreaGraphics.setVisible(!this.orc.moveAreaGraphics.visible)} 
        });
        botonMove.on('pointerover', () => {
            this.sound.play("touchUISound");
            botonMove.setTint(0xcccccc);
        });
        botonMove.on('pointerout', () => {
            botonMove.clearTint();
        });

        //----Boton de ataque
        
        let botonAttack = this.add.image(550, 300, 'Attack')
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
            if(this.turn=="player"){this.player.attackArea.setVisible(!this.player.attackArea.visible)} 
            else if(this.turn=="enemy"){this.orc.attackArea.setVisible(!this.orc.attackArea.visible)} 
        });
        botonAttack.on('pointerover', () => {
            this.sound.play("touchUISound");
            botonAttack.setTint(0xcccccc);
        });
        botonAttack.on('pointerout', () => {
            botonAttack.clearTint();
        });
        
        //----Boton de ataque

        //----Boton de menu
        let botonMenu = this.add.image(640, 300, 'Menu')
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
                    y:350,
                    ease:'expo.inout',
                    duration: 1000,
                    delay:function(target, key, value, targetIndex, totalTargets, tween) { return targetIndex*150; }
                });
            }else{
                this.tweens.add({
                    targets: [botonMove,botonAttack,botonNextTurn],
                    y:300,
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
        
        //----Boton de menu
        
        //Stats UI TODO -> pasar a container y clase propia
        this.statsUI={
            UIbg:this.add.image(410, 350, 'StatsBar').setScrollFactor(0).setDepth(20),
            hpDisplay:this.add.text(390,350,"HP: ?/?",{fontSize:11,strokeThickness:4,stroke:'rgb(49, 0, 0)'}).setScrollFactor(0).setDepth(20),
            portrait:this.add.image(367, 350, 'warriorPortrait').setScrollFactor(0).setDepth(20)
        };
        
           
           
        //const tag=this.anims.createFromAseprite('player_warrior');
        this.player = new Player(this, this.map.widthInPixels/2, this.map.heightInPixels/2).setDepth(1);
        //this.player2 = new Mage(this, 72, 176);
        this.orc = new Orc(this, 240, 190).setDepth(1);
        
        this.activeCharacter="warrior";
        var cam=this.cameras.main;
        this.showTurnMsg();
        cam.startFollow(this.player);
        cam.setBounds(0,0);
        cam.setZoom(3);
      
        let mask=this.wall_layer.createBitmapMask();
        mask.invertAlpha=true;
        this.player.moveAreaGraphics.setMask(mask);
        let mask2=this.player.attackArea.createGeometryMask();
        mask2.setInvertAlpha(true);
        console.log(mask)
        console.log(mask2)
        
        if (colision && pared){
            this.physics.add.collider(this.player.body, this.wall_layer);
            this.physics.add.collider(this.orc.body, this.wall_layer);
        }


        if(objeto){
            this.objects_layer = this.map.getObjectLayer("Objetos", tileset)
            
            this.objects_layer.objects.forEach(obj => {
                // Crear el sprite con la textura especificada en Tiled
                let textura =obj.properties.find(prop => prop.name === 'Texture')?.value;
                const sprite = this.physics.add.sprite(obj.x+(obj.width/2), obj.y+(obj.height/2), textura);
                
                // Ajustar el origen porque Tiled usa la esquina superior izquierda
                sprite.setOrigin(0.5, 0.5);
                
                // Si el campo "collide" es verdadero, activamos colisión
                if(colision){
                    if (obj.properties.Collide) {
                        this.physics.add.existing(sprite);
                        sprite.body.setImmovable(true);
                        sprite.body.allowGravity = false;
                        const objectsGroup = this.physics.add.staticGroup();
                        this.physics.add.collider(this.player, objectsGroup);
                    }
                }
            });
        }

        if(puerta){
            this.doors_layer = this.map.getObjectLayer("Puertas", tileset);
            this.map.createLayer("Puertas", tileset, 0, 0);
            const doors = this.doors_layer.objects
            .filter(obj => obj.properties.find(prop => prop.name === "Collide" && prop.value === true)) // Solo los que tienen "Collide: true"
            .map(obj => {
                let textura =obj.properties.find(prop => prop.name === 'Texture')?.value;
                let door = this.physics.add.staticSprite(obj.x+(obj.width/2), obj.y+(obj.height/2), textura); // Crear sprite estático
                door.setOrigin(0.5,0.5); // Ajustar la posición si es necesario
                return door;
            });
            if(colision){
                const doorsGroup = this.physics.add.staticGroup(doors);
                this.physics.add.collider(this.player.body, doorsGroup);
            }
        }
            
            
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
            
        this.physics.add.overlap(this.player.body, this.orc.body,()=>{console.log("Player Enemy Overlap")});// Util para entrar en combate
        this.physics.add.overlap(this.player.attackArea, this.orc.body,()=>{});
        
        this.physics.add.existing(this.player.attackArea);
        this.physics.add.existing(this.orc.attackArea);
        
        this.initShaders();
        
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
        this.input.keyboard.createCombo('lights',{resetOnMatch:true}).comboName='lights';
        
        
        
        this.input.keyboard.on('keycombomatch', (combo) => {
            switch(combo.comboName){
                case 'reset':
                    cam.resetPostPipeline();
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
            this.events.emit("player_turn_start");         
            this.orc.playAttack();
        })
        this.turn="player";
    }

    initShaders(){
        let cam = this.cameras.main;
        this.setCrtShader();
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
        if(suelo){
            this.floor_layer.setPipeline("Light2D")
        }
        this.orc.setPipeline("Light2D")
        this.player.setPipeline("Light2D")
        this.lights.enable().setAmbientColor(0x000000);
        this.playerLight = this.lights.addLight(240, 190, 200).setColor(0xffffff).setIntensity(1.2);
    }

    showStatsUI(){
        this.tweens.add({
            targets: [this.statsUI.hpDisplay, this.statsUI.portrait,this.statsUI.UIbg],
            y:function(target, key, value, targetIndex, totalTargets, tween) { let values=[292,300,300];return values[targetIndex]; },
            ease:'expo.inout',
            duration: 1000
        })
    }
    hideStatsUI(){
        this.tweens.add({
            targets: [this.statsUI.hpDisplay, this.statsUI.portrait,this.statsUI.UIbg],
            y:350,
            ease:'expo.inout',
            duration: 1000
        })
    }


    showTurnMsg(){
        console.log(this.cameras.main);
        //a.setScrollFactor(0);
    }

    update(time, delta)
    {
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        
        // Movimiento del cuadro marcador siguiendo la coordenada por grid del ratón
            const gridOffsetX=0, gridOffsetY=-1, mouseOffsetX=-1,mouseOffsetY=0, snapInterval=3;
            
            //Mueve a cordenada
            this.pointerGridX= worldPoint.x;
            this.pointerGridY = worldPoint.y;

            if(this.turn=="player"){
                this.activeCharacter="warrior";
                this.cameras.main.startFollow(this.player);                
            }else if(this.turn=="enemy"){   
                this.activeCharacter="orc";
                this.cameras.main.startFollow(this.orc);
            }
            if(this.playerLight){
                this.playerLight.x=this.player.x;
                this.playerLight.y=this.player.y;
            }
    }
}
