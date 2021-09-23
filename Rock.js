class Rock extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, type){
        
      //super(scene, x, y, 'rock1');
      super(scene, x, y, type);
        
      this.scene = scene;
      scene.add.existing(this);
      //scene.physics.add.existing(this);
      
      //console.log(this);
      scene.physics.world.enableBody(this);
      scene.rocks.add(this);
      //this.body.setCollideWorldBounds(true);
      this.rockX = x;
      this.rockY = y;
      this.x = mapPosition[x][y].x;
      this.y = mapPosition[x][y].y;
      this.body.setVelocity(0);
      this.depth = 8;
      mapDirection[this.rockX][this.rockY].setValue('d', true);
      this.isPicked = false; 
      this.isCollected = false;

        for(var i = this.x-27.5; i < this.x+27.5;i++){
            var dd = new DisPic(this.scene, i, this.y);
        }

        this.name = type;
        this.speed = 100;

    }


    setPick(isPick){         

        this.isPicked = isPick;
    }

    getPick(){
        return this.isPicked;
    }

    update(){

        if(this.isCollected){
            if(this.x < -250){
            this.x = 720 + 250;
            }
        }
        else{
        
        if(this.isPicked){
            this.x = this.scene.player.x;
            this.y = this.scene.player.y;
            this.rockX = gameSettings.playerX;
            this.rockY = gameSettings.playerY;
            
            
        }
        else{

        if(this.rockY != 11 && (mapDirection[this.rockX][this.rockY+1].getValue('u')||mapDirection[this.rockX][this.rockY+1].getValue('l')||mapDirection[this.rockX][this.rockY+1].getValue('r'))){
            this.body.setVelocity(0,this.speed);
            this.checkOverlapMonster();
            mapDirection[this.rockX][this.rockY].setValue('d', true);

            var dd = new DisPic(this.scene, mapPosition[this.rockX][this.rockY].x, this.y);
            dd.angle += 90;

            if(this.rockY!=11 && this.y >= mapPosition[this.rockX][this.rockY+1].y){

                this.rockY++;
                this.rockY =  Phaser.Math.Clamp(this.rockY, 0, 11);
                mapDirection[this.rockX][this.rockY].setValue('u', true);
                
            }
        }
        else if(this.rockY == 11 ){
            this.body.setVelocity(0,this.speed);
            
        }
        else{
            this.body.setVelocity(0);

        }

        }
    }
        
    }

    checkOverlapMonster(){

        if(Phaser.Geom.Rectangle.Overlaps(this.getBounds(), this.scene.m1.getBounds())){
            this.scene.m1.dieEvent();
        }

        if(Phaser.Geom.Rectangle.Overlaps(this.getBounds(), this.scene.m2.getBounds())){
            this.scene.m2.dieEvent();
        }
    }

    setSpeed(num){
        this.body.setVelocity(num, 0);
        this.isCollected = true;
    }

    getCollected(){
        return this.isCollected;
    }

  }