
class GameOverScene extends Phaser.Scene {

	constructor() {
		super("gameover");
	}
	
	preload() {

	}
	
	create() {

		this.background = this.add.image(0, 0, 'end');
		this.background.setOrigin(0,0);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
		
		this.keys = this.input.keyboard.addKeys({
			sp: Phaser.Input.Keyboard.KeyCodes.ENTER
		});
	}

    update() {
        
		
		if( this.keys.sp.isDown)  {
			this.scene.start(gameSettings.scene);
		}

	}
}