import * as PIXI from 'pixi.js'
import fragmentShader from './anim1.glsl?raw'
import gsap from 'gsap'

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
})

document.body.appendChild(app.view)

const texture1 = await PIXI.Assets.load('/img/image-1.jpg')
const texture2 = await PIXI.Assets.load('/img/image-2.jpg')

const sprite1 = new PIXI.Sprite(texture1)
const sprite2 = new PIXI.Sprite(texture2)

const container1 = new PIXI.Container()

const Filter = new PIXI.Filter(null, fragmentShader)

Filter.uniforms.uMixFactor = 1
// Filter.uniforms.uProgress = 0
Filter.uniforms.uTextureOne = sprite1.texture
Filter.uniforms.uTextureTwo = sprite2.texture

container1.filters = [Filter]
sprite1.anchor.set(0.5)
sprite1.x = app.screen.width / 2
sprite1.y = app.screen.height / 2

container1.addChild(sprite1)
container1.addChild(sprite2)
// container1.pivot.set(app.screen.width / 2, app.screen.height / 2)
// container1.position.set(app.screen.width / 2, app.screen.height / 2)

app.stage.addChild(container1)

gsap.fromTo(
  Filter.uniforms,
  {
    uMixFactor: 1,
    uProgress: 0,
  },
  {
    uMixFactor: 1.4,
    uProgress: 1,
    duration: 2,
    repeat: -1,
    yoyo: true,
  }
)

app.ticker.add(() => {
  console.log(Filter.uniforms.uProgress)
})
