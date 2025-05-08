import Player from './player_warrior.js';
import Phaser from 'phaser';
import gen_mazmorra from './gen_mazmorra.js'; 

export default class World extends Phaser.Scene {
    map;
    CuevasGroup;
    player;
    Castillo;
    CasaBoss;
    cueva1;
    cueva2;
    cueva3;

    constructor() {
        super({ key: 'world' });
    }

    init(data){
        if(data.hp == undefined){
            this.datosPlayer = {
                hp: 10,
                exp: 0,
                level: 1,
                mazmorras:{
                    mazmorra1:{completada:false,mapa:gen_mazmorra(),posX:0,posY:0},
                    mazmorra2:{completada:false,mapa:gen_mazmorra(),posX:0,posY:0},
                    mazmorra3:{completada:false,mapa:gen_mazmorra(),posX:0,posY:0}
                }
            };
        } 
        else {
            this.datosPlayer = {
                hp: data.hp,
                exp: data.exp,
                level: data.level,
                mazmorras:{
                    mazmorra1: data.mazmorras.mazmorra1,
                    mazmorra2: data.mazmorras.mazmorra2,
                    mazmorra3: data.mazmorras.mazmorra3
                }
            };
        }
        
    }

    create() {
        /*Crear layers json*/
        this.map= this.make.tilemap({key:'mapemm'});  

        const tileset = this.map.addTilesetImage('TilesDungeon','TilesDungeon');
        const primer =this.map.addTilesetImage('primer','primer');
        const primer2 =this.map.addTilesetImage('primer2','primer2');
        const obt =this.map.addTilesetImage('obt','obt');

        this.wall_layer = this.map.createLayer("agua", primer, 0, 0);
        this.floor_layer = this.map.createLayer("Fondo", primer, 0, 0);
       
        

        if (this.wall_layer.layer.properties.find(prop => prop.name === "shui" && prop.value === true)) {
            this.wall_layer.setCollisionByExclusion([-1]);
        }

        this.castillo_layer = this.map.createLayer("castillo", primer2,0,0);
      
        this.casaBoss_layer = this.map.createLayer("boss", tileset,0,0);

        this.dec_layer = this.map.createLayer("decoracion", obt, 0, 0);


        this.yaDentroCastillo = false;

        this.physics.world.setBounds(0, 0, this.map.widthInPixels, this.map.heightInPixels);

        // Grupo de cuevas
        
        //separamos las cuevas individualmente para detectar cual ha sido tocada
        this.cueva1 = this.physics.add.group();
        this.cueva2 = this.physics.add.group();
        this.cueva3 = this.physics.add.group();
        //esta contiene el grupo completo (usado para que no se superpongan unas a otras)
        this.CuevasGroup = this.physics.add.group();

        // Crear jugador
        this.player = new Player(this, 500, 600);
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

        this.mazmorras=this.datosPlayer.mazmorras;

        // Crear cuevas
        for (let i = 0; i < 3; i++) {
            
            if(i==0){
                let posCueva=this.ponerCueva(this.cueva1,1);
                this.mazmorras.mazmorra1.completada=false;
                this.mazmorras.mazmorra1.posX=posCueva.posX;
                this.mazmorras.mazmorra1.posY=posCueva.posY;
            }
            if(i==1){
                let posCueva=this.ponerCueva(this.cueva2,2);
                this.mazmorras.mazmorra2.completada=false;
                this.mazmorras.mazmorra2.posX=posCueva.posX;
                this.mazmorras.mazmorra2.posY=posCueva.posY;
            }
            if(i==2){
                let posCueva=this.ponerCueva(this.cueva3,3);
                this.mazmorras.mazmorra3.completada=false;
                this.mazmorras.mazmorra3.posX=posCueva.posX;
                this.mazmorras.mazmorra3.posY=posCueva.posY;
            }
        }


        // Superposición jugador - cuevas
        this.physics.add.overlap(this.player, this.cueva1, this.entrarCueva1, null, this);
        this.physics.add.overlap(this.player, this.cueva2, this.entrarCueva2, null, this);
        this.physics.add.overlap(this.player, this.cueva3, this.entrarCueva3, null, this);
        //this.physics.add.overlap(this.player, this.CuevasGroup, this.entrarCueva, null, this);
        this.player.setFreeMovement(false);

        this.tutorial();

        this.reproducirMusica();

    }

