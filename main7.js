import * as PIXI from 'pixi.js'
// import '@pixi/filter-displacement'
import gsap from 'gsap'
import * as dat from 'dat.gui'

// const gui = new dat.GUI()

// gui.add({ progress: 0 }, 'progress', 0, 1, 0.01)

import fragment from './main7.glsl?raw'

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
})

document.body.appendChild(app.view)

const Filter = new PIXI.Filter(null, fragment)
Filter.uniforms.uProgress = 0

const container = new PIXI.Container()

app.stage.addChild(container)

const texture1 = await PIXI.Assets.load('/img/image-1.jpg')
const texture2 = await PIXI.Assets.load('/img/image-2.jpg')

const sprite1 = new PIXI.Sprite(texture1)
const sprite2 = new PIXI.Sprite(texture2)

Filter.uniforms.uTextureOne = sprite1.texture
Filter.uniforms.uTextureTwo = sprite2.texture

container.addChild(sprite1)

container.filters = [Filter]

gsap.fromTo(
  Filter.uniforms,
  { uProgress: 0 },
  {
    uProgress: 1,
    ease: 'power1.out',
    duration: 1,
    repeatDelay: 1,
    delay: 0.5,
    repeat: -1,
  }
)

// app.ticker.add(() => {
//   Filter.uniforms.uProgress = gui.__controllers[0].getValue()
// })
