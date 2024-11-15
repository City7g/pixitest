precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uSampler;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;

uniform float uMixFactor;

void main(void) {
  vec2 centeredCoord = vTextureCoord - vec2(0.5);
  float distanceFromCenter = length(centeredCoord);

  vec2 coordOne = vec2(centeredCoord.x * sin(1.0 - uMixFactor) + 0.5, centeredCoord.y * sin(1.0 - uMixFactor) + 0.5);
  vec2 coordTwo = vec2(centeredCoord.x * (uMixFactor) + 0.5, centeredCoord.y * (uMixFactor) + 0.5);

  vec4 img1 = texture2D(uTextureOne, coordOne);
  vec4 img2 = texture2D(uTextureTwo, coordTwo);

  gl_FragColor = mix(img1, img2, uMixFactor);
}