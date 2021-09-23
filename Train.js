class Train extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, speed){
        
      super(scene, x, y, 'train');
        
      this.scene = scene;
      scene.add.existing(this, true);
      scene.physics.world.enableBody(this);
      //scene.physics.add.existing(this);
      //this.body.setCollideWorldBounds(true);
      this.x = x;
      this.y = y;
      this.body.setVelocity(speed, 0);
      this.body.allowGravity = false;
      this.depth = 9;

    }

    update(){

        if(this.x < -250){
          this.x = 720 + 250;
        }
        
    }

  }