
import Player from './player.js';
import Phaser from 'phaser';


/**
 * Escena principal del juego. La escena se compone de una serie de plataformas 
 * sobre las que se sitúan las bases en las podrán aparecer las estrellas. 
 * El juego comienza generando aleatoriamente una base sobre la que generar una estrella. 
 * @abstract Cada vez que el jugador recoge la estrella, aparece una nueva en otra base.
 * El juego termina cuando el jugador ha recogido 10 estrellas.
 * @extends Phaser.Scene
 */
export default class Level extends Phaser.Scene {

    map;
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'level' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

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
        //wall_layer.setDepth(2);

        this.wall_layer.setCollisionByProperty({collides:true});
        this.wall_layer.renderDebug(this.add.graphics());
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);

        const tag=this.anims.createFromAseprite('player');
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
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);

    }
}
