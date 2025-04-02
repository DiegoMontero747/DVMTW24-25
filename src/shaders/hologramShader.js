
const pixel=`precision mediump float;
uniform vec2      resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;
uniform float     move;
uniform float     displace;
uniform float time;



void main( void ) {
	vec2 uv = outTexCoord;
    vec4 texColor = texture2D(uMainSampler, uv);
    uv.x=uv.y*displace;
    gl_FragColor=texColor;
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(2.0 * gl_FragColor.r , 0.8 * gl_FragColor.g , 0.8 * gl_FragColor.b), move);
}`

const holo=`precision mediump float;
uniform vec2      resolution;
uniform sampler2D uMainSampler;
varying vec2 outTexCoord;
uniform float     move;
uniform float     displace;
uniform float time;



void main( void ) {
	vec2 uv = outTexCoord;
    if(mod(sin(uv.y+time)*100.0,0.5)<0.2) {
    uv.x+=displace;
    //uv.y+=displace;
    }
    //if(mod(uv.x,0.01)<0.005) uv.y+=displace;
    vec4 texColor = texture2D(uMainSampler, uv);
    gl_FragColor=texColor;
    gl_FragColor.rgb = mix(gl_FragColor.rgb, vec3(0.7 * gl_FragColor.r , 0.7 * gl_FragColor.g , 2.0 * gl_FragColor.b), 1.0);
}`

export default class crtShader extends Phaser.Renderer.WebGL.Pipelines.PostFXPipeline {
    constructor (game) {
            super({
                game,
                renderTarget: true,
                fragShader:pixel,   
                });
                this.time=0;
                this.move=0.2;
                this.inc=0.01;
                this.displace=0.0;
                this.displaceInc=0.01;
            }      
    onPreRender(){
        if(this.displace>0.003){
            this.displaceInc=-0.0001
        }else if(this.displace<-0.002){
             this.displaceInc=0.0001
        }this.displace+=this.displaceInc;
        if(this.move>0.80){
            this.inc=-0.001
        }if(this.move<0.15){
             this.inc=0.001
        }
         this.move+=this.inc;
         this.time+=0.00005;
         this.set1f('time', this.time);
         this.set1f('move', this.move);
         this.set1f('displace', this.displace);

    }    
}