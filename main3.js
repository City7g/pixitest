// import { Application, Assets, Geometry, Mesh, Shader } from 'pixi.js'
import * as PIXI from 'pixi.js'
import vertexShader from './vertex.glsl?raw'
import fragmentShader from './fragment3.glsl?raw'

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

const sprite1 = new PIXI.Sprite(texture1)
const sprite2 = new PIXI.Sprite(texture2)

const container = new PIXI.Container()

const Filter = new PIXI.Filter(null, fragmentShader)

Filter.uniforms.uMixFactor = 0
Filter.uniforms.uTextureOne = sprite1.texture
Filter.uniforms.uTextureTwo = sprite2.texture

container.filters = [Filter]
sprite1.anchor.set(0.5)
sprite1.x = app.screen.width / 2
sprite1.y = app.screen.height / 2

container.addChild(sprite1)
container.addChild(sprite2)
container.pivot.set(app.screen.width / 2, app.screen.height / 2)
container.position.set(app.screen.width / 2, app.screen.height / 2)

app.stage.addChild(container)

let mixFactor = 1
let direction = 1

app.ticker.add(() => {
  mixFactor += 0.01 * direction
  console.log(mixFactor)

  if (mixFactor >= 1.4 || mixFactor <= 1) {
    direction *= -1
  }
  Filter.uniforms.uMixFactor = mixFactor
})
