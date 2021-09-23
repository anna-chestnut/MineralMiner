
class GameScene extends Phaser.Scene {
	constructor() {
		super("maingame");
	}
	
	preload() {

		this.load.audio('background', 'assets/music/Space_5.mp3');
	}
	
	create() {
		
		for (var i = 0; i < mapDirection.length; i++) {
			mapDirection[i] = new Array(12);
		}
		
		for(i = 0; i < 12; i++){
			for(var j=0;j<12;j++){
		  
				var d = new m_Direction(false,false,false,false);
				mapDirection[i][j] =  d;
			}
		}

		for (var i = 0; i < mapPosition.length; i++) {
			mapPosition[i] = new Array(12);
		}
		
		for(i = 0; i < 12; i++){
			for(j=0;j<12;j++){
		
				var v = new Phaser.Math.Vector2();
				//0,0 -> 1,0
				v.set(30 + 60*i, 60+30+60*j);
		
				mapPosition[i][j] =  v;
			}
		}
		//var timer = scene.time.addEvent({
		//delay: 500,
		//callback: callback,
		//args: [],
		//startAT: 300,
		//timeScale: 1,
		//paused: false
	//})

		//timer.bmpText = this.add.bitmapText(100, 100, 'carrier_command','Timer', 29);
    	//timer.bmpText.inputEnabled = true;
		//timer.bmpText.text = 'Timer: ' + this.timer();


		gameSettings.playerX= 6;
		gameSettings.playerY= 8;
		gameSettings.isMoving= false;
		gameSettings.scene = 'maingame';
			

		/* 
        this.background = this.add.image(0, 0, 'game');
		this.background.setOrigin(0,0);
*/

		//music
		var music = this.sound.add('background',{volume:0.1},{loop:true});

		music.play();


		const map = this.make.tilemap({key:'tileJSON'});
		const tileset = map.addTilesetImage('digdugmap2', 'tiles');

		map.createStaticLayer('Ground', tileset);
		const CarArea = map.createStaticLayer('CarArea', tileset);
		const TitleArea = map.createStaticLayer('Title', tileset);

		//CarArea.setCollisionByProperty({colliders: true});
		//TitleArea.setCollisionByProperty({colliders: true});

		CarArea.setCollisionByExclusion(-1, true);
		TitleArea.setCollisionByExclusion(-1, true);
		
		this.digpics = this.physics.add.group();
		this.players = this.physics.add.group();
		this.player = new Player(this, gameSettings.playerX, gameSettings.playerY, 2);
		//this.physics.add.sprite(this.player)

		this.rocks = this.physics.add.group();
		var r1 = new Rock(this, 5,5, 'GreenRock');
		var r2 = new Rock(this, 1,1, 'PurpleRock');
		var r3 = new Rock(this, 8,4, 'PinkRock');
		var r4 = new Rock(this, 10,9, 'PurpleRock');
		var r5 = new Rock(this, 4,10, 'BlueRock');

		this.initialDug();

		this.monsters = this.physics.add.group();
		this.m1 = new Monster(this, 9,9,0.8);
		this.m2 = new MonsterTwo(this, 1,7,0.8);

		this.car = new Car(this, 500, 830, -50);
		this.train = new Train(this, 530, 830, -50);

		//this.topCollider = new Collider(this, 0, 0, 'backgroundCollider', 0);
		//this.bottomCollider = new Collider(this, 0, 780, 'backgroundCollider', 0);
		this.cartCollider = new Collider(this, 570, 860, 'cartCollider', -50);

		//this.car.body.onCollide = new Phaser.Signal();
		//this.car.body.onCollide.add(addScore, this);
		
		for (var i = 0; i < this.rocks.getChildren().length; i++) {
			var temp = this.rocks.getChildren()[i];
			this.physics.add.collider(this.cartCollider, temp, this.addScore, null, this);

		}
		//this.physics.add.collider(this.cartCollider, r1, this.addScore, null, this);


		this.bmpText = this.add.bitmapText(20, 18, 'carrier_command','SCORE: 0', 29);
    	this.bmpText.inputEnabled = true;
		this.score = 0;

		this.Direction = {
			Up: "0",
			Down: "1",
			Left: "2",
			Right: "3",
			empty: "4",
		}
		
		this.preDircetion = this.Direction.empty;

		this.cursorKeys = this.input.keyboard.createCursorKeys();

		this.keys = this.input.keyboard.addKeys({
			a:  Phaser.Input.Keyboard.KeyCodes.A,
			s:  Phaser.Input.Keyboard.KeyCodes.S,
			d:  Phaser.Input.Keyboard.KeyCodes.D,
			w:  Phaser.Input.Keyboard.KeyCodes.W,
			sp: Phaser.Input.Keyboard.KeyCodes.ENTER
		});

		this.timeSinceLastIncrement = 0;

		var timedEvent = this.time.addEvent({ delay: 150, callback: this.PickEvent, callbackScope: this, loop: true });

		this.gameover = false;
		
	}

