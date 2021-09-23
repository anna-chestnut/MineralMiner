class Player extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, speed){
        
      super(scene, x, y, 'AstroShovel', 'AstroRight_6.png');

      this.scene = scene;
      scene.add.existing(this);
      scene.physics.world.enableBody(this);
      //scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      this.x = mapPosition[x][y].x;
      this.y = mapPosition[x][y].y;
      this.speed = speed;
      this.body.setVelocity(0);
      this.depth = 6;
      this.isPicking = false;

      for(var i = this.x-27.5; i < this.x+27.5;i++){
        var dd = new DisPic(scene, i, this.y);
      }

      scene.anims.create({
        key: 'Astro-right',
        frames: scene.anims.generateFrameNames('AstroShovel', { start: 1, end: 10, prefix: 'AstroRight_', suffix: '.png'}),
        frameRate: 8,
        repeat: -1
    })

    scene.anims.create({
        key: 'Astro-left',
        frames: scene.anims.generateFrameNames('AstroShovel', { start: 1, end: 10, prefix: 'AstroLeft_', suffix: '.png'}),
        frameRate: 8,
        repeat: -1
    })

    // this.anims.create({
    //     key: 'Astro-up',
    //     frames: this.anims.generateFrameNames('AstroShovel', { start: 1, end: 10, prefix: 'Astro-up-', suffix: '.png'}),
    //     frameRate: 8,
    // 	repeat: -1
    // })

    scene.anims.create({
        key: 'Astro-down',
        frames: scene.anims.generateFrameNames('AstroShovel', { start: 1, end: 10, prefix: 'AstroDown_', suffix: '.png'}),
        frameRate: 8,
        repeat: -1
    })

    scene.anims.create({
        key: 'Astro-up',
        frames: scene.anims.generateFrameNames('AstroShovel', { start: 1, end: 10, prefix: 'AstroUp_', suffix: '.png'}),
        frameRate: 8,
        repeat: -1
    })

    scene.anims.create({
        key: 'Astro-idle',
        frames: scene.anims.generateFrameNames('AstroShovel', { start: 5, end: 5, prefix: 'AstroDown_', suffix: '.png'}),
        frameRate: 8,
        repeat: -1
    })

    scene.anims.create({
        key: 'Playerdeath',
        frames: scene.anims.generateFrameNames('AstroShovel', { start: 1, end: 10, prefix: 'Playerdeath', suffix: '.png'}),
        frameRate: 8,
        repeat: 0
    })

    }

    update(){

        
    }

    getPick(){
        return this.isPicking;
    }

    setPick(isPicking){
        this.isPicking = isPicking;
    }

    digAnimation(direction){

        var offset = 4;//3
        var halfSize = 30;
        var xtop = 30;
        var xdown = 690;
        var ytop = 90;
        var ydown = 750;

        if (direction=='l') {
            this.x -= this.speed;
            //this.y =  mapPosition[gameSettings.playerX][gameSettings.playerY].y;
            /*
            if(this.x<=xtop){
                this.x = xtop;
                return;
            }*/

            //this.body.setVelocity(-this.speed, 0);

            if(gameSettings.playerX!=0 &&this.x < mapPosition[gameSettings.playerX-1][gameSettings.playerY].x+halfSize){
                mapDirection[gameSettings.playerX][gameSettings.playerY].setValue('l',true);
                gameSettings.playerX--;
                gameSettings.playerX =  Phaser.Math.Clamp(gameSettings.playerX, 0, 11);
                mapDirection[gameSettings.playerX][gameSettings.playerY].setValue('r',true);
           
            }
            
            var dd = new DisPic(this.scene, this.x-halfSize+offset, mapPosition[gameSettings.playerX][gameSettings.playerY].y);
		} 
		else if (direction=='r') {
            this.x += this.speed;
            //this.y =  mapPosition[gameSettings.playerX][gameSettings.playerY].y;
            //this.body.setVelocity(this.speed, 0);
            /*
            if(this.x>=xdown){
                this.x = xdown;
                return;
            }*/

            if(gameSettings.playerX!=11 &&this.x > mapPosition[gameSettings.playerX+1][gameSettings.playerY].x-halfSize){
                mapDirection[gameSettings.playerX][gameSettings.playerY].setValue('r',true);
                gameSettings.playerX++;
                gameSettings.playerX =  Phaser.Math.Clamp(gameSettings.playerX, 0, 11);
                mapDirection[gameSettings.playerX][gameSettings.playerY].setValue('l',true);
             
            }
            
            var dd = new DisPic(this.scene, this.x+halfSize-offset, mapPosition[gameSettings.playerX][gameSettings.playerY].y);
		}
        else if (direction=='u') {
            this.y -= this.speed;
            
            if(this.y<=ytop){
                this.y = ytop;
                return;
            }

            //this.x =  mapPosition[gameSettings.playerX][gameSettings.playerY].x;
            //this.body.setVelocity(0,-this.speed);
            if(gameSettings.playerY!=0 && this.y < mapPosition[gameSettings.playerX][gameSettings.playerY-1].y+halfSize){
                mapDirection[gameSettings.playerX][gameSettings.playerY].setValue('u',true);
                gameSettings.playerY--;
                gameSettings.playerY =  Phaser.Math.Clamp(gameSettings.playerY, 0, 11);
                mapDirection[gameSettings.playerX][gameSettings.playerY].setValue('d',true);
            }

            var dd = new DisPic(this.scene, mapPosition[gameSettings.playerX][gameSettings.playerY].x, this.y-halfSize+offset);
            dd.angle += 90;
		} 
		else if (direction=='d') {
			this.y += this.speed;
            
            if(this.y>=ydown){
                this.y = ydown;
                return;
            }

            //this.x =  mapPosition[gameSettings.playerX][gameSettings.playerY].x;
            //this.body.setVelocity(0,this.speed);
            if(gameSettings.playerY!=11 &&this.y > mapPosition[gameSettings.playerX][gameSettings.playerY+1].y-halfSize){
                mapDirection[gameSettings.playerX][gameSettings.playerY].setValue('d',true);
                gameSettings.playerY++;
                gameSettings.playerY =  Phaser.Math.Clamp(gameSettings.playerY, 0, 11);
                mapDirection[gameSettings.playerX][gameSettings.playerY].setValue('u',true);
            }
            
            var dd = new DisPic(this.scene, mapPosition[gameSettings.playerX][gameSettings.playerY].x, this.y+halfSize-offset);
            dd.angle += 90;
			
		}
        else{
            this.body.setVelocity(0,0);
        }

    }

  

  }