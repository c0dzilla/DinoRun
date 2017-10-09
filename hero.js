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
function Hero(width, height, spriteWidth, spriteHeight, speedx, speedy, src, jumpCode){
	this.width = width;
	this.height = height;
	this.spriteWidth = spriteWidth;
	this.spriteHeight = spriteHeight;
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
	this.row = 0;
	this.column = 0;
	this.currentFrame = 0;
	this.totalRows = spriteHeight/height;
	this.totalColumns = spriteWidth/width;
}

Hero.prototype.draw = function(ctx, posx, posy){
	this.posx = posx;
	this.posy = posy;
	var that = this;
	if (this.image.complete){
		ctx.drawImage(this.image, this.column*this.width, this.row*this.height, this.width, this.height, this.posx, this.posy, this.width, this.height);
	}
	else{
		this.image.onload = function(){
			ctx.drawImage(that.image, that.column*that.width, that.row*that.height, that.width, that.height, that.posx, that.posy, that.width, that.height);
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
		this.draw(ctx, this.posx, this.posy);
		if (initialHeight - this.posy >= 1.5*this.height){			
			maxheightReached = 1;
		}
	}
	else{
		ctx.clearRect(this.posx, this.posy, this.width, this.height);
		this.posy = this.posy + this.speedy;
		this.draw(ctx, this.posx, this.posy);
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

Hero.prototype.move = function(ctx, canvas){
	var that = this;
	window.requestAnimationFrame(function(){
		that.move(ctx, canvas);
	});
	that.currentFrame = that.currentFrame + that.speedx;
	that.row = (Math.floor(that.currentFrame/that.spriteWidth)) % this.totalRows;
	that.column = (Math.floor(that.currentFrame/that.width)) % this.totalColumns;
	console.log(that.row);
	console.log(that.column);
	ctx.clearRect(that.posx, that.posy, that.width, that.height);
	that.draw(ctx, that.posx, that.posy);
}

Hero.prototype.updateScore = function(score){
	var that = this;
	var intervalFunction = setInterval(function(){
		that.score++;
		score.innerHTML = that.score;
	}, 100);
}