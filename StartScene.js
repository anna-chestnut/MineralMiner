
class StartScene extends Phaser.Scene {

	constructor() {
		super("startGame");
	}
	
	preload() {

		this.load.audio('drop_rock', 'assets/music/Drop_Rock_Sound.wav');
		this.load.audio('digging_sound', 'assets/music/Digging_Sound.wav');
		this.load.audio('monster_death', 'assets/music/Monster_Death_Sound.wav');
		this.load.audio('pickup_rock', 'assets/music/Picking_Up_Rock_Sound.wav');
		this.load.audio('player_death', 'assets/music/Player_Death_Sound.wav');

		
		this.load.image('start', 'assets/sprites/mineral_miner.png');
		//this.load.image('game', 'assets/sprites/game_play1.jpg');
		this.load.image('end', 'assets/sprites/game_over.png');
		this.load.image('player', 'assets/sprites/player.png');
		this.load.image('dug', 'assets/sprites/dugTwoPixel.png');
		this.load.image('GreenRock', 'assets/sprites/STONE4.png');
		this.load.image('PurpleRock', 'assets/sprites/stone2.png');
		this.load.image('PinkRock', 'assets/sprites/STONE3.png');
		this.load.image('BlueRock', 'assets/sprites/stone1.png');
		this.load.image('monster1', 'assets/sprites/monster1.png');
		this.load.image('monster2', 'assets/sprites/monster2.png');

		this.load.image('car', 'assets/sprites/cart.png');
		this.load.image('train', 'assets/sprites/TRAIN.png');
		this.load.image('cartCollider', 'assets/sprites/cartCollider.png');

		this.load.image('tiles', 'assets/sprites/tilemaps.png');
		this.load.tilemapTiledJSON('tileJSON', 'assets/resources/digdugmap2.json');

		this.load.atlas('AstroShovel', 'assets/sprites/AstroShovel.png', 'assets/sprites/AstroShovel.json');

		this.load.bitmapFont('carrier_command', 'assets/resources/carrier_command.png', 'assets/resources/carrier_command.xml');
	}
	
	create() {

		digsound = this.sound.add('digging_sound', {volume:5});
		dropsound = this.sound.add('drop_rock', {volume:5});
		monsterdeath = this.sound.add('monster_death', {volume:5});
		pickupsound = this.sound.add('pickup_rock', {volume:5}); //not added
		playerdeath = this.sound.add('player_death', {volume:5}); //not added


        /*
		
		this.scene.start('playGame');
        */

        this.add.text(20, 20, 'Loading...');

        this.background = this.add.image(0, 0, 'start');
		this.background.setOrigin(0,0);

        this.cursorKeys = this.input.keyboard.createCursorKeys();
		//this.cursorKeys = this.input.keyboard.cr();
        //this.keys = this.input.keyboard.addKeys('SPACE');

		this.keys = this.input.keyboard.addKeys({
			a:  Phaser.Input.Keyboard.KeyCodes.A,
			s:  Phaser.Input.Keyboard.KeyCodes.S,
			d:  Phaser.Input.Keyboard.KeyCodes.D,
			w:  Phaser.Input.Keyboard.KeyCodes.W,
			sp: Phaser.Input.Keyboard.KeyCodes.ENTER
			
		});
	}

    update() {
        
		/* 
        if (this.cursorKeys.left.isDown){
		    this.scene.start('maingame');
		}*/

		if( this.keys.sp.isDown)  {
			this.scene.start('maingame');
		}
/* 
		if(game.input.keyboard.isDown( Phaser.Input.Keyboard.KeyCodes.D)) {
			this.scene.start('maingame');
			console.log('2');
		}*/
/*
		if(Phaser.Input.Keyboard.KeyCodes.A.isDown){
			this.scene.start('maingame');
		}*/
	}
}