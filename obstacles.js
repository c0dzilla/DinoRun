function Obstacle(width, height, speedx, speedy, src){
	this.width = width;
	this.height = height;
	this.posx = 0;
	this.posy = 0;
	this.speedx = speedx;
	this.speedy = speedy;
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

Obstacle.prototype.move = function(ctx){
	var that = this;
	var intervalFunction = setInterval(function(){
		ctx.clearRect(that.posx, that.posy, that.width, that.height);
		that.posx = that.posx - that.speedx;
		ctx.drawImage(that.image, that.posx, that.posy);
	}, 1);
}