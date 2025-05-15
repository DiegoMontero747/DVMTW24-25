
import Player from './player_warrior.js';
import Phaser from 'phaser';
import GameShaderCRT from "./shaders/crtShader.js"; 


export default class levelBoss extends Phaser.Scene {

    map;
    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'levelBoss' });
    }

    /**
     * Creación de los elementos de la escena principal de juego
     */
    create() {

    

        /*Crear layers json*/
        this.map= this.make.tilemap({key:'mapaBoss'});  
        const tileset = this.map.addTilesetImage('TilesDungeon','TilesDungeon');
       
        this.wall_layer = this.map.createLayer("pared", tileset, 0, 0);

        if (this.wall_layer.layer.properties.find(prop => prop.name === "colision" && prop.value === false)) {
            this.wall_layer.setCollisionByExclusion([-1]);
        }

        const floor_layer = this.map.createLayer("Capa de patrones 1", tileset, 0, 0);
        this.physics.world.setBounds(0,0,this.map.widthInPixels, this.map.heightInPixels);
        // Crear jugador
        this.player = new Player(this, 100, 100);
        this.player.setFreeMovement(true);
        this.turn="player";
        this.physics.add.collider(this.player, this.wall_layer);

        // Cámara
        const cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setBounds(0, 0);
        cam.setZoom(3);
        
        /* Creación de cruadicula que sigue al cursor,
            su movimiento se gestiona en update
        */
        var tileSize=48;
        this.marker = this.add.graphics();
        this.marker.lineStyle(2, 0xFFFFFF, 1);
        this.marker.strokeRect(0, 0, tileSize, tileSize);

        //this.setCrtShader();
    }
    setCrtShader(){
        let cam = this.cameras.main;
        cam.setPostPipeline(GameShaderCRT);
        var effect = cam.postFX.addVignette(0.5, 0.5, 0.95, 0.40);
    }

    update(time, delta)
    {

        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        const gridOffsetX = 0, gridOffsetY = -1, mouseOffsetX = -1, mouseOffsetY = 0, snapInterval = 3;
        const pointerTileX = Phaser.Math.Snap.To(this.map.worldToTileX(worldPoint.x) + mouseOffsetX, snapInterval) + gridOffsetX;
        const pointerTileY = Phaser.Math.Snap.To(this.map.worldToTileY(worldPoint.y) + mouseOffsetY, snapInterval) + gridOffsetY;
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);

    }
}