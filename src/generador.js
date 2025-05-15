// mapaGenerador.js
const a = ' ', b = '#';

// mapaGenerador.js

class MapaGenerador {
    constructor(tamx = 20, tamy = 40) {
      this.tamx = tamx;
      this.tamy = tamy;
      this.mapa = [];
    }
  
    // Generar un mapa aleatorio
    generamapa() {
      const gen = () => Math.floor(Math.random() * (this.tamx - 2)) + 2;
  
      // Inicializar el mapa con paredes
      this.mapa = [];
      for (let i = 0; i < this.tamx; i++) {
        this.mapa[i] = [];
        for (let j = 0; j < this.tamy; j++) {
          this.mapa[i][j] = b; // Pared
        }
      }
  
      // Colocar el primer espacio vacío en la mitad de la primera columna
      this.mapa[Math.floor(this.tamx / 2)][0] = ' ';
  
      for (let col = 1; col < this.tamy; col++) {
        let random_number = gen();
        let fila = 1;
  
        while (random_number > 0) {
          let exito = gen();
          fila = parseInt((fila + exito / 3) % (this.tamx - 1));
  
          if (exito % 2 === 0 || exito % 3 === 0 || exito % 5 === 0) {
            if (this.mapa[fila][col - 1] === a || fila < this.tamx && this.mapa[fila + 1][col] === a || fila > 1 && this.mapa[fila - 1][col] === a) {
              this.mapa[fila][col] = a;
              random_number--;
            } else {
              if (random_number > 2) {
                if (exito % 2 === 0) {
                  fila = (fila + exito) % (this.tamx - 1);
                } else {
                  fila = (fila + exito * 3) % (this.tamx - 1);
                }
  
                if (this.mapa[fila][col - 1] === a && fila > 0) {
                  this.mapa[fila][col] = a;
                  random_number--;
                }
              }
            }
          }
        }
      }
    }
  
    // Generar el mapa de un mundo con castillo, ciudades y mazmorras
    mapamundi() {
      const gen_x = () => Math.floor(Math.random() * this.tamx);
      const gen_y = () => Math.floor(Math.random() * this.tamy);
  
      this.mapa = [];
      // Inicializar el mapa con paredes
      for (let i = 0; i < this.tamx; i++) {
        this.mapa[i] = [];
        for (let j = 0; j < this.tamy; j++) {
          this.mapa[i][j] = '#'; // Pared
        }
      }
  
      this.mapa[Math.floor(this.tamx / 2)][Math.floor(this.tamy / 2)] = 'B'; // Castillo
  
      // Generar el castillo
      let x = gen_x();
      let y = gen_y();
      while (this.mapa[x][y] !== '#') {
        x = gen_x();
        y = gen_y();
        if (this.mapa[x][y] === '#') {
          this.mapa[x][y] = 'C'; // Castillo
        }
      }
  
      // Generar ciudades
      let ciudades = Math.floor(this.tamx * this.tamy / Math.max(this.tamx, this.tamy)) + 1;
      while (ciudades > 0) {
        x = gen_x();
        y = gen_y();
        if (this.mapa[x][y] === '#') {
          this.mapa[x][y] = '*'; // Ciudad
          ciudades--;
        }
      }
  
      // Generar mazmorras
      let mazmorras = Math.floor(this.tamx * this.tamy / (Math.min(this.tamx, this.tamy) * 4)) + 3;
      while (mazmorras > 0) {
        x = gen_x();
        y = gen_y();
        if (this.mapa[x][y] === '#') {
          this.mapa[x][y] = 'M'; // Mazmorras
          mazmorras--;
        }
      }
    }
  
    // Obtener el mapa como una cadena de texto para su visualización
    obtenerMapaComoCadena() {
      let mapaString = '';
      for (let i = 0; i < this.tamx; i++) {
        for (let j = 0; j < this.tamy; j++) {
          mapaString += this.mapa[i][j] + ' ';
        }
        mapaString += '\n';
      }
      return mapaString;
    }
  }
  
  // Exportar el objeto para su uso en Phaser
  export default MapaGenerador;
  