    funCastillo() {
        if (this.dialogoMostrado) return;
    
        this.dialogoMostrado = true;
        this.player.setFreeMovement(false);
    
        const worldView = this.cameras.main.worldView;
        const screenWidth = worldView.width;
        const screenHeight = worldView.height;
    
        const anchoDialogo = screenWidth * 0.6;
        const altoDialogo = screenHeight * 0.4;
    
        const leftBound = worldView.x;
        const bottomBound = worldView.bottom;
    
        const dialogCenterX = leftBound + anchoDialogo / 2 + 20; // margen desde la izquierda
        const dialogCenterY = bottomBound - altoDialogo / 2 - 20; // margen desde abajo
    
        const playerPortrait = this.add.image(leftBound + screenWidth * 0.25, bottomBound - 100, 'soldado')
        .setOrigin(0.5, 1)
        .setScale(1.5); // Ajusta según tamaño de la imagen
    
        // 🧱 Cuadro de diálogo (fondo)
        const fondo = this.add.rectangle(dialogCenterX, dialogCenterY, anchoDialogo, altoDialogo, 0x000000, 0.85)
            .setOrigin(0.5)
            .setStrokeStyle(2, 0xffffff);
    
        // 💬 Texto
        const texto = this.add.text(dialogCenterX, dialogCenterY - altoDialogo / 4, '¿Qué necesitas, guerrero?', {
            fontSize: '18px',
            color: '#ffffff',
            wordWrap: { width: anchoDialogo - 40 },
            align: 'center'
        }).setOrigin(0.5);
    
        // Botón 1 - Información
        const btnInfo = this.add.text(dialogCenterX, dialogCenterY, '¿Qué ha pasado aquí?', {
            fontSize: '16px',
            backgroundColor: '#444',
            color: '#fff',
            padding: { x: 10, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
        // Botón 2 - Curar
        const btnCurar = this.add.text(dialogCenterX, dialogCenterY + 35, 'Necesito cura', {
            fontSize: '16px',
            backgroundColor: '#333',
            color: '#fff',
            padding: { x: 10, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
        // Botón 3 - Cerrar
        const btnCerrar = this.add.text(dialogCenterX, dialogCenterY + 70, 'Cerrar', {
            fontSize: '16px',
            backgroundColor: '#333',
            color: '#fff',
            padding: { x: 10, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
        btnInfo.on('pointerdown', () => {
            this.cuento();
        });

        btnCurar.on('pointerdown', () => {
            // Efecto de curación
            this.datosPlayer.hp = 10;
        
            // Cambiar texto del diálogo
            texto.setText('¡Has sido curado!');
        
            // Ocultar botones de información y curar
            btnInfo.destroy();
            btnCurar.destroy();
        });
        
    
        btnCerrar.on('pointerdown', () => {
            playerPortrait.destroy();
            fondo.destroy();
            texto.destroy();
            btnInfo.destroy();
            btnCurar.destroy();
            btnCerrar.destroy();
            this.dialogoMostrado = false;
            this.player.setFreeMovement(true);
        });
    }
    
    
    cuento() {
        this.player.setFreeMovement(false);
    
        // 📌 Usar el centro de la cámara, no del jugador
        const centerX = this.cameras.main.worldView.centerX;
        const centerY = this.cameras.main.worldView.centerY;
    
        const imagenCuento = this.add.image(centerX, centerY - 80, 'AldeaPixel')
            .setScale(0.75)
            .setOrigin(0.5);
    
        let textoCuento = this.add.text(centerX, centerY + 10,
            'Esto era Darkfall, un reino orgulloso, llena de vida. Comerciantes, herreros, niños corriendo por las calles…\n' +
            'ahora solo quedan ruinas y cenizas.',
            {
                fontSize: '16px',
                color: '#ffffff',
                backgroundColor: '#000000cc',
                padding: { x: 10, y: 10 },
                wordWrap: { width: 400 },
                align: 'center'
            })
            .setOrigin(0.5);
    
        const cerrarCuentoBtn = this.add.text(centerX, centerY + 150, 'Cerrar cuento', {
            fontSize: '14px',
            backgroundColor: '#222',
            color: '#fff',
            padding: { x: 10, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
        let siguienteBtn = this.add.text(centerX, centerY + 115, 'Siguiente', {
            fontSize: '14px',
            backgroundColor: '#333',
            color: '#fff',
            padding: { x: 10, y: 6 },
        }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
        // 🔴 Overlay rojo inicial oculto
        let redOverlay = this.add.graphics();
        redOverlay.fillStyle(0xff0000, 0.15);
        redOverlay.fillRect(this.cameras.main.worldView.x, this.cameras.main.worldView.y, this.cameras.main.width, this.cameras.main.height);
        redOverlay.setVisible(false);
    
        siguienteBtn.on('pointerdown', () => {
            redOverlay.setVisible(true);
    
            textoCuento.setText(
                'El demonio vino sin aviso. Oscureció el cielo y trajo consigo criaturas de pesadilla.\n' +
                'Nos defendimos como pudimos… pero no fue suficiente.'
            );
    
            siguienteBtn.destroy();
    
            siguienteBtn = this.add.text(centerX, centerY + 115, '¿No queda nadie?', {
                fontSize: '14px',
                backgroundColor: '#333',
                color: '#fff',
                padding: { x: 10, y: 6 },
            }).setOrigin(0.5).setInteractive({ useHandCursor: true });
    
            siguienteBtn.on('pointerdown', () => {
                textoCuento.setText(
                    'Unos pocos sobrevivimos, escondidos entre los escombros. Pero vivimos con miedo, y cada noche, los gritos de los que se llevó siguen resonando.\n' +
                    'Si estás aquí para enfrentarlo… todos ponemos nuestras esperanzas en ti. Acaba con él, Poncho. Por Darkfall. Por los que ya no pueden luchar.'
                );
                siguienteBtn.destroy();
            });
        });
    
        cerrarCuentoBtn.on('pointerdown', () => {
            imagenCuento.destroy();
            textoCuento.destroy();
            cerrarCuentoBtn.destroy();
            siguienteBtn.destroy();
            redOverlay.destroy();
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
    pararMusica() {
        if (this.sound.get('dragonMusic')) {
            const music = this.sound.get('dragonMusic');
            this.sound.remove(music);
        }
    }     
    
    tutorial() {
        const popupWidth = 300;
        const popupHeight = 200;
    
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
    
        const tutorialPopup = this.add.container(this.player.x, this.player.y - 125, [
            popupBG, popupImage, popupText, popupButton
        ]);
        tutorialPopup.setDepth(10);
    
        const cerrarTutorial = () => {
            if (tutorialPopup && tutorialPopup.active) {
                tutorialPopup.destroy();
                this.player.setFreeMovement(true);
                this.input.keyboard.removeListener('keydown', onKeyDown);
            }
        };
    
        popupButton.on('pointerdown', cerrarTutorial);
    
        const onKeyDown = (event) => {
            const teclasMovimiento = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
            if (teclasMovimiento.includes(event.key)) {
                cerrarTutorial();
            }
        };
    
        this.input.keyboard.on('keydown', onKeyDown);
    }
    
    

    ponerCueva(grupo,tipo) {
        let position;
        let attempts = 0;
        const maxAttempts = 100;
        const minDistance = 150;
    
        do {
            position = this.getRandomAccessiblePosition();
            attempts++;
        } while (
            attempts < maxAttempts &&
            (
                this.isPositionOccupied(position, minDistance) ||
                this.isNear(position, this.player, minDistance) ||
                this.isNearCasaBoss(position, minDistance) ||
                this.isNearCastillo(position, minDistance)
            )
        );
        
    
        // Si no se encuentra una buena posición, avisar
        if (attempts === maxAttempts) {
            console.warn('No se encontró una posición adecuada para la cueva después de varios intentos.');
            return;
        }

        // Crear la cueva dependiendo del tipo
        let key;
        switch (tipo) {
            case 1: key = 'cuevaDOS'; break;
            case 2: key = 'cuevaTRES'; break;
            default: key = 'cueva'; break;
        }
        const cueva = grupo.create(position.x, position.y, key);
        const cuevatmp = this.CuevasGroup.create(position.x, position.y, key);

        cueva.setOrigin(0.5, 0.5);
        cueva.setScale(1);
    
        // Puedes guardar la referencia si deseas manipular la cueva más adelante
        // this.ultimaCueva = cueva;
        let posicionCueva= {posX:position.x,posY:position.y};
        return posicionCueva;
    }
    

    isNearCastillo(position, minDistance) {
        const tileRadius = Math.ceil(minDistance / this.map.tileWidth);
        const tileX = this.map.worldToTileX(position.x);
        const tileY = this.map.worldToTileY(position.y);
    
        for (let dx = -tileRadius; dx <= tileRadius; dx++) {
            for (let dy = -tileRadius; dy <= tileRadius; dy++) {
                const tx = tileX + dx;
                const ty = tileY + dy;
    
                const tile = this.castillo_layer.getTileAt(tx, ty);
                if (tile && tile.index !== -1) {
                    return true;
                }
            }
        }
        return false;
    }
    isNearCasaBoss(position, minDistance) {
        const tileRadius = Math.ceil(minDistance / this.map.tileWidth);
        const tileX = this.map.worldToTileX(position.x);
        const tileY = this.map.worldToTileY(position.y);
    
        for (let dx = -tileRadius; dx <= tileRadius; dx++) {
            for (let dy = -tileRadius; dy <= tileRadius; dy++) {
                const tx = tileX + dx;
                const ty = tileY + dy;
    
                const tile = this.casaBoss_layer.getTileAt(tx, ty);
                if (tile && tile.index !== -1) {
                    return true;
                }
            }
        }
        return false;
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
        //this.load.tilemapTiledJSON("map_gen",cueva.mapa);
        console.log('Entrando a la cueva...');
        cueva.setImmovable(true);
        this.add.tween({
            targets: this.cameras.main.postFX.addPixelate(0),
            duration: 800,
            amount: 50,
            onComplete: () => {

                console.log(cueva.mapa);
                this.pararMusica();
                this.scene.start('level3', this.datosPlayer);
            }
        })  
    }

    entrarCueva1(player, cueva) {
        this.datosPlayer.nuevoMapa=this.mazmorras.mazmorra1.mapa;
        console.log('Entrando a la cueva1...');
        cueva.setImmovable(true);
        this.add.tween({
            targets: this.cameras.main.postFX.addPixelate(0),
            duration: 800,
            amount: 50,
            onComplete: () => {
                console.log(this.mazmorras.mazmorra1.mapa);
                this.pararMusica();
                this.scene.start('level3', this.datosPlayer);
            }
        })  
    }

    entrarCueva2(player, cueva) {
        this.datosPlayer.nuevoMapa=this.mazmorras.mazmorra2.mapa;
        console.log('Entrando a la cueva2...');
        cueva.setImmovable(true);
        this.add.tween({
            targets: this.cameras.main.postFX.addPixelate(0),
            duration: 800,
            amount: 50,
            onComplete: () => {
                console.log(this.mazmorras.mazmorra2.mapa);
                this.pararMusica();
                this.scene.start('level3', this.datosPlayer);
            }
        })  
    }

    entrarCueva3(player, cueva) {
        this.datosPlayer.nuevoMapa=this.mazmorras.mazmorra3.mapa;
        console.log('Entrando a la cueva3...');
        cueva.setImmovable(true);
        this.add.tween({
            targets: this.cameras.main.postFX.addPixelate(0),
            duration: 800,
            amount: 50,
            onComplete: () => {
                console.log(this.mazmorras.mazmorra3.mapa);
                this.pararMusica();
                this.scene.start('level3', this.datosPlayer);
            }
        })  
    }

    update(time, delta) {
        // 🖱️ Actualizar marcador del cursor
        const worldPoint = this.input.activePointer.positionToCamera(this.cameras.main);
        const gridOffsetX = 0, gridOffsetY = -1, mouseOffsetX = -1, mouseOffsetY = 0, snapInterval = 3;
        const pointerTileX = Phaser.Math.Snap.To(this.map.worldToTileX(worldPoint.x) + mouseOffsetX, snapInterval) + gridOffsetX;
        const pointerTileY = Phaser.Math.Snap.To(this.map.worldToTileY(worldPoint.y) + mouseOffsetY, snapInterval) + gridOffsetY;
        this.marker.x = this.map.tileToWorldX(pointerTileX);
        this.marker.y = this.map.tileToWorldY(pointerTileY);
    
        const playerTileX = this.map.worldToTileX(this.player.x);
        const playerTileY = this.map.worldToTileY(this.player.y);
    
        // ✅ Casa del Boss: siempre cambia de escena si la pisa
        const tileBoss = this.casaBoss_layer.getTileAt(playerTileX, playerTileY);
        if (tileBoss) {
            this.scene.start('levelBoss');
        }
    
        // ✅ Castillo: ejecutar solo una vez por pisada
        const tileCastillo = this.castillo_layer.getTileAt(playerTileX, playerTileY);
        if (tileCastillo && !this.yaDentroCastillo) {
            this.yaDentroCastillo = true;
            this.funCastillo();
        } else if (!tileCastillo) {
            this.yaDentroCastillo = false;
        }
    }    

    
}
