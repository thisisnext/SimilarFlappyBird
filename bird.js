function Bird() {
    this.x = 30;
    this.y = canvas.height/2;
    this.w = 30;
    this.h = 30;
    this.velY = 0
    this.impulse = -15;
    this.gravity = 0.6;
    this.lbl = document.getElementById("title")
    this.srcW = 2392/4;
    this.srcH = 402;
    this.srcX = 0
    this.srcY = 0;
    this.count = 0;
    
    this.show = function() {
        ctx.drawImage(sprite, this.srcX, this.srcY, this.srcW, this.srcH, this.x, this.y, 30, 30)
        this.animation();
    }
    
    this.animation = function() {
      this.count++;
      if(this.count >= 20) this.count = 0;
      this.srcX = Math.floor(this.count / 5) * this.srcW;
    }

    this.move = function() { 
      this.velY += this.gravity;
      this.y += this.velY;
      this.velY *= 0.9

      if(this.y >= 320) {
        this.velY = 0;
        this.gravity = 0;
        this.impulse = 0;
        this.y = 320;
        gameover = true;
        lbl.innerHTML = "Game Over! - Desenvolvido por Next!";
        btnRestart.disabled = false;
      }
    }
    
    this.moveUp = function() {
      this.velY += this.impulse;
    }
}