	initialDug(){

		/*
		fillingDug(1,8,false,false,true,false,true);
		fillingDug(1,7,false,false,true,false,true);
*/
		this.fillingDug(1,8,true,true,true,true,true);
		this.fillingDug(1,7,true,true,true,true,false);
		this.fillingDug(2,7,true,true,true,true,false);
		this.fillingDug(1,7,true,true,true,true,true);
		this.fillingDug(2,7,true,true,true,true,true);
		this.fillingDug(2,6,true,true,true,true,true);
		
		this.fillingDug(2,5,true,true,true,true,true);
		this.fillingDug(2,4,true,true,true,true,false);
		this.fillingDug(2,3,true,true,true,true,false);
		this.fillingDug(2,2,true,true,true,true,false);
		this.fillingDug(2,1,true,true,true,true,false);
		

		this.fillingDug(5,7,true,true,true,true,true);
		this.fillingDug(5,8,true,true,true,true,true);
		this.fillingDug(5,9,true,true,true,true,true);
		this.fillingDug(5,10,true,true,true,true,true);
		this.fillingDug(5,11,true,true,true,true,true);

		this.fillingDug(8,8,true,true,true,true,false);
		this.fillingDug(8,7,true,true,true,true,false);
		this.fillingDug(8,6,true,true,true,true,false);

		this.fillingDug(8,9,true,true,true,true,false);
		this.fillingDug(9,9,true,true,true,true,false);
		this.fillingDug(10,9,true,true,true,true,false);
		this.fillingDug(11,9,true,true,true,true,false);
	}

	fillingDug(x, y, l, r, u, d, isStraight){

		//if(isStraight){
			for(var i = mapPosition[x][y].y-30; i < mapPosition[x][y].y+30;i++){
				var dd = new DisPic(this, mapPosition[x][y].x, i);
				dd.angle += 90;
			}
		//}
		//else{
			for(var i = mapPosition[x][y].x-30; i < mapPosition[x][y].x+30;i++){
				var dd = new DisPic(this, i, mapPosition[x][y].y);
			}
		//}

		if(l){
			mapDirection[x][y].setValue('l', true);
		}
		if(r){
			mapDirection[x][y].setValue('r', true);
		}
		if(u){
			mapDirection[x][y].setValue('u', true);
		}
		if(d){
			mapDirection[x][y].setValue('d', true);
		}
	}

	

	playerCollide(){
		console.log('player collide');
	}

	update(){

		if(this.gameover) return;
		this.movePlayerManager();
		this.UpdateRock();
		this.car.update();
		this.train.update();
		this.cartCollider.update();

		if(this.score>=300){
			
			this.scene.start('maingametwo');
		}

	}

