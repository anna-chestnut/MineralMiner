class MonsterTwo extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, speed){
        
      super(scene, x, y, 'monster2');
        
      this.scene = scene;
      scene.add.existing(this);
      scene.physics.world.enableBody(this);
      scene.physics.add.existing(this);
      this.body.setCollideWorldBounds(true);
      scene.monsters.add(this);
      this.monsX = x;
      this.monsY = y;
      this.x = mapPosition[x][y].x;
      this.y = mapPosition[x][y].y;
      this.speed = speed;
      this.body.setVelocity(0);
      this.depth = 7;
      this.direction = 'r';
      this.die = false;

      for(var i = this.x-27.5; i < this.x+27.5;i++){
        var dd = new DisPic(scene, i, this.y);
      }
    
      scene.anims.create({
        key: 'MonsterTwo-left',
        frames: scene.anims.generateFrameNames('MonsterTwo', { start: 1, end: 10, prefix: 'Monster2_Left_', suffix: '.png'}),
        frameRate: 8,
        repeat: -1 })

      scene.anims.create({
        key: 'MonsterTwo-right',
        frames: scene.anims.generateFrameNames('MonsterTwo', { start: 1, end: 10, prefix: 'Monster2_Right_', suffix: '.png'}),
        frameRate: 8,
        repeat: -1 })

      scene.anims.create({
        key: 'MonsterTwo-down',
        frames: scene.anims.generateFrameNames('MonsterTwo', { start: 1, end: 10, prefix: 'Monster2_Down_', suffix: '.png'}),
        frameRate: 8,
        repeat: -1 })

      scene.anims.create({
        key: 'MonsterTwo-up',
        frames: scene.anims.generateFrameNames('MonsterTwo', { start: 1, end: 10, prefix: 'Monster2_Up_', suffix: '.png'}),
        frameRate: 8,
        repeat: -1 })

      scene.anims.create({
        key: 'MonsterTwo-death',
        frames: scene.anims.generateFrameNames('MonsterTwo', { start: 1, end: 10, prefix: 'Monster2Death', suffix: '.png'}),
        frameRate: 8,
        repeat: 0 })
    }

    update(){

        if(!this.die){
            this.moveMoster(this.direction);
        }
    }

    randomDirection(){
        var r = Math.floor(Math.random() * 4);
        
        if(r==0){
            this.direction = 'l';
        }
        else if(r==1){
            this.direction = 'r';
        }
        else if(r==2){
            this.direction = 'u';
        }
        else if(r==3){
            this.direction = 'd';
        }

    }

    moveMoster(direction){

        var offset = 3;
        var halfSize = 0;

        if (direction=='l') {
            this.anims.play('MonsterTwo-down', true);
            if(this.monsX!=0){

                if( mapDirection[this.monsX-1][this.monsY].getValue('r')){

                    this.x -= this.speed;
                    if(this.monsX!=0 &&this.x < mapPosition[this.monsX-1][this.monsY].x+halfSize){
                    
                    this.monsX--;
                    //if(this.monsX<0) this.m
                    //this.monsX =  Phaser.Math.Clamp(this.monsX, 0, 11);
                    /*
                    if(this.monsX==0){
                        this.x =  Phaser.Math.Clamp(this.x, 2, mapPosition[this.monsX][this.monsY].x);
                    }
                    else{
                        this.x =  Phaser.Math.Clamp(this.x, mapPosition[this.monsX-1][this.monsY].x, mapPosition[this.monsX][this.monsY].x);
                    }*/
                    
                    }
                }
                else{
                    this.randomDirection();
                }
            }
            else{
                this.randomDirection();
            }
            

		} 
		else if (direction=='r') {

            this.anims.play('MonsterTwo-up', true);
            if(this.monsX!=11){

                if( mapDirection[this.monsX+1][this.monsY].getValue('l')){

                    this.x += this.speed;
                    if(this.monsX!=11 &&this.x > mapPosition[this.monsX+1][this.monsY].x+halfSize){
                        
                    this.monsX++;
                    //this.monsX =  Phaser.Math.Clamp(this.monsX, 0, 11);
                    /*
                    if(this.monsX==11){
                        this.x =  Phaser.Math.Clamp(this.x, mapPosition[this.monsX][this.monsY].x, mapPosition[this.monsX][this.monsY].x+30);
                    }
                    else{
                        this.x =  Phaser.Math.Clamp(this.x, mapPosition[this.monsX-1][this.monsY].x, mapPosition[this.monsX][this.monsY].x);
                    }*/
                    }
                }
                else{
                    this.randomDirection();
                }
            }
            else{
                this.randomDirection();
            }
		}
        else if (direction=='u') {
            this.anims.play('MonsterTwo-left', true);

            if(this.monsY!=0){

                if( mapDirection[this.monsX][this.monsY-1].getValue('d')){

                    this.y -= this.speed;
                    if(this.monsY!=0 &&this.y < mapPosition[this.monsX][this.monsY-1].y+halfSize){
                        
                    this.monsY--;
                    //this.monsY =  Phaser.Math.Clamp(this.monsY, 0, 11);
                    //this.y =  Phaser.Math.Clamp(this.y, mapPosition[this.monsX][this.monsY-1].y, mapPosition[this.monsX][this.monsY].y);
                    }
                }
                else{
                    this.randomDirection();
                }
            }
            else{
                this.randomDirection();
            }

		} 
		else if (direction=='d') {

            this.anims.play('MonsterTwo-right', true);


            if(this.monsY!=11){

                if( mapDirection[this.monsX][this.monsY+1].getValue('u')){

                    this.y += this.speed;
                    if(this.monsY!=11 &&this.y > mapPosition[this.monsX][this.monsY+1].y+halfSize){
                        
                    this.monsY++;
                    //this.monsY =  Phaser.Math.Clamp(this.monsY, 0, 11);
                    //this.y =  Phaser.Math.Clamp(this.y, mapPosition[this.monsX][this.monsY-1].y, mapPosition[this.monsX][this.monsY].y);
                    }
                }
                else{
                    this.randomDirection();
                }
            }
            else{
                this.randomDirection();
            }
			
		}

    }

    dieEvent(){
        if(!this.die){
            this.die=true;
            this.scene.physics.world.disable(this);
            this.anims.play('MonsterTwo-death', false);
            monsterdeath.play();
            this.once('asdf', () => {
                console.log('asdf')
                this.destroy();
            })
        }
    }
    
    getDie(){
        return this.die;
    }

  }