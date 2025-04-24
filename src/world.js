import Player from './player_warrior.js';
import Phaser from 'phaser';

export default class World extends Phaser.Scene {
    map;
    CuevasGroup;
    player;
    Castillo;
    CasaBoss;

    constructor() {
        super({ key: 'world' });
    }

    init(data){
        if(data.hp == undefined){
            this.datosPlayer = {
                hp: 10,
                exp: 0,
                level: 1
            };
        } else {
            this.datosPlayer = {
                hp: data.hp,
                exp: data.exp,
                level: data.level
            };
        }
    }

    create() {
        // Crear layers del mapa
        this.map = this.make.tilemap({ key: 'mapaMundial' });
        const tileset = this.map.addTilesetImage('mapaPeninsula', 'mapaPeninsula');

        this.wall_layer = this.map.createLayer("Pared", tileset, 0, 0);
        if (this.wall_layer.layer.properties.find(prop => prop.name === "Collide" && prop.value === true)) {
            this.wall_layer.setCollisionByExclusion([-1]);
        }

        const floor_layer = this.map.createLayer("Fondo", tileset, 0, 0);
        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Grupo de cuevas
        this.CuevasGroup = this.physics.add.group();

        // Crear jugador
        this.player = new Player(this, 500, 500);
        this.player.setFreeMovement(true);
        this.turn="player";
        this.physics.add.collider(this.player, this.wall_layer);

        // Cámara
        const cam = this.cameras.main;
        cam.startFollow(this.player);
        cam.setBounds(0, 0);
        cam.setZoom(1.5);

        // Marcador del cursor
        const tileSize = 48;
        this.marker = this.add.graphics();
        this.marker.lineStyle(2, 0xFFFFFF, 1);
        this.marker.strokeRect(0, 0, tileSize, tileSize);

        // Crear castillo
        this.Castillo = this.physics.add.sprite(500, 375, 'castillo');
        this.Castillo.setOrigin(0.5, 0.5);
        this.Castillo.setScale(1);

        this.Castillo.setImmovable(true);
        this.Castillo.setPushable(false);

        this.physics.add.collider(this.player, this.Castillo, () => {
            console.log('Entrando al castillo...');
            this.Castillo.setVelocity(0,0);
            // this.scene.start('levelCastillo');
        });

        // Crear casaBoss
        this.CasaBoss = this.physics.add.sprite(200, 200, 'casaBoss');
        this.CasaBoss.setOrigin(0.5, 0.5);
        this.CasaBoss.setScale(1);

        this.CasaBoss.setImmovable(true);
        this.CasaBoss.setPushable(false);

        this.physics.add.collider(this.player, this.CasaBoss, () => {
            console.log('Entrando a la casa del Boss...');
            this.CasaBoss.setVelocity(0, 0);
            // this.scene.start('levelBoss');
        });

        // Crear cuevas
        for (let i = 0; i < 3; i++) {
            this.ponerCueva();
        }


        // Sombra oscura sobre el mapa
        const darkOverlay = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.6 } });
        darkOverlay.fillRect(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Superposición jugador - cuevas
        this.physics.add.overlap(this.player, this.CuevasGroup, this.entrarCueva, null, this);
    }

    ponerCueva() {
        let position;
        let attempts = 0;
        const maxAttempts = 100;
        const minDistance = 100;

        do {
            position = this.getRandomAccessiblePosition();
            attempts++;
        } while (
            (this.isPositionOccupied(position, minDistance) &&
             this.isNear(position, this.player, minDistance) &&
             this.isNear(position, this.Castillo, minDistance) &&
             this.isNear(position, this.CasaBoss, minDistance))
            && attempts < maxAttempts
        );

        if (attempts === maxAttempts) {
            console.warn('No se encontró una posición adecuada para la cueva después de varios intentos.');
            return;
        }

        const cueva = this.CuevasGroup.create(position.x, position.y, 'cueva');
        cueva.setOrigin(0.5, 0.5);
        cueva.setScale(0.75);
    }

    isPositionOccupied(position, minDistance) {
        return this.CuevasGroup.getChildren().some(cueva => {
            return Phaser.Math.Distance.Between(position.x, position.y, cueva.x, cueva.y) < minDistance;
        });
    }

    isNear(position, object, minDistance) {
        return Phaser.Math.Distance.Between(position.x, position.y, object.x, object.y) < minDistance;
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
        cueva.setImmovable(true);
        this.add.tween({
            targets: this.cameras.main.postFX.addPixelate(0),
            duration: 800,
            amount: 50,
            onComplete: () => {
                this.scene.start('level3', this.datosPlayer);
            }
        })  
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
