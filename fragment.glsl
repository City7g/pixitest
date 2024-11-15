precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
// uniform sampler2D uTextureOne;
// uniform sampler2D uTextureTwo;

uniform float uTime;

// uniform float uMixFactor;

void main() {
  vec2 uv = vTextureCoord;

  vec2 uvDivided = fract(uv * vec2(10.0, 1.0));

  float time = abs(sin(uTime));
  vec2 uvDisplaced = uv + vec2(time * uv.x / 4.0, 0.0) * uvDivided;


  // gl_FragColor = vec4(uvDivided,0.0,1.0);
  gl_FragColor = texture2D(uSampler, uvDisplaced);
}