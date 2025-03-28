const tamx = 50, tamy = 50, num_salas = ((tamx + tamy) / 2) / 10, max_errores = (tamx + tamy) / 5;

const c_pared = '#',
    c_puerta = 'P',
    c_obstaculo = 'O',
    c_explosivo = 'X',
    c_trampa = 'T',
    c_ene_ran = 'e',
    c_ene_melee = 'E',
    c_cura = 'C',
    c_recompensa = 'R',
    c_salida = 'S',
    c_vacio = ' ';

const i_suelo = 31,
    i_pared_negro = 311,
    i_pared_d = 77,
    i_pared_l = 129,
    i_pared_r = 130,
    i_pared_u = 2,
    i_pared_u2 = 27,
    i_pared_esquina_pequeña_dl = 154,
    i_pared_esquina_pequeña_dr = 155,
    i_pared_esquina_pequeña_ul = 104,
    i_pared_esquina_pequeña_ur = 105,
    i_pared_esquina_grande_dl = 101,
    i_pared_esquina_grande_dr = 103,
    i_pared_esquina_grande_ur = 78,
    i_pared_esquina_grande_ul = 76;

class Coordenada {
    constructor(y, x) {
        this.y = y;
        this.x = x;
    }
}

class Sala {
    constructor(tamx, tamy, puerta, obstaculo , pared , enemigo_melee , enemigo_ranged , explosivo , trampa , cura , recompensa , salida ) {
        
        //console.log(tamx, tamy, puerta, obstaculo , pared , enemigo_melee , enemigo_ranged , explosivo , trampa , cura , recompensa , salida);
        this.tamx = tamx;
        this.tamy = tamy;
        this.puerta = puerta;
        this.obstaculo = obstaculo;
        this.pared = pared;
        this.enemigo_melee = enemigo_melee;
        this.enemigo_ranged = enemigo_ranged;
        this.explosivo = explosivo;
        this.trampa = trampa;
        this.cura = cura;
        this.recompensa = recompensa;
        this.salida = salida;
    }
}

const salaPPal = {
    x:5,
    y:5,
    puerta:[
        new Coordenada(0, 2),
        new Coordenada(2, 0), 
        new Coordenada(2, 4), 
        new Coordenada(4, 2)
    ],
    obstaculo:[],
    pared:[
        new Coordenada(0, 0),
        new Coordenada(1, 0), 
        new Coordenada(2, 0), 
        new Coordenada(3, 0), 
        new Coordenada(4, 0), 
        new Coordenada(0, 1), 
        new Coordenada(4, 1), 
        new Coordenada(0, 2),
        new Coordenada(4, 2),
        new Coordenada(0, 3), 
        new Coordenada(4, 3), 
        new Coordenada(0, 4), 
        new Coordenada(1, 4), 
        new Coordenada(3, 4), 
        new Coordenada(4, 4)
    ],
    enemigo_melee:[],
    enemigo_ranged:[],
    explosivo:[],
    trampa:[],
    cura:[],
    recompensa:[],
    salida:[
        new Coordenada(2, 2)
    ]
};

