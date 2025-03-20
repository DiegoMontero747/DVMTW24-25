
import Player from './player.js';
import Phaser from 'phaser';


export default class world extends Phaser.Scene {

    map;
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'world' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {
             

        /*Crear layers json*/
        this.map= this.make.tilemap({key:'mapMundial'});  

        const tileset = this.map.addTilesetImage('mapaPeninsula', 'mapaPeninsula');

        
        this.wall_layer = this.map.createLayer("Pared", tileset, 0, 0);
        if (this.wall_layer.layer.properties.find(prop => prop.name === "Collide" && prop.value === true)) {
            this.wall_layer.setCollisionByExclusion([-1]);
        }

        const floor_layer = this.map.createLayer("Fondo", tileset, 0, 0);
 
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);


        const tag=this.anims.createFromAseprite('player');
        console.log(tag);
        this.player = new Player(this, 500, 500);
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


    /**
     * Método que se ejecuta al coger una estrella. Se pasa la base
     * sobre la que estaba la estrella cogida para evitar repeticiones
     * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
     */


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
