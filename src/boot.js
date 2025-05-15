import Phaser from 'phaser'
import gen_mazmorra from './gen_mazmorra.js';
import platform from '../assets/sprites/platform.png';


/**
 * Escena para la precarga de los assets que se usarán en el juego.
 * Esta escena se puede mejorar añadiendo una imagen del juego y una 
 * barra de progreso de carga de los assets
 * @see {@link https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/} como ejemplo
 * sobre cómo hacer una barra de progreso.
 */
  import combatMusic from '../assets/audio/music/combatMusic.mp3'
  import dragonMusic from '../assets/audio/music/battle-of-the-dragons.mp3'

  import mapmm from '../assets/tilemaps/mapV5.json'
  import primer from '../assets/tilemaps/primer.png'
  import mapBoss from '../assets/tilemaps/MAPBOSS.json'
  import primer2 from '../assets/tilemaps/primer2.png'
  import props from '../assets/tilemaps/Props.png'
  import propsA from '../assets/tilemaps/PropsF.png'
  import mapaOriginal from '../assets/tilemaps/sinNombre2.json'
  import tilesDungeon from '../assets/tilemaps/Tiles.png'
  import arena from '../assets/tilemaps/Arena.json'
  import propsF from '../assets/tilemaps/PropsF.png'
  import mazmorra_1 from '../assets/tilemaps/Mazmorra 1.png'
  import mazmorra_2 from '../assets/tilemaps/Mazmorra 2.png'
  import mazmorra_3 from '../assets/tilemaps/Mazmorra 3.png'
  import movimiento from '../assets/tilemaps/Movimiento.png'
  import ciudad from '../assets/tilemaps/ciudad.png'
  import obt from '../assets/tilemaps/obt.png'
  import ares from '../assets/tilemaps/ares.png'
  

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
    //this.load.setBaseURL('http://localhost:5173/DVMTW24-25');
    this.load.image(platform, 'platform.png');
    this.load.aseprite('player',skeleton_png,skeleton_json);

    this.load.setBaseURL(window.location.origin+'/DVMTW24-25');
    this.load.setPath('assets/sprites/');
    this.load.image('base', 'base.png');
  
    this.load.aseprite('player_warrior','warrior.png','warrior.json');
    this.load.aseprite('player_mage','mage.png','mage.json');
    this.load.aseprite('orc2','orc2.png','orc2.json');
    this.load.aseprite('slime2','slime2.png','slime2.json');
    this.load.aseprite('blood','splatter.png','splatter.json');
    this.load.aseprite('KABOOM', 'explosion-sheet.png', 'explosion.json');
    this.load.aseprite('flamethrower', 'flamethrower.png', 'flamethrower.json');


    this.load.setPath('assets/misc/');
    this.load.image('NextTurn', 'NextTurn.png');
    this.load.image('Move', 'Move.png');
    this.load.image('Attack', 'Attack.png');
    this.load.image('Menu', 'Menu.png');
    this.load.image('StatsBar', 'StatsBar.png');
    this.load.image('warriorPortrait', 'warriorPortrait.png');
    this.load.image('orcPortrait', 'orcPortrait.png');
    this.load.image('turnBanner', 'turnBar.png');
    this.load.image('dirCursor', 'dir_cursor.png');
    this.load.image('porton_txt', 'Porton.png');
    this.load.image('trampaOff_txt', 'trampatxt.png');
    this.load.image('trampaOn_txt', 'trampaOntxt.png');
    this.load.image('actionAvailable', 'actionAvailable.png');
    this.load.image('actionUnavailable', 'actionUnavailable.png');


    this.load.image('llave_txt', 'llavetxt.png');
    this.load.image('cerradura_txt', 'cerraduratxt.png');
    this.load.image('cerraduraConLlave_txt', 'cerraduraConLlavetxt.png');
    this.load.image('cofre_txt', 'chesstxt.png');
    this.load.image('openCofre_txt', 'Openchesstxt.png');
    this.load.image('puerta_txt', 'puertatxt.png');
    this.load.image('portal_txt', 'Portal.png');
    this.load.image('palanca_txt', 'palancaOff.png');
    this.load.image('palancaOn_txt', 'palancaOn.png');
    this.load.image('tnt_txt', 'TNT.png');
    this.load.image('caja_txt', 'obstaculotxt.png');

    //this.load.image('player', player);

    //Carga sfx
    this.load.setPath('assets/audio/sfx/');
    this.load.audio('hitSound', 'hitSound1.wav');
    this.load.audio('touchUISound', 'touchUISound.mp3');
    this.load.audio('woodButton', 'woodButton.mp3');
    this.load.audio('showGridSound', 'showGridSound.mp3');
    this.load.audio('slideSound', 'slideSound.wav');
    this.load.audio('wilhelm', 'Wilhelm.wav');
    this.load.audio('boundLimits', 'boundLimits.wav');
    this.load.audio('swingSound', 'swingSound.wav');



    this.load.setPath('assets/audio/music/');
    this.load.audio('combatMusic', combatMusic);
    this.load.audio('dragonMusic', dragonMusic);

    //Carga de tilemap
    //this.load.setPath('assets/tilemaps/');

    /*Carga .CSV (formato mas sencillo algoritmos de generacion procedural)
    this.load.tilemapCSV('map_floor', 'movetest_floor.csv');
    this.load.tilemapCSV('map_walls', 'movetest_walls.csv');*/

    //Carga .JSON (formato mas comodo en codigo)

    this.load.tilemapTiledJSON("mapOriginal",mapaOriginal);
    this.load.tilemapTiledJSON("arena", arena);

    //let dato = JSON.parse(texto);
    //this.load.tilemapTiledJSON("map","Prueba_001.json");
    //let mazmorra=gen_mazmorra();
    //console.log(mazmorra);
    //this.load.tilemapTiledJSON("map",mazmorra);
    
    this.load.image('TilesDungeon', tilesDungeon);

    this.load.image('PropsF', propsF);
    this.load.image('PropsA', propsF);
    this.load.image('Props', props);

    this.load.image('cueva', mazmorra_1);
    this.load.image('cuevaDOS', mazmorra_2);
    this.load.image('cuevaTRES', mazmorra_3);
    this.load.image('tutorialMovimienton', movimiento);

    this.load.image('AldeaPixel', ciudad);
    this.load.image('primer', primer);
    this.load.image('primer2', primer2);
    this.load.image('soldado', ares);
    this.load.image('obt', obt);
 
    this.load.tilemapTiledJSON("mapaBoss",mapBoss);
    this.load.tilemapTiledJSON("mapemm",mapmm);



  }
  
  /**
   * Creación de la escena. En este caso, solo cambiamos a la escena que representa el
   * nivel del juego
   */
  create() {
    this.input.mouse.disableContextMenu();
    this.scene.start('world');
  }
}