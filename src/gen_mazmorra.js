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
    constructor(tamx, tamy, puerta = [], obstaculo = [], pared = [], enemigo_melee = [], enemigo_ranged = [], explosivo = [], trampa = [], cura = [], recompensa = [], salida = []) {
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

const salaPPal = new Sala(
    5,
    5,
    [new Coordenada(0, 2), new Coordenada(2, 0), new Coordenada(2, 4), new Coordenada(4, 2)],
    [],
    [new Coordenada(0, 0), new Coordenada(1, 0), new Coordenada(2, 0), new Coordenada(3, 0), new Coordenada(4, 0), new Coordenada(0, 1), new Coordenada(4, 1), new Coordenada(0, 2), new Coordenada(4, 2), new Coordenada(0, 3), new Coordenada(4, 3), new Coordenada(0, 4), new Coordenada(1, 4), new Coordenada(3, 4), new Coordenada(4, 4)],
    [],
    [],
    [],
    [],
  [],
    [],
    [new Coordenada(2, 2)]
);

const sala_11x11 = [
    new Sala(
        11,
        11,
        [new Coordenada(0, 5), new Coordenada(5, 0), new Coordenada(5, 10), new Coordenada(10, 5)],
        [new Coordenada(4, 2), new Coordenada(5, 2), new Coordenada(6, 2), new Coordenada(2, 4), new Coordenada(8, 4), newada(2, 5), new Coordenada(8, 5), new Coordenada(2, 6), new Coordenada(8, 6), new Coordenada(4, ), new Coordenada(5, 8), new Coordenada(6, 8)],
        [new Coordenada(0, 0), new Coordenada(1, 0), new Coordenada(2, 0), new Coordenada(3, 0), new Coordenada(4, 0), new Coordenada(6, 0), new Coordenada(7, 0), new Coordenada(8, 0), new Coordenada(9, 0), new Coordenada(10, 0), new Coordenada(0, 1), new Coordenada(1, 1), new Coordenada(2, 1), new Coordenada(8, 1), new Coordenada(9, 1), new Coordenada(10, 1), new Coordenada(0, 2), new Coordenada(1, 2), new Coordenada(9, 2), new Coordenada(10, 2), new Coordenada(0, 3), new Coordenada(10, 3), new Coordenada(0, 4), new Coordenada(10, 4), new Coordenada(0, 6), new Coordenada(10, 6), new Coordenada(0, 7), new Coordenada(10, 7), new Coordenada(0, 8), new Coordenada(1, 8), new Coordenada(9, 8), new Coordenada(10, 8), new Coordenada(0, 9), new Coordenada(1, 9), new Coordenada(2, 9), new Coordenada(8, 9), new Coordenada(9, 9), new Coordenada(10, 9), new Coordenada(0, 10), new Coordenada(1, 10), new Coordenada(2, 10), new Coordenada(3, 10), new Coordenada(4, 10), new Coordenada(6, 10), new Coordenada(7, 10), new Coordenada(8, 10), new Coordenada(9, 10), new Coordenada(10, 10)],
        [],
        [new Coordenada(5, 5)],
        [new Coordenada(3, 3), new Coordenada(7, 3), new Coordenada(3, 7), new Coordenada(7, 7)],
        [],
        [],
        [],
        []
    ),
    new Sala(
        11,
        11,
        [new Coordenada(0, 5), new Coordenada(5, 0), new Coordenada(5, 10), new Coordenada(10, 5)],
        [new Coordenada(7, 1), new Coordenada(3, 2), new Coordenada(7, 2), new Coordenada(2, 3), new Coordenada(7, 3), new Coordenada(8, 3), new Coordenada(9, 3), new Coordenada(1, 7), new Coordenada(2, 7), new Coordenada(3, 7), new Coordenada(8, 7), new Coordenada(3, 8), new Coordenada(7, 8), new Coordenada(3, 9), new Coordenada(7, 9)],
        [new Coordenada(0, 0), new Coordenada(1, 0), new Coordenada(2, 0), new Coordenada(3, 0), new Coordenada(4, 0), new Coordenada(6, 0), new Coordenada(7, 0), new Coordenada(8, 0), new Coordenada(9, 0), new Coordenada(10, 0), new Coordenada(0, 1), new Coordenada(10, 1), new Coordenada(0, 2), new Coordenada(2, 2), new Coordenada(10, 2), new Coordenada(0, 3), new Coordenada(3, 3), new Coordenada(10, 3), new Coordenada(0, 4), new Coordenada(4, 4), new Coordenada(10, 4), new Coordenada(0, 5), new Coordenada(10, 5), new Coordenada(0, 6), new Coordenada(6, 6), new Coordenada(10, 6), new Coordenada(0, 7), new Coordenada(7, 7), new Coordenada(10, 7), new Coordenada(0, 8), new Coordenada(8, 8), new Coordenada(10, 8), new Coordenada(0, 9), new Coordenada(10, 9), new Coordenada(0, 10), new Coordenada(1, 10), new Coordenada(2, 10), new Coordenada(3, 10), new Coordenada(4, 10), new Coada(6, 10), new Coordenada(7, 10), new Coordenada(8, 10), new Coordenada(9, 10), new Coordenada(10, 1)],
        [],
        [],
        [new Coordenada(3, 1), new Coordenada(9, 1), new Coordenada(1, 3), new Coordenada(9,7), new Coordenada(1, 9), new Coordenada(7, 9)],
        [new Coordenada(8, 1), new Coordenada(4, 3), new Coordenada(6, 3), new Coordenada(3, 6), new Coordenada(7, 6), new Coordenada(4, 7), new Coordenada(6, 7), new Coordenada(2, 9)],
        [],
        [],
        []
    ),
];

const sala_15x15 = [

];

const sala_17x17 = [

];

const sala_19x19 = [

];

const salas_vector = [sala_11x11
    //, sala_15x15, sala_17x17, sala_19x19
];

//pasa de sala a sala x2 y le pone las paredes 
function imprimeVectorJSON(s) {
    const mapaParedes = Array.from({ length: s.tamy * 2 }, () => Array(s.tamx * 2).fill(0));

    for (let i = 0; i < s.pared.length; i++) {
        mapaParedes[s.pared[i].y * 2][s.pared[i].x * 2] = i_pared_negro;
        mapaParedes[s.pared[i].y * 2 + 1][s.pared[i].x * 2] = i_pared_negro;
        mapaParedes[s.pared[i].y * 2][s.pared[i].x * 2 + 1] = i_pared_negro;
        mapaParedes[s.pared[i].y * 2 + 1][s.pared[i].x * 2 + 1] = i_pared_negro;
    }

    for (let fila = 0; fila < s.tamy * 2; fila++) {
        for (let col = 0; col < s.tamx * 2; col++) {
            if (mapaParedes[fila][col] !== 0) {
                let u, ul, ur, l, dl, r, dr, d;

                u = fila === 0 ? true : mapaParedes[fila - 1][col] > 0;
                ul = fila === 0 || col === 0 ? true : mapaParedes[fila - 1][col - 1] > 0;
                ur = fila === 0 || col === s.tamx * 2 - 1 ? true : mapaParedes[fila - 1][col + 1] > 0;
                d = fila === s.tamy * 2 - 1 ? true : mapaParedes[fila + 1][col] > 0;
                l = col === 0 ? true : mapaParedes[fila][col - 1] > 0;
                r = col === s.tamx * 2 - 1 ? true : mapaParedes[fila][col + 1] > 0;
                dl = fila === s.tamy * 2 - 1 || col === 0 ? true : mapaParedes[fila + 1][col - 1] > 0;
                dr = fila === s.tamy * 2 - 1 || col === s.tamx * 2 - 1 ? true : mapaParedes[fila + 1][col + 1] > 0;

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
                    mapaPared[fila][col] = i_pared_esquina_pequeña_dr;
                } else if (adyacente[0] && !adyacente[1] && adyacente[2] && adyacente[3] && adyacente[4] && adyacente[5] && adyacente[6] && adyacente[7]) {
                    mapaPared[fila][col] = i_pared_esquina_pequeña_dl;
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
    for (let fila = 0; fila < s.tamy * 2; fila++) {
        for (let col = 0; col < s.tamx * 2; col++) {
            output += (mapaParedes[fila][col] === 0 ? '0' : mapaParedes[fila][col]).toString();
            if (fila !== (s.tamy * 2) - 1 || col !== (s.tamx * 2) - 1) {
                output += ',';
            }
        }
    }
    return output;
}
//crea el texto que se parseará a JSON
function CREARJSON(s) {
    const tamTile = 16;

    let json_text=`{
        "compressionlevel": -1,
        "height": ${s.tamy * 2},
        "infinite": false,
        "layers": [{
            "data": [
    `+
    imprimeVectorJSON(s)+
    `],
            "height": ${s.tamy * 2},
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
            "width": ${s.tamx * 2},
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
        "width": ${s.tamx * 2}
    }`;

    return json_text;
    /*
    console.log(`{
        "compressionlevel": -1,
        "height": ${s.tamy * 2},
        "infinite": false,
        "layers": [{
            "data": [
                `);
    imprimeVectorJSON(s);
    console.log(`],
    "height": ${s.tamy * 2},
    "id": 1,
    "name": "Paredes",
    "opacity": 1,
    "type": "tilelayer",
    "visible": true,
    "width": ${s.tamx * 2},
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
        "tileheight": 16,
        "tilewidth": 16
    }],
    "tilewidth": ${tamTile},
    "type": "map",
    "version": "1.10",
    "width": ${s.tamx * 2}
}`);
*/
}
// determina si la sala cabe o no en la posición insertada
function cabeLaSala(m, posy, posx, s, dir) {
    let cx = -1, cy = -1, fx = -1, fy = -1;
    if (dir === 0) {
        fy = posy - 1;
        cy = posy - s.tamy;
        cx = posx - (s.tamx / 2);
        fx = posx + (s.tamx / 2);
    }
    if (dir === 1) {
        cy = posy - (s.tamy / 2);
        fy = posy + (s.tamy / 2);
        fx = posx - 1;
        cx = posx - s.tamx;
    }
    if (dir === 2) {
        cy = posy - (s.tamy / 2);
        fy = posy + (s.tamy / 2);
        cx = posx + 1;
        fx = posx + s.tamx;
    }
    if (dir === 3) {
        cy = posy + 1;
        fy = posy + s.tamy;
        cx = posx - (s.tamx / 2);
        fx = posx + (s.tamx / 2);
    }
    if (cy < 0 || cy >= tamy || fy < 0 || fy >= tamy || cx < 0 || cx >= tamx || fx <0 || fx >= tamx) {
        return false;
    }
    for (let i = cy; i < fy; i++) {
        for (let j = cx; j < fx; j++) {
            if (m[i][j] !== c_vacio) {
                return false;
            }
        }
    }
    return true;
}
//pinta el caracter designado (c) teniendo en cuenta el offset (mitad del tamaño de la sala) 
function pintaSalaOffset(m, ofy, ofx, v, c) {
    while (v.length > 0) {
        const cx = v[v.length - 1].x + ofx;
        const cy = v[v.length - 1].y + ofy;
        if (v[v.length - 1].x !== -1 && v[v.length - 1].y !== -1) {
            m[cy][cx] = c;
        }
        v.pop();
    }
}
//pinta la sala completa en la posy, posy
function ponerSala(m, posy, posx, s, dir, puertas) {
    let cx = -1, cy = -1;
    if (dir === 0) {
        cy = posy - s.tamy;
        cx = posx - (s.tamx / 2);
    }
    if (dir === 1) {
        cy = posy - (s.tamy / 2);
        cx = posx - s.tamx;
    }
    if (dir === 2) {
        cy = posy - (s.tamy / 2);
        cx = posx + 1;
    }
    if (dir === 3) {
        cy = posy + 1;
        cx = posx - (s.tamx / 2);
    }
    if (dir === -1) {
        cy = posy;
        cx = posx;
    }

    pintaSalaOffset(m, cy, cx, s.cura, c_cura);
    pintaSalaOffset(m, cy, cx, s.enemigo_melee, c_ene_melee);
    pintaSalaOffset(m, cy, cx, s.enemigo_ranged, c_ene_ran);
    pintaSalaOffset(m, cy, cx, s.explosivo, c_explosivo);
    pintaSalaOffset(m, cy, cx, s.obstaculo, c_obstaculo);
    pintaSalaOffset(m, cy, cx, s.pared, c_pared);

    if (dir !== -1) {
        m[posy][posx] = c_vacio;
        //Quitamos la puerta usada (en la sala de referencia)
        puertas[dir].pop();
    }

    pintaSalaOffset(m, cy, cx, s.puerta, c_puerta);
    //agregamos las nuevas puertas (de la nueva sala) menos la que conecta con la sala de referencia  
    if (s.puerta[0].x !== -1 && s.puerta[0].y !== -1 && dir !== 3) {
        puertas[0].push({ y: cy + s.puerta[0].y, x: cx + s.puerta[0].x });
    } else if (dir === 3) {
        m[cy + s.puerta[0].y][cx + s.puerta[0].x] = c_vacio;
    }
    if (s.puerta[1].x !== -1 && s.puerta[1].y !== -1 && dir !== 2) {
        puertas[1].push({ y: cy + s.puerta[1].y, x: cx + s.puerta[1].x });
    } else if (dir === 2) {
        m[cy + s.puerta[1].y][cx + s.puerta[1].x] = c_vacio;
    }
    if (s.puerta[2].x !== -1 && s.puerta[2].y !== -1 && dir !== 1) {
        puertas[2].push({ y: cy + s.puerta[2].y, x: cx + s.puerta[2].x });
    } else if (dir === 1) {
        m[cy + s.puerta[2].y][cx + s.puerta[2].x] = c_vacio;
    }
    if (s.puerta[3].x !== -1 && s.puerta[3].y !== -1 && dir !== 0) {
        puertas[3].push({ y: cy + s.puerta[3].y, x: cx + s.puerta[3].x });
    } else if (dir === 0) {
        m[cy + s.puerta[3].y][cx + s.puerta[3].x] = c_vacio;
    }

    pintaSalaOffset(m, cy, cx, s.recompensa, c_recompensa);
    pintaSalaOffset(m, cy, cx, s.trampa, c_trampa);
    pintaSalaOffset(m, cy, cx, s.salida, c_salida);
}
//va poniendo las salas de manera aleatoria desde la sala central conectandolas por las puertas
function generamazmorra() {
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
    ponerSala(m, Math.floor(tamy / 2 - salaPPal.tamy / 2), Math.floor(tamx / 2 - salaPPal.tamx / 2), salaPPal, -1, puertas);

    let salas_puestas = 1;
    let errores_consecutivos = 0;

    while (salas_puestas !== num_salas && errores_consecutivos <= max_errores) {
        let direccion_expansion = Math.floor(Math.random() * 4);
        let tam_sala = Math.floor(Math.random() * 4);
        let sala_concreta = Math.floor(Math.random() * salas_vector[tam_sala].length);

        if (puertas[direccion_expansion].length > 0) {
            let ul_elem = puertas[direccion_expansion].length - 1;

            if (cabeLaSala(m, puertas[direccion_expansion][ul_elem].y, puertas[direccion_expansion][ul_elem].x, salas_vector[tam_sala][sala_concreta], direccion_expansion)) {
                errores_consecutivos = 0;
                ponerSala(m, puertas[direccion_expansion][ul_elem].y, puertas[direccion_expansion][ul_elem].x, sal_vector[tam_sala][sala_concreta], direccion_expansion, puertas);
                salas_puestas++;
            } else {
                errores_consecutivos++;
            }
        }
    }

    //limpiamos las paredes que sobran
    for (let i = 0; i < puertas.length; i++) {
        for (let j = 0; j < puertas[i].length; j++) {
            m[puertas[i][j].y][puertas[i][j].x] = c;
        }
    }
    return m;
}

//traduce una mazmorra (caracteres) a sala (estructura de array) para poder usarla
function traduceMazmorraASala(m) {
    const y = m.length, x = m[0].length;
    let salaAux = { tamx: x, tamy: y, pared: [], puerta: [], obstaculo: [], explosivo: [], trampa: [], enemigo_ranged: [], enemigo_melee: [], cura: [], recompensa: [], salida: [] };
    for (let i = 0; i < y; i++) {
        for (let j = 0; j < x; j++) {
            const c = m[i][j];
            switch (c) {
                case '#':
                    salaAux.pared.push([i, j]);
                    break;
                case 'P':
                    salaAux.puerta.push([i, j]);
                    break;
                case 'O':
                    salaAux.obstaculo.push([i, j]);
                    break;
                case 'X':
                    salaAux.explosivo.push([i, j]);
                    break;
                case 'T':
                    salaAux.trampa.push([i, j]);
                    break;
                case 'e':
                    salaAux.enemigo_ranged.push([i, j]);
                    break;
                case 'E':
                    salaAux.enemigo_melee.push([i, j]);
                    break;
                case 'C':
                    salaAux.cura.push([i, j]);
                    break;
                case 'R':
                    salaAux.recompensa.push([i, j]);
                    break;
                case 'S':
                    salaAux.salida.push([i, j]);
                    break;
                default:
                    break;
            }
        }
    }
    return salaAux;
}

function gen_mazmorra() {
    
    const mapa = generaMazmorra();

    /*mapa.forEach((fila) => {
        console.log(fila.join(''));
    });
    
    console.log("\n\n");
    
    */
    const mazmorraSala = traduceMazmorraASala(mapa);

    return CREARJSON(mazmorraSala);
}