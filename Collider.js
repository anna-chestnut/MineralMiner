class Collider extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y, name, speed){
        
      super(scene, x, y, name);
        
      this.scene = scene;

      scene.add.existing(this, true);
      scene.physics.world.enableBody(this);

      this.body.setImmovable(true);

      this.body.allowGravity = false;
      this.x = x;
      this.y = y;
      this.body.setVelocity(speed, 0);
      this.depth = 5;
      

    }

    update(){

      if(this.x < -250){
        this.x = 720 + 250;
      }
      
  }

  }