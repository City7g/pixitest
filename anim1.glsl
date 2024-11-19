precision medium float;

varying vec2 vTextureCoord;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;

uniform float uMixFactor1;
uniform float uMixFactor2;
uniform float uProgress;

float newLength(float x, float y) {
  return x + y;
}

float transformRange(float value) {
  return (value + 1.0) / 2.0;
}

void main(void) {
  vec2 centeredCoord = vTextureCoord - vec2(0.5);
  // float distanceFromCenter = newLength(centeredCoord.x, centeredCoord.y);
  float distanceFromCenter = length(centeredCoord);
  float adjustedMixFactor1 = mix(1.0, uMixFactor1, (1.0 - distanceFromCenter));
  float adjustedMixFactor2 = mix(1.0, uMixFactor2, (1.0 - distanceFromCenter));

  // vec4 img1 = texture2D(uTextureOne, vec2(centeredCoord.x * (1.0 / adjustedMixFactor1) + 0.5, centeredCoord.y * (1.0 / adjustedMixFactor1) + 0.5));
  // vec4 img2 = texture2D(uTextureTwo, vec2(centeredCoord.x * (1.0 / adjustedMixFactor2) + 0.5, centeredCoord.y * (1.0 / adjustedMixFactor2) + 0.5));
  vec4 img1 = texture2D(uTextureOne, vTextureCoord);
  vec4 img2 = texture2D(uTextureTwo, vTextureCoord);

  // gl_FragColor = vec4(1.0, 0.0, 0.0,.35);
  // gl_FragColor = color;
  // gl_FragColor = mix(color, vec4(1.0, 0.0, 0.0, 0.4), (uMixFactor - 1.0) * 0.4);

  // gl_FragColor = vec4(1.0, 0.0, 0.0, 0.0);

  // gl_FragColor = vec4(mix(vec4(1.0, 1.0, 0.0, 1.0), vec4(0.0, 0.0, 1.0, 1.0)), distanceFromCenter);
  vec4 centerColor = vec4(1.0, 0.0, 0.0, 1.0); // Red
  vec4 edgeColor = vec4(1.0, 1.0, 0.0, 1.0); // Yellow

  float mixFactor = smoothstep(0.0, 1.0, distanceFromCenter);
  gl_FragColor = mix(img1, img2, mixFactor);

  // float centerFactor = smoothstep(0.0, 1.0, distanceFromCenter);
  // gl_FragColor = mix(img1, img2, min((1.0 - distanceFromCenter) + uProgress, 1.0));
  // gl_FragColor = mix(gl_FragColor, vec4(1.0, 0.0, 0.0, 1.0), centerFactor);
  // gl_FragColor = vec4(mix(color, vec4(1.0, 0.0, 0.0, 1.0)));
}