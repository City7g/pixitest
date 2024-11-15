import * as PIXI from './node_modules/pixi.js/lib/index'
import '@pixi/filter-displacement'
import fragmentShader from './anim1.glsl?raw'
import gsap from 'gsap'

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
})

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

sprite1.width = app.view.width
sprite1.height = app.view.height
sprite2.width = app.view.width
sprite2.height = app.view.height
sprite3.width = app.view.width
sprite3.height = app.view.height
sprite4.width = app.view.width
sprite4.height = app.view.height
displacementSprite.width = app.view.width
displacementSprite.height = app.view.height

const Filter = new PIXI.Filter(null, fragmentShader)

Filter.uniforms.uMixFactor = 1
Filter.uniforms.uProgress = 0
Filter.uniforms.uTextureOne = sprite1.texture
Filter.uniforms.uTextureTwo = sprite2.texture

container1.filters = [Filter]
sprite1.anchor.set(0.5)
sprite1.x = app.screen.width / 2
sprite1.y = app.screen.height / 2

container1.addChild(sprite1)
container1.addChild(sprite2)

const displacementFilter = new PIXI.DisplacementFilter(displacementSprite)

container2.filters = [displacementFilter]

container2.addChild(sprite3)
container2.addChild(sprite4)

const mask = new PIXI.Graphics()
  .beginFill(0x00ff00)
  .drawCircle(app.view.width / 2, app.view.height / 2, 400)
  .beginHole()
  .drawCircle(app.view.width / 2, app.view.height / 2, 150)
  .endHole()
  .endFill()

container2.addChild(mask)
container2.mask = mask

app.stage.addChild(container1)
app.stage.addChild(container2)

const duration = 0.4

const tl = gsap.timeline({
  repeat: -1,
  repeatDelay: 2,
  // yoyo: true,
  duration: 2,
  ease: 'power2.outIn',
})

tl.fromTo(
  Filter.uniforms,
  {
    uProgress: 0,
  },
  {
    uProgress: 1,
    duration: duration * 2,
    onComplete: () => {
      setTimeout(() => {
        Filter.uniforms.uProgress = 0
      }, 800)
    },
  },
  0
)
  // .fromTo(
  //   Filter.uniforms,
  //   {
  //     uProgress: 1,
  //   },
  //   {
  //     uProgress: 0,
  //     duration: duration,
  //   },
  //   duration
  // )
  .fromTo(
    Filter.uniforms,
    {
      uMixFactor: 1,
    },
    {
      uMixFactor: 1.4,
      duration: duration,
    },
    0
  )
  .fromTo(
    Filter.uniforms,
    {
      uMixFactor: 1.4,
    },
    {
      uMixFactor: 1,
      duration: duration,
    },
    duration
  )
  .fromTo(
    displacementFilter.scale,
    {
      x: 0,
      y: 0,
    },
    {
      x: 200,
      y: 200,
      duration: duration,
    },
    0
  )
  .fromTo(
    displacementFilter.scale,
    {
      x: 200,
      y: 200,
    },
    {
      x: 0,
      y: 0,
      duration: duration,
    },
    duration
  )
  .fromTo(
    sprite3,
    {
      alpha: 1,
    },
    {
      alpha: 0,
      yoyo: true,
      duration: duration * 2,
      onComplete: () => {
        setTimeout(() => {
          sprite3.alpha = 1
        }, 80)
      },
    },
    0
  )
  .fromTo(
    sprite4,
    {
      alpha: 0,
    },
    {
      alpha: 1,
      yoyo: true,
      duration: duration * 2,
      onComplete: () => {
        setTimeout(() => {
          sprite4.alpha = 0
        }, 800)
      },
    },
    0
  )

app.ticker.add(() => {
  console.log(Filter.uniforms.uProgress, displacementFilter.scale.x)
})
