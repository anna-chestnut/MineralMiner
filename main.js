/*import Phaser from 'phaser'

import StartScene from 'StartScene'
import GameScene from 'GameScene'*/

const config = {
  width: 720,//574
  height: 900,//900
  backgroundColor: 0x000000,
  scene: [StartScene, GameScene, GameOverScene, GameSceneTwo],
 
  pixelArt: true,
  physics: {
	default: "arcade",
	  arcade:{
		  debug: false
	}
  },
  scale:{
    autoCenter: Phaser.Scale.CENTER_BOTH
  },

  audio:{
    disableWebAudio: true
  }

}

class m_Direction{
  constructor(left, right, up, down) {
    this.left = false;
    this.right = false;
    this.up = false;
    this.down = false;
  }
  getValue(dir){
    if(dir=='l'){
      return this.left;
    }
    if(dir=='r'){
      return this.right;
    }
    if(dir=='u'){
      return this.up;
    }
    if(dir=='d'){
      return this.down;
    }
  }

  setValue(dir, val){
    if(dir=='l'){
      this.left = val;
    }
    if(dir=='r'){
      this.right = val;
    }
    if(dir=='u'){
      this.up = val;
    }
    if(dir=='d'){
      this.down = val;
    }
  }
}

var mapDirection = new Array(12);
/*
for (var i = 0; i < mapDirection.length; i++) {
  mapDirection[i] = new Array(12);
}
for(i = 0; i < 12; i++){
  for(j=0;j<12;j++){

      var d = new m_Direction(false,false,false,false);
      mapDirection[i][j] =  d;
  }
}
*/

var mapPosition = new Array(12);
/*
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
*/
var gameSettings = {
	playerX: 6,
    playerY: 8,
	playerSpeed: 100,
    isMoving: false,
    shipSpeed: -20,
    scene: 'maingame',
}

var digsound;
var dropsound;
var monsterdeath;
var pickupsound;
var playerdeath;

var game = new Phaser.Game(config);
game.scene.start('StartScene');
//var timer = game.time.create(false);





