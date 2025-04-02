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
export default class Level2 extends Phaser.Scene {
    marker;
    activeCharacter; // Para testing de personajes
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'level2' });
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
        const propsA=this.map.addTilesetImage('Props','Props');
        //const floor_layer = this.map.createLayer("floor", tileset, 0, 0);
        //this.wall_layer = this.map.createLayer("walls", tileset, 0, 0);
        //this.wall_layer.setCollisionByProperty({collides:true});
        const floor_layer = this.map.createLayer("Suelo", tileset, 0, 0);
        this.wall_layer = this.map.createLayer("Paredes", tileset, 0, 0);
        this.map.createLayer("Puertas", tileset, 0, 0);
        this.map.createLayer("Decorado", [props,propsA], 0, 0);


        /*this.wall_layer.renderDebug(this.add.graphics(),
        {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 50), // Colliding tiles
            faceColor: new Phaser.Display.Color(255, 255, 255, 100) // Colliding face edges
        });*/
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

        //const tag=this.anims.createFromAseprite('player_warrior');
        this.player = new Player(this, 72, 128);
        this.player2 = new Mage(this, 72, 176);
        this.orc = new Orc(this, 72, 144);
        this.activeCharacter="warrior";
        var cam=this.cameras.main;
        cam.startFollow(this.player);
        cam.setBounds(0,0);
        cam.setZoom(3);
        this.physics.add.collider(this.player.body, this.wall_layer);
        this.physics.add.collider(this.player2.body, this.wall_layer);

        /* Creación de cruadicula que sigue al cursor,
            su movimiento se gestiona en update
        */
        

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

    }

    initShaders(){
        let cam = this.cameras.main;
        cam.startFollow(this.player);
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
            this.pointerGridX= this.map.tileToWorldX(pointerTileX);
            this.pointerGridY = this.map.tileToWorldY(pointerTileY);
    }
}
