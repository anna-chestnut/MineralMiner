class Car extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, speed){
        
      super(scene, x, y, 'car');
        
      this.scene = scene;
      //scene.physics.add.existing(this);
      //this.body.setCollideWorldBounds(true);

      scene.add.existing(this, true);
      scene.physics.world.enableBody(this);

      this.body.setImmovable(true);
      //scene.physics.enable(this, Phaser.Physics.Arcade);
      //this.body.static = true;
      //this.body.kinematic = true;

      this.body.allowGravity = false;
      this.x = x;
      this.y = y;
      this.body.setVelocity(speed, 0);
      this.depth = 8;
      

    }

    update(){

        if(this.x < -250){
          this.x = 720 + 250;
        }
        
    }

  }