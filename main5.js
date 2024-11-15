// import { Application, Assets, Geometry, Mesh, Shader } from 'pixi.js'
import * as PIXI from 'pixi.js'
import '@pixi/filter-displacement'
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment5.glsl?raw'

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
})

// await app.init({
//   width: window.innerWidth,
//   height: window.innerHeight,
//   resizeTo: window,
// })

document.body.appendChild(app.view)

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

const container1 = new PIXI.Container()
const container2 = new PIXI.Container()

const Filter = new PIXI.Filter(null, fragmentShader)

Filter.uniforms.uMixFactor = 0
Filter.uniforms.uTextureOne = sprite1.texture
Filter.uniforms.uTextureTwo = sprite2.texture

const displacementFilter = new PIXI.DisplacementFilter(displacementSprite)

container1.filters = [Filter]
sprite1.anchor.set(0.5)
sprite1.x = app.screen.width / 2
sprite1.y = app.screen.height / 2

container1.addChild(sprite1)
container1.addChild(sprite2)
container1.pivot.set(app.view.width / 2, app.view.height / 2)
container1.position.set(app.view.width / 2, app.view.height / 2)

container2.addChild(sprite3)
container2.addChild(sprite4)
container2.pivot.set(app.screen.width / 2, app.screen.height / 2)
container2.position.set(app.screen.width / 2, app.screen.height / 2)
// container2.x = app.screen.width + 100
// container2.alpha = 0.1

container2.addChild(displacementFilter)
container2.filters = [displacementFilter]

const mask = new PIXI.Graphics()
  //   // .circle(app.view.width / 2, app.view.height / 2, 400)
  //   // .fill(0xff0000)
  //   // .circle(app.view.width / 2, app.view.height / 2, 150)
  //   // .cut()
  //   // .beginFill(0x00ff00)
  //   .drawCircle(app.view.width / 2, app.view.height / 2, 400)
  //   // .fill(0xff0000)
  //   .beginHole()
  //   .drawCircle(app.view.width / 2, app.view.height / 2, 150)
  //   .endHole()
  // // .endFill()
  .beginFill(0x00ff00)
  .drawCircle(app.view.width / 2, app.view.height / 2, 400)
  .beginHole()
  .drawCircle(app.view.width / 2, app.view.height / 2, 150)
  .endHole()
  .endFill()

app.stage.addChild(mask)
container2.mask = mask

app.ticker.add(() => {
  container1.rotation += 0.01
  container2.rotation += 0.01
})

// app.stage.addChild(container1)
app.stage.addChild(container2)

let mixFactor = 0
let direction = 1

// app.ticker.add(() => {
//   mixFactor += 0.02 * direction
//   console.log(mixFactor)

//   if (mixFactor >= 1 || mixFactor <= 0) {
//     direction *= -1
//   }
//   Filter.uniforms.uMixFactor = mixFactor
// })

// window.addEventListener('click', () => {
//   console.log(123)
// })
