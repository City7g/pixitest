precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;
uniform float uProgress;

float transform(float value, float min, float max) {
  return min + (max - min) * value;
}

void main(void) {
    vec2 coord = vec2(vTextureCoord.x, vTextureCoord.y);

    vec2 centeredCoord = vTextureCoord - vec2(0.5);
    float distanceFromCenter = length(centeredCoord);
    float adjustedMixFactor1 = mix(1.0, transform(uProgress, 1.0, 1.4), (1.0 - distanceFromCenter));
    float adjustedMixFactor2 = mix(1.0, transform(uProgress, 0.6, 1.0), (1.0 - distanceFromCenter));
    
    // Применение smoothstep для плавного перехода
    float mixFactor = smoothstep(0.0, 1.0, min(uProgress * 3.0, 1.7) - distance(coord, vec2(0.5, 0.5)));
    // float mixFactor = step(uProgress * 2.0, coord.x + coord.y);
    // float mixFactor = uProgress * 1.0 + (1.0 - coord.x) + (1.0 - coord.y);
    
    // vec4 img1 = texture2D(uTextureOne, vTextureCoord);
    // vec4 img2 = texture2D(uTextureTwo, vTextureCoord);с
    vec4 img1 = texture2D(uTextureOne, vec2(centeredCoord.x * (1.0 / adjustedMixFactor1) + 0.5, vTextureCoord.y));
    vec4 img2 = texture2D(uTextureTwo, vec2(centeredCoord.x * (adjustedMixFactor2) + 0.5, vTextureCoord.y));
    vec4 color = vec4(1.0, 0.0, 0.0, 1.0); // Пример второго цвета (красный)
    
    // Смешивание цветов с использованием smoothstep
    gl_FragColor = mix(img1, img2, mixFactor);
    // gl_FragColor = img2;
}