function Column() {
    this.x = canvas.width;
    this.y = 0;
    this.columnX = -840
    this.top = Math.floor(Math.random() * (30 - 10 + 1) + 10);
    this.wid = 20
    var newh = 0;
    
      this.collision = function(bird) {
      if(bird.y < this.top*8 || bird.y > canvas.height-newh - bird.h) {
        if(bird.x + bird.w > this.x && bird.x < this.x + this.wid*2) {
          return true;
        } else {
          return false;
        }
      }
    }
    
    this.show = function() {
      ctx.fillStyle = 'rgb(255, 255, 255)'
      //ctx.fillRect(this.x, this.y, this.wid*2, this.top*8)
      ctx.save()
      ctx.rotate(180 * Math.PI / 180);
      ctx.translate(this.columnX, 0);
      ctx.drawImage(column, 0, 0, column.width, column.height, this.x, this.y, this.wid*2, -this.top*8)
      ctx.restore()
      
      newh = (65 / 100) * (canvas.height - this.top*8)
      if(newh + this.top*8 > 320) {
        newh -= 25;
      }
      //ctx.fillRect(this.x, canvas.height-newh, this.wid*2, newh)
      ctx.drawImage(column, 0, 0, column.width, column.height, this.x, canvas.height-newh, this.wid*2, newh)
    }
    
    this.move = function() {
      this.x -= 1
      this.columnX += 2
    }
    
    this.outview = function() {
      if(this.x+this.wid*2 < 0 || this.x > canvas.height) {
        return true;
      } else {
        return false;
      }
    }
    
    this.markPoint = function() {
      if(bird.x + bird.w > this.x && bird.x < this.x + this.wid*2 && bird.x + bird.w < this.x+2) {
        return true;
      } else {
        return false;
      }
    }
    
  }