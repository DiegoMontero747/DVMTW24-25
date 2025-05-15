import Phaser from 'phaser'
import gen_mazmorra from './gen_mazmorra.js';
import platform from '../assets/sprites/platform.png';
import base from '../assets/sprites/base.png';
import skeleton_handpng from '../assets/sprites/skeleton_hand.png';
import skeleton_hand from '../assets/sprites/skeleton_hand.json';
import warriorpng from '../assets/sprites/warrior.png';
import warrior from '../assets/sprites/warrior.json';
import magepng from '../assets/sprites/mage.png';
import mage from '../assets/sprites/mage.json';
import orcpng from '../assets/sprites/orc2.png';
import orc from '../assets/sprites/orc2.json';
import slimepng from '../assets/sprites/slime2.png';
import slime from '../assets/sprites/slime2.json';
import splatterpng from '../assets/sprites/splatter.png';
import splatter from '../assets/sprites/splatter.json';
import boompng from '../assets/sprites/explosion-sheet.png';
import boom from '../assets/sprites/explosion.json';
import flamethrowerpng from '../assets/sprites/flamethrower.png';
import flamethrower from '../assets/sprites/flamethrower.json';

import NextTurn from '../assets/misc/NextTurn.png';
import Move from '../assets/misc/Move.png';
import Attack from '../assets/misc/Attack.png';
import Menu from '../assets/misc/Menu.png';
import StatsBar from '../assets/misc/StatsBar.png';
import warriorPortrait from '../assets/misc/warriorPortrait.png';
import orcPortrait from '../assets/misc/orcPortrait.png';
import turnBar from '../assets/misc/turnBar.png';
import dir_cursor from '../assets/misc/dir_cursor.png';
import Porton from '../assets/misc/Porton.png';
import trampatxt from '../assets/misc/trampatxt.png';
import trampaOntxt from '../assets/misc/trampaOntxt.png';
import llavetxt from '../assets/misc/llavetxt.png';
import cerraduratxt from '../assets/misc/cerraduratxt.png';
import cerraduraConLlavetxt from '../assets/misc/cerraduraConLlavetxt.png';
import chesstxt from '../assets/misc/chesstxt.png';
import Openchesstxt from '../assets/misc/Openchesstxt.png';
import puertatxt from '../assets/misc/puertatxt.png';
import palancaOff from '../assets/misc/palancaOff.png';
import palancaOn from '../assets/misc/palancaOn.png';
import TNT from '../assets/misc/TNT.png';
import obstaculotxt from '../assets/misc/obstaculotxt.png';

import hitSound1 from '../assets/audio/sfx/hitSound1.wav';
import touchUISound from '../assets/audio/sfx/touchUISound.mp3';
import woodButton from '../assets/audio/sfx/woodButton.mp3';
import showGridSound from '../assets/audio/sfx/showGridSound.mp3';
import slideSound from '../assets/audio/sfx/slideSound.wav';
import Wilhelm from '../assets/audio/sfx/Wilhelm.wav';
import boundLimits from '../assets/audio/sfx/boundLimits.wav';
import swingSound from '../assets/audio/sfx/swingSound.wav';

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
    this.load.image('platform', platform);
    this.load.image('base', base);
  
    this.load.aseprite('player',skeleton_handpng, skeleton_hand);
    this.load.aseprite('player_warrior',warriorpng,warrior);
    this.load.aseprite('player_mage',magepng,mage);
    this.load.aseprite('orc2',orcpng,orc);
    this.load.aseprite('slime2',slimepng,slime);
    this.load.aseprite('blood',splatterpng,splatter);
    this.load.aseprite('KABOOM', boompng, boom);
    this.load.aseprite('flamethrower', flamethrowerpng, flamethrower);


    this.load.image('NextTurn', NextTurn);
    this.load.image('Move', Move);
    this.load.image('Attack', Attack);
    this.load.image('Menu', Menu);
    this.load.image('StatsBar', StatsBar);
    this.load.image('warriorPortrait', warriorPortrait);
    this.load.image('orcPortrait', orcPortrait);
    this.load.image('turnBanner', turnBar);
    this.load.image('dirCursor', dir_cursor);
    this.load.image('porton_txt', Porton);
    this.load.image('trampa_txt', trampatxt);
    this.load.image('trampaOn_txt', trampaOntxt);
    this.load.image('llave_txt', llavetxt);
    this.load.image('cerradura_txt', cerraduratxt);
    this.load.image('cerraduraConLlave_txt', cerraduraConLlavetxt);
    this.load.image('cofre_txt', chesstxt);
    this.load.image('openCofre_txt', Openchesstxt);
    this.load.image('puerta_txt', puertatxt);
    this.load.image('palanca_txt', palancaOff);
    this.load.image('palancaOn_txt', palancaOn);
    this.load.image('tnt_txt', TNT);
    this.load.image('caja_txt', obstaculotxt);

    //this.load.image('player', player);

    //Carga sfx
    this.load.audio('hitSound', hitSound1);
    this.load.audio('touchUISound', touchUISound);
    this.load.audio('woodButton', woodButton);
    this.load.audio('showGridSound', showGridSound);
    this.load.audio('slideSound', slideSound);
    this.load.audio('wilhelm', Wilhelm);
    this.load.audio('boundLimits', boundLimits);
    this.load.audio('swingSound', swingSound);



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