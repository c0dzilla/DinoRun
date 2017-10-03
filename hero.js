/*function gameElements(width, height, posx, posy, isImage){

	if (!isImage){
		this.width = width;
		this.height = height;
		this.isImage = false;
	}

	else{
		this.isImage = true;
	}

	this.posx = posx;
	this.posy = posy;

}

gameElements.prototype.setSpeed = function(speedx, speedy){
	this.speedx = speedx;
	this.speedy = speedy;
}

gameElements.prototype.draw = function(ctx, isImage){

	if (isImage){
		ctx.drawImage(this.image, this.posx, this.posy);
	}
	else{
		ctx.moveTo(this.posx, this.posy);
		ctx.fillRect(this.posx, this.posy, this.width, this.height);
	}

}

gameElements.prototype.setImage = function(ctx, src){
	this.image = new Image();
	var that = this;
	this.image.onload = function(){
		that.draw(ctx, true);
	}
	this.image.src = src;
}
*/
function Hero(width, height, speedx, speedy, src, jumpCode){
	this.width = width;
	this.height = height;
	this.posx = 0;
	this.posy = 0;
	this.speedx = speedx;
	this.speedy = speedy;
	this.src = src;
	this.image = new Image();
	this.image.src = src;
	this.jumpCode = jumpCode;
	this.ongoingJump = 0;
	this.score = 0;
}

Hero.prototype.draw = function(ctx, posx, posy){
	this.posx = posx;
	this.posy = posy;
	var that = this;
	if (this.image.complete){
		ctx.drawImage(this.image, this.posx, this.posy);
	}
	else{
		this.image.onload = function(){
			ctx.drawImage(that.image, that.posx, that.posy);
		}
	}
}

Hero.prototype.changeSpeed = function(speedx, speedy){
	this.speedx = speedx;
	this.speedy = speedy;
}

Hero.prototype.jump = function(ctx, initialHeight, maxheightReached){
	this.ongoingJump = 1;
	if (!maxheightReached){
		ctx.clearRect(this.posx, this.posy, this.width, this.height);
		this.posy = this.posy - this.speedy;
		ctx.drawImage(this.image, this.posx, this.posy);
		if (initialHeight - this.posy >= 1.5*this.height){			
			maxheightReached = 1;
		}
	}
	else{
		ctx.clearRect(this.posx, this.posy, this.width, this.height);
		this.posy = this.posy + this.speedy;
		ctx.drawImage(this.image, this.posx, this.posy);
		if (this.posy == initialHeight){
			this.ongoingJump = 0;
		}
	}
	
	if (this.ongoingJump){
		var that = this;
		window.requestAnimationFrame(function(){
			that.jump(ctx, initialHeight, maxheightReached);
		});
	}
}

Hero.prototype.updateScore = function(score){
	var that = this;
	var intervalFunction = setInterval(function(){
		that.score++;
		score.innerHTML = that.score;
	}, 100);
}