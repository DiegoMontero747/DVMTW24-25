import Phaser from 'phaser'

/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
export default class Boot extends Phaser.Scene {
  /**
   * Constructor de la escena
   */
  constructor() {
    super({ key: 'boot' });
  }

  /**
   * Carga de los assets del juego
   */
  preload() {
    // Con setPath podemos establecer el prefijo que se añadirá a todos los load que aparecen a continuación
    this.load.setBaseURL('http://localhost:5173/DVMTW24-25');
    this.load.setPath('/assets/sprites/');
    this.load.image('platform', 'platform.png');
    this.load.image('base', 'base.png');
    this.load.image('star', 'star.png');
    this.load.aseprite('player','skeleton_hand.png','skeleton_hand.json');
    this.load.aseprite('player_warrior','warrior.png','warrior.json');
    this.load.aseprite('player_mage','mage.png','mage.json');
    this.load.aseprite('orc2','orc2.png','orc2.json');
    this.load.aseprite('blood','splatter.png','splatter.json');

    this.load.setPath('/assets/misc/');
    this.load.image('NextTurn', 'NextTurn.png');
    this.load.image('Move', 'Move.png');
    this.load.image('Attack', 'Attack.png');
    this.load.image('Menu', 'Menu.png');
    this.load.image('StatsBar', 'StatsBar.png');
    this.load.image('warriorPortrait', 'warriorPortrait.png');
    this.load.image('orcPortrait', 'orcPortrait.png');
    this.load.image('turnBanner', 'turnBar.png');
    this.load.image('portontxt', 'Porton.png');
    this.load.image('trampatxt', 'trampatxt.png');
    this.load.image('llavetxt', 'llavetxt.png');
    this.load.image('cerraduratxt', 'cerraduratxt.png');
    this.load.image('chesstxt', 'chesstxt.png');
    this.load.image('puertatxt', 'puertatxt.png');
    this.load.image('palancaOff', 'palancaOff.png');

    //this.load.image('player', player);

    //Carga sfx
    this.load.setPath('/assets/audio/sfx/');
    this.load.audio('hitSound', 'hitSound1.wav');
    this.load.audio('touchUISound', 'touchUISound.mp3');
    this.load.audio('woodButton', 'woodButton.mp3');
    this.load.audio('showGridSound', 'showGridSound.mp3');
    this.load.audio('slideSound', 'slideSound.wav');
    this.load.audio('wilhelm', 'Wilhelm.wav');
    this.load.audio('boundLimits', 'boundLimits.wav');


    this.load.setPath('/assets/audio/music/');
    this.load.audio('combatMusic', 'combatMusic.mp3');

    //Carga de tilemap
    this.load.setPath('/assets/tilemaps/');

    /*Carga .CSV (formato mas sencillo algoritmos de generacion procedural)
    this.load.tilemapCSV('map_floor', 'movetest_floor.csv');
    this.load.tilemapCSV('map_walls', 'movetest_walls.csv');*/

    //Carga .JSON (formato mas comodo en codigo)
    let texto='{ "compressionlevel":-1, "height":20, "infinite":false, "layers":[{"data":[31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 31, 31, 31, 31, 34, 34,31, 31, 3221225703, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 31, 3221225703, 31, 31, 34, 34,31, 31, 3221225678, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 31, 3221225678, 31, 31, 34, 34,31, 2684355064, 505, 1610613242, 31, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 2684355061, 502, 1610613239, 31, 34, 34,31, 505, 505, 505, 31, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 502, 502, 502, 31, 34, 34,31, 504, 505, 506, 31, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 501, 502, 503, 31, 34, 34,31, 31, 31, 31, 31, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31,34, 31, 31, 31, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31,34, 31, 31, 31, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 278, 279, 280, 31, 31, 31,34, 31, 31, 31, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,            34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,         34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31,34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 34, 34, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31,34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31,34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 476, 477, 478, 31, 31, 31,34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 501, 502, 503, 31, 31, 31,34, 34, 34, 34, 34, 34, 34, 34, 34, 34, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31, 31],"height":20,"id":1,"name":"Suelo","opacity":1,"type":"tilelayer","visible":true,"width":30,"x":0,"y":0}, {"data":[104, 355, 3, 354, 2, 2, 2, 2, 2, 2, 2, 2, 3, 105, 311, 311, 311, 311, 311, 311, 311, 311, 311, 104, 352, 2, 351, 105, 311, 311,129, 380, 0, 379, 126, 27, 27, 27, 27, 27, 27, 27, 28, 130, 311, 311, 311, 311, 311, 311, 311, 311, 311, 129, 377, 0, 376, 130, 311, 311,129, 405, 0, 404, 151, 52, 52, 52, 52, 52, 52, 52, 53, 130, 311, 311, 311, 311, 311, 311, 311, 311, 311, 129, 402, 0, 401, 130, 311, 311,129, 430, 0, 429, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130, 311, 311, 311, 311, 311, 311, 311, 311, 311, 129, 427, 0, 426, 130, 311, 311,129, 0, 0, 0, 0, 0, 0, 0, 0, 263, 263, 0, 0, 130, 311, 311, 311, 311, 311, 311, 311, 311, 311, 129, 0, 0, 0, 130, 311, 311,129, 0, 0, 0, 76, 77, 77, 77, 77, 78, 0, 0, 0, 130, 311, 311, 311, 311, 311, 311, 311, 311, 311, 129, 0, 0, 0, 130, 311, 311,129, 0, 0, 0, 130, 311, 104, 1, 2, 103, 0, 0, 0, 101, 2, 3, 105, 311, 311, 311, 311, 104, 1, 103, 0, 0, 0, 101, 3, 105,129, 0, 0, 0, 130, 311, 129, 26, 27, 27, 0, 0, 0, 27, 27, 28, 101, 2, 2, 2, 2, 103, 26, 128, 0, 0, 0, 126, 28, 130,129, 0, 0, 0, 130, 311, 129, 51, 52, 52, 0, 0, 0, 52, 52, 53, 126, 27, 27, 27, 27, 128, 51, 153, 0, 0, 0, 151, 53, 130,129, 0, 0, 0, 101, 2, 103, 0, 0, 0, 0, 0, 0, 0, 0, 0, 151, 52, 52, 52, 52, 153, 0, 0, 0, 0, 0, 0, 0, 130,129, 0, 0, 0, 27, 27, 128, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130,129, 0, 0, 0, 52, 52, 153, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130,129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130,129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 76, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 155,154, 77, 77, 77, 77, 77, 77, 77, 77, 77, 78, 0, 0, 101, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 102, 102, 2, 2, 3, 105,311, 311, 311, 311, 311, 311, 311, 311, 311, 311, 129, 0, 0, 26, 27, 27, 27, 27, 27, 27, 27, 27, 27, 27, 127, 127, 27, 27, 28, 130,311, 311, 311, 311, 311, 311, 311, 311, 311, 311, 129, 0, 0, 51, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 52, 452, 52, 52, 53, 130,311, 311, 311, 311, 311, 311, 311, 311, 311, 311, 129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130,311, 311, 311, 311, 311, 311, 311, 311, 311, 311, 129, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 130,311, 311, 311, 311, 311, 311, 311, 311, 311, 311, 154, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 77, 155],"height":20,"id":2,"name":"Paredes","opacity":1,"properties":[{ "name":"Collide", "type":"bool", "value":true}],"type":"tilelayer","visible":true,"width":30,"x":0,"y":0}, {"draworder":"topdown","id":7,"name":"Puertas","objects":[{"height":62,"id":17,"name":"Porton","properties":[{"name":"Collide","type":"bool","value":true}, {"name":"Texture","type":"string","value":"portontxt"}],"rotation":0,"type":"","visible":true,"width":48,"x":383.75,"y":80.25}, {"height":32,"id":18,"name":"Puerta final","properties":[{"name":"Collide","type":"bool","value":true}, {"name":"Texture","type":"string","value":"puertatxt"}],"rotation":0,"type":"","visible":true,"width":16,"x":400,"y":15.5}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}, {"draworder":"topdown","id":6,"name":"Objetos","objects":[{"height":32,"id":4,"name":"Cerradura","properties":[{"name":"Texture","type":"string","value":"cerraduratxt"}],"rotation":0,"type":"","visible":true,"width":16,"x":432.5,"y":110.5}, {"height":16,"id":6,"name":"Llave","properties":[{"name":"Collide","type":"bool","value":false}, {"name":"Texture","type":"string","value":"llavetxt"}],"rotation":0,"type":"","visible":true,"width":16,"x":399.5,"y":280.5}, {"height":16,"id":14,"name":"Trampa","properties":[{"name":"Collide","type":"bool","value":true}, {"name":"Texture","type":"string","value":"trampatxt"}],"rotation":0,"type":"","visible":true,"width":16,"x":359.5,"y":272.5}, {"height":16,"id":15,"name":"Trampa","properties":[{"name":"Collide","type":"bool","value":true}, {"name":"Texture","type":"string","value":"trampatxt"}],"rotation":0,"type":"","visible":true,"width":16,"x":359.5,"y":288.5}, {"height":32,"id":20,"name":"Cofre","properties":[{"name":"Collide","type":"bool","value":true}, {"name":"Texture","type":"string","value":"chesstxt"}],"rotation":0,"type":"","visible":true,"width":16.5,"x":399.5,"y":57}, {"height":32,"id":29,"name":"Palanca","properties":[{"name":"Collide","type":"bool","value":true}, {"name":"Texture","type":"string","value":"palancaOff"}],"rotation":0,"type":"","visible":true,"width":16,"x":447.5,"y":159.5}],"opacity":1,"type":"objectgroup","visible":true,"x":0,"y":0}, {"data":[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 326, 327, 328, 329, 330, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 926, 0, 0, 0, 0, 0, 926, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 951, 0, 0, 0, 0, 0, 951, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 926, 0, 926, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 951, 0, 951, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],"height":20,"id":4,"name":"Decorado","opacity":1,"type":"tilelayer","visible":true,"width":30,"x":0,"y":0}],"nextlayerid":8,"nextobjectid":32,"orientation":"orthogonal","renderorder":"right-down","tiledversion":"1.11.2","tileheight":16,"tilesets":[{"columns":25,"firstgid":1,"image":"..\/sprites\/Pixel Crawler - FREE - 1.8\/Environment\/Dungeon Prison\/Assets\/Tiles.png","imageheight":400,"imagewidth":400,"margin":0,"name":"TilesDungeon","spacing":0,"tilecount":625,"tileheight":16,"tilewidth":16}, {"columns":25,"firstgid":626,"image":"..\/sprites\/Pixel Crawler - FREE - 1.8\/Environment\/Dungeon Prison\/Assets\/Props.aseprite","imageheight":400,"imagewidth":400,"margin":0,"name":"Objetos","spacing":0,"tilecount":625,"tileheight":16,"tilewidth":16}],"tilewidth":16,"type":"map","version":"1.10","width":30}';
    let dato = JSON.parse(texto);
    //this.load.tilemapTiledJSON("map","Prueba_001.json");
    this.load.tilemapTiledJSON("map",dato);

    this.load.image('TilesDungeon', 'Tiles.png');
    this.load.image('PropsA', 'PropsF.png');
    this.load.image('Props', 'Props.png');
  }

  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.scene.start('levelDebug');
  }
}