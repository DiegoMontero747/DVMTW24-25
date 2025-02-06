import Platform from './platform.js';
import Player from './player_warrior.js';
import Phaser from 'phaser';
import GameShader from "./crtShader.js"; 

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
    playerPreview;
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
        const tileset = this.map.addTilesetImage('Tiles','Tiles');
        const floor_layer = this.map.createLayer("floor", tileset, 0, 0);
        this.wall_layer = this.map.createLayer("walls", tileset, 0, 0);
        this.wall_layer.setCollisionByProperty({collides:true});
        /*this.wall_layer.renderDebug(this.add.graphics(),
        {
            tileColor: null,
            collidingTileColor: new Phaser.Display.Color(255, 0, 0, 50), // Colliding tiles
            faceColor: new Phaser.Display.Color(255, 255, 255, 100) // Colliding face edges
        });*/
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

        const tag=this.anims.createFromAseprite('player_warrior');
        console.log(tag);
        this.player = new Player(this, 72, 128);
        var cam=this.cameras.main;
        cam.startFollow(this.player);
        cam.setBounds(0,0);
        cam.setZoom(2);
        this.physics.add.collider(this.player.body, this.wall_layer);

        /* Creación de cruadicula que sigue al cursor,
            su movimiento se gestiona en update
        */
        var tileSize=48;
        this.marker = this.add.graphics();
        this.marker.lineStyle(2, 0xFFFFFF, 1);  
        this.marker.strokeRect(0, 0, tileSize, tileSize);
        this.container= this.add.container(0,0)
        this.container.add(this.marker);
        this.playerPreview= this.add.sprite(24,0,"player_warrior");
        this.playerPreview.setAlpha(0.6);
        this.container.add(this.playerPreview);
        this.container.setVisible(false);

        this.input.on('pointerdown',this.playerTP,this);//listener para tp de player

        this.setShaders();

        //gestion de combos de teclado
        this.input.keyboard.createCombo('crt',{resetOnMatch:true}).comboName='crt';
        this.input.keyboard.createCombo('reset',{resetOnMatch:true}).comboName='reset';
        this.input.keyboard.on('keycombomatch', function (combo) {
            if(combo.comboName=='reset'){
                cam.resetPostPipeline();
            }else if(combo.comboName=='crt'){
                scene.setShaders();
            }
        });

    }

    playerTP(){
        if(this.container.visible){
            const x=this.container.x+24;
            const y=this.container.y;
            this.player.player_tp(x,y);
        }
    }

    setShaders(){
        let cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setPostPipeline(GameShader);
        var effect = cam.postFX.addVignette(0.5, 0.5, 0.95, 0.58);
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
            this.container.x = this.map.tileToWorldX(pointerTileX);
            this.container.y = this.map.tileToWorldY(pointerTileY);
        

    }
}
