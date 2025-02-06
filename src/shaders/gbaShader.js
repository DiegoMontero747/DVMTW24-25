const gba=`precision mediump float;
uniform vec2      resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;

void main( void ) {
    vec4 texColor = texture2D(uMainSampler, outTexCoord); // Imagen original
	vec2 uv = outTexCoord; //Sacar coordenadas de imagen
    vec3 filter = min(texColor.rgb, vec3(0.0, 0.5, 0.09)); //Pasar un filtro de color a la imagen movida
    //if(mod(((outTexCoord.y)*100.0),0.3)>0.1 && mod(((outTexCoord.x)*100.0),0.3)>0.1) //scanlines
       gl_FragColor = vec4(vec3(filter), 1.0); // cambiar la imagen por la que tiene filtro
    //else gl_FragColor = vec4(vec3(0.0), 1.0);
}`

export default class crtShader extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor (game) {
            super({
                game,
                renderTarget: true,
                fragShader:gba,   
                });
            }      
}