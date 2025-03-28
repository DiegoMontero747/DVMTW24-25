import Phaser from 'phaser'
import gen_mazmorra from './gen_mazmorra.js';
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

    
    //let dato = JSON.parse(texto);
    //this.load.tilemapTiledJSON("map","Prueba_001.json");
    
    
    //--------------falta hacer que cargue (las mazmorras pesan mucho)
    let mazmorra=gen_mazmorra();
    console.log(mazmorra);
    this.load.tilemapTiledJSON("map",mazmorra);
    
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