	UpdateRock(){

		for (var i = 0; i < this.rocks.getChildren().length; i++) {
			var temp = this.rocks.getChildren()[i];

			temp.update();

			
			//for (var i = 0; i < this.monsters.getChildren().length; i++) {
				//var m = this.monsters.getChildren()[i];
				if(!this.m1.getDie() && Phaser.Geom.Rectangle.Overlaps(this.player.getBounds(), this.m1.getBounds())){
					this.gameover = true;
					this.gameOver();
					return;
				}
				this.m1.update();

				if(!this.m2.getDie() && Phaser.Geom.Rectangle.Overlaps(this.player.getBounds(), this.m2.getBounds())){
					this.gameover = true;
					this.gameOver();
					return;
				}
				this.m2.update();

		//}


		}
	}

	PickEvent(){
		for (var i = 0; i < this.rocks.getChildren().length; i++) {
			var temp = this.rocks.getChildren()[i];
			this.pickRocks(temp);
		}
	}

	pickRocks(rock){

		if(this.keys.sp.isDown && Phaser.Geom.Rectangle.Overlaps(this.player.getBounds(), rock.getBounds())){

			if(!this.player.getPick()){
				dropsound.play();
				this.timeSinceLastIncrement = 0;
	
				//var b = rock.getPick();
				rock.setPick(true);
				this.player.setPick(true);
					
				console.log("pick!");
			}
			else{
				if(rock.getPick()){
					rock.setPick(false);
					this.player.setPick(false);
				}
				
			}
			
			
		}
	}

	movePlayerManager(){

		if(this.gameover) return;

		var y = (this.player.y)%60;
		var x = (this.player.x)%60;//37.5

		if (this.cursorKeys.left.isDown||this.cursorKeys.right.isDown||this.cursorKeys.up.isDown||this.cursorKeys.down.isDown){
			if(!digsound.isPlaying)
				digsound.play();
		}else{
			if(digsound.isPlaying)
				digsound.stop();
		}


		if (this.cursorKeys.left.isDown) {

			if(29.5<=y && y<=30.5){
				this.player.digAnimation('l');
			}
			else if(29.5>y)
			{
				this.player.digAnimation('d');
			}
			else{
				this.player.digAnimation('u');
			}
			this.player.anims.play('Astro-left', true);
		}
		else if (this.cursorKeys.right.isDown) {

			if(29.5<=y && y<=30.5){
				this.player.digAnimation('r');
			}
			else if(29.5>y)
			{
				this.player.digAnimation('d');
			}
			else{
				this.player.digAnimation('u');
			}
			this.player.anims.play('Astro-right', true);
		}
		else if (this.cursorKeys.up.isDown) {

			if(29.5<=x && x<=30.5){
				this.player.digAnimation('u');
			}
			else if(29.5>x)
			{
				this.player.digAnimation('r');
			}
			else{
				this.player.digAnimation('l');
			}
			this.player.anims.play('Astro-up', true);
		}
		else if (this.cursorKeys.down.isDown) {

			if(29.5<=x && x<=30.5){
				this.player.digAnimation('d');
			}
			else if(29.5>x)
			{
				this.player.digAnimation('r');
			}
			else{
				this.player.digAnimation('l');
			}
			this.player.anims.play('Astro-down', true);
		}
		else
		{
			this.player.digAnimation('i');
			this.player.anims.play('Astro-idle', true);
		}

	}

	gameOver(){
		console.log('game over!');

		this.player.anims.stop();
		this.player.anims.play('Playerdeath', false);
		
		this.player.once('asdf', () => {
			console.log('asdf')
			this.player.destroy();
		})
		for(var count = 0; count<1000;count++){
			
			console.log(count);
		}
		
		this.scene.start('gameover');
		this.scene.stop(this);
	}

	addScore(car, rock){

		if(rock.getCollected()) return;
		
		this.score += 100;
		
		this.bmpText.text = 'Score: ' + this.score.toString();

		rock.setSpeed(-50);
		//this.physics.world.disable(rock);
	}

}