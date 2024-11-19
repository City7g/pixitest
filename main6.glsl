precision mediump float;

varying vec2 vTextureCoord;
uniform sampler2D uTextureOne;
uniform sampler2D uTextureTwo;
uniform float uProgress;

float transform(float value) {
    return 1.0 + (1.05 - 1.0) * value;
}

void main(void) {
    vec2 coord = vec2(vTextureCoord.x, vTextureCoord.y);

    vec2 centeredCoord = vTextureCoord - vec2(0.5);
    float distanceFromCenter = length(centeredCoord);
    float adjustedMixFactor = mix(1.0, transform(uProgress), (1.0 - distanceFromCenter));
    
    // Применение smoothstep для плавного перехода
    float mixFactor = smoothstep(0.0, 1.0, uProgress * 1.4 - distance(coord, vec2(0.5, 0.5)));
    // float mixFactor = step(uProgress * 2.0, coord.x + coord.y);
    // float mixFactor = uProgress * 1.0 + (1.0 - coord.x) + (1.0 - coord.y);
    
    // vec4 img1 = texture2D(uTextureOne, vTextureCoord);
    // vec4 img2 = texture2D(uTextureTwo, vTextureCoord);
    vec4 img1 = texture2D(uTextureOne, vec2(centeredCoord.x * (1.0 * adjustedMixFactor) + 0.5, vTextureCoord.y));
    vec4 img2 = texture2D(uTextureTwo, vec2(centeredCoord.x * (1.0 / adjustedMixFactor) + 0.5, vTextureCoord.y));
    vec4 color = vec4(1.0, 0.0, 0.0, 1.0); // Пример второго цвета (красный)
    
    // Смешивание цветов с использованием smoothstep
    gl_FragColor = mix(img1, img2, mixFactor);
}