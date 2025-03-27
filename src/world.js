import Player from './player.js';
import Phaser from 'phaser';

export default class World extends Phaser.Scene {
    map;
    CuevasGroup;
    player;

    /**
     * Constructor de la escena
     */
    constructor() {
        super({ key: 'world' });
    }

    create() {
        /* Crear layers json */
        this.map = this.make.tilemap({ key: 'mapMundial' });
        const tileset = this.map.addTilesetImage('mapaPeninsula', 'mapaPeninsula');

        this.wall_layer = this.map.createLayer("Pared", tileset, 0, 0);
        if (this.wall_layer.layer.properties.find(prop => prop.name === "Collide" && prop.value === true)) {
            this.wall_layer.setCollisionByExclusion([-1]);
        }

        const floor_layer = this.map.createLayer("Fondo", tileset, 0, 0);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        /* Crear grupo de cuevas */
        this.CuevasGroup = this.physics.add.group();

        /* Crear jugador */
        this.player = new Player(this, 500, 500);
        this.physics.add.collider(this.player, this.wall_layer);

        /* Configurar cámara */
        const cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setBounds(0, 0);
        cam.setZoom(2);

        /* Crear marcador */
        const tileSize = 48;
        this.marker = this.add.graphics();
        this.marker.lineStyle(2, 0xFFFFFF, 1);
        this.marker.strokeRect(0, 0, tileSize, tileSize);

        /* Colocar cuevas */
        for (let i = 0; i < 3; i++) {
            this.ponerCueva();
        }

        /* Detectar superposición entre el jugador y las cuevas */
        this.physics.add.overlap(this.player, this.CuevasGroup, this.entrarCueva, null, this);
    }

    ponerCueva() {
        const position = this.getRandomAccessiblePosition();
        const cueva = this.CuevasGroup.create(position.x, position.y, 'cueva');
        cueva.setOrigin(0.5, 0.5);
        cueva.setDepth(1);
        cueva.setScale(1);
    }

    getRandomAccessiblePosition() {
        let tileX, tileY, worldX, worldY, tile;
        do {
            tileX = Phaser.Math.Between(0, this.map.width - 1);
            tileY = Phaser.Math.Between(0, this.map.height - 1);
            worldX = this.map.tileToWorldX(tileX);
            worldY = this.map.tileToWorldY(tileY);
            tile = this.wall_layer.getTileAt(tileX, tileY);
        } while (tile && tile.collides);
        return { x: worldX, y: worldY };
    }

    entrarCueva(player, cueva) {
        console.log('Entrando a la cueva...');
        this.scene.start('level3');
    }

    update(time, delta) {
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        const gridOffsetX = 0, gridOffsetY = -1, mouseOffsetX = -1, mouseOffsetY = 0, snapInterval = 3;
        const pointerTileX = Phaser.Math.Snap.To(this.map.worldToTileX(worldPoint.x) + mouseOffsetX, snapInterval) + gridOffsetX;
        const pointerTileY = Phaser.Math.Snap.To(this.map.worldToTileY(worldPoint.y) + mouseOffsetY, snapInterval) + gridOffsetY;
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);

        const currentObjectCount = this.CuevasGroup.countActive(true);
        if (currentObjectCount < 3) {
            for (let i = currentObjectCount; i < 3; i++) {
                this.ponerCueva();
            }
        }
    }
}
