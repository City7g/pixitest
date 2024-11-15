attribute vec2 aPosition;
attribute vec2 aUV;
uniform mat3 projectionMatrix;
varying vec2 vTextureCoord;

void main(void) {
  gl_Position = vec4((projectionMatrix * vec3(aPosition, 1.0)).xy, 0.0, 1.0);
  vTextureCoord = aUV;
}