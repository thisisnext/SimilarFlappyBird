function Bird() {
    this.x = 30;
    this.y = canvas.height/2;
    this.h = 30;
    this.w = 30;
    this.velY = 0
    this.impulse = -15;
    this.gravity = 0.6;
    this.lbl = document.getElementById("title")
    
    this.show = function() {
        ctx.fillStyle = 'rgb(255, 255, 255)'
        ctx.fillRect(this.x, this.y, this.w, this.h)
    }
    
    this.move = function() { 
      
      this.velY += this.gravity;
      this.y += this.velY;
      this.velY *= 0.9

      if(this.y >= canvas.height) {
        this.velY = 0;
        this.gravity = 0;
        this.impulse = 0;
        this.y = canvas.height-this.h;
        lbl.innerHTML = "Game Over! - Desenvolvido por Next!";
      }
    }
    
    this.moveUp = function(y) {
      this.velY += this.impulse;
    }
}
