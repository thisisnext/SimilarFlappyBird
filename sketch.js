var columns = [];
var bird;
var gameover = false;
var lbl;
var ptn;
var points;
var frameCount;
var btnRestart;
var sprite;

function setup() {
    bird = new Bird();
    columns.push(new Column());
    points = 0;
    lbl = document.getElementById("title")
    ptn = document.getElementById("points")
    frameCount = 0;
    btnRestart = document.querySelector("#btn-restart");
    sprite = new Image();
    sprite.src = 'assets/bird.png'
    btnRestart.disabled = true;
    requestAnimationFrame(drawn);
}
window.addEventListener("load", setup);

function drawn() {
    this.canvas = document.getElementById("canvas");
    this.ctx = canvas.getContext("2d");
    ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    ctx.fillRect(0, 0, canvas.width, canvas.height);
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
          ptn.innerHTML = `| Pontos: ${points}`
        }
        
      }

      bird.show();
      if(!this.gameover) {
        bird.move();
      }
      
    if(frameCount % 150 == 0) {
        columns.push(new Column())
    }
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
  bird.y = canvas.height/2;
  bird.velY = 0;
}

document.addEventListener('keypress', (e) => {
    if(e.keyCode == 32) {
        bird.moveUp();
        if(this.gameover) {
          restart();
        }
    }
})

function onlyTouch(ev) {
  bird.moveUp();
  ev.preventDefault();
} 

function onlyClick(ev) {
  bird.moveUp();
  ev.preventDefault();
}

document.addEventListener("click", onlyClick) 
document.addEventListener("touchstart", onlyTouch)