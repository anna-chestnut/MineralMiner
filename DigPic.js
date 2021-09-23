class DisPic extends Phaser.GameObjects.Sprite{

    constructor(scene, x, y){
        
      super(scene, x, y, 'dug');
        
      scene.add.existing(this);
      //scene.physics.world.enableBody(this);
      //scene.physics.add.existing(this);
      scene.digpics.add(this);
      this.x = x;
      this.y = y;
      //this.speed = speed;
      this.depth = 4;
      
    }
    
  }