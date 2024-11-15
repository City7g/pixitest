import * as PIXI from 'pixi.js'
import '@pixi/filter-displacement'
import gsap from 'gsap'

import fragment from './fragment.glsl?raw'

// const fragment = `
//   precision mediump float;
//   uniform float progress;
//   uniform sampler2D uSampler;
//   uniform sampler2D texture1;
//   uniform sampler2D texture2;
//   varying vec2 vTextureCoord;

//   void main() {
//       vec4 t1 = texture2D(texture1, vTextureCoord);
//       vec4 t2 = texture2D(texture2, vTextureCoord);
//       gl_FragColor = mix(t1, t2, progress);
//   }
// `

const app = new PIXI.Application()
let progress = 0

await app.init({
  width: window.innerWidth,
  height: window.innerHeight,
  resizeTo: window,
})

document.body.appendChild(app.canvas)

const container1 = new PIXI.Container()
const container2 = new PIXI.Container()

container1.pivot.set(app.screen.width / 2, app.screen.height / 2)
container1.position.set(app.screen.width / 2, app.screen.height / 2)
container2.pivot.set(app.screen.width / 2, app.screen.height / 2)
container2.position.set(app.screen.width / 2, app.screen.height / 2)

app.stage.addChild(container1)
app.stage.addChild(container2)

const texture1 = await PIXI.Assets.load('/img/image-1.jpg')
const texture2 = await PIXI.Assets.load('/img/image-2.jpg')
const texture3 = await PIXI.Assets.load('/img/image-1.jpg')
const texture4 = await PIXI.Assets.load('/img/image-2.jpg')
const displacement = await PIXI.Assets.load('/img/displacement.jpg')

const sprite1 = new PIXI.Sprite(texture1)
const sprite2 = new PIXI.Sprite(texture2)
const sprite3 = new PIXI.Sprite(texture3)
const sprite4 = new PIXI.Sprite(texture4)
const displacementSprite = new PIXI.Sprite(displacement)

// displacementSprite.texture.baseTexture.wrapMode = PIXI.WRAP_MODES.REPEAT;

const displacementFilter = new PIXI.DisplacementFilter({
  sprite: displacementSprite,
  scale: 0,
})

// displacementSprite.anchor.set(0.5);
// displacementSprite.x = app.screen.width / 2;
// displacementSprite.y = app.screen.height / 2;
// displacementSprite.position = sprite2.position;
// displacementSprite.width = app.screen.width;
// displacementSprite.height = app.screen.height;
// displacementSprite.x = app.screen.width / 2;
// displacementSprite.y = app.screen.height / 2;

container1.addChild(sprite1)
container2.addChild(sprite3)

// container2.alpha = 0.1;
// container2.anchor.set(0.5);
// container2.x = 0
// container2.y = 0
// container2.rotation = 100;
// container1.filters = [Filter]
// const Filter = new PIXI.Filter(null, fragment)
// container1.addChild(Filter)
// container1.filters = [Filter]
container2.addChild(displacementSprite)
container2.filters = [displacementFilter]

const mask = new PIXI.Graphics()
  .circle(app.canvas.width / 2, app.canvas.height / 2, 400)
  .fill(0xff0000)
  .circle(app.canvas.width / 2, app.canvas.height / 2, 150)
  .cut()
// .endHole();
// mask.x = 300;
// mask.y = 300;
app.stage.addChild(mask)
container2.mask = mask

const count = 100
let tickCount = 0

// mask.beginFill(0xffffff);
// mask.drawCircle(0, 0, 100);
// mask.endFill();
// mask.clear();
// mask.moveTo(-120 + Math.sin(count) * 20, -100 + Math.cos(count) * 20);
// mask.lineTo(120 + Math.cos(count) * 20, -100 + Math.sin(count) * 20);
// mask.lineTo(120 + Math.sin(count) * 20, 100 + Math.cos(count) * 20);
// mask.lineTo(-120 + Math.cos(count) * 20, 100 + Math.sin(count) * 20);
// mask.fill({ color: 0x8bc5ff, alpha: 0.4 });
// mask.rotation = count * 0.1;

// sprite2.alpha = 0;

const duration = 2000
let isEnter = false

// const mask = new PIXI.Graphics()
//   .rect(window.innerWidth / 2 - 100, window.innerHeight / 2 - 100, 200, 200)
//   .fill(0xff0000);
// mask.beginFill(0xffffff);
// mask.drawCircle(window.innerWidth / 2, window.innerHeight / 2, 100);
// mask.endFill();

// sprite1.mask = mask;
// sprite2.mask = mask;

// mask.rotation = Math.PI / 2; // Rotate the mask by 90 degrees
// app.stage.addChild(mask);

let is = false

sprite2.anchor.set(0.5)
sprite2.x = app.canvas.width / 2
sprite2.y = app.canvas.height / 2

let progressone = 0

// app.ticker.add((delta) => {
//   progressone += 0.01

//   if (progressone > 1) {
//     container1.scale.x -= 0.004
//     container1.scale.y -= 0.004
//     container1.alpha -= 0.002
//     // container1.rotation += 0.001
//     container2.rotation -= 0.001
//     displacementFilter.scale.x += 4
//     displacementFilter.scale.y += 4
//   } else {
//     container1.scale.x += 0.004
//     container1.scale.y += 0.004
//     container1.alpha += 0.002
//     // container1.rotation -= 0.001
//     container2.rotation += 0.001
//     displacementFilter.scale.x -= 4
//     displacementFilter.scale.y -= 4
//   }

//   if (progressone > 2) {
//     progressone = 0
//   }
// })

app.ticker.add((delta) => {
  progressone += 0.01

  if (progressone > 1) {
    gsap.to(container1.scale, { x: '-=0.004', y: '-=0.004', duration: 0.1 })
    gsap.to(container1, { alpha: '-=0.002', duration: 0.1 })
    // gsap.to(container1, { rotation: '+=0.001', duration: 0.1 });
    gsap.to(container2, { rotation: '-=0.001', duration: 0.1 })
    gsap.to(displacementFilter.scale, { x: '+=4', y: '+=4', duration: 0.1 })
  } else {
    gsap.to(container1.scale, { x: '+=0.004', y: '+=0.004', duration: 0.1 })
    gsap.to(container1, { alpha: '+=0.002', duration: 0.1 })
    // gsap.to(container1, { rotation: '-=0.001', duration: 0.1 });
    gsap.to(container2, { rotation: '+=0.001', duration: 0.1 })
    gsap.to(displacementFilter.scale, { x: '-=4', y: '-=4', duration: 0.1 })
  }

  if (progressone > 2) {
    progressone = 0 // Reset progressone if needed
  }
})

// app.ticker.add((delta) => {
//   if (is) {
//     displacementFilter.scale.x += 4
//     displacementFilter.scale.y += 4
//     container1.scale.x -= 0.002
//     container1.scale.y -= 0.002
//     // container2.rotation += 0.001
//     if (displacementFilter.scale.x > 300) {
//       is = false
//     }
//   } else {
//     displacementFilter.scale.x -= 4
//     displacementFilter.scale.y -= 4
//     container1.scale.x += 0.002
//     container1.scale.y += 0.002
//     // container2.rotation -= 0.001
//     if (displacementFilter.scale.x < 10) {
//       is = true
//     }
//   }
// })

// window.addEventListener('click', () => {
//   requestAnimationFrame(tick)
// })

// function tick() {
//   console.log(tickCount)

//   if (tickCount < 360) {
//     tickCount++
//     container2.rotation += 0.01
//     requestAnimationFrame(tick)
//   }
// }
