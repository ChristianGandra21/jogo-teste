class gameHome extends Phaser.Scene {
	constructor() {
		super({ key: 'gameHome' })
	}
  
  create() {
    this.add.text(110, 150, 'This is the first Scene!', {fill: '#000000', fontSize: '20px'})
      
		this.input.on('pointerdown', () => {  
			this.scene.stop('gameHome')
			this.scene.start('level1')
		})
  }
}