function Hero(width, height, spriteWidth, spriteHeight, speedx, speedy, accelerationx, accelerationy, src, jumpCode){
	this.width = width;
	this.height = height;
	this.spriteWidth = spriteWidth;
	this.spriteHeight = spriteHeight;
	this.posx = 0;
	this.posy = 0;
	this.speedx = speedx;
	this.speedy = speedy;
	this.accelerationx = accelerationx;
	this.accelerationy = accelerationy;
	this.src = src;
	this.image = new Image();
	this.image.src = src;
	this.jumpCode = jumpCode;
	this.ongoingJump = false;
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
	if (this.image.complete){
		ctx.drawImage(this.image, this.column*this.width, this.row*this.height, this.width, this.height, this.posx, this.posy, this.width, this.height);
	}
	else{
		this.image.onload = ()=> {
			ctx.drawImage(this.image, this.column*this.width, this.row*this.height, this.width, this.height, this.posx, this.posy, this.width, this.height);
		}
	}
}

Hero.prototype.changeSpeed = function(speedx, speedy){
	this.speedx = speedx;
	this.speedy = speedy;
}

Hero.prototype.jump = function(ctx, initialHeight, maxheightReached){
	this.ongoingJump = true;
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
		window.requestAnimationFrame( ()=> {
			this.jump(ctx, initialHeight, maxheightReached);
		});
	}
}

Hero.prototype.move = function(ctx, canvas){
	window.requestAnimationFrame( ()=> {
		this.move(ctx, canvas);
	});
	if (!this.ongoingJump){
		this.currentFrame = this.currentFrame + this.speedx;
		this.row = (Math.floor(this.currentFrame/this.spriteWidth)) % this.totalRows;
		this.column = (Math.floor(this.currentFrame/this.width)) % this.totalColumns;
		ctx.clearRect(this.posx, this.posy, this.width, this.height);
		this.draw(ctx, this.posx, this.posy);
	}
}

Hero.prototype.updateScore = function(score){
	var intervalFunction = setInterval( ()=> {
		this.score++;
		score.innerHTML = this.score;
	}, 100);
}

Hero.prototype.accelerate = function(ifx, ify){
	var intervalFunction = setInterval( ()=> {
		this.speedx += this.accelerationx;
		this.speedy += this.accelerationy;
	}, 1);
}