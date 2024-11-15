import * as PIXI from 'pixi.js'
import '@pixi/filter-displacement'
import gsap from 'gsap'

const app = new PIXI.Application({
  width: window.innerWidth,
  height: window.innerHeight,
})

document.body.appendChild(app.view)

const texture1 = await PIXI.Assets.load('/img/image-1.jpg')
const texture2 = await PIXI.Assets.load('/img/image-2.jpg')
const displacement = await PIXI.Assets.load('/img/displacement.jpg')

const sprite1 = new PIXI.Sprite(texture1)
const sprite2 = new PIXI.Sprite(texture2)
const displacementSprite = new PIXI.Sprite(displacement)

const container2 = new PIXI.Container()

const displacementFilter = new PIXI.DisplacementFilter(displacementSprite)

container2.addChild(sprite1)
container2.addChild(sprite2)
sprite1.alpha = 0.5
sprite2.alpha = 0.5
// container2.addChild(sprite2)
// container2.pivot.set(app.screen.width / 2, app.screen.height / 2)
// container2.position.set(app.screen.width / 2, app.screen.height / 2)

// container2.addChild(displacementFilter)
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

container2.addChild(mask)
sprite1.mask = mask
sprite2.mask = mask

app.stage.addChild(container2)

gsap.fromTo(
  displacementFilter.scale,
  {
    x: 0,
    y: 0,
  },
  {
    x: 100,
    y: 100,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: 'power2.inOut',
  }
)

gsap.fromTo(
  sprite1,
  {
    alpha: 0,
  },
  {
    alpha: 1,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: 'power2.inOut',
  }
)
gsap.fromTo(
  sprite2,
  {
    alpha: 1,
  },
  {
    alpha: 0,
    repeat: -1,
    yoyo: true,
    duration: 2,
    ease: 'power2.inOut',
  }
)

app.ticker.add((delta) => {
  console.log(delta)
})
