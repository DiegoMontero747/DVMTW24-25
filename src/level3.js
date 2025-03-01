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
export default class Level3 extends Phaser.Scene {
    marker;
    activeCharacter; // Para testing de personajes
    turn;
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'level3' });
    }
    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
        var scene=this;
        /*Crear layers csv
        const map_floor = this.make.tilemap({ key: 'map_floor', tileWidth: 16, tileHeight: 16 });
        const map_walls = this.make.tilemap({ key: 'map_walls', tileWidth: 16, tileHeight: 16 });

        const tileset = map_floor.addTilesetImage('tiles');
        map_walls.addTilesetImage('tiles');
        
        const floor_layer = map_floor.createLayer(0, tileset, 0, 0);
        const wall_layer = map_walls.createLayer(0, tileset, 0, 0);
        wall_layer.setDepth(2);
        wall_layer.setCollisionByExclusion([75,76,77]),true;

        */
        /*Crear layers json*/
        this.map= this.make.tilemap({key:'map'});  
        const tileset = this.map.addTilesetImage('TilesDungeon','TilesDungeon');
        const props=this.map.addTilesetImage('PropsA','PropsA');
        const propsA=this.map.addTilesetImage('Props','Objetos');
        //const floor_layer = this.map.createLayer("floor", tileset, 0, 0);
        //this.wall_layer = this.map.createLayer("walls", tileset, 0, 0);
        //this.wall_layer.setCollisionByProperty({collides:true});
        const floor_layer = this.map.createLayer("Suelo", tileset, 0, 0);
        this.wall_layer = this.map.createLayer("Paredes", tileset, 0, 0);
        this.doors_layer = this.map.getObjectLayer("Puertas", tileset);
        if (this.wall_layer.layer.properties.find(prop => prop.name === "Collide" && prop.value === true)) {
            this.wall_layer.setCollisionByExclusion([-1]);
        }
        this.map.createLayer("Puertas", tileset, 0, 0);
        this.map.createLayer("Decorado", [props,propsA], 0, 0);

        //Puertas

        const doors = this.doors_layer.objects
        .filter(obj => obj.properties.find(prop => prop.name === "Collide" && prop.value === true)) // Solo los que tienen "Collide: true"
        .map(obj => {
            let door = this.physics.add.staticSprite(obj.x, obj.y, "doorTexture"); // Crear sprite estático
            door.setOrigin(0, 1); // Ajustar la posición si es necesario
            return door;
        });

        const doorsGroup = this.physics.add.staticGroup(doors);
        


        let botonNextTurn = this.add.image(600, 300, 'NextTurn')
        .setInteractive();
        botonNextTurn.setScrollFactor(0);
        botonNextTurn.setScale(0.8);
        //BOTON PASO DE TURNO
        botonNextTurn.setDepth(20);
        botonNextTurn.on('pointerdown', () => {
            console.log('Botón presionado');
            if(this.turn=="player"){this.events.emit("enemy_turn_start");} 
            else if(this.turn=="enemy"){this.events.emit("player_turn_start");} 
        });
        botonNextTurn.on('pointerover', () => {
            botonNextTurn.setTint(0xcccccc);
        });
        botonNextTurn.on('pointerout', () => {
            botonNextTurn.clearTint();
        });
        this.events.on("enemy_turn_start",()=>{
            this.turn="enemy";
            this.orc.onTurnStart();
            this.player.onTurnEnd();
        });
        this.events.on("player_turn_start",()=>{
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
            if(this.turn=="player"){this.player.moveAreaGraphics.setVisible(!this.player.moveAreaGraphics.visible)} 
            else if(this.turn=="enemy"){this.orc.moveAreaGraphics.setVisible(!this.orc.moveAreaGraphics.visible)} 
        });
        botonMove.on('pointerover', () => {
            botonMove.setTint(0xcccccc);
        });
        botonMove.on('pointerout', () => {
            botonMove.clearTint();
        });

        let botonAttack = this.add.image(550, 300, 'Attack')
        .setInteractive();
        botonAttack.setScrollFactor(0);
        botonAttack.setScale(0.8);
        botonAttack.setDepth(20);
        botonAttack.on('pointerdown', () => {
            if(this.turn=="player"){this.player.attackArea.setVisible(!this.player.attackArea.visible)} 
            else if(this.turn=="enemy"){this.orc.attackArea.setVisible(!this.orc.attackArea.visible)} 
        });
        botonAttack.on('pointerover', () => {
            botonAttack.setTint(0xcccccc);
        });
        botonAttack.on('pointerout', () => {
            botonAttack.clearTint();
        });

        let botonMenu = this.add.image(640, 300, 'Menu')
        .setInteractive();
        botonMenu.setScrollFactor(0);
        botonMenu.setScale(0.8);
        botonMenu.setDepth(20);
        botonMenu.on('pointerdown', () => {
            botonAttack.setVisible(!botonAttack.visible);
            botonMove.setVisible(!botonMove.visible);
            botonNextTurn.setVisible(!botonNextTurn.visible);
        });
        botonMenu.on('pointerover', () => {
            botonMenu.setTint(0xcccccc);
        });
        botonMenu.on('pointerout', () => {
            botonMenu.clearTint();
        });


        /* this.wall_layer.renderDebug(this.add.graphics(),
        {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 50), // Colliding tiles
            faceColor: new Phaser.Display.Color(255, 255, 255, 100) // Colliding face edges
        }); */
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

        //const tag=this.anims.createFromAseprite('player_warrior');
        this.player = new Player(this, 128, 200).setDepth(1);
        //this.player2 = new Mage(this, 72, 176);
        this.orc = new Orc(this, 176, 200).setDepth(1);
        this.activeCharacter="warrior";
        var cam=this.cameras.main;
        cam.startFollow(this.player);
        cam.setBounds(0,0);
        cam.setZoom(3);
        this.physics.add.collider(this.player.body, this.wall_layer);
        //this.physics.add.collider(this.player2.body, this.wall_layer);
        this.physics.add.collider(this.player.body, doorsGroup);

        this.physics.add.collider(this.orc.body, this.wall_layer);
        this.physics.add.collider(this.orc.body, this.wall_layer);

        /* Creación de cruadicula que sigue al cursor,
            su movimiento se gestiona en update
        */


        this.physics.add.overlap(this.player.body, this.orc.body,()=>{console.log("Player Enemy Overlap")});// Util para entrar en combate
        //this.physics.world.enable(this.player.attackArea);
        //this.physics.add.overlap(this.player.attackArea.body, this.orc.body,()=>{console.log("area Enemy Overlap")});// Util para entrar en combate
        /* this.attackArea=new Phaser.Geom.Rectangle( this.player.x-64, this.player.y-64, 128, 128);
        const graphics = this.add.graphics({ lineStyle: { width: 2, color: 0x00aaaa } });
        graphics.strokeRectShape(this.attackArea);
        // Util para entrar en combate 
        this.physics.add.overlap(this.player.attackArea, this.orc.body,()=>{});*/

        this.physics.add.existing(this.player.attackArea);
        this.physics.add.existing(this.orc.attackArea);
        //this.input.on('pointerdown',this.playerTP,this);//listener para tp de player

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

        this.input.keyboard.on('keycombomatch', function (combo) {
            switch(combo.comboName){
                case 'reset':
                    cam.resetPostPipeline();
                break;
                case 'crt':
                    scene.setCrtShader();
                break;
                case 'gba':
                    scene.setGBAShader();
                break;
                case 'retro':
                    scene.setRetroShader();
                break;
                case 'pixel':
                    scene.setPixelShader();
                break;
                case 'mage':
                    scene.activeCharacter="mage";
                    cam.startFollow(scene.player2);
                break;
                case 'warrior':
                    scene.activeCharacter="warrior";
                    cam.startFollow(scene.player);
                break;
                case 'orc':
                    scene.activeCharacter="orc";
                    cam.startFollow(scene.orc);
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
        //cam.startFollow(this.player);
        this.setCrtShader();
    }

    setCrtShader(){
        let cam = this.cameras.main;
        cam.setPostPipeline(GameShaderCRT);
        var effect = cam.postFX.addVignette(0.5, 0.5, 0.95, 0.58);
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
            }else if(this.turn=="enemy"){   
                this.activeCharacter="orc";
                this.cameras.main.startFollow(this.orc);
            }
    }
}
