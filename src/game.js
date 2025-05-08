
console.log("Etoy aqui")

import Boot from './boot.js';
import End from './end.js';
import Level from './level.js';
import Level2 from './level2.js';
import Level3 from './level3.js';
import combatScene from './combatScene.js';
import Phaser from 'phaser';
import GameShaderCRT from "./shaders/crtShader.js"; 
import GameShaderRetro from "./shaders/retroShader.js"; 
import GameShaderGBA from "./shaders/gbaShader.js"; 
import GameShaderPixel from "./shaders/pixelShader.js"; 
import LevelDebug from './levelDebug.js';
import world from './world.js';
import levelBoss from './levelBoss.js';


/**
 * Inicio del juego en Phaser. Creamos el archivo de configuración del juego y creamos
 * la clase Game de Phaser, encargada de crear e iniciar el juego.
 */
let config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    parent: 'juego',
    scale: {
        mode: Phaser.Scale.FIT,  
        autoCenter: Phaser.Scale.CENTER_HORIZONTALLY
    },
    pixelArt: true,
    scene: [Boot,world,levelBoss, Level,Level2,Level3,combatScene,LevelDebug, End],


    //en nuestro caso scene: [Boot, Mundo, Dungeon, Combate, End],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: true
        }
    },
    pipeline: [GameShaderCRT,GameShaderRetro,GameShaderGBA,GameShaderPixel]
};

new Phaser.Game(config);
