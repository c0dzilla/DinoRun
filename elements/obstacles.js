function Obstacle(width, height, speedx, speedy, accelerationx, accelerationy, src){
	this.width = width;
	this.height = height;
	this.posx = 0;
	this.posy = 0;
	this.speedx = speedx;
	this.speedy = speedy;
	this.accelerationx = accelerationx;
	this.accelerationy = accelerationy;
	this.src = src;
	this.image = new Image();
	this.image.src = src;
}

Obstacle.prototype.draw = function(ctx, posx, posy){
	this.posx = posx;
	this.posy = posy;
	if (this.image.complete){
		ctx.drawImage(this.image, this.posx, this.posy);
	}
	else{
		this.image.onload = ()=> {
			ctx.drawImage(this.image, this.posx, this.posy);
		}
	}
}

Obstacle.prototype.move = function(ctx, canvas){
	window.requestAnimationFrame( ()=> {
		this.move(ctx, canvas);
	})
	ctx.clearRect(this.posx, this.posy, this.width, this.height);
	this.posx = this.posx - this.speedx;
	if (this.posx + this.width <= 0){
		this.posx = canvas.width;
	}
	this.draw(ctx, this.posx, this.posy);
}

Obstacle.prototype.checkCollision = function(hero){
	var intervalFunction = setInterval( ()=> {
		if  (((this.posx + this.width >= hero.posx && this.posx + this.width <= hero.posx + hero.width) ||
			  (this.posx >= hero.posx && this.posx <= hero.posx + hero.width)) &&
			 ((this.posy + this.height >= hero.posy && this.posy + this.height <= hero.posy + hero.height) ||
			  (this.posy >= hero.posy && this.posy <= hero.posy + hero.height))){

			collisionDetected();
		}
	}, 10);

	function collisionDetected(){
		clearInterval(intervalFunction);
		alert("Your score is "+ hero.score);
		window.location.reload();
	}
}

Obstacle.prototype.accelerate = function(ifx, ify){
	var intervalFunction = setInterval(function(){
		this.speedx += this.accelerationx;
		this.speedy += this.accelerationy;
	}, 1);
}
