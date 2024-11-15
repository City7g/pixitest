precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;

uniform float uMixFactor;

void main(void) {
  vec2 centeredCoord = vTextureCoord - vec2(0.5);
  float distanceFromCenter = length(centeredCoord);
  float adjustedMixFactor = mix(1.0, uMixFactor, (1.0 - distanceFromCenter));

  vec4 color = texture2D(uTextureTwo, vec2(centeredCoord.x * (1.0 / adjustedMixFactor) + 0.5, centeredCoord.y * (1.0 / adjustedMixFactor) + 0.5));

  gl_FragColor = color;

}