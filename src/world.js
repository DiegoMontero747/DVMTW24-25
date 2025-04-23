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
            this.funCastillo();
            
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
        const darkOverlay = this.add.graphics({ fillStyle: { color: 0x000000, alpha: 0.45 } });
        darkOverlay.fillRect(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Superposición jugador - cuevas
        this.physics.add.overlap(this.player, this.CuevasGroup, this.entrarCueva, null, this);

        this.player.setFreeMovement(false);

        this.tutorial();

        this.reproducirMusica();

    }

    funCastillo() {
        if (this.dialogoMostrado) return;
    
        this.dialogoMostrado = true;
        this.player.setFreeMovement(false); // 🔒 Bloquear movimiento
    
        const dialogWidth = 300;
        const dialogHeight = 215; // ⬆️ Aumentado para incluir ambos botones
        const offsetY = 90;
    
        const posX = this.player.x;
        const posY = this.player.y + offsetY;
    
        // 🖼️ Imagen del guerrero encima del diálogo
        const icon = this.add.image(posX, posY - dialogHeight / 2 - 120, 'Ciudad')
            .setScale(1)
            .setOrigin(0.5);
    
        // 🧱 Fondo del diálogo
        const dialogBg = this.add.rectangle(posX, posY, dialogWidth, dialogHeight, 0x000000, 0.85)
            .setStrokeStyle(2, 0xffffff)
            .setOrigin(0.5);
    
        // 📝 Texto dentro del cuadro
        const dialogText = this.add.text(posX, posY - 40, '¿Qué necesitas, guerrero?', {
            fontSize: '16px',
            color: '#ffffff',
            wordWrap: { width: dialogWidth - 30 },
            align: 'center',
        }).setOrigin(0.5);
    
        // 🔘 Botón "Cerrar"
        const cerrarBtn = this.add.text(posX, posY + 85, 'Cerrar', {
            fontSize: '14px',
            backgroundColor: '#333',
            color: '#fff',
            padding: { x: 10, y: 4 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
        // 🔘 Botón "¿Qué ha pasado aquí? Esta ciudad parece muerta…"
        const infoBtn = this.add.text(posX, posY + 15, '¿Qué ha pasado aquí? \n Esta ciudad parece muerta…', {
            fontSize: '14px',
            backgroundColor: '#444',
            color: '#fff',
            padding: { x: 10, y: 4 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        // 🔘 Botón "Curar"
        const curarBtn = this.add.text(posX, posY + 55, 'Necesito cura', {
            fontSize: '14px',
            backgroundColor: '#333',
            color: '#fff',
            padding: { x: 10, y: 4 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        infoBtn.on('pointerdown', () => {
        
            this.cuento();
        });


        curarBtn.on('pointerdown', () => {
        
            
        });
    
        cerrarBtn.on('pointerdown', () => {
            icon.destroy();
            dialogBg.destroy();
            dialogText.destroy();
            cerrarBtn.destroy();
            infoBtn.destroy();
            curarBtn.destroy();

            this.player.setFreeMovement(true); // 🔓 Volver a mover
            this.dialogoMostrado = false;
        });
    }
    
    

    cuento() {
        this.player.setFreeMovement(false);
    
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
    
        const imagenCuento = this.add.image(centerX, centerY + 20, 'AldeaPixel')
            .setScale(0.75)
            .setOrigin(0.5);
    
        let textoCuento = this.add.text(centerX, centerY + 75,
            'Esto era Darkfall, un reino orgulloso, llena de vida. Comerciantes, herreros, niños corriendo por las calles…\n' +
            'ahora solo quedan ruinas y cenizas.',
            {
                fontSize: '16px',
                color: '#ffffff',
                backgroundColor: '#000000aa',
                padding: { x: 10, y: 10 },
                wordWrap: { width: 400 },
                align: 'center'
            })
            .setOrigin(0.5);
    
        const cerrarCuentoBtn = this.add.text(centerX, centerY + 165, 'Cerrar cuento', {
            fontSize: '14px',
            backgroundColor: '#222',
            color: '#fff',
            padding: { x: 10, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
        let siguienteBtn = this.add.text(centerX, centerY + 135, 'Siguiente', {
            fontSize: '14px',
            backgroundColor: '#333',
            color: '#fff',
            padding: { x: 10, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
        let redOverlay = null;
    
        siguienteBtn.on('pointerdown', () => {
            if (!redOverlay) {
                redOverlay = this.add.graphics({ fillStyle: { color: 0xff0000, alpha: 0.2 } });
                redOverlay.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
            }
    
            textoCuento.setText('El demonio vino sin aviso. Oscureció el cielo y trajo consigo criaturas de pesadilla.\n' +
                'Nos defendimos como pudimos… pero no fue suficiente.');
    
            // Reemplazar el primer botón "Siguiente" por el segundo
            siguienteBtn.destroy();
            siguienteBtn = this.add.text(centerX, centerY + 135, '¿No queda nadie?', {
                fontSize: '14px',
                backgroundColor: '#333',
                color: '#fff',
                padding: { x: 10, y: 6 },
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
            siguienteBtn.on('pointerdown', () => {
                textoCuento.setText('Unos pocos sobrevivimos, escondidos entre los escombros. Pero vivimos con miedo, y cada noche, los gritos de los que se llevó siguen resonando.\n' +
                    ' Si estás aquí para enfrentarlo… todos ponemos nuestras esperanzas en ti. Acaba con él, Poncho. Por Darkfall. Por los que ya no pueden luchar.');
    
                siguienteBtn.destroy();
            });
        });
    
        cerrarCuentoBtn.on('pointerdown', () => {
            imagenCuento.destroy();
            textoCuento.destroy();
            cerrarCuentoBtn.destroy();
            siguienteBtn.destroy();
            if (redOverlay) redOverlay.destroy();
            this.player.setFreeMovement(true);
        });
    }
    
    reproducirMusica() {
        if (!this.sound.get('dragonMusic')) {
            const music = this.sound.add('dragonMusic', {
                loop: true,
                volume: 0.4
            });
            music.play();
        }
    }   
    

    tutorial(){

        
        const popupWidth = 300;
        const popupHeight = 180;

        const popupBG = this.add.rectangle(0, 0, popupWidth, popupHeight, 0x000000, 0.8);
        popupBG.setStrokeStyle(2, 0xffffff);

        const popupImage = this.add.image(0, -40, 'tutorialMovimienton').setScale(0.5);

        const popupText = this.add.text(0, 40, 'Movimiento del personaje', {
            fontSize: '16px',
            color: '#ffffff',
        }).setOrigin(0.5);

        const popupButton = this.add.text(0, 75, 'Entendido', {
            fontSize: '14px',
            backgroundColor: '#333',
            color: '#fff',
            padding: { x: 10, y: 5 },
            align: 'center',
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });

        const tutorialPopup = this.add.container(this.player.x, this.player.y - 100, [
            popupBG, popupImage, popupText, popupButton
        ]);

        tutorialPopup.setDepth(10); // Asegurarse de que esté arriba

        popupButton.on('pointerdown', () => {
            tutorialPopup.destroy(); // Ocultar el popup
            this.player.setFreeMovement(true);
        });

        if (tutorialPopup && tutorialPopup.active) {
            tutorialPopup.setPosition(this.player.x, this.player.y - 100);
        }


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
            (
                this.isPositionOccupied(position, minDistance) ||
                this.isNear(position, this.player, minDistance) ||
                this.isNear(position, this.Castillo, minDistance) ||
                this.isNear(position, this.CasaBoss, minDistance)
            )
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
                this.sound.pauseOnBlur = false;
                this.scene.start('level3');
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
