const crt=`precision mediump float;
uniform float     time;
uniform float     colorDist;
uniform vec2      resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

void main( void ) {
	vec2 uv = outTexCoord; //Sacar coordenadas de imagen
	uv.x += sin((uv.y  + (time * 0.05))*20.0) * 0.0006; //Calcular el movimiento que queremos
	vec4 texColor = texture2D(uMainSampler, uv); //Imagen movida
    vec4 texColor2 = texture2D(uMainSampler, uv); //Imagen movida
    vec4 color = texture2D(uMainSampler, outTexCoord); // Imagen original
	gl_FragColor = texColor; //Cambiar imagen mostrada por la imagen movida
    vec3 filter = reflect(texColor.rgb, vec3(0.0, colorDist, 0.4)); //Pasar un filtro de color a la imagen movida
    vec3 filter2 = reflect(texColor2.rgb, vec3(0.0, colorDist*0.1, 0.3)); //Pasar un filtro de color a la imagen movida
    if(mod((sin(outTexCoord.y+time)*150.0),0.5)>0.1 && mod((sin(outTexCoord.x)*150.0),0.5)>0.1)
       gl_FragColor = vec4(vec3(filter), 1.0); // cambiar la imagen por la que tiene filtro
    else gl_FragColor = vec4(vec3(filter2), 1.0); // cambiar la imagen por la que tiene filtro
}`

const crtWarp=`precision mediump float;
uniform float     time;
uniform float     colorDist;
uniform vec2      resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

void main( void ) {
	vec2 uv = outTexCoord; //Sacar coordenadas de imagen
    vec2 aux = abs(0.5-uv); 
    
	uv.x += sin((uv.y  + (time * 0.05))*20.0) * 0.0006; //Calcular el movimiento que queremos

    uv.x -= 0.5; 
    uv.x *= 1.0+(aux.y*(0.03)); 
    uv.x += 0.5;

    uv.y -= 0.5; 
    uv.y *= 1.0+(aux.x*(0.09)); 
    uv.y += 0.5;

	vec4 texColor = texture2D(uMainSampler, uv); //Imagen movida
    vec4 texColor2 = texture2D(uMainSampler, uv); //Imagen movida
    vec4 color = texture2D(uMainSampler, outTexCoord); // Imagen original
	gl_FragColor = texColor; //Cambiar imagen mostrada por la imagen movida
    vec3 filter = reflect(texColor.rgb, vec3(0.0, colorDist, 0.4)); //Pasar un filtro de color a la imagen movida
    vec3 filter2 = reflect(texColor2.rgb, vec3(0.0, colorDist*0.1, 0.3)); //Pasar un filtro de color a la imagen movida
    if(uv.y > 0.98 || uv.x < 0.01 || uv.x > 0.99 || uv.y < 0.02) //En limite de bordes
        gl_FragColor = vec4(0.7,0.7,0.7,1.0); //Color bordes
    else if(mod((sin(outTexCoord.y+time)*150.0),0.5)>0.1 && mod((sin(outTexCoord.x)*150.0),0.5)>0.1)
       gl_FragColor = vec4(vec3(filter), 1.0); // cambiar la imagen por la que tiene filtro
    else gl_FragColor = vec4(vec3(filter2), 1.0); // cambiar la imagen por la que tiene filtro
}`

export default class crtShader extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor (game) {
            super({
                game,
                renderTarget: true,
                fragShader:crtWarp   
                });
                this._time=0;
                this.colorDist=0.2;
                this.colorInc=0.01;
            }
            onPreRender(){
                this._time += 0.005;
                this.set1f('time', this._time);
                if(this.colorDist>0.28){
                   this.colorInc=-0.00025
                }if(this.colorDist<0.20){
                    this.colorInc=0.00025
                }
                this.colorDist+=this.colorInc;
                this.set1f('colorDist', this.colorDist);
            }
            
}