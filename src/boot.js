import Phaser from 'phaser'
import gen_mazmorra from './gen_mazmorra.js';
import platform from '/DVMTW24-25/assets/sprites/platform.png';
import base from '/DVMTW24-25/assets/sprites/base.png';
import skeleton_handpng from '/DVMTW24-25/assets/sprites/skeleton_hand.png';
import skeleton_hand from '/DVMTW24-25/assets/sprites/skeleton_hand.json';
import warriorpng from '/DVMTW24-25/assets/sprites/warrior.png';
import warrior from '/DVMTW24-25/assets/sprites/warrior.json';
import magepng from '/DVMTW24-25/assets/sprites/mage.png';
import mage from '/DVMTW24-25/assets/sprites/mage.json';
import orcpng from '/DVMTW24-25/assets/sprites/orc2.png';
import orc from '/DVMTW24-25/assets/sprites/orc2.json';
import slimepng from '/DVMTW24-25/assets/sprites/slime2.png';
import slime from '/DVMTW24-25/assets/sprites/slime2.json';
import splatterpng from '/DVMTW24-25/assets/sprites/splatter.png';
import splatter from '/DVMTW24-25/assets/sprites/splatter.json';
import boompng from '/DVMTW24-25/assets/sprites/explosion-sheet.png';
import boom from '/DVMTW24-25/assets/sprites/explosion.json';
import flamethrowerpng from '/DVMTW24-25/assets/sprites/flamethrower.png';
import flamethrower from '/DVMTW24-25/assets/sprites/flamethrower.json';

import NextTurn from '/DVMTW24-25/assets/misc/NextTurn.png';
import Move from '/DVMTW24-25/assets/misc/Move.png';
import Attack from '/DVMTW24-25/assets/misc/Attack.png';
import Menu from '/DVMTW24-25/assets/misc/Menu.png';
import StatsBar from '/DVMTW24-25/assets/misc/StatsBar.png';
import warriorPortrait from '/DVMTW24-25/assets/misc/warriorPortrait.png';
import orcPortrait from '/DVMTW24-25/assets/misc/orcPortrait.png';
import turnBar from '/DVMTW24-25/assets/misc/turnBar.png';
import dir_cursor from '/DVMTW24-25/assets/misc/dir_cursor.png';
import Porton from '/DVMTW24-25/assets/misc/Porton.png';
import trampatxt from '/DVMTW24-25/assets/misc/trampatxt.png';
import trampaOntxt from '/DVMTW24-25/assets/misc/trampaOntxt.png';
import llavetxt from '/DVMTW24-25/assets/misc/llavetxt.png';
import cerraduratxt from '/DVMTW24-25/assets/misc/cerraduratxt.png';
import cerraduraConLlavetxt from '/DVMTW24-25/assets/misc/cerraduraConLlavetxt.png';
import chesstxt from '/DVMTW24-25/assets/misc/chesstxt.png';
import Openchesstxt from '/DVMTW24-25/assets/misc/Openchesstxt.png';
import puertatxt from '/DVMTW24-25/assets/misc/puertatxt.png';
import palancaOff from '/DVMTW24-25/assets/misc/palancaOff.png';
import palancaOn from '/DVMTW24-25/assets/misc/palancaOn.png';
import TNT from '/DVMTW24-25/assets/misc/TNT.png';
import obstaculotxt from '/DVMTW24-25/assets/misc/obstaculotxt.png';

import hitSound1 from '/DVMTW24-25/assets/audio/sfx/hitSound1.wav';
import touchUISound from '/DVMTW24-25/assets/audio/sfx/touchUISound.mp3';
import woodButton from '/DVMTW24-25/assets/audio/sfx/woodButton.mp3';
import showGridSound from '/DVMTW24-25/assets/audio/sfx/showGridSound.mp3';
import slideSound from '/DVMTW24-25/assets/audio/sfx/slideSound.wav';
import Wilhelm from '/DVMTW24-25/assets/audio/sfx/Wilhelm.wav';
import boundLimits from '/DVMTW24-25/assets/audio/sfx/boundLimits.wav';
import swingSound from '/DVMTW24-25/assets/audio/sfx/swingSound.wav';
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


    this.load.setPath('/assets/misc/');
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
    this.load.setPath('/assets/audio/sfx/');
    this.load.audio('hitSound', hitSound1);
    this.load.audio('touchUISound', touchUISound);
    this.load.audio('woodButton', woodButton);
    this.load.audio('showGridSound', showGridSound);
    this.load.audio('slideSound', slideSound);
    this.load.audio('wilhelm', Wilhelm);
    this.load.audio('boundLimits', boundLimits);
    this.load.audio('swingSound', swingSound);



    this.load.setPath('/assets/audio/music/');
    this.load.audio('combatMusic', 'combatMusic.mp3');

    //Carga de tilemap
    this.load.setPath('/assets/tilemaps/');

    /*Carga .CSV (formato mas sencillo algoritmos de generacion procedural)
    this.load.tilemapCSV('map_floor', 'movetest_floor.csv');
    this.load.tilemapCSV('map_walls', 'movetest_walls.csv');*/

    //Carga .JSON (formato mas comodo en codigo)

    this.load.image('mapaPeninsula', 'mapaPeninsula.jpg');
    this.load.tilemapTiledJSON("mapOriginal","sinNombre2.json");
    this.load.tilemapTiledJSON("arena","Arena.json");
    this.load.tilemapTiledJSON("mapaMundial","mapamundi.json");

    
    //let dato = JSON.parse(texto);
    //this.load.tilemapTiledJSON("map","Prueba_001.json");
    let mazmorra=gen_mazmorra();
    console.log(mazmorra);
    this.load.tilemapTiledJSON("map",mazmorra);
    
    this.load.image('TilesDungeon', 'Tiles.png');
    this.load.image('PropsA', 'PropsF.png');
    this.load.image('Props', 'Props.png');


    this.load.image('casaBoss', 'casaBoss.png');
    this.load.image('castillo', 'castillo.png');
    this.load.image('cueva', 'cueva.png');
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