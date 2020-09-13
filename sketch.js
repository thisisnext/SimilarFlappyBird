var columns = [];
var bird;
var gameover = false;
var lbl;
var ptn;
var points;
var frameCount;
var btnRestart;

var sprite;
var scene;
var base;
var baseX;
var baseX2;
var column;

function setup() {
    bird = new Bird();
    columns.push(new Column());
    points = 0;
    frameCount = 0;
    baseX = 0;
    baseX2 = 400;
    lbl = document.getElementById("title")
    ptn = document.getElementById("points")
    btnRestart = document.querySelector("#btn-restart");

    sprite = new Image();
    sprite.src = 'assets/bird.png';
    scene = new Image();
    scene.src = 'assets/bg.png';
    base = new Image();
    base.src = 'assets/base.png';
    column = new Image()
    column.src = 'assets/column.png';

    btnRestart.disabled = true;
    requestAnimationFrame(drawn);
}
window.addEventListener("load", setup);

function drawn() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    ctx.drawImage(scene, 0, 0, scene.width, scene.height, 0, 0, canvas.width, canvas.height);
    frameCount++;

    for(var i = columns.length-1; i >= 0; i--) {
  
        columns[i].show();
        if(this.gameover === false) {
          columns[i].move(); 
        }
        if(columns[i].outview()) {
          columns.splice(i, 1)
        }
        
        if(columns[i].collision(bird)) {
          this.gameover = true;
          btnRestart.disabled = false;
          lbl.innerHTML = "Game Over! - Desenvolvido por Next!";
        }
        
        if(columns[i].markPoint(bird) && !this.gameover) {
          points++;
          ptn.innerHTML = `| Pontos: ${points}`;
        }
        
      }

    bird.show();
    if(!this.gameover) {
      bird.move();
    }
      
    if(frameCount % 180 == 0) {
        columns.push(new Column())
    }

    ctx.drawImage(base, 0, 0, base.width, base.height, baseX--, 350, canvas.width, 100);
    ctx.drawImage(base, 0, 0, base.width, base.height, baseX2--, 350, canvas.width, 100);
    if(baseX <= -400) baseX = 400;
    if(baseX2 <= -400) baseX2 = baseX+400;

    if(!this.gameover) requestAnimationFrame(drawn)
}

function restart() {
  // Main
  columns = [];
  gameover = false;
  frameCount = 0;
  setup();
  ptn.innerHTML = `| Pontos: ${points}`
  lbl.innerHTML = "FLAPPY BIRD - Next";

  // Bird
  bird.impulse = -15;
  bird.gravity = 0.6;
  bird.y = 0;
  bird.velY = 0;
}

document.addEventListener('keypress', (ev) => {
  if(ev.code === 'Space') {
    bird.moveUp();
    if(this.gameover) {
      restart();
    }
  }
  ev.preventDefault();
})

function onlyTouch(ev) {
  bird.moveUp();
  ev.preventDefault();
} 

function onlyClick(ev) {
  bird.moveUp();
  ev.preventDefault();
}

canvas.addEventListener("click", onlyClick) 
canvas.addEventListener("touchstart", onlyTouch)