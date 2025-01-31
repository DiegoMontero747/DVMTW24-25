import Platform from './platform.js';
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
        const map= this.make.tilemap({key:'map'});  
        console.log(map);
        const tileset = map.addTilesetImage('Tiles','Tiles');
        const floor_layer = map.createLayer("floor", tileset, 0, 0);
        const wall_layer = map.createLayer("walls", tileset, 0, 0);

        wall_layer.setCollisionByProperty({collides:true});
        wall_layer.renderDebug(this.add.graphics());

        const tag=this.anims.createFromAseprite('player');
        console.log(tag);
        this.player = new Player(this, 72, 128);
        var cam=this.cameras.main;
        cam.startFollow(this.player);
        cam.setBounds(0,0);
        cam.setZoom(2);
        this.physics.add.collider(this.player.body, wall_layer);

    }

    /**
     * Genera una estrella en una de las bases del escenario
     * @param {Array<Base>} from Lista de bases sobre las que se puede crear una estrella
     * Si es null, entonces se crea aleatoriamente sobre cualquiera de las bases existentes
     */
    spawn(from = null) {
        Phaser.Math.RND.pick(from || this.bases.children.entries).spawn();
    }

    /**
     * Método que se ejecuta al coger una estrella. Se pasa la base
     * sobre la que estaba la estrella cogida para evitar repeticiones
     * @param {Base} base La base sobre la que estaba la estrella que se ha cogido
     */
    starPickt(base) {
        this.player.point();
        if (this.player.score == this.stars) {
            this.scene.start('end');
        }
        else {
            let s = this.bases.children.entries;
            this.spawn(s.filter(o => o !== base));

        }
    }
}