const sala_11x11 = [
    {
        y:11,
        x:11,
        puerta: [new Coordenada(0, 5),new Coordenada(5, 0),new Coordenada(5, 10),new Coordenada(10, 5)],//puertas
        obstaculo:      [new Coordenada(4, 2),new Coordenada(5, 2),new Coordenada(6, 2),new Coordenada(2, 4),new Coordenada(8, 4),new Coordenada(2, 5),new Coordenada(8, 5),new Coordenada(2, 6),new Coordenada(8, 6),new Coordenada(4, 8),new Coordenada(5, 8),new Coordenada(6, 8)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(0, 1),new Coordenada(1, 1),new Coordenada(2, 1),new Coordenada(8, 1),new Coordenada(9, 1),new Coordenada(10, 1),new Coordenada(0, 2),new Coordenada(1, 2),new Coordenada(9, 2),new Coordenada(10, 2),new Coordenada(0, 3),new Coordenada(10, 3),new Coordenada(0, 4),new Coordenada(10, 4),new Coordenada(0, 6),new Coordenada(10, 6),new Coordenada(0, 7),new Coordenada(10, 7),new Coordenada(0, 8),new Coordenada(1, 8),new Coordenada(9, 8),new Coordenada(10, 8),new Coordenada(0, 9),new Coordenada(1, 9),new Coordenada(2, 9),new Coordenada(8, 9),new Coordenada(9, 9),new Coordenada(10, 9),new Coordenada(0, 10),new Coordenada(1, 10),new Coordenada(2, 10),new Coordenada(3, 10),new Coordenada(4, 10),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [new Coordenada(5, 5)],//enemigos ranged
        explosivo:      [new Coordenada(3, 3),new Coordenada(7, 3),new Coordenada(3, 7),new Coordenada(7, 7)],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

},
{
        y:11,
        x:11,
        puerta: [new Coordenada(0, 5),new Coordenada(5, 0),new Coordenada(5, 10),new Coordenada(10, 5)],//puertas
        obstaculo:      [new Coordenada(7, 1),new Coordenada(3, 2),new Coordenada(7, 2),new Coordenada(2, 3),new Coordenada(7, 3),new Coordenada(8, 3),new Coordenada(9, 3),new Coordenada(1, 7),new Coordenada(2, 7),new Coordenada(3, 7),new Coordenada(8, 7),new Coordenada(3, 8),new Coordenada(7, 8),new Coordenada(3, 9)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(0, 1),new Coordenada(10, 1),new Coordenada(0, 2),new Coordenada(2, 2),new Coordenada(10, 2),new Coordenada(0, 3),new Coordenada(3, 3),new Coordenada(10, 3),new Coordenada(0, 4),new Coordenada(4, 4),new Coordenada(10, 4),new Coordenada(5, 5),new Coordenada(0, 6),new Coordenada(6, 6),new Coordenada(10, 6),new Coordenada(0, 7),new Coordenada(7, 7),new Coordenada(10, 7),new Coordenada(0, 8),new Coordenada(8, 8),new Coordenada(10, 8),new Coordenada(0, 9),new Coordenada(10, 9),new Coordenada(0, 10),new Coordenada(1, 10),new Coordenada(2, 10),new Coordenada(3, 10),new Coordenada(4, 10),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [new Coordenada(3, 1),new Coordenada(9, 1),new Coordenada(1, 3),new Coordenada(9, 7),new Coordenada(1, 9),new Coordenada(7, 9)],//explosivos
        trampa: [new Coordenada(8, 1),new Coordenada(4, 3),new Coordenada(6, 3),new Coordenada(3, 6),new Coordenada(7, 6),new Coordenada(4, 7),new Coordenada(6, 7),new Coordenada(2, 9)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

},
{
        y:11,
        x:11,
        puerta: [new Coordenada(0, 5),new Coordenada(5, 0),new Coordenada(5, 10),new Coordenada(10, 5)],//puertas
        obstaculo:      [new Coordenada(7, 1),new Coordenada(3, 2),new Coordenada(7, 2),new Coordenada(2, 3),new Coordenada(7, 3),new Coordenada(8, 3),new Coordenada(9, 3),new Coordenada(1, 7),new Coordenada(2, 7),new Coordenada(3, 7),new Coordenada(8, 7),new Coordenada(3, 8),new Coordenada(7, 8),new Coordenada(3, 9)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(0, 1),new Coordenada(10, 1),new Coordenada(0, 2),new Coordenada(2, 2),new Coordenada(10, 2),new Coordenada(0, 3),new Coordenada(3, 3),new Coordenada(10, 3),new Coordenada(0, 4),new Coordenada(4, 4),new Coordenada(10, 4),new Coordenada(5, 5),new Coordenada(0, 6),new Coordenada(6, 6),new Coordenada(10, 6),new Coordenada(0, 7),new Coordenada(7, 7),new Coordenada(10, 7),new Coordenada(0, 8),new Coordenada(8, 8),new Coordenada(10, 8),new Coordenada(0, 9),new Coordenada(10, 9),new Coordenada(0, 10),new Coordenada(1, 10),new Coordenada(2, 10),new Coordenada(3, 10),new Coordenada(4, 10),new Coordenada(5, 10),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [new Coordenada(3, 1),new Coordenada(9, 1),new Coordenada(1, 3),new Coordenada(9, 7),new Coordenada(1, 9),new Coordenada(7, 9)],//explosivos
        trampa: [new Coordenada(9, 2),new Coordenada(4, 3),new Coordenada(6, 3),new Coordenada(3, 4),new Coordenada(7, 4),new Coordenada(3, 6),new Coordenada(7, 6),new Coordenada(4, 7),new Coordenada(6, 7),new Coordenada(1, 8)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

},
{
        y:11,
        x:11,
        puerta: [new Coordenada(0, 5),new Coordenada(5, 0),new Coordenada(5, 10),new Coordenada(10, 5)],//puertas
        obstaculo:      [new Coordenada(4, 3),new Coordenada(7, 4),new Coordenada(3, 6),new Coordenada(6, 7)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(0, 1),new Coordenada(10, 1),new Coordenada(0, 2),new Coordenada(10, 2),new Coordenada(0, 3),new Coordenada(3, 3),new Coordenada(5, 3),new Coordenada(6, 3),new Coordenada(7, 3),new Coordenada(10, 3),new Coordenada(0, 4),new Coordenada(3, 4),new Coordenada(10, 4),new Coordenada(3, 5),new Coordenada(7, 5),new Coordenada(0, 6),new Coordenada(7, 6),new Coordenada(10, 6),new Coordenada(0, 7),new Coordenada(3, 7),new Coordenada(4, 7),new Coordenada(5, 7),new Coordenada(7, 7),new Coordenada(10, 7),new Coordenada(0, 8),new Coordenada(10, 8),new Coordenada(0, 9),new Coordenada(10, 9),new Coordenada(0, 10),new Coordenada(1, 10),new Coordenada(2, 10),new Coordenada(3, 10),new Coordenada(4, 10),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10)],//paredes
        enemigo_melee:  [new Coordenada(5, 5)],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [new Coordenada(3, 2),new Coordenada(8, 3),new Coordenada(2, 7),new Coordenada(7, 8)],//explosivos
        trampa: [new Coordenada(3, 1),new Coordenada(9, 3),new Coordenada(1, 7),new Coordenada(7, 9)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

},
{
        y:11,
        x:11,
        puerta: [new Coordenada(0, 5),new Coordenada(5, 0),new Coordenada(5, 10),new Coordenada(10, 5)],//puertas
        obstaculo:      [new Coordenada(4, 3),new Coordenada(7, 4),new Coordenada(3, 6),new Coordenada(6, 7)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(0, 1),new Coordenada(10, 1),new Coordenada(0, 2),new Coordenada(10, 2),new Coordenada(0, 3),new Coordenada(3, 3),new Coordenada(5, 3),new Coordenada(6, 3),new Coordenada(7, 3),new Coordenada(10, 3),new Coordenada(0, 4),new Coordenada(3, 4),new Coordenada(10, 4),new Coordenada(3, 5),new Coordenada(7, 5),new Coordenada(0, 6),new Coordenada(7, 6),new Coordenada(10, 6),new Coordenada(0, 7),new Coordenada(3, 7),new Coordenada(4, 7),new Coordenada(5, 7),new Coordenada(7, 7),new Coordenada(10, 7),new Coordenada(0, 8),new Coordenada(10, 8),new Coordenada(0, 9),new Coordenada(10, 9),new Coordenada(0, 10),new Coordenada(1, 10),new Coordenada(2, 10),new Coordenada(3, 10),new Coordenada(4, 10),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [new Coordenada(5, 5)],//enemigos ranged
        explosivo:      [new Coordenada(3, 2),new Coordenada(8, 3),new Coordenada(2, 7),new Coordenada(7, 8)],//explosivos
        trampa: [new Coordenada(3, 1),new Coordenada(9, 3),new Coordenada(1, 7),new Coordenada(7, 9)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

},
{
        y:11,
        x:11,
        puerta: [new Coordenada(0, 5),new Coordenada(5, 0),new Coordenada(5, 10),new Coordenada(10, 5)],//puertas
        obstaculo:      [new Coordenada(4, 4),new Coordenada(6, 6)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(0, 1),new Coordenada(10, 1),new Coordenada(0, 2),new Coordenada(10, 2),new Coordenada(0, 3),new Coordenada(10, 3),new Coordenada(0, 4),new Coordenada(10, 4),new Coordenada(5, 5),new Coordenada(10, 5),new Coordenada(0, 6),new Coordenada(10, 6),new Coordenada(0, 7),new Coordenada(10, 7),new Coordenada(0, 8),new Coordenada(10, 8),new Coordenada(0, 9),new Coordenada(10, 9),new Coordenada(0, 10),new Coordenada(1, 10),new Coordenada(2, 10),new Coordenada(3, 10),new Coordenada(4, 10),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10)],//paredes
        enemigo_melee:  [new Coordenada(1, 9)],//enemigos melee
        enemigo_ranged: [new Coordenada(9, 1)],//enemigos ranged
        explosivo:      [new Coordenada(2, 1),new Coordenada(1, 2),new Coordenada(4, 3),new Coordenada(3, 4),new Coordenada(7, 6),new Coordenada(6, 7),new Coordenada(9, 8),new Coordenada(8, 9)],//explosivos
        trampa: [new Coordenada(1, 1),new Coordenada(2, 2),new Coordenada(3, 3),new Coordenada(7, 7),new Coordenada(8, 8),new Coordenada(9, 9)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

}
];

const sala_15x15 = [
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(9, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(2, 2),new Coordenada(3, 2),new Coordenada(4, 2),new Coordenada(5, 2),new Coordenada(6, 2),new Coordenada(7, 2),new Coordenada(8, 2),new Coordenada(9, 2),new Coordenada(11, 2),new Coordenada(12, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(2, 3),new Coordenada(4, 3),new Coordenada(12, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(4, 4),new Coordenada(6, 4),new Coordenada(7, 4),new Coordenada(8, 4),new Coordenada(9, 4),new Coordenada(10, 4),new Coordenada(11, 4),new Coordenada(12, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(1, 5),new Coordenada(2, 5),new Coordenada(4, 5),new Coordenada(7, 5),new Coordenada(12, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(2, 6),new Coordenada(4, 6),new Coordenada(10, 6),new Coordenada(12, 6),new Coordenada(14, 6),new Coordenada(2, 7),new Coordenada(4, 7),new Coordenada(5, 7),new Coordenada(9, 7),new Coordenada(10, 7),new Coordenada(12, 7),new Coordenada(0, 8),new Coordenada(2, 8),new Coordenada(4, 8),new Coordenada(10, 8),new Coordenada(12, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(2, 9),new Coordenada(7, 9),new Coordenada(10, 9),new Coordenada(12, 9),new Coordenada(13, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(2, 10),new Coordenada(3, 10),new Coordenada(4, 10),new Coordenada(5, 10),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10),new Coordenada(10, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(2, 11),new Coordenada(10, 11),new Coordenada(12, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(2, 12),new Coordenada(3, 12),new Coordenada(5, 12),new Coordenada(6, 12),new Coordenada(7, 12),new Coordenada(8, 12),new Coordenada(9, 12),new Coordenada(10, 12),new Coordenada(11, 12),new Coordenada(12, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(5, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [new Coordenada(3, 3),new Coordenada(11, 3),new Coordenada(3, 11),new Coordenada(11, 11)],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [new Coordenada(9, 2),new Coordenada(2, 5),new Coordenada(12, 9),new Coordenada(5, 12)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [new Coordenada(1, 1),new Coordenada(13, 1),new Coordenada(1, 13),new Coordenada(13, 13)],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [new Coordenada(9, 4),new Coordenada(4, 5),new Coordenada(10, 9),new Coordenada(5, 10)],//explosivos
        trampa: [new Coordenada(6, 1),new Coordenada(8, 1),new Coordenada(12, 1),new Coordenada(1, 2),new Coordenada(2, 2),new Coordenada(3, 2),new Coordenada(4, 2),new Coordenada(6, 2),new Coordenada(8, 2),new Coordenada(10, 2),new Coordenada(12, 2),new Coordenada(6, 3),new Coordenada(8, 3),new Coordenada(10, 3),new Coordenada(12, 3),new Coordenada(2, 4),new Coordenada(3, 4),new Coordenada(4, 4),new Coordenada(5, 4),new Coordenada(6, 4),new Coordenada(8, 4),new Coordenada(10, 4),new Coordenada(12, 4),new Coordenada(8, 5),new Coordenada(10, 5),new Coordenada(1, 6),new Coordenada(2, 6),new Coordenada(3, 6),new Coordenada(4, 6),new Coordenada(5, 6),new Coordenada(6, 6),new Coordenada(8, 6),new Coordenada(10, 6),new Coordenada(11, 6),new Coordenada(12, 6),new Coordenada(13, 6),new Coordenada(1, 8),new Coordenada(2, 8),new Coordenada(3, 8),new Coordenada(4, 8),new Coordenada(6, 8),new Coordenada(8, 8),new Coordenada(9, 8),new Coordenada(10, 8),new Coordenada(11, 8),new Coordenada(12, 8),new Coordenada(13, 8),new Coordenada(4, 9),new Coordenada(6, 9),new Coordenada(2, 10),new Coordenada(4, 10),new Coordenada(6, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10),new Coordenada(11, 10),new Coordenada(12, 10),new Coordenada(2, 11),new Coordenada(4, 11),new Coordenada(6, 11),new Coordenada(8, 11),new Coordenada(2, 12),new Coordenada(4, 12),new Coordenada(6, 12),new Coordenada(8, 12),new Coordenada(10, 12),new Coordenada(11, 12),new Coordenada(12, 12),new Coordenada(13, 12),new Coordenada(2, 13),new Coordenada(6, 13),new Coordenada(8, 13)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [new Coordenada(9, 2),new Coordenada(2, 5),new Coordenada(12, 9),new Coordenada(5, 12)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [new Coordenada(1, 1),new Coordenada(13, 1),new Coordenada(1, 13),new Coordenada(13, 13)],//enemigos ranged
        explosivo:      [new Coordenada(9, 4),new Coordenada(4, 5),new Coordenada(10, 9),new Coordenada(5, 10)],//explosivos
        trampa: [new Coordenada(6, 1),new Coordenada(8, 1),new Coordenada(12, 1),new Coordenada(1, 2),new Coordenada(2, 2),new Coordenada(3, 2),new Coordenada(4, 2),new Coordenada(6, 2),new Coordenada(8, 2),new Coordenada(10, 2),new Coordenada(12, 2),new Coordenada(6, 3),new Coordenada(8, 3),new Coordenada(10, 3),new Coordenada(12, 3),new Coordenada(2, 4),new Coordenada(3, 4),new Coordenada(4, 4),new Coordenada(5, 4),new Coordenada(6, 4),new Coordenada(8, 4),new Coordenada(10, 4),new Coordenada(12, 4),new Coordenada(8, 5),new Coordenada(10, 5),new Coordenada(1, 6),new Coordenada(2, 6),new Coordenada(3, 6),new Coordenada(4, 6),new Coordenada(5, 6),new Coordenada(6, 6),new Coordenada(8, 6),new Coordenada(10, 6),new Coordenada(11, 6),new Coordenada(12, 6),new Coordenada(13, 6),new Coordenada(1, 8),new Coordenada(2, 8),new Coordenada(3, 8),new Coordenada(4, 8),new Coordenada(6, 8),new Coordenada(8, 8),new Coordenada(9, 8),new Coordenada(10, 8),new Coordenada(11, 8),new Coordenada(12, 8),new Coordenada(13, 8),new Coordenada(4, 9),new Coordenada(6, 9),new Coordenada(2, 10),new Coordenada(4, 10),new Coordenada(6, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10),new Coordenada(11, 10),new Coordenada(12, 10),new Coordenada(2, 11),new Coordenada(4, 11),new Coordenada(6, 11),new Coordenada(8, 11),new Coordenada(2, 12),new Coordenada(4, 12),new Coordenada(6, 12),new Coordenada(8, 12),new Coordenada(10, 12),new Coordenada(11, 12),new Coordenada(12, 12),new Coordenada(13, 12),new Coordenada(2, 13),new Coordenada(6, 13),new Coordenada(8, 13)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [new Coordenada(4, 1),new Coordenada(6, 1),new Coordenada(8, 1),new Coordenada(10, 1),new Coordenada(4, 2),new Coordenada(6, 2),new Coordenada(8, 2),new Coordenada(10, 2),new Coordenada(4, 3),new Coordenada(6, 3),new Coordenada(8, 3),new Coordenada(10, 3),new Coordenada(1, 4),new Coordenada(2, 4),new Coordenada(3, 4),new Coordenada(4, 4),new Coordenada(5, 4),new Coordenada(7, 4),new Coordenada(9, 4),new Coordenada(10, 4),new Coordenada(11, 4),new Coordenada(12, 4),new Coordenada(13, 4),new Coordenada(4, 5),new Coordenada(6, 5),new Coordenada(8, 5),new Coordenada(10, 5),new Coordenada(1, 6),new Coordenada(2, 6),new Coordenada(3, 6),new Coordenada(5, 6),new Coordenada(7, 6),new Coordenada(9, 6),new Coordenada(11, 6),new Coordenada(12, 6),new Coordenada(13, 6),new Coordenada(4, 7),new Coordenada(6, 7),new Coordenada(8, 7),new Coordenada(10, 7),new Coordenada(1, 8),new Coordenada(2, 8),new Coordenada(3, 8),new Coordenada(4, 8),new Coordenada(5, 8),new Coordenada(7, 8),new Coordenada(9, 8),new Coordenada(10, 8),new Coordenada(11, 8),new Coordenada(12, 8),new Coordenada(13, 8),new Coordenada(4, 9),new Coordenada(6, 9),new Coordenada(8, 9),new Coordenada(10, 9),new Coordenada(1, 10),new Coordenada(2, 10),new Coordenada(3, 10),new Coordenada(4, 10),new Coordenada(5, 10),new Coordenada(7, 10),new Coordenada(9, 10),new Coordenada(10, 10),new Coordenada(11, 10),new Coordenada(12, 10),new Coordenada(13, 10),new Coordenada(4, 11),new Coordenada(6, 11),new Coordenada(8, 11),new Coordenada(10, 11),new Coordenada(4, 12),new Coordenada(6, 12),new Coordenada(8, 12),new Coordenada(10, 12),new Coordenada(4, 13),new Coordenada(6, 13),new Coordenada(8, 13),new Coordenada(10, 13)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [new Coordenada(7, 2),new Coordenada(6, 4),new Coordenada(8, 4),new Coordenada(7, 5),new Coordenada(4, 6),new Coordenada(6, 6),new Coordenada(8, 6),new Coordenada(10, 6),new Coordenada(2, 7),new Coordenada(7, 7),new Coordenada(12, 7),new Coordenada(6, 8),new Coordenada(8, 8),new Coordenada(7, 9),new Coordenada(6, 10),new Coordenada(8, 10),new Coordenada(7, 12)],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [new Coordenada(5, 1),new Coordenada(9, 1),new Coordenada(5, 2),new Coordenada(9, 2),new Coordenada(5, 3),new Coordenada(9, 3),new Coordenada(9, 4),new Coordenada(1, 5),new Coordenada(2, 5),new Coordenada(3, 5),new Coordenada(4, 5),new Coordenada(5, 5),new Coordenada(9, 5),new Coordenada(11, 5),new Coordenada(12, 5),new Coordenada(13, 5),new Coordenada(1, 9),new Coordenada(2, 9),new Coordenada(3, 9),new Coordenada(5, 9),new Coordenada(9, 9),new Coordenada(10, 9),new Coordenada(11, 9),new Coordenada(12, 9),new Coordenada(13, 9),new Coordenada(5, 10),new Coordenada(5, 11),new Coordenada(9, 11),new Coordenada(5, 12),new Coordenada(9, 12),new Coordenada(5, 13),new Coordenada(9, 13)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [new Coordenada(1, 1),new Coordenada(13, 1),new Coordenada(1, 13),new Coordenada(13, 13)],//enemigos ranged
        explosivo:      [new Coordenada(5, 4),new Coordenada(10, 5),new Coordenada(4, 9),new Coordenada(9, 10)],//explosivos
        trampa: [new Coordenada(11, 2),new Coordenada(2, 3),new Coordenada(3, 3),new Coordenada(4, 3),new Coordenada(11, 3),new Coordenada(11, 4),new Coordenada(3, 10),new Coordenada(3, 11),new Coordenada(10, 11),new Coordenada(11, 11),new Coordenada(12, 11),new Coordenada(3, 12)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [new Coordenada(5, 1),new Coordenada(9, 1),new Coordenada(5, 2),new Coordenada(9, 2),new Coordenada(5, 3),new Coordenada(9, 3),new Coordenada(9, 4),new Coordenada(1, 5),new Coordenada(2, 5),new Coordenada(3, 5),new Coordenada(4, 5),new Coordenada(5, 5),new Coordenada(9, 5),new Coordenada(11, 5),new Coordenada(12, 5),new Coordenada(13, 5),new Coordenada(1, 9),new Coordenada(2, 9),new Coordenada(3, 9),new Coordenada(5, 9),new Coordenada(9, 9),new Coordenada(10, 9),new Coordenada(11, 9),new Coordenada(12, 9),new Coordenada(13, 9),new Coordenada(5, 10),new Coordenada(5, 11),new Coordenada(9, 11),new Coordenada(5, 12),new Coordenada(9, 12),new Coordenada(5, 13),new Coordenada(9, 13)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [new Coordenada(1, 1),new Coordenada(13, 1),new Coordenada(1, 13),new Coordenada(13, 13)],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [new Coordenada(5, 4),new Coordenada(10, 5),new Coordenada(4, 9),new Coordenada(9, 10)],//explosivos
        trampa: [new Coordenada(11, 2),new Coordenada(2, 3),new Coordenada(3, 3),new Coordenada(4, 3),new Coordenada(11, 3),new Coordenada(11, 4),new Coordenada(3, 10),new Coordenada(3, 11),new Coordenada(10, 11),new Coordenada(11, 11),new Coordenada(12, 11),new Coordenada(3, 12)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [new Coordenada(6, 4),new Coordenada(7, 4),new Coordenada(8, 4),new Coordenada(4, 6),new Coordenada(10, 6),new Coordenada(4, 7),new Coordenada(10, 7),new Coordenada(4, 8),new Coordenada(10, 8),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [new Coordenada(1, 1),new Coordenada(13, 1),new Coordenada(1, 13),new Coordenada(13, 13)],//enemigos melee
        enemigo_ranged: [new Coordenada(7, 7)],//enemigos ranged
        explosivo:      [new Coordenada(5, 5),new Coordenada(9, 5),new Coordenada(5, 9),new Coordenada(9, 9)],//explosivos
        trampa: [new Coordenada(4, 1),new Coordenada(10, 1),new Coordenada(5, 2),new Coordenada(9, 2),new Coordenada(6, 3),new Coordenada(7, 3),new Coordenada(8, 3),new Coordenada(1, 4),new Coordenada(13, 4),new Coordenada(2, 5),new Coordenada(12, 5),new Coordenada(3, 6),new Coordenada(11, 6),new Coordenada(3, 7),new Coordenada(11, 7),new Coordenada(3, 8),new Coordenada(11, 8),new Coordenada(2, 9),new Coordenada(12, 9),new Coordenada(1, 10),new Coordenada(13, 10),new Coordenada(6, 11),new Coordenada(7, 11),new Coordenada(8, 11),new Coordenada(5, 12),new Coordenada(9, 12),new Coordenada(4, 13),new Coordenada(10, 13)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [new Coordenada(6, 4),new Coordenada(7, 4),new Coordenada(8, 4),new Coordenada(4, 6),new Coordenada(10, 6),new Coordenada(4, 7),new Coordenada(10, 7),new Coordenada(4, 8),new Coordenada(10, 8),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [new Coordenada(7, 7)],//enemigos melee
        enemigo_ranged: [new Coordenada(1, 1),new Coordenada(13, 1),new Coordenada(1, 13),new Coordenada(13, 13)],//enemigos ranged
        explosivo:      [new Coordenada(5, 5),new Coordenada(9, 5),new Coordenada(5, 9),new Coordenada(9, 9)],//explosivos
        trampa: [new Coordenada(4, 1),new Coordenada(10, 1),new Coordenada(5, 2),new Coordenada(9, 2),new Coordenada(6, 3),new Coordenada(7, 3),new Coordenada(8, 3),new Coordenada(1, 4),new Coordenada(13, 4),new Coordenada(2, 5),new Coordenada(12, 5),new Coordenada(3, 6),new Coordenada(11, 6),new Coordenada(3, 7),new Coordenada(11, 7),new Coordenada(3, 8),new Coordenada(11, 8),new Coordenada(2, 9),new Coordenada(12, 9),new Coordenada(1, 10),new Coordenada(13, 10),new Coordenada(6, 11),new Coordenada(7, 11),new Coordenada(8, 11),new Coordenada(5, 12),new Coordenada(9, 12),new Coordenada(4, 13),new Coordenada(10, 13)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [new Coordenada(3, 1),new Coordenada(11, 1),new Coordenada(2, 2),new Coordenada(12, 2),new Coordenada(1, 3),new Coordenada(13, 3),new Coordenada(1, 11),new Coordenada(13, 11),new Coordenada(2, 12),new Coordenada(12, 12),new Coordenada(3, 13),new Coordenada(11, 13)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(8, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(6, 2),new Coordenada(8, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(5, 3),new Coordenada(9, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(5, 4),new Coordenada(9, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(3, 5),new Coordenada(4, 5),new Coordenada(10, 5),new Coordenada(11, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(1, 6),new Coordenada(2, 6),new Coordenada(12, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(2, 8),new Coordenada(12, 8),new Coordenada(13, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(3, 9),new Coordenada(4, 9),new Coordenada(10, 9),new Coordenada(11, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(5, 10),new Coordenada(9, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(5, 11),new Coordenada(9, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(6, 12),new Coordenada(8, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(6, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [new Coordenada(1, 1),new Coordenada(13, 1),new Coordenada(1, 13),new Coordenada(13, 13)],//enemigos melee
        enemigo_ranged: [new Coordenada(7, 7)],//enemigos ranged
        explosivo:      [new Coordenada(3, 3),new Coordenada(11, 3),new Coordenada(3, 11),new Coordenada(11, 11)],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [new Coordenada(3, 1),new Coordenada(11, 1),new Coordenada(2, 2),new Coordenada(12, 2),new Coordenada(1, 3),new Coordenada(13, 3),new Coordenada(1, 11),new Coordenada(13, 11),new Coordenada(2, 12),new Coordenada(12, 12),new Coordenada(3, 13),new Coordenada(11, 13)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(8, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(6, 2),new Coordenada(8, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(5, 3),new Coordenada(9, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(5, 4),new Coordenada(9, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(3, 5),new Coordenada(4, 5),new Coordenada(10, 5),new Coordenada(11, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(1, 6),new Coordenada(2, 6),new Coordenada(12, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(2, 8),new Coordenada(12, 8),new Coordenada(13, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(3, 9),new Coordenada(4, 9),new Coordenada(10, 9),new Coordenada(11, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(5, 10),new Coordenada(9, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(5, 11),new Coordenada(9, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(6, 12),new Coordenada(8, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(6, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [new Coordenada(7, 7)],//enemigos melee
        enemigo_ranged: [new Coordenada(1, 1),new Coordenada(13, 1),new Coordenada(1, 13),new Coordenada(13, 13)],//enemigos ranged
        explosivo:      [new Coordenada(3, 3),new Coordenada(11, 3),new Coordenada(3, 11),new Coordenada(11, 11)],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(4, 1),new Coordenada(8, 1),new Coordenada(12, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(2, 2),new Coordenada(4, 2),new Coordenada(6, 2),new Coordenada(8, 2),new Coordenada(10, 2),new Coordenada(12, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(2, 3),new Coordenada(4, 3),new Coordenada(6, 3),new Coordenada(8, 3),new Coordenada(10, 3),new Coordenada(12, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(2, 4),new Coordenada(4, 4),new Coordenada(6, 4),new Coordenada(8, 4),new Coordenada(10, 4),new Coordenada(12, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(2, 5),new Coordenada(4, 5),new Coordenada(6, 5),new Coordenada(8, 5),new Coordenada(10, 5),new Coordenada(12, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(2, 6),new Coordenada(4, 6),new Coordenada(6, 6),new Coordenada(8, 6),new Coordenada(10, 6),new Coordenada(12, 6),new Coordenada(14, 6),new Coordenada(2, 7),new Coordenada(4, 7),new Coordenada(6, 7),new Coordenada(8, 7),new Coordenada(10, 7),new Coordenada(12, 7),new Coordenada(0, 8),new Coordenada(2, 8),new Coordenada(4, 8),new Coordenada(6, 8),new Coordenada(8, 8),new Coordenada(10, 8),new Coordenada(12, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(2, 9),new Coordenada(4, 9),new Coordenada(6, 9),new Coordenada(8, 9),new Coordenada(10, 9),new Coordenada(12, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(2, 10),new Coordenada(4, 10),new Coordenada(6, 10),new Coordenada(8, 10),new Coordenada(10, 10),new Coordenada(12, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(2, 11),new Coordenada(4, 11),new Coordenada(6, 11),new Coordenada(8, 11),new Coordenada(10, 11),new Coordenada(12, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(2, 12),new Coordenada(4, 12),new Coordenada(6, 12),new Coordenada(8, 12),new Coordenada(10, 12),new Coordenada(12, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(2, 13),new Coordenada(6, 13),new Coordenada(10, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:15,
        x:15,
        puerta: [new Coordenada(0, 7),new Coordenada(7, 0),new Coordenada(7, 14),new Coordenada(14, 7)],//puertas
        obstaculo:      [],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(8, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(0, 1),new Coordenada(14, 1),new Coordenada(0, 2),new Coordenada(1, 2),new Coordenada(2, 2),new Coordenada(3, 2),new Coordenada(4, 2),new Coordenada(5, 2),new Coordenada(6, 2),new Coordenada(7, 2),new Coordenada(8, 2),new Coordenada(9, 2),new Coordenada(10, 2),new Coordenada(11, 2),new Coordenada(12, 2),new Coordenada(14, 2),new Coordenada(0, 3),new Coordenada(14, 3),new Coordenada(0, 4),new Coordenada(2, 4),new Coordenada(3, 4),new Coordenada(4, 4),new Coordenada(5, 4),new Coordenada(6, 4),new Coordenada(7, 4),new Coordenada(8, 4),new Coordenada(9, 4),new Coordenada(10, 4),new Coordenada(11, 4),new Coordenada(12, 4),new Coordenada(13, 4),new Coordenada(14, 4),new Coordenada(0, 5),new Coordenada(14, 5),new Coordenada(0, 6),new Coordenada(1, 6),new Coordenada(2, 6),new Coordenada(3, 6),new Coordenada(4, 6),new Coordenada(5, 6),new Coordenada(6, 6),new Coordenada(7, 6),new Coordenada(8, 6),new Coordenada(9, 6),new Coordenada(10, 6),new Coordenada(11, 6),new Coordenada(12, 6),new Coordenada(14, 6),new Coordenada(0, 8),new Coordenada(2, 8),new Coordenada(3, 8),new Coordenada(4, 8),new Coordenada(5, 8),new Coordenada(6, 8),new Coordenada(7, 8),new Coordenada(8, 8),new Coordenada(9, 8),new Coordenada(10, 8),new Coordenada(11, 8),new Coordenada(12, 8),new Coordenada(13, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(14, 9),new Coordenada(0, 10),new Coordenada(1, 10),new Coordenada(2, 10),new Coordenada(3, 10),new Coordenada(4, 10),new Coordenada(5, 10),new Coordenada(6, 10),new Coordenada(7, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10),new Coordenada(11, 10),new Coordenada(12, 10),new Coordenada(14, 10),new Coordenada(0, 11),new Coordenada(14, 11),new Coordenada(0, 12),new Coordenada(2, 12),new Coordenada(3, 12),new Coordenada(4, 12),new Coordenada(5, 12),new Coordenada(6, 12),new Coordenada(7, 12),new Coordenada(8, 12),new Coordenada(9, 12),new Coordenada(10, 12),new Coordenada(11, 12),new Coordenada(12, 12),new Coordenada(13, 12),new Coordenada(14, 12),new Coordenada(0, 13),new Coordenada(14, 13),new Coordenada(0, 14),new Coordenada(1, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    }
];

const sala_17x17 = [
    {
        y:17,
        x:17,
        puerta: [new Coordenada(0, 8),new Coordenada(8, 0),new Coordenada(8, 16),new Coordenada(16, 8)],//puertas
        obstaculo:      [],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(15, 0),new Coordenada(16, 0),new Coordenada(0, 1),new Coordenada(9, 1),new Coordenada(16, 1),new Coordenada(0, 2),new Coordenada(2, 2),new Coordenada(3, 2),new Coordenada(4, 2),new Coordenada(5, 2),new Coordenada(6, 2),new Coordenada(7, 2),new Coordenada(9, 2),new Coordenada(11, 2),new Coordenada(12, 2),new Coordenada(13, 2),new Coordenada(14, 2),new Coordenada(16, 2),new Coordenada(0, 3),new Coordenada(2, 3),new Coordenada(9, 3),new Coordenada(11, 3),new Coordenada(14, 3),new Coordenada(16, 3),new Coordenada(0, 4),new Coordenada(2, 4),new Coordenada(5, 4),new Coordenada(7, 4),new Coordenada(9, 4),new Coordenada(11, 4),new Coordenada(14, 4),new Coordenada(16, 4),new Coordenada(0, 5),new Coordenada(2, 5),new Coordenada(3, 5),new Coordenada(4, 5),new Coordenada(5, 5),new Coordenada(7, 5),new Coordenada(9, 5),new Coordenada(11, 5),new Coordenada(12, 5),new Coordenada(14, 5),new Coordenada(16, 5),new Coordenada(0, 6),new Coordenada(7, 6),new Coordenada(9, 6),new Coordenada(14, 6),new Coordenada(16, 6),new Coordenada(0, 7),new Coordenada(1, 7),new Coordenada(2, 7),new Coordenada(3, 7),new Coordenada(4, 7),new Coordenada(5, 7),new Coordenada(6, 7),new Coordenada(7, 7),new Coordenada(9, 7),new Coordenada(10, 7),new Coordenada(11, 7),new Coordenada(12, 7),new Coordenada(14, 7),new Coordenada(16, 7),new Coordenada(0, 9),new Coordenada(2, 9),new Coordenada(4, 9),new Coordenada(5, 9),new Coordenada(6, 9),new Coordenada(7, 9),new Coordenada(9, 9),new Coordenada(10, 9),new Coordenada(11, 9),new Coordenada(12, 9),new Coordenada(13, 9),new Coordenada(14, 9),new Coordenada(15, 9),new Coordenada(16, 9),new Coordenada(0, 10),new Coordenada(2, 10),new Coordenada(7, 10),new Coordenada(9, 10),new Coordenada(16, 10),new Coordenada(0, 11),new Coordenada(2, 11),new Coordenada(4, 11),new Coordenada(5, 11),new Coordenada(7, 11),new Coordenada(9, 11),new Coordenada(11, 11),new Coordenada(12, 11),new Coordenada(13, 11),new Coordenada(14, 11),new Coordenada(16, 11),new Coordenada(0, 12),new Coordenada(2, 12),new Coordenada(5, 12),new Coordenada(7, 12),new Coordenada(9, 12),new Coordenada(11, 12),new Coordenada(14, 12),new Coordenada(16, 12),new Coordenada(0, 13),new Coordenada(2, 13),new Coordenada(5, 13),new Coordenada(7, 13),new Coordenada(14, 13),new Coordenada(16, 13),new Coordenada(0, 14),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(7, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14),new Coordenada(16, 14),new Coordenada(0, 15),new Coordenada(7, 15),new Coordenada(16, 15),new Coordenada(0, 16),new Coordenada(1, 16),new Coordenada(2, 16),new Coordenada(3, 16),new Coordenada(4, 16),new Coordenada(5, 16),new Coordenada(6, 16),new Coordenada(7, 16),new Coordenada(9, 16),new Coordenada(10, 16),new Coordenada(11, 16),new Coordenada(12, 16),new Coordenada(13, 16),new Coordenada(14, 16),new Coordenada(15, 16),new Coordenada(16, 16)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [new Coordenada(8, 2),new Coordenada(8, 4),new Coordenada(8, 6),new Coordenada(2, 8),new Coordenada(4, 8),new Coordenada(6, 8),new Coordenada(8, 8),new Coordenada(10, 8),new Coordenada(12, 8),new Coordenada(14, 8),new Coordenada(8, 10),new Coordenada(8, 12),new Coordenada(8, 14)],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:17,
        x:17,
        puerta: [new Coordenada(0, 8),new Coordenada(8, 0),new Coordenada(8, 16),new Coordenada(16, 8)],//puertas
        obstaculo:      [new Coordenada(8, 7),new Coordenada(7, 8),new Coordenada(8, 8),new Coordenada(9, 8),new Coordenada(8, 9)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(15, 0),new Coordenada(16, 0),new Coordenada(0, 1),new Coordenada(3, 1),new Coordenada(7, 1),new Coordenada(10, 1),new Coordenada(14, 1),new Coordenada(16, 1),new Coordenada(0, 2),new Coordenada(1, 2),new Coordenada(3, 2),new Coordenada(5, 2),new Coordenada(7, 2),new Coordenada(8, 2),new Coordenada(10, 2),new Coordenada(12, 2),new Coordenada(16, 2),new Coordenada(0, 3),new Coordenada(5, 3),new Coordenada(10, 3),new Coordenada(12, 3),new Coordenada(14, 3),new Coordenada(15, 3),new Coordenada(16, 3),new Coordenada(0, 4),new Coordenada(2, 4),new Coordenada(3, 4),new Coordenada(4, 4),new Coordenada(5, 4),new Coordenada(6, 4),new Coordenada(7, 4),new Coordenada(8, 4),new Coordenada(9, 4),new Coordenada(10, 4),new Coordenada(12, 4),new Coordenada(16, 4),new Coordenada(0, 5),new Coordenada(8, 5),new Coordenada(12, 5),new Coordenada(13, 5),new Coordenada(14, 5),new Coordenada(16, 5),new Coordenada(0, 6),new Coordenada(1, 6),new Coordenada(2, 6),new Coordenada(3, 6),new Coordenada(4, 6),new Coordenada(6, 6),new Coordenada(7, 6),new Coordenada(8, 6),new Coordenada(10, 6),new Coordenada(12, 6),new Coordenada(16, 6),new Coordenada(0, 7),new Coordenada(4, 7),new Coordenada(10, 7),new Coordenada(12, 7),new Coordenada(14, 7),new Coordenada(15, 7),new Coordenada(16, 7),new Coordenada(2, 8),new Coordenada(4, 8),new Coordenada(5, 8),new Coordenada(6, 8),new Coordenada(10, 8),new Coordenada(11, 8),new Coordenada(12, 8),new Coordenada(14, 8),new Coordenada(0, 9),new Coordenada(1, 9),new Coordenada(2, 9),new Coordenada(4, 9),new Coordenada(6, 9),new Coordenada(12, 9),new Coordenada(16, 9),new Coordenada(0, 10),new Coordenada(4, 10),new Coordenada(6, 10),new Coordenada(8, 10),new Coordenada(9, 10),new Coordenada(10, 10),new Coordenada(12, 10),new Coordenada(13, 10),new Coordenada(14, 10),new Coordenada(15, 10),new Coordenada(16, 10),new Coordenada(0, 11),new Coordenada(2, 11),new Coordenada(3, 11),new Coordenada(4, 11),new Coordenada(8, 11),new Coordenada(16, 11),new Coordenada(0, 12),new Coordenada(4, 12),new Coordenada(6, 12),new Coordenada(7, 12),new Coordenada(8, 12),new Coordenada(9, 12),new Coordenada(10, 12),new Coordenada(11, 12),new Coordenada(12, 12),new Coordenada(13, 12),new Coordenada(14, 12),new Coordenada(16, 12),new Coordenada(0, 13),new Coordenada(1, 13),new Coordenada(2, 13),new Coordenada(4, 13),new Coordenada(6, 13),new Coordenada(11, 13),new Coordenada(16, 13),new Coordenada(0, 14),new Coordenada(4, 14),new Coordenada(6, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(11, 14),new Coordenada(13, 14),new Coordenada(15, 14),new Coordenada(16, 14),new Coordenada(0, 15),new Coordenada(2, 15),new Coordenada(6, 15),new Coordenada(9, 15),new Coordenada(13, 15),new Coordenada(16, 15),new Coordenada(0, 16),new Coordenada(1, 16),new Coordenada(2, 16),new Coordenada(3, 16),new Coordenada(4, 16),new Coordenada(5, 16),new Coordenada(6, 16),new Coordenada(7, 16),new Coordenada(9, 16),new Coordenada(10, 16),new Coordenada(11, 16),new Coordenada(12, 16),new Coordenada(13, 16),new Coordenada(14, 16),new Coordenada(15, 16),new Coordenada(16, 16)],//paredes
        enemigo_melee:  [new Coordenada(5, 6),new Coordenada(11, 10)],//enemigos melee
        enemigo_ranged: [new Coordenada(10, 5),new Coordenada(6, 11)],//enemigos ranged
        explosivo:      [new Coordenada(9, 6),new Coordenada(6, 7),new Coordenada(10, 9),new Coordenada(7, 10)],//explosivos
        trampa: [new Coordenada(2, 2),new Coordenada(14, 2),new Coordenada(6, 5),new Coordenada(11, 6),new Coordenada(5, 10),new Coordenada(10, 11),new Coordenada(2, 14),new Coordenada(14, 14)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:17,
        x:17,
        puerta: [new Coordenada(0, 8),new Coordenada(8, 0),new Coordenada(8, 16),new Coordenada(16, 8)],//puertas
        obstaculo:      [new Coordenada(4, 1),new Coordenada(12, 1),new Coordenada(5, 2),new Coordenada(11, 2),new Coordenada(6, 3),new Coordenada(7, 3),new Coordenada(9, 3),new Coordenada(10, 3),new Coordenada(1, 4),new Coordenada(15, 4),new Coordenada(2, 5),new Coordenada(14, 5),new Coordenada(3, 6),new Coordenada(13, 6),new Coordenada(3, 7),new Coordenada(13, 7),new Coordenada(3, 9),new Coordenada(13, 9),new Coordenada(3, 10),new Coordenada(13, 10),new Coordenada(2, 11),new Coordenada(14, 11),new Coordenada(1, 12),new Coordenada(15, 12),new Coordenada(6, 13),new Coordenada(7, 13),new Coordenada(9, 13),new Coordenada(10, 13),new Coordenada(5, 14),new Coordenada(11, 14),new Coordenada(4, 15),new Coordenada(12, 15)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(15, 0),new Coordenada(16, 0),new Coordenada(0, 1),new Coordenada(16, 1),new Coordenada(0, 2),new Coordenada(16, 2),new Coordenada(0, 3),new Coordenada(16, 3),new Coordenada(0, 4),new Coordenada(16, 4),new Coordenada(0, 5),new Coordenada(16, 5),new Coordenada(0, 6),new Coordenada(16, 6),new Coordenada(0, 7),new Coordenada(16, 7),new Coordenada(0, 9),new Coordenada(16, 9),new Coordenada(0, 10),new Coordenada(16, 10),new Coordenada(0, 11),new Coordenada(16, 11),new Coordenada(0, 12),new Coordenada(16, 12),new Coordenada(0, 13),new Coordenada(16, 13),new Coordenada(0, 14),new Coordenada(16, 14),new Coordenada(0, 15),new Coordenada(16, 15),new Coordenada(0, 16),new Coordenada(1, 16),new Coordenada(2, 16),new Coordenada(3, 16),new Coordenada(4, 16),new Coordenada(5, 16),new Coordenada(6, 16),new Coordenada(7, 16),new Coordenada(9, 16),new Coordenada(10, 16),new Coordenada(11, 16),new Coordenada(12, 16),new Coordenada(13, 16),new Coordenada(14, 16),new Coordenada(15, 16),new Coordenada(16, 16)],//paredes
        enemigo_melee:  [new Coordenada(7, 7),new Coordenada(9, 7),new Coordenada(7, 9),new Coordenada(9, 9)],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [new Coordenada(8, 3),new Coordenada(3, 8),new Coordenada(13, 8),new Coordenada(8, 13)],//explosivos
        trampa: [new Coordenada(7, 5),new Coordenada(9, 5),new Coordenada(5, 7),new Coordenada(8, 7),new Coordenada(11, 7),new Coordenada(7, 8),new Coordenada(9, 8),new Coordenada(5, 9),new Coordenada(8, 9),new Coordenada(11, 9),new Coordenada(7, 11),new Coordenada(9, 11)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:17,
        x:17,
        puerta: [new Coordenada(0, 8),new Coordenada(8, 0),new Coordenada(8, 16),new Coordenada(16, 8)],//puertas
        obstaculo:      [new Coordenada(4, 1),new Coordenada(12, 1),new Coordenada(5, 2),new Coordenada(11, 2),new Coordenada(6, 3),new Coordenada(7, 3),new Coordenada(9, 3),new Coordenada(10, 3),new Coordenada(1, 4),new Coordenada(15, 4),new Coordenada(2, 5),new Coordenada(14, 5),new Coordenada(3, 6),new Coordenada(13, 6),new Coordenada(3, 7),new Coordenada(13, 7),new Coordenada(3, 9),new Coordenada(13, 9),new Coordenada(3, 10),new Coordenada(13, 10),new Coordenada(2, 11),new Coordenada(14, 11),new Coordenada(1, 12),new Coordenada(15, 12),new Coordenada(6, 13),new Coordenada(7, 13),new Coordenada(9, 13),new Coordenada(10, 13),new Coordenada(5, 14),new Coordenada(11, 14),new Coordenada(4, 15),new Coordenada(12, 15)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(15, 0),new Coordenada(16, 0),new Coordenada(0, 1),new Coordenada(16, 1),new Coordenada(0, 2),new Coordenada(16, 2),new Coordenada(0, 3),new Coordenada(16, 3),new Coordenada(0, 4),new Coordenada(16, 4),new Coordenada(0, 5),new Coordenada(16, 5),new Coordenada(0, 6),new Coordenada(16, 6),new Coordenada(0, 7),new Coordenada(16, 7),new Coordenada(0, 9),new Coordenada(16, 9),new Coordenada(0, 10),new Coordenada(16, 10),new Coordenada(0, 11),new Coordenada(16, 11),new Coordenada(0, 12),new Coordenada(16, 12),new Coordenada(0, 13),new Coordenada(16, 13),new Coordenada(0, 14),new Coordenada(16, 14),new Coordenada(0, 15),new Coordenada(16, 15),new Coordenada(0, 16),new Coordenada(1, 16),new Coordenada(2, 16),new Coordenada(3, 16),new Coordenada(4, 16),new Coordenada(5, 16),new Coordenada(6, 16),new Coordenada(7, 16),new Coordenada(9, 16),new Coordenada(10, 16),new Coordenada(11, 16),new Coordenada(12, 16),new Coordenada(13, 16),new Coordenada(14, 16),new Coordenada(15, 16),new Coordenada(16, 16)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [new Coordenada(7, 7),new Coordenada(9, 7),new Coordenada(7, 9),new Coordenada(9, 9)],//enemigos ranged
        explosivo:      [new Coordenada(8, 3),new Coordenada(3, 8),new Coordenada(13, 8),new Coordenada(8, 13)],//explosivos
        trampa: [new Coordenada(7, 5),new Coordenada(9, 5),new Coordenada(5, 7),new Coordenada(8, 7),new Coordenada(11, 7),new Coordenada(7, 8),new Coordenada(9, 8),new Coordenada(5, 9),new Coordenada(8, 9),new Coordenada(11, 9),new Coordenada(7, 11),new Coordenada(9, 11)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:17,
        x:17,
        puerta: [new Coordenada(0, 8),new Coordenada(8, 0),new Coordenada(8, 16),new Coordenada(16, 8)],//puertas
        obstaculo:      [new Coordenada(4, 1),new Coordenada(12, 1),new Coordenada(5, 2),new Coordenada(11, 2),new Coordenada(6, 3),new Coordenada(7, 3),new Coordenada(9, 3),new Coordenada(10, 3),new Coordenada(1, 4),new Coordenada(15, 4),new Coordenada(2, 5),new Coordenada(14, 5),new Coordenada(3, 6),new Coordenada(13, 6),new Coordenada(3, 7),new Coordenada(13, 7),new Coordenada(3, 9),new Coordenada(13, 9),new Coordenada(3, 10),new Coordenada(13, 10),new Coordenada(2, 11),new Coordenada(14, 11),new Coordenada(1, 12),new Coordenada(15, 12),new Coordenada(6, 13),new Coordenada(7, 13),new Coordenada(9, 13),new Coordenada(10, 13),new Coordenada(5, 14),new Coordenada(11, 14),new Coordenada(4, 15),new Coordenada(12, 15)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(15, 0),new Coordenada(16, 0),new Coordenada(0, 1),new Coordenada(16, 1),new Coordenada(0, 2),new Coordenada(16, 2),new Coordenada(0, 3),new Coordenada(16, 3),new Coordenada(0, 4),new Coordenada(16, 4),new Coordenada(0, 5),new Coordenada(16, 5),new Coordenada(0, 6),new Coordenada(16, 6),new Coordenada(0, 7),new Coordenada(16, 7),new Coordenada(0, 9),new Coordenada(16, 9),new Coordenada(0, 10),new Coordenada(16, 10),new Coordenada(0, 11),new Coordenada(16, 11),new Coordenada(0, 12),new Coordenada(16, 12),new Coordenada(0, 13),new Coordenada(16, 13),new Coordenada(0, 14),new Coordenada(16, 14),new Coordenada(0, 15),new Coordenada(16, 15),new Coordenada(0, 16),new Coordenada(1, 16),new Coordenada(2, 16),new Coordenada(3, 16),new Coordenada(4, 16),new Coordenada(5, 16),new Coordenada(6, 16),new Coordenada(7, 16),new Coordenada(9, 16),new Coordenada(10, 16),new Coordenada(11, 16),new Coordenada(12, 16),new Coordenada(13, 16),new Coordenada(14, 16),new Coordenada(15, 16),new Coordenada(16, 16)],//paredes
        enemigo_melee:  [new Coordenada(8, 2),new Coordenada(2, 8),new Coordenada(14, 8),new Coordenada(8, 14)],//enemigos melee
        enemigo_ranged: [],//enemigos ranged
        explosivo:      [new Coordenada(8, 3),new Coordenada(3, 8),new Coordenada(13, 8),new Coordenada(8, 13)],//explosivos
        trampa: [new Coordenada(7, 5),new Coordenada(9, 5),new Coordenada(5, 7),new Coordenada(8, 7),new Coordenada(11, 7),new Coordenada(7, 8),new Coordenada(9, 8),new Coordenada(5, 9),new Coordenada(8, 9),new Coordenada(11, 9),new Coordenada(7, 11),new Coordenada(9, 11)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:17,
        x:17,
        puerta: [new Coordenada(0, 8),new Coordenada(8, 0),new Coordenada(8, 16),new Coordenada(16, 8)],//puertas
        obstaculo:      [new Coordenada(4, 1),new Coordenada(12, 1),new Coordenada(5, 2),new Coordenada(11, 2),new Coordenada(6, 3),new Coordenada(7, 3),new Coordenada(9, 3),new Coordenada(10, 3),new Coordenada(1, 4),new Coordenada(15, 4),new Coordenada(2, 5),new Coordenada(14, 5),new Coordenada(3, 6),new Coordenada(13, 6),new Coordenada(3, 7),new Coordenada(13, 7),new Coordenada(3, 9),new Coordenada(13, 9),new Coordenada(3, 10),new Coordenada(13, 10),new Coordenada(2, 11),new Coordenada(14, 11),new Coordenada(1, 12),new Coordenada(15, 12),new Coordenada(6, 13),new Coordenada(7, 13),new Coordenada(9, 13),new Coordenada(10, 13),new Coordenada(5, 14),new Coordenada(11, 14),new Coordenada(4, 15),new Coordenada(12, 15)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(15, 0),new Coordenada(16, 0),new Coordenada(0, 1),new Coordenada(16, 1),new Coordenada(0, 2),new Coordenada(16, 2),new Coordenada(0, 3),new Coordenada(16, 3),new Coordenada(0, 4),new Coordenada(16, 4),new Coordenada(0, 5),new Coordenada(16, 5),new Coordenada(0, 6),new Coordenada(16, 6),new Coordenada(0, 7),new Coordenada(16, 7),new Coordenada(0, 9),new Coordenada(16, 9),new Coordenada(0, 10),new Coordenada(16, 10),new Coordenada(0, 11),new Coordenada(16, 11),new Coordenada(0, 12),new Coordenada(16, 12),new Coordenada(0, 13),new Coordenada(16, 13),new Coordenada(0, 14),new Coordenada(16, 14),new Coordenada(0, 15),new Coordenada(16, 15),new Coordenada(0, 16),new Coordenada(1, 16),new Coordenada(2, 16),new Coordenada(3, 16),new Coordenada(4, 16),new Coordenada(5, 16),new Coordenada(6, 16),new Coordenada(7, 16),new Coordenada(9, 16),new Coordenada(10, 16),new Coordenada(11, 16),new Coordenada(12, 16),new Coordenada(13, 16),new Coordenada(14, 16),new Coordenada(15, 16),new Coordenada(16, 16)],//paredes
        enemigo_melee:  [],//enemigos melee
        enemigo_ranged: [new Coordenada(8, 2),new Coordenada(2, 8),new Coordenada(14, 8),new Coordenada(8, 14)],//enemigos ranged
        explosivo:      [new Coordenada(8, 3),new Coordenada(3, 8),new Coordenada(13, 8),new Coordenada(8, 13)],//explosivos
        trampa: [new Coordenada(7, 5),new Coordenada(9, 5),new Coordenada(5, 7),new Coordenada(8, 7),new Coordenada(11, 7),new Coordenada(7, 8),new Coordenada(9, 8),new Coordenada(5, 9),new Coordenada(8, 9),new Coordenada(11, 9),new Coordenada(7, 11),new Coordenada(9, 11)],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:17,
        x:17,
        puerta: [new Coordenada(0, 8),new Coordenada(8, 0),new Coordenada(8, 16),new Coordenada(16, 8)],//puertas
        obstaculo:      [],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(9, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(15, 0),new Coordenada(16, 0),new Coordenada(0, 1),new Coordenada(16, 1),new Coordenada(0, 2),new Coordenada(16, 2),new Coordenada(0, 3),new Coordenada(16, 3),new Coordenada(0, 4),new Coordenada(16, 4),new Coordenada(0, 5),new Coordenada(16, 5),new Coordenada(0, 6),new Coordenada(16, 6),new Coordenada(0, 7),new Coordenada(16, 7),new Coordenada(0, 9),new Coordenada(16, 9),new Coordenada(0, 10),new Coordenada(16, 10),new Coordenada(0, 11),new Coordenada(16, 11),new Coordenada(0, 12),new Coordenada(16, 12),new Coordenada(0, 13),new Coordenada(16, 13),new Coordenada(0, 14),new Coordenada(16, 14),new Coordenada(0, 15),new Coordenada(16, 15),new Coordenada(0, 16),new Coordenada(1, 16),new Coordenada(2, 16),new Coordenada(3, 16),new Coordenada(4, 16),new Coordenada(5, 16),new Coordenada(6, 16),new Coordenada(7, 16),new Coordenada(9, 16),new Coordenada(10, 16),new Coordenada(11, 16),new Coordenada(12, 16),new Coordenada(13, 16),new Coordenada(14, 16),new Coordenada(15, 16),new Coordenada(16, 16)],//paredes
        enemigo_melee:  [new Coordenada(2, 2),new Coordenada(14, 2),new Coordenada(2, 14),new Coordenada(14, 14)],//enemigos melee
        enemigo_ranged: [new Coordenada(8, 8)],//enemigos ranged
        explosivo:      [],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    }
];

const sala_19x19 = [
    {
        y:19,
        x:19,
        puerta: [new Coordenada(0, 9),new Coordenada(9, 0),new Coordenada(9, 18),new Coordenada(18, 9)],//puertas
        obstaculo:      [new Coordenada(4, 5),new Coordenada(15, 5),new Coordenada(4, 10),new Coordenada(15, 10),new Coordenada(4, 15),new Coordenada(15, 15)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(8, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(15, 0),new Coordenada(16, 0),new Coordenada(17, 0),new Coordenada(18, 0),new Coordenada(0, 1),new Coordenada(18, 1),new Coordenada(0, 2),new Coordenada(4, 2),new Coordenada(5, 2),new Coordenada(6, 2),new Coordenada(7, 2),new Coordenada(8, 2),new Coordenada(9, 2),new Coordenada(10, 2),new Coordenada(11, 2),new Coordenada(12, 2),new Coordenada(13, 2),new Coordenada(14, 2),new Coordenada(15, 2),new Coordenada(18, 2),new Coordenada(0, 3),new Coordenada(18, 3),new Coordenada(0, 4),new Coordenada(4, 4),new Coordenada(5, 4),new Coordenada(6, 4),new Coordenada(7, 4),new Coordenada(8, 4),new Coordenada(9, 4),new Coordenada(10, 4),new Coordenada(11, 4),new Coordenada(12, 4),new Coordenada(13, 4),new Coordenada(14, 4),new Coordenada(15, 4),new Coordenada(18, 4),new Coordenada(0, 5),new Coordenada(18, 5),new Coordenada(0, 6),new Coordenada(4, 6),new Coordenada(5, 6),new Coordenada(6, 6),new Coordenada(7, 6),new Coordenada(8, 6),new Coordenada(9, 6),new Coordenada(10, 6),new Coordenada(11, 6),new Coordenada(12, 6),new Coordenada(13, 6),new Coordenada(14, 6),new Coordenada(15, 6),new Coordenada(18, 6),new Coordenada(0, 7),new Coordenada(4, 7),new Coordenada(5, 7),new Coordenada(6, 7),new Coordenada(7, 7),new Coordenada(8, 7),new Coordenada(9, 7),new Coordenada(10, 7),new Coordenada(11, 7),new Coordenada(12, 7),new Coordenada(13, 7),new Coordenada(14, 7),new Coordenada(15, 7),new Coordenada(18, 7),new Coordenada(0, 8),new Coordenada(18, 8),new Coordenada(4, 9),new Coordenada(5, 9),new Coordenada(6, 9),new Coordenada(7, 9),new Coordenada(8, 9),new Coordenada(9, 9),new Coordenada(10, 9),new Coordenada(11, 9),new Coordenada(12, 9),new Coordenada(13, 9),new Coordenada(14, 9),new Coordenada(15, 9),new Coordenada(0, 10),new Coordenada(18, 10),new Coordenada(0, 11),new Coordenada(4, 11),new Coordenada(5, 11),new Coordenada(6, 11),new Coordenada(7, 11),new Coordenada(8, 11),new Coordenada(9, 11),new Coordenada(10, 11),new Coordenada(11, 11),new Coordenada(12, 11),new Coordenada(13, 11),new Coordenada(14, 11),new Coordenada(15, 11),new Coordenada(18, 11),new Coordenada(0, 12),new Coordenada(4, 12),new Coordenada(5, 12),new Coordenada(6, 12),new Coordenada(7, 12),new Coordenada(8, 12),new Coordenada(9, 12),new Coordenada(10, 12),new Coordenada(11, 12),new Coordenada(12, 12),new Coordenada(13, 12),new Coordenada(14, 12),new Coordenada(15, 12),new Coordenada(18, 12),new Coordenada(0, 13),new Coordenada(18, 13),new Coordenada(0, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(7, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14),new Coordenada(15, 14),new Coordenada(18, 14),new Coordenada(0, 15),new Coordenada(18, 15),new Coordenada(0, 16),new Coordenada(4, 16),new Coordenada(5, 16),new Coordenada(6, 16),new Coordenada(7, 16),new Coordenada(8, 16),new Coordenada(9, 16),new Coordenada(10, 16),new Coordenada(11, 16),new Coordenada(12, 16),new Coordenada(13, 16),new Coordenada(14, 16),new Coordenada(15, 16),new Coordenada(18, 16),new Coordenada(0, 17),new Coordenada(18, 17),new Coordenada(0, 18),new Coordenada(1, 18),new Coordenada(2, 18),new Coordenada(3, 18),new Coordenada(4, 18),new Coordenada(5, 18),new Coordenada(6, 18),new Coordenada(7, 18),new Coordenada(8, 18),new Coordenada(10, 18),new Coordenada(11, 18),new Coordenada(12, 18),new Coordenada(13, 18),new Coordenada(14, 18),new Coordenada(15, 18),new Coordenada(16, 18),new Coordenada(17, 18),new Coordenada(18, 18)],//paredes
        enemigo_melee:  [new Coordenada(15, 3),new Coordenada(15, 8),new Coordenada(15, 13)],//enemigos melee
        enemigo_ranged: [new Coordenada(9, 5),new Coordenada(9, 10),new Coordenada(9, 15)],//enemigos ranged
        explosivo:      [new Coordenada(2, 2),new Coordenada(3, 2),new Coordenada(16, 2),new Coordenada(4, 3),new Coordenada(16, 3),new Coordenada(2, 4),new Coordenada(3, 4),new Coordenada(16, 4),new Coordenada(2, 6),new Coordenada(3, 6),new Coordenada(16, 6),new Coordenada(2, 7),new Coordenada(3, 7),new Coordenada(16, 7),new Coordenada(4, 8),new Coordenada(16, 8),new Coordenada(2, 9),new Coordenada(3, 9),new Coordenada(16, 9),new Coordenada(2, 11),new Coordenada(3, 11),new Coordenada(16, 11),new Coordenada(2, 12),new Coordenada(3, 12),new Coordenada(16, 12),new Coordenada(4, 13),new Coordenada(16, 13),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(16, 14),new Coordenada(2, 16),new Coordenada(3, 16),new Coordenada(16, 16)],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    },
    {
        y:19,
        x:19,
        puerta: [new Coordenada(0, 9),new Coordenada(9, 0),new Coordenada(9, 18),new Coordenada(18, 9)],//puertas
        obstaculo:      [new Coordenada(4, 5),new Coordenada(15, 5),new Coordenada(4, 10),new Coordenada(15, 10),new Coordenada(4, 15),new Coordenada(15, 15)],//obstaculos
        pared:  [new Coordenada(0, 0),new Coordenada(1, 0),new Coordenada(2, 0),new Coordenada(3, 0),new Coordenada(4, 0),new Coordenada(5, 0),new Coordenada(6, 0),new Coordenada(7, 0),new Coordenada(8, 0),new Coordenada(10, 0),new Coordenada(11, 0),new Coordenada(12, 0),new Coordenada(13, 0),new Coordenada(14, 0),new Coordenada(15, 0),new Coordenada(16, 0),new Coordenada(17, 0),new Coordenada(18, 0),new Coordenada(0, 1),new Coordenada(18, 1),new Coordenada(0, 2),new Coordenada(4, 2),new Coordenada(5, 2),new Coordenada(6, 2),new Coordenada(7, 2),new Coordenada(8, 2),new Coordenada(9, 2),new Coordenada(10, 2),new Coordenada(11, 2),new Coordenada(12, 2),new Coordenada(13, 2),new Coordenada(14, 2),new Coordenada(15, 2),new Coordenada(18, 2),new Coordenada(0, 3),new Coordenada(18, 3),new Coordenada(0, 4),new Coordenada(4, 4),new Coordenada(5, 4),new Coordenada(6, 4),new Coordenada(7, 4),new Coordenada(8, 4),new Coordenada(9, 4),new Coordenada(10, 4),new Coordenada(11, 4),new Coordenada(12, 4),new Coordenada(13, 4),new Coordenada(14, 4),new Coordenada(15, 4),new Coordenada(18, 4),new Coordenada(0, 5),new Coordenada(18, 5),new Coordenada(0, 6),new Coordenada(4, 6),new Coordenada(5, 6),new Coordenada(6, 6),new Coordenada(7, 6),new Coordenada(8, 6),new Coordenada(9, 6),new Coordenada(10, 6),new Coordenada(11, 6),new Coordenada(12, 6),new Coordenada(13, 6),new Coordenada(14, 6),new Coordenada(15, 6),new Coordenada(18, 6),new Coordenada(0, 7),new Coordenada(4, 7),new Coordenada(5, 7),new Coordenada(6, 7),new Coordenada(7, 7),new Coordenada(8, 7),new Coordenada(9, 7),new Coordenada(10, 7),new Coordenada(11, 7),new Coordenada(12, 7),new Coordenada(13, 7),new Coordenada(14, 7),new Coordenada(15, 7),new Coordenada(18, 7),new Coordenada(0, 8),new Coordenada(18, 8),new Coordenada(4, 9),new Coordenada(5, 9),new Coordenada(6, 9),new Coordenada(7, 9),new Coordenada(8, 9),new Coordenada(9, 9),new Coordenada(10, 9),new Coordenada(11, 9),new Coordenada(12, 9),new Coordenada(13, 9),new Coordenada(14, 9),new Coordenada(15, 9),new Coordenada(0, 10),new Coordenada(18, 10),new Coordenada(0, 11),new Coordenada(4, 11),new Coordenada(5, 11),new Coordenada(6, 11),new Coordenada(7, 11),new Coordenada(8, 11),new Coordenada(9, 11),new Coordenada(10, 11),new Coordenada(11, 11),new Coordenada(12, 11),new Coordenada(13, 11),new Coordenada(14, 11),new Coordenada(15, 11),new Coordenada(18, 11),new Coordenada(0, 12),new Coordenada(4, 12),new Coordenada(5, 12),new Coordenada(6, 12),new Coordenada(7, 12),new Coordenada(8, 12),new Coordenada(9, 12),new Coordenada(10, 12),new Coordenada(11, 12),new Coordenada(12, 12),new Coordenada(13, 12),new Coordenada(14, 12),new Coordenada(15, 12),new Coordenada(18, 12),new Coordenada(0, 13),new Coordenada(18, 13),new Coordenada(0, 14),new Coordenada(4, 14),new Coordenada(5, 14),new Coordenada(6, 14),new Coordenada(7, 14),new Coordenada(8, 14),new Coordenada(9, 14),new Coordenada(10, 14),new Coordenada(11, 14),new Coordenada(12, 14),new Coordenada(13, 14),new Coordenada(14, 14),new Coordenada(15, 14),new Coordenada(18, 14),new Coordenada(0, 15),new Coordenada(18, 15),new Coordenada(0, 16),new Coordenada(4, 16),new Coordenada(5, 16),new Coordenada(6, 16),new Coordenada(7, 16),new Coordenada(8, 16),new Coordenada(9, 16),new Coordenada(10, 16),new Coordenada(11, 16),new Coordenada(12, 16),new Coordenada(13, 16),new Coordenada(14, 16),new Coordenada(15, 16),new Coordenada(18, 16),new Coordenada(0, 17),new Coordenada(18, 17),new Coordenada(0, 18),new Coordenada(1, 18),new Coordenada(2, 18),new Coordenada(3, 18),new Coordenada(4, 18),new Coordenada(5, 18),new Coordenada(6, 18),new Coordenada(7, 18),new Coordenada(8, 18),new Coordenada(10, 18),new Coordenada(11, 18),new Coordenada(12, 18),new Coordenada(13, 18),new Coordenada(14, 18),new Coordenada(15, 18),new Coordenada(16, 18),new Coordenada(17, 18),new Coordenada(18, 18)],//paredes
        enemigo_melee:  [new Coordenada(9, 5),new Coordenada(9, 10),new Coordenada(9, 15)],//enemigos melee
        enemigo_ranged: [new Coordenada(15, 3),new Coordenada(15, 8),new Coordenada(15, 13)],//enemigos ranged
        explosivo:      [new Coordenada(2, 2),new Coordenada(3, 2),new Coordenada(16, 2),new Coordenada(4, 3),new Coordenada(16, 3),new Coordenada(2, 4),new Coordenada(3, 4),new Coordenada(16, 4),new Coordenada(2, 6),new Coordenada(3, 6),new Coordenada(16, 6),new Coordenada(2, 7),new Coordenada(3, 7),new Coordenada(16, 7),new Coordenada(4, 8),new Coordenada(16, 8),new Coordenada(2, 9),new Coordenada(3, 9),new Coordenada(16, 9),new Coordenada(2, 11),new Coordenada(3, 11),new Coordenada(16, 11),new Coordenada(2, 12),new Coordenada(3, 12),new Coordenada(16, 12),new Coordenada(4, 13),new Coordenada(16, 13),new Coordenada(2, 14),new Coordenada(3, 14),new Coordenada(16, 14),new Coordenada(2, 16),new Coordenada(3, 16),new Coordenada(16, 16)],//explosivos
        trampa: [],//trampas
        cura:   [],//curas
        recompensa:     [],//recompensas
        salida: []//salidas mazmorra

    }
];

const salas_vector = [sala_11x11, sala_15x15, sala_17x17, sala_19x19];

//pasa de sala a sala x2 y le pone las paredes 
function imprimeVectorJSON(s) {
    let mapaParedes =[];

    for(let i=0;i<tamy*2;i++){
        mapaParedes.push([]);
        for (let j=0;j<tamx*2;j++){
            mapaParedes[i].push(0);
        }
    }
    
    for (let i = 0; i < s.pared.length; i++) {
        mapaParedes[s.pared[i].y * 2][s.pared[i].x * 2] = i_pared_negro;
        mapaParedes[s.pared[i].y * 2 + 1][s.pared[i].x * 2] = i_pared_negro;
        mapaParedes[s.pared[i].y * 2][s.pared[i].x * 2 + 1] = i_pared_negro;
        mapaParedes[s.pared[i].y * 2 + 1][s.pared[i].x * 2 + 1] = i_pared_negro;
    }
    for (let fila = 0; fila < s.y * 2; fila++) {
        for (let col = 0; col < s.x * 2; col++) {
            if (mapaParedes[fila][col] !== 0) {
                let u, ul, ur, l, dl, r, dr, d;

                u = fila == 0 ? true : mapaParedes[fila - 1][col] > 0;
                ul = fila == 0 || col == 0 ? true : mapaParedes[fila - 1][col - 1] > 0;
                ur = fila == 0 || col == s.x * 2 - 1 ? true : mapaParedes[fila - 1][col + 1] > 0;
                d = fila == s.y * 2 - 1 ? true : mapaParedes[fila + 1][col] > 0;
                l = col == 0 ? true : mapaParedes[fila][col - 1] > 0;
                r = col == s.x * 2 - 1 ? true : mapaParedes[fila][col + 1] > 0;
                dl = fila == s.y * 2 - 1 || col == 0 ? true : mapaParedes[fila + 1][col - 1] > 0;
                dr = fila == s.y * 2 - 1 || col == s.x * 2 - 1 ? true : mapaParedes[fila + 1][col + 1] > 0;

                const adyacente = [u, ur, r, dr, d, dl, l, ul];

                if (adyacente.every(val => val)) {
                    mapaParedes[fila][col] = i_pared_negro;
                } else if (adyacente[0] && adyacente[1] && adyacente[2] && !adyacente[4] && adyacente[6] && adyacente[7]) {
                    mapaParedes[fila][col] = i_pared_u;
                } else if (!adyacente[0] && adyacente[2] && adyacente[3] && adyacente[4] && adyacente[5] && adyacente[6]) {
                    mapaParedes[fila][col] = i_pared_d;
                } else if (adyacente[0] && adyacente[1] && adyacente[2] && adyacente[3] && adyacente[4] && !adyacente[6]) {
                    mapaParedes[fila][col] = i_pared_r;
                } else if (adyacente[0] && !adyacente[2] && adyacente[4] && adyacente[5] && adyacente[6] && adyacente[7]) {
                    mapaParedes[fila][col] = i_pared_l;
                } else if (adyacente[0] && adyacente[1] && adyacente[2] && !adyacente[3] && adyacente[4] && adyacente[5] && adyacente[6] && adyacente[7]) {
                    mapaParedes[fila][col] = i_pared_esquina_pequeña_ul;
                } else if (adyacente[0] && adyacente[1] && adyacente[2] && adyacente[3] && adyacente[4] && !adyacente[5] && adyacente[6] && adyacente[7]) {
                    mapaParedes[fila][col] = i_pared_esquina_pequeña_ur;
                } else if (adyacente[0] && adyacente[1] && adyacente[2] && adyacente[3] && adyacente[4] && adyacente[5] && adyacente[6] && !adyacente[7]) {
                    mapaParedes[fila][col] = i_pared_esquina_pequeña_dr;
                } else if (adyacente[0] && !adyacente[1] && adyacente[2] && adyacente[3] && adyacente[4] && adyacente[5] && adyacente[6] && adyacente[7]) {
                    mapaParedes[fila][col] = i_pared_esquina_pequeña_dl;
                } else if (adyacente[0] && adyacente[2] && !adyacente[3] && !adyacente[4] && !adyacente[6] && !adyacente[7]) {
                    mapaParedes[fila][col] = i_pared_esquina_grande_dl;
                } else if (adyacente[0] && !adyacente[1] && !adyacente[2] && !adyacente[4] && !adyacente[5] && adyacente[6]) {
                    mapaParedes[fila][col] = i_pared_esquina_grande_dr;
                } else if (!adyacente[0] && adyacente[2] && adyacente[4] && !adyacente[5] && !adyacente[6]) {
                    mapaParedes[fila][col] = i_pared_esquina_grande_ul;
                } else if (!adyacente[0] && !adyacente[2] && adyacente[4] && adyacente[6] && !adyacente[7]) {
                    mapaParedes[fila][col] = i_pared_esquina_grande_ur;
                }
            }
        }
    }

    let output = '';
    for (let fila = 0; fila < s.y * 2; fila++) {
        
        for (let col = 0; col < s.x * 2; col++) {
            output += (mapaParedes[fila][col] == 0 ? '0' : mapaParedes[fila][col]).toString();
            if (fila !== (s.y * 2) - 1 || col != (s.x * 2) - 1) {
                output += ',';
            }
        }
    }
    
    console.log(JSON.parse(JSON.stringify(output)));

    return JSON.parse(JSON.stringify(output));
}
//crea el texto que se parseará a JSON
function CREARJSON(s) {
    const tamTile = 16;
    
    let json_text=`{
        "compressionlevel": -1,
        "height": ${s.y*2},
        "infinite": false,
        "layers": [{
            "data": [
    `+
    imprimeVectorJSON(s)+
    `],
            "height": ${s.y*2},
            "id": 1,
            "name": "Paredes",
            "opacity": 1,
            "properties":[
                {
                 "name":"Collide",
                 "type":"bool",
                 "value":true
                }],
            "type": "tilelayer",
            "visible": true,
            "width": ${s.x*2},
            "x": 0,
            "y": 0}],
        "nextlayerid": 5,
        "nextobjectid": 1,
        "orientation": "orthogonal",
        "renderorder": "right-down",
        "tiledversion": "1.11.2",
        "tileheight": ${tamTile},
        "tilesets": [{
            "columns": 25,
            "firstgid": 1,
            "image": "../sprites/Pixel Crawler - FREE - 1.8/Environment/Dungeon Prison/Assets/Tiles.png",
            "imageheight": 400,
            "imagewidth": 400,
            "margin": 0,
            "name": "TilesDungeon",
            "spacing": 0,
            "tilecount": 625,
            "tileheight": ${tamTile},
            "tilewidth": ${tamTile}
        }],
        "tilewidth": ${tamTile},
        "type": "map",
        "version": "1.10",
        "width": ${s.x*2}
    }`;

    return JSON.parse(json_text);
    
}
// determina si la sala cabe o no en la posición insertada
function cabeLaSala(m, posy, posx, s, dir) {
    let cx = -1, cy = -1, fx = -1, fy = -1;
    if (dir == 0) {
        fy = posy - 1;
        cy = posy - s.y;
        cx = posx - Math.floor(s.x / 2);
        fx = posx + Math.floor(s.x / 2);
    }
    if (dir == 1) {
        cy = posy - Math.floor(s.y / 2);
        fy = posy + Math.floor(s.y / 2);
        fx = posx - 1;
        cx = posx - s.x;
    }
    if (dir == 2) {
        cy = posy - Math.floor(s.y / 2);
        fy = posy + Math.floor(s.y / 2);
        cx = posx + 1;
        fx = posx + s.x;
    }
    if (dir == 3) {
        cy = posy + 1;
        fy = posy + s.y;
        cx = posx - Math.floor(s.x / 2);
        fx = posx + Math.floor(s.x / 2);
    }

    console.log(m, posy, posx, s, dir,cy,fy,cx,fx);

    if (cy < 0 || cy >= tamy || fy < 0 || fy >= tamy || cx < 0 || cx >= tamx || fx <0 || fx >= tamx) {
        return false;
    }

    for (let i = cy; i < fy; i++) {
        for (let j = cx; j < fx; j++) {
            if (m[i][j] != c_vacio) {
                return false;
            }
        }
    }
    return true;
}
//pinta el caracter designado (c) teniendo en cuenta el offset (mitad del tamaño de la sala) 
function pintaSalaOffset(m, ofy, ofx, v, c) {
    let vaux = v.slice();
    while (vaux.length > 0) {
        console.log(vaux.length);
        const cx = vaux[vaux.length - 1].x + ofx;
        const cy = vaux[vaux.length - 1].y + ofy;
        if (vaux[vaux.length - 1].x != -1 && vaux[vaux.length - 1].y != -1) {
            m[cy][cx] = c;
        }
        vaux.pop();
    }
}
//pinta la sala completa en la posy, posy
function ponerSala(m, posy, posx, s, dir, puertas) {
    let cx = -1, cy = -1;
    if (dir == 0) {
        cy = posy - s.y;
        cx = posx - Math.floor(s.x / 2);
    }
    if (dir == 1) {
        cy = posy - Math.floor(s.y / 2);
        cx = posx - s.x;
    }
    if (dir == 2) {
        cy = posy - Math.floor(s.y / 2);
        cx = posx + 1;
    }
    if (dir == 3) {
        cy = posy + 1;
        cx = posx - Math.floor(s.x / 2);
    }
    if (dir == -1) {
        cy = posy;
        cx = posx;
    }

    console.log(cy,cx);

    pintaSalaOffset(m, cy, cx, s.cura, c_cura);
    pintaSalaOffset(m, cy, cx, s.enemigo_melee, c_ene_melee);
    pintaSalaOffset(m, cy, cx, s.enemigo_ranged, c_ene_ran);
    pintaSalaOffset(m, cy, cx, s.explosivo, c_explosivo);
    pintaSalaOffset(m, cy, cx, s.obstaculo, c_obstaculo);
    pintaSalaOffset(m, cy, cx, s.pared, c_pared);
   

    if (dir != -1) {
        m[posy][posx] = c_vacio;
        //Quitamos la puerta usada (en la sala de referencia)
        puertas[dir].pop();
    }
    pintaSalaOffset(m, cy, cx, s.puerta, c_puerta);
    //agregamos las nuevas puertas (de la nueva sala) menos la que conecta con la sala de referencia  
    if (s.puerta[0].x != -1 && s.puerta[0].y != -1 && dir != 3) {
        puertas[0].push({ y: cy + s.puerta[0].y, x: cx + s.puerta[0].x });
    } else if (dir == 3) {
        m[cy + s.puerta[0].y][cx + s.puerta[0].x] = c_vacio;
    }
    if (s.puerta[1].x != -1 && s.puerta[1].y != -1 && dir != 2) {
        puertas[1].push({ y: cy + s.puerta[1].y, x: cx + s.puerta[1].x });
    } else if (dir == 2) {
        m[cy + s.puerta[1].y][cx + s.puerta[1].x] = c_vacio;
    }
    if (s.puerta[2].x != -1 && s.puerta[2].y != -1 && dir != 1) {
        puertas[2].push({ y: cy + s.puerta[2].y, x: cx + s.puerta[2].x });
    } else if (dir == 1) {
        m[cy + s.puerta[2].y][cx + s.puerta[2].x] = c_vacio;
    }
    if (s.puerta[3].x != -1 && s.puerta[3].y != -1 && dir != 0) {
        puertas[3].push({ y: cy + s.puerta[3].y, x: cx + s.puerta[3].x });
    } else if (dir == 0) {
        m[cy + s.puerta[3].y][cx + s.puerta[3].x] = c_vacio;
    }

    pintaSalaOffset(m, cy, cx, s.recompensa, c_recompensa);
    pintaSalaOffset(m, cy, cx, s.trampa, c_trampa);
    pintaSalaOffset(m, cy, cx, s.salida, c_salida);
}
//va poniendo las salas de manera aleatoria desde la sala central conectandolas por las puertas
function generaMazmorra() {
    //creamos mapa
    let m = [];
    for (let fila = 0; fila < tamy; fila++) {
        m.push([]);
        for (let col =0; col < tamx; col++) {
            m[fila].push(c_vacio);
        }
    }

    //0 = arriba, 1= izquierda, 2 = derecha, 3 = abajo
    let puertas = [[], [], [], []];

    //ponemos sala de inicio

    console.log(salaPPal);
    ponerSala(m, Math.floor(tamy / 2 - salaPPal.y / 2), Math.floor(tamx / 2 - salaPPal.x / 2), salaPPal, -1, puertas);
    let salas_puestas = 1;
    let errores_consecutivos = 0;

    while (salas_puestas != num_salas && errores_consecutivos <= max_errores) {
        let direccion_expansion = Math.floor(Math.random() * 4);
        let tam_sala = Math.floor(Math.random() * 4);
        let sala_concreta = Math.floor(Math.random() * salas_vector[tam_sala].length);

        if (puertas[direccion_expansion].length > 0) {
            let ul_elem = puertas[direccion_expansion].length - 1;

            if (cabeLaSala(m, puertas[direccion_expansion][ul_elem].y, puertas[direccion_expansion][ul_elem].x, salas_vector[tam_sala][sala_concreta], direccion_expansion)) {
                errores_consecutivos = 0;
                ponerSala(m, puertas[direccion_expansion][ul_elem].y, puertas[direccion_expansion][ul_elem].x, salas_vector[tam_sala][sala_concreta], direccion_expansion, puertas);

                salas_puestas++;
            } else {
                errores_consecutivos++;
            }
        }
    }

    //limpiamos las paredes que sobran
    for (let i = 0; i < puertas.length; i++) {
        for (let j = 0; j < puertas[i].length; j++) {
            m[puertas[i][j].y][puertas[i][j].x] = c_pared;
        }
    }
    return m;
}

//traduce una mazmorra (caracteres) a sala (estructura de array) para poder usarla
function traduceMazmorraASala(m) {
    const y = m.length, x = m[0].length;
    let salaAux = { x: tamx, y: tamy, pared: [], puerta: [], obstaculo: [], explosivo: [], trampa: [], enemigo_ranged: [], enemigo_melee: [], cura: [], recompensa: [], salida: [] };
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            const c = m[i][j];
            switch (c) {
                case '#':
                    salaAux.pared.push({y:i, x:j});
                    break;
                case 'P':
                    salaAux.puerta.push({y:i, x:j});
                    break;
                case 'O':
                    salaAux.obstaculo.push({y:i, x:j});
                    break;
                case 'X':
                    salaAux.explosivo.push({y:i, x:j});
                    break;
                case 'T':
                    salaAux.trampa.push({y:i, x:j});
                    break;
                case 'e':
                    salaAux.enemigo_ranged.push({y:i, x:j});
                    break;
                case 'E':
                    salaAux.enemigo_melee.push({y:i, x:j});
                    break;
                case 'C':
                    salaAux.cura.push({y:i, x:j});
                    break;
                case 'R':
                    salaAux.recompensa.push({y:i, x:j});
                    break;
                case 'S':
                    salaAux.salida.push({y:i, x:j});
                    break;
                default:
                    break;
            }
        }
    }
    return salaAux;
}

export default function gen_mazmorra() {
    
    const mapa = generaMazmorra();

    const mazmorraSala = traduceMazmorraASala(mapa);
    
    return CREARJSON(mazmorraSala);
}