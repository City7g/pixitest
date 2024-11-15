precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;

uniform float uMixFactor;

void main(void) {

  vec2 centeredCoord = vTextureCoord - vec2(0.5);
  float distanceFromCenter = length(centeredCoord);
  float adjustedMixFactor1 = mix(1.0, uMixFactor / 2.0 + 1.0, (1.0 - distanceFromCenter));
  float adjustedMixFactor2 = mix(1.0, (1.0 - uMixFactor) / 2.0 + 1.0, (1.0 - distanceFromCenter));
  
  vec4 img1 = texture2D(uTextureOne, vec2(centeredCoord.x * (1.0 / adjustedMixFactor1) + 0.5, centeredCoord.y * (1.0 / adjustedMixFactor1) + 0.5));
  vec4 img2 = texture2D(uTextureTwo, vec2(centeredCoord.x * (1.0 / adjustedMixFactor2) + 0.5, centeredCoord.y * (1.0 / adjustedMixFactor2) + 0.5));
  
  // gl_FragColor = vec4(1.0, 0.0, 0.0,.35);
  // gl_FragColor = img1;
  gl_FragColor = mix(img1, img2, uMixFactor);
}