function Obstacle(width, height, posx, posy, src){
	this.width = width;
	this.height = height;
	this.posx = posx;
	this.posy = posy;
	this.src = src;
	this.image = new Image();
	this.image.src = src;
}

Obstacle.prototype.draw = function(ctx, posx, posy){
	this.posx = posx;
	this.posy = posy;
	var that = this;
	this.image.onload = function(){
		ctx.drawImage(that.image, that.posx, that.posy);
	}
}