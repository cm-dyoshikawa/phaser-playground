import Phaser from 'phaser'

class MyScene extends Phaser.Scene {
  constructor() {
    // Phaser.Sceneのコンストラクタにはstringかオブジェクト（Phaser.Types.Scenes.SettingsConfig）を渡す
    // 以下は { key: 'myscene' } を渡したのと同義になる
    super('myscene')
  }

  preload() {
    this.load.setBaseURL('https://labs.phaser.io')

    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
  }

  create() {
    this.add.image(400, 300, 'sky')

    const particles = this.add.particles('red')

    const emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD',
    })

    const logo = this.physics.add.image(400, 100, 'logo')

    logo.setVelocity(100, 200)
    logo.setBounce(1, 1)
    logo.setCollideWorldBounds(true)

    emitter.startFollow(logo)
  }
}

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
    },
  },
  scene: MyScene,
}

new Phaser.Game(config)
