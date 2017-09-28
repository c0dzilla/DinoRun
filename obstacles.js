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

Obstacle.prototype.move = function(ctx, canvas){
	var that = this;
	var intervalFunction = setInterval(function(){
		ctx.clearRect(that.posx, that.posy, that.width, that.height);
		that.posx = that.posx - that.speedx;
		if (that.posx + that.width <= 0){
			that.posx = canvas.width;
		}
		ctx.drawImage(that.image, that.posx, that.posy);
	}, 1);
}

Obstacle.prototype.checkCollision = function(hero){
	var that = this;
	var intervalFunction = setInterval(function(){
		if  (((that.posx + that.width >= hero.posx && that.posx + that.width <= hero.posx + hero.width) ||
			  (that.posx >= hero.posx && that.posx <= hero.posx + hero.width)) &&
			 ((that.posy + that.height >= hero.posy && that.posy + that.height <= hero.posy + hero.height) ||
			  (that.posy >= hero.posy && that.posy <= hero.posy + hero.height))){

			collisionDetected();
		}
	}, 1);

	function collisionDetected(){
		clearInterval(intervalFunction);
		alert("Your score is "+ hero.score);
		window.location.reload();
	}
}
