var columns = [];
var bird;
this.gameover = false;
var lbl;
var ptn;
var points;
var frameCount;

function setup() {
    bird = new Bird();
    columns.push(new Column());
    points = 0;
    lbl = document.getElementById("title")
    ptn = document.getElementById("points")
    frameCount = 0;
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
        if(!this.gameover) {
          columns[i].move(); 
        }
        if(columns[i].outview()) {
          columns.splice(i, 1)
        }
        
        if(columns[i].collision(bird)) {
          this.gameover = true;
          lbl.innerHTML = "Game Over! - Desenvolvido por Next!";
        }
        
        if(columns[i].markPoint(bird) && !this.gameover) {
          points++;
          ptn.innerHTML = `Pontos: ${points}`
        }
        
      }

      bird.show();
  
      if(!this.gameover) {
        bird.move();
      }
      
    if(frameCount % 150 == 0) {
        columns.push(new Column())
    }
    requestAnimationFrame(drawn)
}


document.addEventListener('keypress', (e) => {
    if(e.keyCode == 32) {
        bird.moveUp();
    }
})